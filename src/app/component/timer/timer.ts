import { Component } from '@angular/core';
import { PomodoroConfig } from '../../service/pomodoro/pomodoro-config';
import { PomodoroConfigModel } from '../../model/pomodoro-config-model';
import { DialogConfig } from "../dialog-config/dialog-config";

@Component({
  selector: 'app-timer',
  imports: [DialogConfig],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
 minutes = 24;
  seconds = 59;

  isRunning = false;
  isConfig = false;

  currentCycle = 1;
  remainingSeconds = 0;

  config!: PomodoroConfigModel;
  private intervalId: any = null;


  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
  }

  pause(): void {
    this.stop();
  }

  pauseOrStart(): void {
    this.isRunning ? this.pause() : this.start();
  }

  resetTimer(): void {
    this.stop();
  }

  private stop(): void {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }


  openConfig(): void {
    this.isConfig = true
  }

  onClose(): void {
    this.isConfig = false
    this.resetTimer()
  }

}
