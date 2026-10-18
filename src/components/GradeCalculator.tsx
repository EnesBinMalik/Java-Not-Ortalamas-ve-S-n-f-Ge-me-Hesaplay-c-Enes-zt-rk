import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Terminal,
  CheckCircle2,
  XCircle,
  HelpCircle,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { CourseGrade } from '../types';
import { PRESETS } from '../data/courses';

interface GradeCalculatorProps {
  courses: CourseGrade[];
  onUpdateScore: (id: string, score: number) => void;
  onApplyPreset: (scores: Record<string, number>) => void;
  onRandomizeScores: () => void;
  onResetScores: () => void;
  onSendToTerminal: () => void;
}

export const GradeCalculator: React.FC<GradeCalculatorProps> = ({
  courses,
  onUpdateScore,
  onApplyPreset,
  onRandomizeScores,
  onResetScores,
  onSendToTerminal,
}) => {
  // Homework specifies: "ortalama 60'dan büyük ise 'Sınıfı Geçti', küçük ise 'Sınıfta Kaldı'"
  // We provide a toggle for strict ( > 60 ) or greater-equal ( >= 60 ) so user can test both
  const [operatorMode, setOperatorMode] = useState<'gt' | 'gte'>('gt');

  const totalSum = courses.reduce((acc, curr) => acc + curr.score, 0);
  const average = totalSum / (courses.length || 1);
  const isPassed = operatorMode === 'gt' ? average > 60 : average >= 60;
  const resultText = isPassed ? 'Sınıfı Geçti' : 'Sınıfta Kaldı';

  return (
    <section id="hesaplayici" className="py-8 lg:py-12">
      {/* Editorial Title & Context */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Java 101 Ödevi</span>
          <span aria-hidden="true">·</span>
          <span>Programlayan: Enes Öztürk</span>
          <span aria-hidden="true">·</span>
          <span>Ternary Operator (Üçlü Operatör) Mimarisi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance">
          Not Ortalaması ve Sınıf Geçme Simülatörü
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
          Matematik, Fizik, Kimya, Türkçe, Tarih ve Müzik derslerinin sınav puanlarını girin.
          Java programınızın arka planda çalıştırdığı aritmetik ortalama ve ternary operatör
          mantığını anlık olarak gözlemleyin.
        </p>
      </div>

      {/* Preset Toolbar (Functional Buttons) */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Hazır Senaryolar:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.scores)}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700/60"
            >
              {preset.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRandomizeScores}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Rastgele Notlar</span>
          </button>
          <button
            type="button"
            onClick={onResetScores}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 6 Subjects Inputs (Left) + Real-time Outcome Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 6 Course Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-base font-semibold text-white">Ders Notları Girişi</h2>
            <span className="text-xs text-slate-400">Toplam 6 Zorunlu Ders</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map((course) => {
              const isPassingCourse = course.score >= 50;
              return (
                <div
                  key={course.id}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-lg transition-all hover:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-white block">
                        {course.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {course.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={course.score}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                          onUpdateScore(course.id, val);
                        }}
                        className="w-16 px-2.5 py-1 text-right text-sm font-semibold font-mono bg-slate-950 border border-slate-700 rounded text-amber-300 focus:outline-none focus:border-amber-400 tabular-nums"
                      />
                      <span className="text-xs font-mono text-slate-400">/100</span>
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="space-y-1.5">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={course.score}
                      onChange={(e) => onUpdateScore(course.id, Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="text-slate-400">0</span>
                      <span className={isPassingCourse ? 'text-emerald-400' : 'text-rose-400'}>
                        {isPassingCourse ? 'Geçer Düzey' : 'Kritik'}
                      </span>
                      <span className="text-slate-400">100</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Note about Java Scanner Input */}
          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs text-slate-400 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-200 font-medium">Java Kodundaki Karşılığı: </span>
              Kullanıcı konsolda sırasıyla Matematik, Fizik, Kimya, Türkçe, Tarih ve Müzik puanlarını{' '}
              <code className="text-amber-300 font-mono">scanner.nextInt()</code> fonksiyonu ile girer.
            </div>
          </div>
        </div>

        {/* Right Column: Live Outcome Card & Ternary Evaluation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hesaplama & Karar Matrisi
              </span>
              <span className="text-xs font-mono text-amber-400">Enes Öztürk</span>
            </div>

            {/* GPA Big Metric */}
            <div className="text-center py-2">
              <span className="text-xs text-slate-400 block mb-1">
                Aritmetik Not Ortalaması (toplam / 6.0)
              </span>
              <div className="text-5xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                {average.toFixed(2)}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                {isPassed ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Sınıfı Geçti</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-950/80 border border-rose-700/60 text-rose-300 text-sm font-semibold">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Sınıfta Kaldı</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mathematical Equation Breakdown */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg space-y-2 font-mono text-xs">
              <div className="text-slate-400 text-xs font-sans font-medium flex items-center justify-between">
                <span>Formül Dağılımı:</span>
                <span className="text-amber-400">double ortalama</span>
              </div>
              <div className="text-slate-300 break-words leading-relaxed">
                toplam = {courses.map((c) => c.score).join(' + ')}
              </div>
              <div className="text-amber-300 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                <span>{totalSum} / 6.0</span>
                <span className="font-bold text-white text-sm">{average.toFixed(2)}</span>
              </div>
            </div>

            {/* Live Ternary Visualizer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Ternary Operatörü Değerlendirmesi</span>
                {/* Mode toggle */}
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setOperatorMode('gt')}
                    className={`px-2 py-0.5 text-xs rounded font-mono transition-colors cursor-pointer ${
                      operatorMode === 'gt'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Ödev isterindeki kural: ortalama > 60"
                  >
                    &gt; 60
                  </button>
                  <button
                    type="button"
                    onClick={() => setOperatorMode('gte')}
                    className={`px-2 py-0.5 text-xs rounded font-mono transition-colors cursor-pointer ${
                      operatorMode === 'gte'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Alternatif standart: ortalama >= 60"
                  >
                    &ge; 60
                  </button>
                </div>
              </div>

              {/* Ternary Live Code Box */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono space-y-2">
                <div className="text-slate-400 text-xs font-sans">
                  Java Ternary Sözdizimi:
                </div>
                <div className="text-slate-200">
                  <span className="text-purple-400">String</span> sonuc = (
                  <span className={isPassed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {average.toFixed(2)} {operatorMode === 'gt' ? '>' : '>='} 60
                  </span>
                  ) ?{' '}
                  <span
                    className={
                      isPassed
                        ? 'bg-emerald-950 text-emerald-300 px-1 py-0.5 rounded border border-emerald-600/50 font-bold'
                        : 'text-slate-400 opacity-60'
                    }
                  >
                    &quot;Sınıfı Geçti&quot;
                  </span>{' '}
                  :{' '}
                  <span
                    className={
                      !isPassed
                        ? 'bg-rose-950 text-rose-300 px-1 py-0.5 rounded border border-rose-600/50 font-bold'
                        : 'text-slate-400 opacity-60'
                    }
                  >
                    &quot;Sınıfta Kaldı&quot;
                  </span>
                  ;
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs flex items-center justify-between font-sans">
                  <span className="text-slate-400">Koşul Değeri:</span>
                  <span
                    className={`font-mono font-bold ${
                      isPassed ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPassed ? 'true' : 'false'}
                  </span>
                </div>
                <div className="flex items-center justify-between font-sans">
                  <span className="text-slate-400">Atanan Sonuç:</span>
                  <span className="font-semibold text-white">&quot;{resultText}&quot;</span>
                </div>
              </div>
            </div>

            {/* Direct Interaction Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onSendToTerminal}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-98 transition-all rounded-lg border border-slate-700 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Bu Notlarla Terminali Çalıştır</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
