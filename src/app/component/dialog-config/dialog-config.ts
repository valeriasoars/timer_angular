import { Component, EventEmitter, Output } from '@angular/core';
import { Meta } from "../config-timer/meta/meta";
import { Manual } from "../config-timer/manual/manual";
import { ListTask } from "../task/list-task/list-task";

interface NavItem {
  route?: string;
  key: 'ciclos' | 'metas' | 'tarefas' | 'tema' | 'menu';
}


@Component({
  selector: 'app-dialog-config',
  imports: [Meta, Manual, ListTask],
  templateUrl: './dialog-config.html',
  styleUrl: './dialog-config.css',
})
export class DialogConfig {

  @Output() close = new EventEmitter<void>()

  onCancel(){
    this.close.emit()
  }

  itensNav: NavItem[] = [
    {  route: 'Definir ciclos de estudo', key: 'ciclos' },
    {  route: 'Definir metas de estudos',  key: 'metas'  },
    {  route: 'Tarefas',  key: 'tarefas'},
    {  route: 'Tema',  key: 'tema'  },
  ]

  activeView: 'menu' | 'metas' | 'ciclos' | 'tarefas' | 'tema' = 'menu';
  isConfigOpen = true;

onSelect(item: NavItem) {
  this.isConfigOpen = false;
  this.activeView = item.key;
}

closeAll() {
  this.isConfigOpen = false;
}
}
