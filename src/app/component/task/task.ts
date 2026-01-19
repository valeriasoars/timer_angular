import { Component, EventEmitter, Output } from '@angular/core';
import { CardTasks } from "./card-tasks/card-tasks";
import { ListTask } from "./list-task/list-task";

@Component({
  selector: 'app-task',
  imports: [ ListTask],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Output() close = new EventEmitter<void>()

  onCancel(){
    this.close.emit()
  }
}
