import { Component } from '@angular/core';
import { PomodoroConfig } from '../../../service/pomodoro/pomodoro-config';
import { PomodoroConfigModel } from '../../../model/pomodoro-config-model';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manual',
  imports: [FormsModule],
  templateUrl: './manual.html',
  styleUrl: './manual.css',
})
export class Manual {
  config: PomodoroConfigModel 

  constructor(private configService: PomodoroConfig){
     this.config = this.configService.getConfig();
  }

  
  onSave() {
    this.configService.saveConfig(this.config);
  }
}
