import { CourseGrade, Preset } from '../types';

export const INITIAL_COURSES: CourseGrade[] = [
  {
    id: 'matematik',
    name: 'Matematik',
    code: 'MAT101',
    iconName: 'Calculator',
    score: 85,
    description: 'Analitik düşünme, denklem sistemleri ve fonksiyonlar',
  },
  {
    id: 'fizik',
    name: 'Fizik',
    code: 'FIZ101',
    iconName: 'Atom',
    score: 70,
    description: 'Kuvvet, hareket ve temel dinamik prensipleri',
  },
  {
    id: 'kimya',
    name: 'Kimya',
    code: 'KIM101',
    iconName: 'FlaskConical',
    score: 65,
    description: 'Atom yapısı, periyodik sistem ve kimyasal bağlar',
  },
  {
    id: 'turkce',
    name: 'Türkçe',
    code: 'TUR101',
    iconName: 'BookOpen',
    score: 90,
    description: 'Dil bilgisi, anlam bilgisi ve yazılı anlatım',
  },
  {
    id: 'tarih',
    name: 'Tarih',
    code: 'TAR101',
    iconName: 'Hourglass',
    score: 75,
    description: 'Genel Türk tarihi ve uygarlıklar gelişimi',
  },
  {
    id: 'muzik',
    name: 'Müzik',
    code: 'MUZ101',
    iconName: 'Music',
    score: 80,
    description: 'Müzik teorisi, solfej ve ritim bilgisi',
  },
];

export const PRESETS: Preset[] = [
  {
    id: 'success',
    title: 'Başarılı Öğrenci',
    subtitle: 'Ortalama ~77.5 (Sınıfı Geçti)',
    scores: {
      matematik: 85,
      fizik: 70,
      kimya: 65,
      turkce: 90,
      tarih: 75,
      muzik: 80,
    },
  },
  {
    id: 'threshold',
    title: 'Kritik Eşik (Geçti)',
    subtitle: 'Ortalama 60.17 (Sınıfı Geçti)',
    scores: {
      matematik: 62,
      fizik: 60,
      kimya: 59,
      turkce: 65,
      tarih: 58,
      muzik: 67,
    },
  },
  {
    id: 'fail',
    title: 'Kalan Öğrenci',
    subtitle: 'Ortalama 51.67 (Sınıfta Kaldı)',
    scores: {
      matematik: 45,
      fizik: 50,
      kimya: 55,
      turkce: 60,
      tarih: 48,
      muzik: 52,
    },
  },
  {
    id: 'high_honors',
    title: 'Yüksek Onur',
    subtitle: 'Ortalama 95.00 (Sınıfı Geçti)',
    scores: {
      matematik: 95,
      fizik: 92,
      kimya: 94,
      turkce: 98,
      tarih: 96,
      muzik: 95,
    },
  },
];
