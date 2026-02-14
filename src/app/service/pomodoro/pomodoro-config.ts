import { Injectable } from '@angular/core';
import { TimerConfig } from '../../model/timerConfigModel';
import { BehaviorSubject } from 'rxjs';

export enum TimerState {
  STUDY = 'study',
  BREAK = 'break',
  IDLE = 'idle'
}

@Injectable({
  providedIn: 'root',
})
export class PomodoroConfig {
  private defaultConfig: TimerConfig = {
    studyMinutes: 25,
    breakMinutes: 5,
    totalCycles: 4,
    isManualMode: true,
    goalHours: 2,
    goalMinutes: 30
  }

  private configSubject = new BehaviorSubject<TimerConfig>(this.loadConfig())
  public config$ = this.configSubject.asObservable()

  // Controle do ciclo atual
  private currentCycleSubject = new BehaviorSubject<number>(0)
  public currentCycle$ = this.currentCycleSubject.asObservable()

  // Estado do timer (estudo, pausa ou parado)
  private timerStateSubject = new BehaviorSubject<TimerState>(TimerState.IDLE)
  public timerState$ = this.timerStateSubject.asObservable()

  getConfig(): TimerConfig {
    return this.configSubject.value
  }

  updateConfig(config: Partial<TimerConfig>): void {
    const newConfig = { ...this.configSubject.value, ...config }
    this.configSubject.next(newConfig)
    this.saveConfig(newConfig)
  }

  getCurrentCycle(): number {
    return this.currentCycleSubject.value
  }

  incrementCycle(): void {
    const current = this.currentCycleSubject.value
    const total = this.configSubject.value.totalCycles
    
    if (current < total) {
      this.currentCycleSubject.next(current + 1)
    }
  }

  resetCycles(): void {
    this.currentCycleSubject.next(0)
    this.timerStateSubject.next(TimerState.IDLE)
  }

  getTimerState(): TimerState {
    return this.timerStateSubject.value
  }

  setTimerState(state: TimerState): void {
    this.timerStateSubject.next(state)
  }

  isLastCycle(): boolean {
    return this.currentCycleSubject.value >= this.configSubject.value.totalCycles
  }

  private loadConfig(): TimerConfig {
    const saved = localStorage.getItem('timerConfig')
    return saved ? JSON.parse(saved) : this.defaultConfig
  }

  private saveConfig(config: TimerConfig): void {
    localStorage.setItem('timerConfig', JSON.stringify(config))
  }
}
