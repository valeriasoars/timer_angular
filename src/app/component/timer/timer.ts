import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PomodoroConfig, TimerState } from '../../service/pomodoro/pomodoro-config';
import { DialogConfig } from "../dialog-config/dialog-config";
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  imports: [DialogConfig],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnInit, OnDestroy {
  minutes: string = '25'
  seconds: string = '00'
  isRunning: boolean = false
  isConfig: boolean = false
  
  private totalSeconds: number = 0
  private timerSubscription?: Subscription
  private configSubscription?: Subscription

  constructor(
    private configService: PomodoroConfig,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.configSubscription = this.configService.config$.subscribe(config => {
      if (!this.isRunning) {
        this.initializeTimer()
      }
    })
    
    this.initializeTimer()
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe()
    this.configSubscription?.unsubscribe()
  }

  private initializeTimer(): void {
    const config = this.configService.getConfig()
    const state = this.configService.getTimerState()
    
    if (state === TimerState.STUDY || state === TimerState.IDLE) {
      this.totalSeconds = config.studyMinutes * 60
      this.configService.setTimerState(TimerState.STUDY)
    } else {
      this.totalSeconds = config.breakMinutes * 60
    }
    
    this.updateDisplay()
  }

  pauseOrStart(): void {
    this.isRunning = !this.isRunning
    
    if (this.isRunning) {
      this.startTimer()
    } else {
      this.stopTimer()
    }
  }

  private startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--
        this.updateDisplay()
        this.cdr.detectChanges()
      } else {
        this.onTimerComplete()
      }
    })
  }

  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe()
    }
  }

  private updateDisplay(): void {
    const mins = Math.floor(this.totalSeconds / 60)
    const secs = this.totalSeconds % 60;
    this.minutes = mins.toString().padStart(2, '0')
    this.seconds = secs.toString().padStart(2, '0')
  }

 private onTimerComplete(): void {
    const currentState = this.configService.getTimerState()
    const config = this.configService.getConfig()
    
    if (currentState === TimerState.STUDY) {
      // Ciclo de estudo completo
      this.configService.incrementCycle()
      
      if (this.configService.isLastCycle()) {
        // Todos os ciclos completados
        this.stopTimer();
        this.isRunning = false;
        alert(' Você completou todos os ciclos de estudo!')
        this.configService.resetCycles()
        this.totalSeconds = config.studyMinutes * 60
        this.configService.setTimerState(TimerState.IDLE)
      } else {
        this.configService.setTimerState(TimerState.BREAK)
        this.totalSeconds = config.breakMinutes * 60

      }
    } else if (currentState === TimerState.BREAK) {
      // Pausa completa - volta para estudo automaticamente
      this.configService.setTimerState(TimerState.STUDY)
      this.totalSeconds = config.studyMinutes * 60
    }
    
    this.updateDisplay()
    this.cdr.detectChanges()
  }


  resetTimer(): void {
    this.stopTimer()
    this.isRunning = false
    this.configService.resetCycles()
    this.initializeTimer()
    this.cdr.detectChanges()
  }

  openConfig(): void {
    if (this.isRunning) {
      this.pauseOrStart()
    }
    this.isConfig = true
  }

  onClose(): void {
    this.isConfig = false
  }
}
