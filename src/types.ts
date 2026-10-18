export interface CourseGrade {
  id: string;
  name: string;
  code: string;
  iconName: string;
  score: number;
  description: string;
}

export type PresetType = 'success' | 'threshold' | 'fail' | 'high_honors';

export interface Preset {
  id: PresetType;
  title: string;
  subtitle: string;
  scores: Record<string, number>;
}

export interface TerminalLog {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'success' | 'error' | 'signature';
  text: string;
}
