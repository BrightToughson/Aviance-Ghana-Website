import { useRef, useCallback } from 'react';

export interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  enableMouseDrag?: boolean;
}

/**
 * useSwipeGesture
 * Unified, responsive gesture hook providing touch swipe and desktop mouse drag gestures
 * for carousels, rolling showcases, image sliders, flipbooks, and tab switchers.
 */
export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 40,
  enableMouseDrag = true,
}: SwipeGestureOptions) {
  const touchStartCoord = useRef<{ x: number; y: number } | null>(null);
  const touchEndCoord = useRef<{ x: number; y: number } | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const mouseStartX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartCoord.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    touchEndCoord.current = null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndCoord.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartCoord.current || !touchEndCoord.current) {
      touchStartCoord.current = null;
      touchEndCoord.current = null;
      return;
    }

    const diffX = touchStartCoord.current.x - touchEndCoord.current.x;
    const diffY = touchStartCoord.current.y - touchEndCoord.current.y;

    // Check that horizontal swipe is dominant (more horizontal than vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) >= threshold) {
      if (diffX > 0) {
        onSwipeLeft?.(); // Swiped left -> next
      } else {
        onSwipeRight?.(); // Swiped right -> prev
      }
    }

    touchStartCoord.current = null;
    touchEndCoord.current = null;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!enableMouseDrag) return;
    if (e.button !== 0) return; // Only primary/left mouse button
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
  }, [enableMouseDrag]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!enableMouseDrag || !isMouseDown.current || mouseStartX.current === null) return;
    const diffX = mouseStartX.current - e.clientX;
    if (Math.abs(diffX) >= threshold) {
      if (diffX > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }
    isMouseDown.current = false;
    mouseStartX.current = null;
  }, [enableMouseDrag, onSwipeLeft, onSwipeRight, threshold]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    if (!enableMouseDrag || !isMouseDown.current || mouseStartX.current === null) return;
    const diffX = mouseStartX.current - e.clientX;
    if (Math.abs(diffX) >= threshold) {
      if (diffX > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }
    isMouseDown.current = false;
    mouseStartX.current = null;
  }, [enableMouseDrag, onSwipeLeft, onSwipeRight, threshold]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
  };
}

export default useSwipeGesture;
