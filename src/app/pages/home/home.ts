import { Component } from '@angular/core';
import { Timer } from "../../component/timer/timer";
import { CicloTask } from "../../component/task/ciclo-task/ciclo-task";

@Component({
  selector: 'app-home',
  imports: [Timer, CicloTask],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
