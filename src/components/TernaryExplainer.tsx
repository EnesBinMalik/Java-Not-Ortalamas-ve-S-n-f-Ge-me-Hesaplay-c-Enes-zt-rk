import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ArrowRight, Zap, Code } from 'lucide-react';

export const TernaryExplainer: React.FC = () => {
  const [testScore, setTestScore] = useState<number>(64);
  const [threshold, setThreshold] = useState<number>(60);

  const conditionResult = testScore > threshold;
  const evaluationResult = conditionResult ? 'Sınıfı Geçti' : 'Sınıfta Kaldı';

  return (
    <section id="ternary-rehber" className="py-8 lg:py-12 border-t border-slate-800">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
          <span>Java Mantık ve Koşul Yapıları</span>
          <span aria-hidden="true">·</span>
          <span>Üçlü Operatör (Ternary Operator) İncelemesi</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Ternary Operatörü (? :) Nasıl Çalışır?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Java&apos;da üç işlenen (operand) alan tek operatördür. Klasik if-else bloklarının
          yerine geçerek tek satırda koşullu değer ataması sağlar ve kodun okunabilirliğini artırır.
        </p>
      </div>

      {/* Anatomical Diagram */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl mb-8 space-y-6">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Ternary Operatörünün Anatomisi</span>
        </h3>

        {/* 3 Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Operand 1 */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
            <div className="text-amber-400 font-bold uppercase tracking-wider text-xs">
              1. İşlenen (Koşul)
            </div>
            <div className="text-base text-white font-semibold">
              (ortalama &gt; 60)
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Mantıksal bir ifade (boolean). Sonucu yalnızca <code className="text-amber-300">true</code> veya <code className="text-rose-300">false</code> olabilir.
            </p>
          </div>

          {/* Operand 2 */}
          <div className="p-4 bg-slate-950 border border-emerald-900/60 rounded-lg space-y-2">
            <div className="text-emerald-400 font-bold uppercase tracking-wider text-xs">
              2. İşlenen (Doğru İse)
            </div>
            <div className="text-base text-emerald-300 font-semibold">
              &quot;Sınıfı Geçti&quot;
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Koşul <code className="text-emerald-300">true</code> olduğunda soru işaretinden (<code className="text-amber-300">?</code>) hemen sonraki değer döner.
            </p>
          </div>

          {/* Operand 3 */}
          <div className="p-4 bg-slate-950 border border-rose-900/60 rounded-lg space-y-2">
            <div className="text-rose-400 font-bold uppercase tracking-wider text-xs">
              3. İşlenen (Yanlış İse)
            </div>
            <div className="text-base text-rose-300 font-semibold">
              &quot;Sınıfta Kaldı&quot;
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Koşul <code className="text-rose-300">false</code> olduğunda iki nokta üst üste (<code className="text-amber-300">:</code>) sonrasındaki değer döner.
            </p>
          </div>
        </div>

        {/* Interactive Sandbox Test */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-200">
              İnteraktif Ternary Test Tezgahı:
            </span>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">
                Puan: <strong className="text-amber-300">{testScore}</strong>
              </span>
              <span className="text-slate-400">
                Eşik: <strong className="text-slate-200">{threshold}</strong>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={testScore}
              onChange={(e) => setTestScore(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Live Trace */}
          <div className="p-3 bg-slate-900 rounded font-mono text-xs sm:text-sm text-slate-200 space-y-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-purple-400">String</span> sonuc = (
              <span className={conditionResult ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {testScore} &gt; {threshold}
              </span>
              ) ? &quot;
              <span className={conditionResult ? 'text-emerald-300 bg-emerald-950/60 px-1 py-0.5 rounded font-bold' : 'text-slate-500'}>
                Sınıfı Geçti
              </span>
              &quot; : &quot;
              <span className={!conditionResult ? 'text-rose-300 bg-rose-950/60 px-1 py-0.5 rounded font-bold' : 'text-slate-500'}>
                Sınıfta Kaldı
              </span>
              &quot;;
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2 pt-1 border-t border-slate-800">
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              <span>Dönen Değer: </span>
              <span className={`font-bold ${conditionResult ? 'text-emerald-400' : 'text-rose-400'}`}>
                &quot;{evaluationResult}&quot;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: if-else vs Ternary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">Klasik if-else Yaklaşımı</h4>
            <span className="text-xs text-slate-500 font-mono">8 Satır Kod</span>
          </div>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
            <pre>{`String sonuc;
if (ortalama > 60) {
    sonuc = "Sınıfı Geçti";
} else {
    sonuc = "Sınıfta Kaldı";
}`}</pre>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Basit durum atamalarında gereksiz satır kalabalığı yaratır ve değişkenin ilk değer
            ataması ayrı bir satırda yapılmak zorunda kalabilir.
          </p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-amber-400">Ternary Operatör Yaklaşımı (Ödev Şartı)</h4>
            <span className="text-xs text-amber-400/80 font-mono">1 Satır Kod</span>
          </div>
          <div className="p-3 bg-slate-950 rounded border border-amber-900/40 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
            <pre className="text-amber-200">{`// Tek satırda hem tanımlama hem koşullu atama:
String sonuc = (ortalama > 60) 
    ? "Sınıfı Geçti" 
    : "Sınıfta Kaldı";`}</pre>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hem değişken tanımlanır hem de koşula göre anında değer atanır (<code className="text-amber-300">inline initialization</code>).
            Hocanızın ternary operator şartı koymasının ana sebebi bu şık sözdizimini öğretmektir.
          </p>
        </div>
      </div>
    </section>
  );
};
