import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Code2,
  FileCode,
  BookOpen,
} from 'lucide-react';
import { JAVA_TEMPLATES, CODE_EXPLANATIONS, JavaTemplate } from '../data/javaCodeTemplates';

export const CodeViewer: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<JavaTemplate>(JAVA_TEMPLATES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTemplate.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([selectedTemplate.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedTemplate.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = selectedTemplate.code.split('\n');

  return (
    <section id="kaynak-kod" className="py-8 lg:py-12 border-t border-slate-800">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>Java Kaynak Kodu & Proje Dosyaları</span>
            <span aria-hidden="true">·</span>
            <span>Yazar: Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>JDK 17+ / 21+ Uyumlu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Eksiksiz Java Kaynak Kodu
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ödev tesliminiz için hazır, kurallı Java sözdizimi ve açıklayıcı yorum satırlarıyla
            birlikte derlenebilir kod dosyası.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{selectedTemplate.fileName} İndir</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg mb-4 overflow-x-auto">
        {JAVA_TEMPLATES.map((tmpl) => {
          const isActive = tmpl.id === selectedTemplate.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => setSelectedTemplate(tmpl)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{tmpl.title}</span>
            </button>
          );
        })}
      </div>

      {/* Code Viewer Box */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl">
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-slate-300 font-semibold">
              {selectedTemplate.fileName}
            </span>
          </div>
          <span className="text-slate-400 text-xs hidden sm:inline">
            {selectedTemplate.description}
          </span>
        </div>

        {/* Code Content with Line Numbers */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[520px] font-mono text-xs sm:text-sm leading-relaxed">
          <pre className="table w-full">
            <code>
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                // Simple highlight detection
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*') || line.trim().startsWith('/**');
                const isTernaryLine = line.includes('? "Sınıfı Geçti" : "Sınıfta Kaldı"');
                const isAuthorLine = line.includes('Enes Öztürk');

                return (
                  <div
                    key={idx}
                    className={`table-row transition-colors ${
                      isTernaryLine
                        ? 'bg-amber-400/10'
                        : isAuthorLine
                        ? 'bg-purple-500/10'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="table-cell select-none pr-4 text-right text-slate-600 font-mono text-xs w-10 tabular-nums">
                      {lineNum}
                    </span>
                    <span
                      className={`table-cell whitespace-pre ${
                        isTernaryLine
                          ? 'text-amber-300 font-semibold'
                          : isAuthorLine
                          ? 'text-purple-300 font-semibold'
                          : isComment
                          ? 'text-slate-500 italic'
                          : 'text-slate-200'
                      }`}
                    >
                      {line}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>

      {/* Code Explanations / Homework Breakdown Cards */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-200">
            Ödevin Kod Mimarisi ve Kritik Satırların İzahı
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CODE_EXPLANATIONS.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2"
            >
              <h4 className="text-xs font-semibold text-amber-400 font-mono">
                {item.step}
              </h4>
              <div className="p-2 bg-slate-950 rounded border border-slate-800/80 font-mono text-xs text-slate-200 overflow-x-auto">
                <code>{item.code}</code>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
