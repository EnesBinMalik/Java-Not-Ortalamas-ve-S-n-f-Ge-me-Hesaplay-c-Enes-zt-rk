/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { GradeCalculator } from './components/GradeCalculator';
import { JavaTerminal } from './components/JavaTerminal';
import { CodeViewer } from './components/CodeViewer';
import { TernaryExplainer } from './components/TernaryExplainer';
import { ReportCardModal } from './components/ReportCardModal';
import { Footer } from './components/Footer';
import { INITIAL_COURSES } from './data/courses';
import { CourseGrade } from './types';
import { JAVA_TEMPLATES } from './data/javaCodeTemplates';

export default function App() {
  const [courses, setCourses] = useState<CourseGrade[]>(INITIAL_COURSES);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hesaplayici');

  const handleUpdateScore = (id: string, score: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, score } : c))
    );
  };

  const handleApplyPreset = (scores: Record<string, number>) => {
    setCourses((prev) =>
      prev.map((c) => ({
        ...c,
        score: scores[c.id] !== undefined ? scores[c.id] : c.score,
      }))
    );
  };

  const handleRandomizeScores = () => {
    setCourses((prev) =>
      prev.map((c) => ({
        ...c,
        score: Math.floor(Math.random() * 55) + 45, // realistic marks between 45 and 99
      }))
    );
  };

  const handleResetScores = () => {
    setCourses(INITIAL_COURSES);
  };

  const handleDownloadJava = () => {
    const defaultTemplate = JAVA_TEMPLATES[0];
    const blob = new Blob([defaultTemplate.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = defaultTemplate.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendToTerminal = () => {
    handleNavigate('terminal');
  };

  // Build current scores map
  const currentScoresMap = courses.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.id] = curr.score;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <Header
        onOpenReport={() => setIsReportOpen(true)}
        onDownloadJava={handleDownloadJava}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 1. Grade Calculator & Live Ternary Outcome */}
        <GradeCalculator
          courses={courses}
          onUpdateScore={handleUpdateScore}
          onApplyPreset={handleApplyPreset}
          onRandomizeScores={handleRandomizeScores}
          onResetScores={handleResetScores}
          onSendToTerminal={handleSendToTerminal}
        />

        {/* 2. Interactive Java Terminal Simulator */}
        <JavaTerminal
          currentScores={currentScoresMap}
          courses={courses}
        />

        {/* 3. Java Source Code Viewer & Downloader */}
        <CodeViewer />

        {/* 4. Ternary Operator Educational Deep-Dive */}
        <TernaryExplainer />
      </main>

      {/* Printable Report Card Modal */}
      <ReportCardModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        courses={courses}
      />

      {/* Footer */}
      <Footer
        onOpenReport={() => setIsReportOpen(true)}
        onDownloadJava={handleDownloadJava}
      />
    </div>
  );
}
