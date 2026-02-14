export interface TimerConfig {
  studyMinutes: number;
  breakMinutes: number;
  totalCycles: number;
  isManualMode: boolean;
  
  goalHours?: number;
  goalMinutes?: number;
}