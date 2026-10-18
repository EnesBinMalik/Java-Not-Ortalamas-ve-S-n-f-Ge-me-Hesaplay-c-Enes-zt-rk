import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Zap,
  CornerDownLeft,
} from 'lucide-react';
import { CourseGrade, TerminalLog } from '../types';

interface JavaTerminalProps {
  currentScores: Record<string, number>;
  courses: CourseGrade[];
}

export const JavaTerminal: React.FC<JavaTerminalProps> = ({
  currentScores,
  courses,
}) => {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [interactiveIndex, setInteractiveIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    resetTerminal();
  }, []);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const resetTerminal = () => {
    setIsRunning(false);
    setInteractiveIndex(-1);
    setCurrentInput('');
    setLogs([
      {
        id: 'init-1',
        type: 'system',
        text: 'OpenJDK Runtime Environment (build 21.0.2+13-58)',
      },
      {
        id: 'init-2',
        type: 'system',
        text: 'javac NotOrtalamasi.java && java NotOrtalamasi',
      },
      {
        id: 'init-3',
        type: 'system',
        text: 'Program hazır. "Hızlı Çalıştır" butonuna basın veya "Manuel Giriş" ile klavyeden veri girin.',
      },
    ]);
  };

  // Run fast with current scores from state
  const handleFastRun = () => {
    setIsRunning(true);
    setInteractiveIndex(-1);
    setCurrentInput('');

    const newLogs: TerminalLog[] = [
      {
        id: `run-${Date.now()}-cmd`,
        type: 'system',
        text: '$ java NotOrtalamasi',
      },
      {
        id: `run-${Date.now()}-header`,
        type: 'output',
        text: '==================================================\n   NOT ORTALAMASI VE SINIF GEÇME HESAPLAMA        \n   Geliştirici: Enes Öztürk                      \n==================================================',
      },
    ];

    let total = 0;
    courses.forEach((c) => {
      const score = currentScores[c.id] ?? c.score;
      total += score;
      newLogs.push({
        id: `prompt-${c.id}-${Date.now()}`,
        type: 'prompt',
        text: `${c.name} Notunuz : ${score}`,
      });
    });

    const average = total / 6.0;
    const isPassed = average > 60;
    const result = isPassed ? 'Sınıfı Geçti' : 'Sınıfta Kaldı';

    newLogs.push({
      id: `summary-${Date.now()}`,
      type: 'output',
      text: `--------------------------------------------------\nDers Sayısı         : 6\nToplam Puan         : ${total.toFixed(2)}\nGenel Not Ortalaması: ${average.toFixed(2)}\nDurum               : ${result} (Ternary Koşulu: ${average.toFixed(2)} > 60 -> ${isPassed})\n--------------------------------------------------`,
    });

    newLogs.push({
      id: `sig-${Date.now()}`,
      type: 'signature',
      text: 'Ödev Hazırlayan     : Enes Öztürk\n==================================================\nProgram başarıyla tamamlandı (exit code 0).',
    });

    setLogs(newLogs);
    setIsRunning(false);
  };

  // Start step-by-step interactive mode
  const handleStartInteractive = () => {
    setIsRunning(true);
    setInteractiveIndex(0);
    setCurrentInput('');
    setLogs([
      {
        id: `cmd-${Date.now()}`,
        type: 'system',
        text: '$ java NotOrtalamasi (İnteraktif Scanner Giriş Modu)',
      },
      {
        id: `head-${Date.now()}`,
        type: 'output',
        text: '==================================================\n   NOT ORTALAMASI VE SINIF GEÇME HESAPLAMA        \n   Geliştirici: Enes Öztürk                      \n==================================================',
      },
      {
        id: `q-0-${Date.now()}`,
        type: 'prompt',
        text: `${courses[0].name} Notunuz : `,
      },
    ]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleInteractiveSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (interactiveIndex < 0 || interactiveIndex >= courses.length) return;

    const currentCourse = courses[interactiveIndex];
    const val = Number(currentInput.trim());
    const validVal = isNaN(val) ? 50 : Math.max(0, Math.min(100, val));

    // Update log
    const updatedLogs: TerminalLog[] = [
      ...logs.slice(0, -1),
      {
        id: `answered-${interactiveIndex}-${Date.now()}`,
        type: 'prompt',
        text: `${currentCourse.name} Notunuz : ${validVal}`,
      },
    ];

    const nextIndex = interactiveIndex + 1;
    if (nextIndex < courses.length) {
      const nextCourse = courses[nextIndex];
      updatedLogs.push({
        id: `q-${nextIndex}-${Date.now()}`,
        type: 'prompt',
        text: `${nextCourse.name} Notunuz : `,
      });
      setLogs(updatedLogs);
      setInteractiveIndex(nextIndex);
      setCurrentInput('');
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Completed! Calculate
      // Collect all inputs from logs
      const allScores = updatedLogs
        .filter((l) => l.type === 'prompt')
        .map((l) => {
          const parts = l.text.split(':');
          return Number(parts[1]?.trim() || 0);
        });

      const total = allScores.reduce((a, b) => a + b, 0);
      const avg = total / 6.0;
      const isPassed = avg > 60;
      const result = isPassed ? 'Sınıfı Geçti' : 'Sınıfta Kaldı';

      updatedLogs.push({
        id: `summary-${Date.now()}`,
        type: 'output',
        text: `--------------------------------------------------\nDers Sayısı         : 6\nToplam Puan         : ${total.toFixed(2)}\nGenel Not Ortalaması: ${avg.toFixed(2)}\nDurum               : ${result}\n--------------------------------------------------`,
      });

      updatedLogs.push({
        id: `sig-${Date.now()}`,
        type: 'signature',
        text: 'Ödev Hazırlayan     : Enes Öztürk\n==================================================\nProcess finished with exit code 0',
      });

      setLogs(updatedLogs);
      setInteractiveIndex(-1);
      setIsRunning(false);
      setCurrentInput('');
    }
  };

  const handleCopyLogs = () => {
    const text = logs.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-8 lg:py-12 border-t border-slate-800">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>Java Console Çıktı Simülatörü</span>
            <span aria-hidden="true">·</span>
            <span>Scanner(System.in) & System.out.println</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Java Sanal Konsol Terminali
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Yazdığınız Java kodunun gerçek bir terminal penceresinde veya IntelliJ IDEA Run
            konsolunda nasıl çalıştığını anlık olarak test edin.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleFastRun}
            disabled={isRunning && interactiveIndex >= 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Hızlı Çalıştır</span>
          </button>
          <button
            type="button"
            onClick={handleStartInteractive}
            disabled={isRunning && interactiveIndex >= 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Adım Adım Girdi Modu</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLogs}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Terminal metnini kopyala"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
          <button
            type="button"
            onClick={resetTerminal}
            className="p-1.5 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Konsolu Sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0c1017] shadow-2xl">
        {/* Terminal Titlebar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="ml-2 text-xs font-mono text-slate-400">
              NotOrtalamasi.java — Java Application — Enes Öztürk
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">UTF-8</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 min-h-[320px] max-h-[460px] overflow-y-auto space-y-1.5 leading-relaxed">
          {logs.map((log) => {
            if (log.type === 'system') {
              return (
                <div key={log.id} className="text-slate-500">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'signature') {
              return (
                <div key={log.id} className="text-amber-400 whitespace-pre-wrap font-semibold">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'prompt') {
              return (
                <div key={log.id} className="text-cyan-300">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={log.id} className="whitespace-pre-wrap text-slate-200">
                {log.text}
              </div>
            );
          })}

          {/* Interactive Input Line */}
          {interactiveIndex >= 0 && (
            <form onSubmit={handleInteractiveSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400">&gt;&gt;</span>
              <input
                ref={inputRef}
                type="number"
                min="0"
                max="100"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Puan (0-100) girip Enter'a basın..."
                className="flex-1 bg-transparent border-none text-amber-300 focus:outline-none font-mono text-xs sm:text-sm placeholder:text-slate-600"
                autoFocus
              />
              <button
                type="submit"
                className="px-2 py-0.5 text-xs bg-amber-400 text-slate-950 rounded font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Gönder</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>
          )}

          <div ref={terminalBottomRef} />
        </div>
      </div>
    </section>
  );
};
