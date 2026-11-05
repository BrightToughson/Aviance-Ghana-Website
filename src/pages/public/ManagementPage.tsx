import React, { useState, useMemo, useRef } from 'react';
import {
  Users,
  Mail,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Camera,
  Upload,
  Link as LinkIcon,
  Check,
  Copy,
  X,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  ArrowUpRight,
  Phone,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { TeamMember } from '../../types';
import { INITIAL_TEAM } from '../../constants/avianceData';
import { dataService } from '../../services/dataService';
import { useTheme } from '../../context/ThemeContext';

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
  const [viewProfileMember, setViewProfileMember] = useState<TeamMember | null>(null);
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

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 bg-white">
      {/* Hero Header */}
      <div className="py-14 sm:py-20 lg:py-24 text-center border-b border-slate-200 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <button
            onClick={() => onNavigate('/about')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#204696] hover:text-[#0F2E53] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to About Us
          </button>

          <div className="flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
              Executive & Management <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Official Directory</span>
            </h2>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Management Team
          </h1>

          <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-slate-600">
            The dedicated aviation professionals steering ground operations, cargo logistics, passenger experience, safety compliance, and corporate governance at Aviance Ghana Limited.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#204696] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#009EE0]" />
            <span>21 Key Management Officials · Split Profile Cards</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Department Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                selectedDept === dept
                  ? 'bg-[#204696] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {dept === 'all' ? 'All Departments (21)' : dept}
            </button>
          ))}
        </div>

        {/* Management Directory: Horizontal Split Containers (Profile on the Side, Details on the other) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeam.map((member) => {
            const hasPhoto = Boolean(member.photoUrl && !imageErrors[member.id]);
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .filter(Boolean)
              .join('')
              .slice(0, 2);

            return (
              <div
                key={member.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-[#204696]/50 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-stretch gap-5 relative overflow-hidden"
              >
                {/* Side 1: Profile Container on the Side */}
                <div className="relative shrink-0">
                  <div
                    onClick={() => setViewProfileMember(member)}
                    className="w-32 h-32 sm:w-36 sm:h-full min-h-[148px] rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 shadow-sm flex items-center justify-center cursor-pointer group-hover:border-[#204696]/30 transition-colors"
                    title={`Click to view profile for ${member.name}`}
                  >
                    {hasPhoto ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={() => {
                          setImageErrors((prev) => ({ ...prev, [member.id]: true }));
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#204696] to-[#009EE0] text-white flex flex-col items-center justify-center font-extrabold text-2xl tracking-wider shadow-inner p-3 text-center">
                        <span>{initials}</span>
                        <span className="text-[9px] uppercase tracking-widest text-blue-200 mt-1 font-semibold">Aviance</span>
                      </div>
                    )}
                  </div>

                  {/* Camera Button to Add / Change Photo */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(member);
                    }}
                    title={member.photoUrl ? 'Change Profile Photo' : 'Add Profile Photo'}
                    aria-label={`Update photo for ${member.name}`}
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-[#204696] border border-slate-200 shadow-md flex items-center justify-center hover:bg-[#204696] hover:text-white transition-all transform hover:scale-110 cursor-pointer z-10"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Side 2: Details on the Other Side */}
                <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3 w-full">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold text-[#204696] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {member.department}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Official
                    </span>
                  </div>

                  {/* Identity Header */}
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {member.position}
                    </div>
                    <h3
                      onClick={() => setViewProfileMember(member)}
                      className="text-base sm:text-lg font-extrabold mt-0.5 text-slate-900 group-hover:text-[#204696] transition-colors cursor-pointer"
                    >
                      {member.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 line-clamp-2 mt-1">
                      {member.biography}
                    </p>
                  </div>

                  {/* Bottom Row: Direct Email & Profile Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-xs font-mono font-bold text-[#204696] hover:underline flex items-center gap-1 truncate"
                        title={`Send email to ${member.email}`}
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(member.email!)}
                        title="Copy email to clipboard"
                        className="p-1 rounded-md text-slate-400 hover:text-[#204696] hover:bg-slate-100 transition-colors shrink-0"
                      >
                        {copiedEmail === member.email ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(member)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-[#204696] inline-flex items-center gap-1 transition-colors"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{member.photoUrl ? 'Photo' : 'Add'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewProfileMember(member)}
                        className="text-xs font-bold text-[#204696] hover:text-[#0F2E53] inline-flex items-center gap-1 bg-slate-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                      >
                        <span>Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTeam.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No management team members match your filter criteria.
          </div>
        )}

        {/* General Management Directory Notice */}
        <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 text-center max-w-2xl mx-auto">
          <Building2 className="w-6 h-6 mx-auto text-[#204696] mb-2" />
          <h4 className="font-bold text-sm text-slate-900">
            Aviance Ghana Executive Secretariat
          </h4>
          <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
            Cargo Village, Kotoka International Airport, Accra. Digital Address: <strong className="text-slate-800">GL-116-0409</strong>. Switchboard: <strong className="text-slate-800">+233 (0) 59 381 6076</strong>.
          </p>
        </div>
      </div>

      {/* Small Profile Modal: Executive Detailed Profile Card */}
      {viewProfileMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            {/* Modal Top Header with Aviance Colors */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#0F2E53] to-[#204696] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-200">
                  Aviance Ghana · Executive Profile
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewProfileMember(null)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Content Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* High-res Portrait */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-md flex items-center justify-center">
                    {viewProfileMember.photoUrl && !imageErrors[viewProfileMember.id] ? (
                      <img
                        src={viewProfileMember.photoUrl}
                        alt={viewProfileMember.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#204696] to-[#009EE0] text-white flex flex-col items-center justify-center font-extrabold text-2xl">
                        <span>{viewProfileMember.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
                        <span className="text-[9px] uppercase tracking-widest text-blue-200 mt-1">Aviance</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const target = viewProfileMember;
                      setViewProfileMember(null);
                      openEditModal(target);
                    }}
                    title="Change Profile Photo"
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-[#204696] border border-slate-200 shadow-md flex items-center justify-center hover:bg-[#204696] hover:text-white transition-all transform hover:scale-110"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Identity & Department */}
                <div className="text-center sm:text-left space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-[#204696] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
                    {viewProfileMember.department}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                    {viewProfileMember.name}
                  </h3>
                  <div className="text-xs font-bold text-slate-600">
                    {viewProfileMember.position}
                  </div>
                  <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      ISAGO Accredited Management
                    </span>
                  </div>
                </div>
              </div>

              {/* Biography Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Executive Responsibilities & Scope
                </span>
                <p className="text-xs leading-relaxed text-slate-700">
                  {viewProfileMember.biography}
                </p>
              </div>

              {/* Station Operations */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#204696]" /> Base Station
                  </span>
                  <span className="font-bold text-slate-800 block">Kotoka Int&apos;l (ACC)</span>
                  <span className="text-[11px] text-slate-500">Terminal 3 / Cargo Village</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#72BF44]" /> Regional Hubs
                  </span>
                  <span className="font-bold text-slate-800 block">Kumasi &amp; Tamale</span>
                  <span className="text-[11px] text-slate-500">Domestic &amp; Regional Ops</span>
                </div>
              </div>

              {/* Direct Liaison Row */}
              <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/60 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#204696] font-bold block uppercase">
                    Direct Official Email
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 truncate block">
                    {viewProfileMember.email}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(viewProfileMember.email!)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-[#204696] border border-blue-200 hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
                  >
                    {copiedEmail === viewProfileMember.email ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${viewProfileMember.email}`}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-[#204696] text-white hover:bg-[#0F2E53] transition-colors inline-flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const target = viewProfileMember;
                  setViewProfileMember(null);
                  openEditModal(target);
                }}
                className="text-xs font-bold text-[#204696] hover:underline inline-flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Upload / Change Profile Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setViewProfileMember(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Image Edit / Upload Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#204696] text-white flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
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
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Live Preview Box */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
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
                <div className="space-y-1">
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
                  className={`flex-1 py-2 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
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
                  className={`flex-1 py-2 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
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
                  className={`flex-1 py-2 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
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
                  className="border-2 border-dashed border-slate-300 hover:border-[#204696] rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30"
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
                <div className="space-y-2">
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
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700">
                    Select from verified Aviance leadership & operational photos:
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {PRESET_AVIANCES.map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => setPhotoInput(preset.path)}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
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
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#204696] text-white hover:bg-[#0F2E53] transition-colors shadow-xs"
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

