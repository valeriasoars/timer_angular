import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  continue = true
  seconds = 0
  minutes = 0

  pauseOrStart(){
    if(this.continue)
      this.continue = false
    else
      this.continue = true
  }
}
