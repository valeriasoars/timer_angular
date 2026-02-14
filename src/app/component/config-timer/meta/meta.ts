import { Component, OnInit } from '@angular/core';
import { PomodoroConfig } from '../../../service/pomodoro/pomodoro-config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meta',
  imports: [FormsModule],
  templateUrl: './meta.html',
  styleUrl: './meta.css',
})
export class Meta implements OnInit{
goalHours: number = 2
  goalMinutes: number = 30
  cycles: number = 6
  breakMinutes: number = 5

  constructor(private configService: PomodoroConfig) {}

  ngOnInit(): void {
    const config = this.configService.getConfig()
    this.goalHours = config.goalHours || 2
    this.goalMinutes = config.goalMinutes || 30
    this.cycles = config.totalCycles
    this.breakMinutes = config.breakMinutes
  }

  get cycleMinutes(): number {
    const totalMinutes = (this.goalHours * 60) + this.goalMinutes
    const totalBreakTime = (this.cycles - 1) * this.breakMinutes
    const studyTime = totalMinutes - totalBreakTime
    return Math.floor(studyTime / this.cycles)
  }

  get totalTimeWithBreaks(): string {
    const totalMinutes = (this.goalHours * 60) + this.goalMinutes
    const hours = Math.floor(totalMinutes / 60)
    const mins = totalMinutes % 60
    return `${hours}h ${mins}min`
  }

  onSave(): void {
    this.configService.updateConfig({
      studyMinutes: this.cycleMinutes,
      breakMinutes: this.breakMinutes,
      totalCycles: this.cycles,
      goalHours: this.goalHours,
      goalMinutes: this.goalMinutes
    });
    alert('Meta configurada!')
  }
}
