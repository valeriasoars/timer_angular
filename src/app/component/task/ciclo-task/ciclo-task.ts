import { Component } from '@angular/core';
import { PomodoroConfig } from '../../../service/pomodoro/pomodoro-config';
import { PomodoroConfigModel } from '../../../model/pomodoro-config-model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ciclo-task',
  imports: [FormsModule, NgClass],
  templateUrl: './ciclo-task.html',
  styleUrl: './ciclo-task.css',
})
export class CicloTask {
    config!: PomodoroConfigModel 
    currentCycle = 1;

    constructor(private configService: PomodoroConfig){
       this.config = this.configService.getConfig();
    }


    get cyclesArray() {
      return Array.from({ length: this.config.totalCycles });
    }
}
