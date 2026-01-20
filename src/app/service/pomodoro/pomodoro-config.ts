import { Injectable } from '@angular/core';
import { PomodoroConfigModel } from '../../model/pomodoro-config-model';

const STORAGE_KEY = 'pomodoro-config';

@Injectable({
  providedIn: 'root',
})
export class PomodoroConfig {
  private defaultConfig: PomodoroConfigModel = {
    studyMinutes: 24, 
    breakMinutes: 5,
    totalCycles: 4,
  }

  getConfig(): PomodoroConfigModel{
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : this.defaultConfig
  }

  saveConfig(config: PomodoroConfigModel){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }
}
