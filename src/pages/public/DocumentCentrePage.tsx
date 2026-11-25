import React, { useState } from 'react';
import {
  FileText,
  Filter,
  Download,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FolderDown,
  Building,
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { INITIAL_DOCUMENTS } from '../../constants/avianceData';
import { DigitalDocument } from '../../types';
import { useToast } from '../../context/ToastContext';

interface DocumentCentrePageProps {
  onNavigate: (path: string) => void;
}

export const DocumentCentrePage: React.FC<DocumentCentrePageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [documents] = useState<DigitalDocument[]>(INITIAL_DOCUMENTS);
  const { toast } = useToast();

  const categories = [
    'All',
    'Corporate',
    'Safety',
    'Compliance',
    'Reports',
    'Policies',
  ];

  const filtered = documents.filter((doc) => {
    return selectedCategory === 'All' || doc.category === selectedCategory;
  });

  const handleDownload = (doc: DigitalDocument) => {
    toast.info(
      `Downloading ${doc.fileName} (${doc.fileSize}). Official verified PDF file simulated.`,
      'Document Download'
    );
  };

  return (
    <div className="pb-24 sm:pb-32 bg-[#08101E] text-slate-100 min-h-screen">
      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.028em] leading-[1.14]">
            Digital Document Centre
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 max-w-3xl leading-relaxed font-normal">
            Access official corporate policies, IATA ISAGO station audit confirmations, EU Cargo RA3 manuals, and code of conduct publications.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10 sm:space-y-14 animate-in fade-in duration-150">
        {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-2xs ${
              selectedCategory === cat
                ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm'
                : 'bg-[#071120] border border-[#204696]/20 text-slate-400 hover:text-white hover:bg-[#0E2042]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="pt-6 border-t border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold text-[#58C1EB] uppercase tracking-wider">
                  {doc.category}
                </span>
                <StatusBadge status={doc.verificationStatus} size="xs" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">{doc.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{doc.description}</p>
              </div>

              <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>File:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{doc.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size & Type:</span>
                  <span className="text-slate-200">{doc.fileSize} · {doc.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="text-slate-200">v{doc.version}</span>
                </div>
                {doc.expiryDate && (
                  <div className="flex justify-between">
                    <span>Valid Through:</span>
                    <span className="text-[#58C1EB]">{doc.expiryDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                Uploaded: {doc.uploadDate}
              </div>
              <button
                onClick={() => handleDownload(doc)}
                className="px-4 py-1.5 bg-[#071120] hover:bg-[#204696] hover:text-white text-slate-200 text-xs font-bold uppercase tracking-wider rounded-full border border-[#204696]/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <FolderDown className="w-3.5 h-3.5 text-[#58C1EB]" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-xs space-y-2">
          <p>No documents matching the selected category.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
            }}
            className="text-[#58C1EB] hover:underline font-semibold"
          >
            Show All Documents
          </button>
        </div>
      )}
      </div>
    </div>
  );
};
