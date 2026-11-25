import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Users,
  Mail,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Camera,
  Upload,
  Link as LinkIcon,
  Check,
  Copy,
  X,
  Trash2,
  ImageIcon,
  Sparkles,
  ArrowUpRight,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { TeamMember } from '../../types';
import { INITIAL_TEAM } from '../../constants/avianceData';
import { dataService } from '../../services/dataService';
import { useTheme } from '../../context/ThemeContext';
import { SlidePagination } from '../../components/ui/SlidePagination';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';

interface ManagementPageProps {
  team: TeamMember[];
  onNavigate: (path: string) => void;
}

const PRESET_AVIANCES = [
  { label: 'Richard Backhouse (CEO)', path: '/assets/aviance_images/ceo and stakeholders/1787739001941.jpg' },
  { label: 'Dominic Adjei-Badu (Finance)', path: '/assets/aviance_images/ceo and stakeholders/1787739002168.jpg' },
  { label: 'Michaela Walker (Ops Director)', path: '/assets/aviance_images/1788350257403.jpg' },
  { label: 'Ebenezer Darko (GM Ops)', path: '/assets/aviance_images/1791968160594.jpg' },
  { label: 'Erasmus Twentor (GM HR)', path: '/assets/aviance_images/1791796139946.jpg' },
  { label: 'Passenger Services Specialist', path: '/assets/aviance_images/1776164623557.jpg' },
  { label: 'Cargo Terminal Manager', path: '/assets/aviance_images/1780574568846.jpg' },
  { label: 'Lounge Executive Hostess', path: '/assets/aviance_images/1791796145150.jpg' },
];

export const ManagementPage: React.FC<ManagementPageProps> = ({ team, onNavigate }) => {
  const { isLight } = useTheme();
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [photoInput, setPhotoInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Guarantee that all 21 official members are loaded without stale cache
  const officialTeam = useMemo(() => {
    if (!team || team.length < INITIAL_TEAM.length || team.some((m) => m.name.includes('Mark Kamis'))) {
      return INITIAL_TEAM;
    }
    return team;
  }, [team]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    officialTeam.forEach((t) => {
      if (t.department) set.add(t.department);
    });
    return ['all', ...Array.from(set)];
  }, [officialTeam]);

  const filteredTeam = useMemo(() => {
    return officialTeam.filter((member) => {
      return selectedDept === 'all' || member.department === selectedDept;
    });
  }, [officialTeam, selectedDept]);

  // Department filter selection
  const handleSelectDept = (dept: string) => {
    setSelectedDept(dept);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP, etc.).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoInput(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please drop an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoInput(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = () => {
    if (!editingMember) return;
    dataService.saveTeamMember({
      id: editingMember.id,
      name: editingMember.name,
      position: editingMember.position,
      photoUrl: photoInput.trim(),
    });
    setImageErrors((prev) => ({ ...prev, [editingMember.id]: false }));
    setEditingMember(null);
    setPhotoInput('');
  };

  const handleRemovePhoto = () => {
    if (!editingMember) return;
    dataService.saveTeamMember({
      id: editingMember.id,
      name: editingMember.name,
      position: editingMember.position,
      photoUrl: '',
    });
    setEditingMember(null);
    setPhotoInput('');
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setPhotoInput(member.photoUrl || '');
    setActiveTab('upload');
  };

  // Rolling of 8s pagination & 8-second auto-cycle
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(filteredTeam.length / ITEMS_PER_PAGE));

  // Reset page when department filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedDept]);

  // Keep page within bounds if filtered results shrink
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  // 8-second auto-rolling timer
  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 8000);

    return () => clearInterval(timer);
  }, [totalPages, isPaused]);

  // Unified responsive gesture sliding (Touch swipe & Desktop mouse drag)
  const { handlers: gridSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => setCurrentPage((prev) => (prev + 1) % totalPages),
    onSwipeRight: () => setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1)),
    threshold: 40,
    enableMouseDrag: true,
  });

  // Slice team members for current page (8 members)
  const currentMembers = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return filteredTeam.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTeam, currentPage]);

  // Reusable Management Member Card Render (Matching Image 2 Full-Bleed Style)
  const renderMemberCard = (member: TeamMember) => {
    const hasPhoto = Boolean(member.photoUrl && !imageErrors[member.id]);
    const initials = member.name
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .join('')
      .slice(0, 2);

    return (
      <article
        key={member.id}
        className="group relative h-[165px] sm:h-[180px] lg:h-[195px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
      >
        {/* Full-Bleed Background Visual */}
        {hasPhoto ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
              member.name.includes('Richard Backhouse') ? 'object-[center_18%]' : 'object-top'
            }`}
            onError={() => {
              setImageErrors((prev) => ({ ...prev, [member.id]: true }));
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0F2E53] via-[#1B365D] to-[#0A192F] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center font-extrabold text-base shadow-inner mb-1">
              <span>{initials}</span>
            </div>
            <span className="text-[9px] font-bold text-sky-300 uppercase tracking-widest">Aviance Leadership</span>
          </div>
        )}

        {/* Dark Gradient Confined Strictly to Bottom Content (Top 65% is 100% Clear for Faces) */}
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/95 via-black/80 via-40% to-transparent pointer-events-none" />

        

        {/* Bottom Overlay Content — Position + Name */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-10 space-y-0.5">
          <span className="text-[9px] sm:text-[10px] font-bold text-sky-300 uppercase tracking-wider block leading-tight truncate">
            {member.position}
          </span>

          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug drop-shadow-xs truncate">
            {member.name}
          </h3>
        </div>
      </article>
    );
  };

  return (
    <div className="pb-24 sm:pb-36 bg-white">
      {/* Top Breadcrumb Bar */}
      <div className={`border-b transition-colors ${isLight ? 'bg-white border-slate-200' : 'bg-[#0C1933] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('/about')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              About Us
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">Management Team</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            Management Team
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            The dedicated aviation professionals steering ground operations, cargo logistics, passenger experience, safety compliance, and corporate governance at Aviance Ghana Limited.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-8 sm:space-y-12">
        

        {/* Management Team Showcase Grid — Rolling 8s Grid with Unified Gestures */}
        <div
          className="relative select-none cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          {...gridSwipeHandlers}
        >
          <div
            key={currentPage}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5 text-left transition-all duration-500 animate-in fade-in"
          >
            {currentMembers.map((member) => (
              <div key={member.id}>
                {renderMemberCard(member)}
              </div>
            ))}
          </div>

          {filteredTeam.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No management team members match your filter criteria.
            </div>
          )}
        </div>

        {/* Modern Numbered Slide Indicator Capsule (Rolling of 8s pagination) */}
        {totalPages > 1 && (
          <div className="pt-2 flex flex-col items-center justify-center gap-2">
            <SlidePagination
              current={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
              variant={isLight ? 'light' : 'dark'}
              size="sm"
            />
            <span className="text-[11px] font-medium text-slate-400">
              Showing {currentPage * ITEMS_PER_PAGE + 1}–{Math.min((currentPage + 1) * ITEMS_PER_PAGE, filteredTeam.length)} of {filteredTeam.length} • Auto-rolls every 8s (pause on hover)
            </span>
          </div>
        )}

        {/* General Management Directory Notice */}
        <div className="p-8 rounded-3xl border border-slate-200/90 bg-slate-50 text-center max-w-2xl mx-auto shadow-2xs mt-8">
          <Building2 className="w-8 h-8 mx-auto text-[#204696] mb-3" />
          <h4 className="font-bold text-base text-slate-900">
            Aviance Ghana Executive Secretariat
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed">
            Cargo Village, Kotoka International Airport, Accra. Digital Address: <strong className="text-slate-800">GL-116-0409</strong>. Switchboard: <strong className="text-slate-800">+233 (0) 59 381 6076</strong>.
          </p>
        </div>
      </div>

      {/* Profile Image Edit / Upload Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#204696] text-white flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Add / Update Profile Image
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingMember.name} · {editingMember.position}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Live Preview Box */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-20 h-20 rounded-2xl border-2 border-white shadow-md bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                  {photoInput ? (
                    <img
                      src={photoInput}
                      alt="Preview"
                      className="w-full h-full object-cover object-top"
                      onError={() => {
                        alert('Image failed to load. Please verify the URL or select another file.');
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#204696] to-[#009EE0] text-white flex items-center justify-center font-extrabold text-xl">
                      {editingMember.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                  )}
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Live Preview
                  </span>
                  <div className="text-sm font-bold text-slate-900">{editingMember.name}</div>
                  <div className="text-xs text-slate-500">{editingMember.position}</div>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    {photoInput ? 'Photo ready to save' : 'Using initials monogram badge'}
                  </span>
                </div>
              </div>

              {/* Input Mode Tabs */}
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'upload'
                      ? 'border-[#204696] text-[#204696]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('url')}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'url'
                      ? 'border-[#204696] text-[#204696]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  Image Path / URL
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('presets')}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'presets'
                      ? 'border-[#204696] text-[#204696]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Company Assets
                </button>
              </div>

              {/* Tab 1: Upload File */}
              {activeTab === 'upload' && (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#204696] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#204696] flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    Click to browse or drag and drop a photo
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    JPG, PNG, WebP up to 10MB
                  </div>
                </div>
              )}

              {/* Tab 2: URL or Path */}
              {activeTab === 'url' && (
                <div className="space-y-2 text-left">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Enter Image URL or Project Asset Path
                  </label>
                  <input
                    type="text"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    placeholder="e.g. /src/assets/aviance_images/... or https://..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#204696] focus:ring-1 focus:ring-[#204696] outline-hidden font-mono"
                  />
                  <p className="text-[11px] text-slate-500">
                    You can specify any path inside <code>src/assets/</code> or a public web link.
                  </p>
                </div>
              )}

              {/* Tab 3: Aviance Company Presets */}
              {activeTab === 'presets' && (
                <div className="space-y-2 text-left">
                  <div className="text-xs font-semibold text-slate-700">
                    Select from verified Aviance leadership & operational photos:
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {PRESET_AVIANCES.map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => setPhotoInput(preset.path)}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          photoInput === preset.path
                            ? 'border-[#204696] bg-blue-50 text-[#204696]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <img
                          src={preset.path}
                          alt={preset.label}
                          className="w-8 h-8 rounded-lg object-cover object-top border border-slate-200 shrink-0"
                        />
                        <span className="text-[11px] font-semibold truncate block">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              {editingMember.photoUrl ? (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove Photo
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#204696] text-white hover:bg-[#0F2E53] transition-colors shadow-xs cursor-pointer"
                >
                  Save Profile Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
