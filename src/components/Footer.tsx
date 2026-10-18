import React from 'react';
import { Download, FileText, Code2, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenReport: () => void;
  onDownloadJava: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReport,
  onDownloadJava,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left info */}
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-bold text-white tracking-tight">
              Java Not Ortalaması Hesaplama Projesi
            </div>
            <div className="text-xs text-slate-400">
              Geliştirici &amp; Ödev Sahibi:{' '}
              <span className="text-amber-400 font-semibold">Enes Öztürk</span>
              <span className="mx-2">·</span>
              <span>Java 101 Koşullu İfadeler &amp; Ternary Operatörü</span>
            </div>
          </div>

          {/* Center / Right actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Ödev Raporu</span>
            </button>
            <button
              type="button"
              onClick={onDownloadJava}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>NotOrtalamasi.java</span>
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 text-xs rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Sayfa Başına Dön"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-850 text-center text-xs text-slate-500">
          Bu uygulama, Matematik, Fizik, Kimya, Türkçe, Tarih ve Müzik derslerinin not ortalamasını hesaplayıp
          Ternary Operator (üçlü operatör) koşulu ile sınıf geçme durumunu belirlemek amacıyla Enes Öztürk tarafından hazırlanmıştır.
        </div>
      </div>
    </footer>
  );
};
