import { Component, OnInit } from '@angular/core';
import { PomodoroConfig } from '../../../service/pomodoro/pomodoro-config';
import { FormsModule } from '@angular/forms';
import { TimerConfig } from '../../../model/timerConfigModel';

@Component({
  selector: 'app-manual',
  imports: [FormsModule],
  templateUrl: './manual.html',
  styleUrl: './manual.css',
})
export class Manual implements OnInit {
    config: TimerConfig = {
    studyMinutes: 25,
    breakMinutes: 5,
    totalCycles: 4,
    isManualMode: true
  }

constructor(private configService: PomodoroConfig) {}

  ngOnInit(): void {
    this.config = { ...this.configService.getConfig() }
  }

  onSave(): void {
    this.configService.updateConfig(this.config)
    alert('Configuração salva!')
  }
}
