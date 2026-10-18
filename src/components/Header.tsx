import React from 'react';
import { Download, FileText } from 'lucide-react';

interface HeaderProps {
  onOpenReport: () => void;
  onDownloadJava: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReport,
  onDownloadJava,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hesaplayici"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hesaplayici');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
        >
          JavaGrade
        </a>

        {/* Zone 2: 4-5 Navigation Links (single-line, concise) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => onNavigate('hesaplayici')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'hesaplayici'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Not Hesaplayıcı
          </button>
          <button
            type="button"
            onClick={() => onNavigate('terminal')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'terminal'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Java Terminali
          </button>
          <button
            type="button"
            onClick={() => onNavigate('kaynak-kod')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'kaynak-kod'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Kaynak Kod
          </button>
          <button
            type="button"
            onClick={() => onNavigate('ternary-rehber')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'ternary-rehber'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Ternary Rehberi
          </button>
          <button
            type="button"
            onClick={onOpenReport}
            className="whitespace-nowrap shrink-0 transition-colors py-1 text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            Ödev Karnesi
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onDownloadJava}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 transition-all rounded-md shadow-sm whitespace-nowrap cursor-pointer"
            title="NotOrtalamasi.java dosyasını doğrudan indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Java Kodunu İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
