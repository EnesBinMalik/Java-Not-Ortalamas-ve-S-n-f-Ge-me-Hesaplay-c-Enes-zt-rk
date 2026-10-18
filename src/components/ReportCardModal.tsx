import React from 'react';
import {
  X,
  Printer,
  Award,
  CheckCircle2,
  XCircle,
  FileCheck,
} from 'lucide-react';
import { CourseGrade } from '../types';

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseGrade[];
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  isOpen,
  onClose,
  courses,
}) => {
  if (!isOpen) return null;

  const totalSum = courses.reduce((acc, curr) => acc + curr.score, 0);
  const average = totalSum / 6.0;
  const isPassed = average > 60;
  const resultText = isPassed ? 'Sınıfı Geçti' : 'Sınıfta Kaldı';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm print:p-0 print:bg-white">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Top Controls (Hidden on print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-white">
              Resmi Ödev Teslim Belgesi &amp; Not Raporu
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate / Homework Card */}
        <div id="printable-report" className="space-y-6 print:space-y-4">
          {/* Institution Header */}
          <div className="text-center pb-6 border-b border-slate-800 print:border-neutral-300">
            <div className="text-xs uppercase tracking-widest text-amber-400 print:text-neutral-600 font-semibold mb-1">
              Java 101 Programlama Eğitimi · Bitirme Ödevi
            </div>
            <h2 className="text-2xl font-bold text-white print:text-black tracking-tight">
              DERS NOT ORTALAMASI VE GEÇME RAPORU
            </h2>
            <div className="flex items-center justify-center gap-3 text-xs text-slate-400 print:text-neutral-500 mt-2">
              <span>Program: Java SE (JDK 21)</span>
              <span>·</span>
              <span>Operatör: Ternary Operator (? :)</span>
              <span>·</span>
              <span>Tarih: {new Date().toLocaleDateString('tr-TR')}</span>
            </div>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 print:bg-neutral-50 print:border-neutral-300 text-xs">
            <div>
              <span className="text-slate-400 print:text-neutral-500 block">Öğrenci / Geliştirici</span>
              <span className="text-base font-bold text-white print:text-black">Enes Öztürk</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-neutral-500 block">Ödev Konusu</span>
              <span className="font-semibold text-slate-200 print:text-black">
                6 Dersin Puanları, Aritmetik Ortalama &amp; Ternary ile Sınıf Geçme
              </span>
            </div>
            <div>
              <span className="text-slate-400 print:text-neutral-500 block">Ders Kodları &amp; Sayısı</span>
              <span className="font-mono text-slate-300 print:text-black">6 Zorunlu Temel Ders</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-neutral-500 block">Karar Mekanizması</span>
              <span className="font-mono text-amber-400 print:text-black font-semibold">
                (ortalama &gt; 60) ? &quot;Sınıfı Geçti&quot; : &quot;Sınıfta Kaldı&quot;
              </span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="border border-slate-800 print:border-neutral-300 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 print:bg-neutral-100 text-slate-300 print:text-black border-b border-slate-800 print:border-neutral-300 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-4">#</th>
                  <th className="py-2.5 px-4">Ders Adı</th>
                  <th className="py-2.5 px-4">Kod</th>
                  <th className="py-2.5 px-4 text-right">Puan</th>
                  <th className="py-2.5 px-4 text-center">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 print:divide-neutral-200">
                {courses.map((course, idx) => (
                  <tr key={course.id} className="hover:bg-slate-950/40 print:hover:bg-transparent">
                    <td className="py-2.5 px-4 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-medium text-white print:text-black">
                      {course.name}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-400 print:text-neutral-600">
                      {course.code}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-amber-300 print:text-black tabular-nums">
                      {course.score}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span
                        className={`text-xs font-semibold ${
                          course.score >= 50
                            ? 'text-emerald-400 print:text-emerald-700'
                            : 'text-rose-400 print:text-rose-700'
                        }`}
                      >
                        {course.score >= 50 ? 'Geçer' : 'Kritik'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Results Summary & Verdict Seal */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 print:border-neutral-300 print:bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs text-slate-400 print:text-neutral-600">
                Toplam Puan: <strong className="text-white print:text-black font-mono">{totalSum.toFixed(2)}</strong>
              </div>
              <div className="text-xs text-slate-400 print:text-neutral-600">
                Aritmetik Ortalama: <strong className="text-amber-400 print:text-black font-mono text-base">{average.toFixed(2)}</strong>
              </div>
              <div className="text-xs font-mono text-slate-500 print:text-neutral-600">
                Formül: ({courses.map((c) => c.score).join(' + ')}) / 6.0
              </div>
            </div>

            {/* Official Status Stamp */}
            <div
              className={`px-6 py-3 rounded-xl border-2 text-center uppercase tracking-wider font-extrabold text-sm sm:text-base flex items-center gap-2 ${
                isPassed
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-950/30 print:text-emerald-700 print:border-emerald-700'
                  : 'border-rose-500 text-rose-400 bg-rose-950/30 print:text-rose-700 print:border-rose-700'
              }`}
            >
              {isPassed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 print:text-emerald-700" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 print:text-rose-700" />
              )}
              <span>{resultText}</span>
            </div>
          </div>

          {/* Signature Zone */}
          <div className="pt-6 border-t border-slate-800 print:border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
            <div className="text-slate-500 print:text-neutral-600 font-mono text-center sm:text-left">
              <div>Doğrulama Kodu: JAVA-EOZTURK-101-ASSIGNMENT</div>
              <div>Ternary Operator Şartı Sağlandı: EVET</div>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-slate-400 print:text-neutral-600 mb-1">Ödev Sahibi / İmza</div>
              <div className="font-serif italic text-lg text-amber-400 print:text-black font-bold">
                Enes Öztürk
              </div>
              <div className="text-xs text-slate-500 print:text-neutral-500">
                Yazılım Geliştirici &amp; Öğrenci
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
