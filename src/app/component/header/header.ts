import { Component } from '@angular/core';
import { ConfigTimer } from "../config-timer/config-timer";
import { Task } from "../task/task";

@Component({
  selector: 'app-header',
  imports: [ConfigTimer, Task],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen = false
  isConfig = false
  isAddTask = false


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  openConfig(){
    this.isConfig = true
  }

  onClose(){
    this.isConfig = false
  }


  openAddTask(){
    this.isAddTask = true
  }

  onCloseAddTask(){
    this.isAddTask = false
  }

}
