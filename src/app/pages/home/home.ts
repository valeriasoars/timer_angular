import { Component } from '@angular/core';
import { Header } from "../../component/header/header";
import { Timer } from "../../component/timer/timer";
import { CicloTask } from "../../component/task/ciclo-task/ciclo-task";

@Component({
  selector: 'app-home',
  imports: [Header, Timer,  CicloTask],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
