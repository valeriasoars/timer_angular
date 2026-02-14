import { ChangeDetectorRef, Component } from '@angular/core';
import { PomodoroConfig, TimerState } from '../../../service/pomodoro/pomodoro-config';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimerConfig } from '../../../model/timerConfigModel';

@Component({
  selector: 'app-ciclo-task',
  imports: [FormsModule, NgClass],
  templateUrl: './ciclo-task.html',
  styleUrl: './ciclo-task.css',
})
export class CicloTask {
  config!: TimerConfig
  currentCycle = 0
  timerState: TimerState = TimerState.IDLE
  
  private cycleSubscription?: Subscription
  private stateSubscription?: Subscription
  private configSubscription?: Subscription

  constructor(private configService: PomodoroConfig,  private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.config = this.configService.getConfig()
    
    // Observa mudanças no ciclo atual
    this.cycleSubscription = this.configService.currentCycle$.subscribe(cycle => {
      this.currentCycle = cycle
      this.cdr.detectChanges()
    })
    
    // Observa mudanças no estado do timer
    this.stateSubscription = this.configService.timerState$.subscribe(state => {
      this.timerState = state
       this.cdr.detectChanges()
    });
    
    // Observa mudanças na configuração
    this.configSubscription = this.configService.config$.subscribe(config => {
      this.config = config
       this.cdr.detectChanges()
    })
  }

  ngOnDestroy(): void {
    this.cycleSubscription?.unsubscribe()
    this.stateSubscription?.unsubscribe()
    this.configSubscription?.unsubscribe()
  }

  get cyclesArray() {
    return Array.from({ length: this.config.totalCycles })
  }
  
  get statusText(): string {
    if (this.timerState === TimerState.STUDY) {
      return `Ciclo ${this.currentCycle + 1} de ${this.config.totalCycles} - Estudando`
    } else if (this.timerState === TimerState.BREAK) {
      return `Pausa do ciclo ${this.currentCycle}`
    }
    return 'Pronto para começar'
  }
}
