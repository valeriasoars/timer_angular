import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Manual } from "./manual/manual";
import { Meta } from "./meta/meta";

@Component({
  selector: 'app-config-timer',
  imports: [CommonModule, Manual, Meta],
  templateUrl: './config-timer.html',
  styleUrl: './config-timer.css',
})
export class ConfigTimer {
  @Output() close = new EventEmitter<void>()
  ismanual = true

  setManual(){
    this.ismanual = true
  }

  setMeta(){
    this.ismanual = false
  }

  onCancel(){
    this.close.emit()
  }


}
