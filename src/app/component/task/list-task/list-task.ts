import { Component } from '@angular/core';
import { CardTasks } from "../card-tasks/card-tasks";

@Component({
  selector: 'app-list-task',
  imports: [CardTasks],
  templateUrl: './list-task.html',
  styleUrl: './list-task.css',
})
export class ListTask {

}
