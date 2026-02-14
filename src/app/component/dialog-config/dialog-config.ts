import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Meta } from "../config-timer/meta/meta";
import { Manual } from "../config-timer/manual/manual";
import { ListTask } from "../task/list-task/list-task";
import { PomodoroConfig } from '../../service/pomodoro/pomodoro-config';

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
export class DialogConfig implements OnInit{

  @Output() close = new EventEmitter<void>()
  ismanual: boolean = true

  onCancel(){
    this.close.emit()
  }

  itensNav: NavItem[] = [
    {  route: 'Definir ciclos de estudo', key: 'ciclos' },
    {  route: 'Definir metas de estudos',  key: 'metas'  },
    {  route: 'Tarefas',  key: 'tarefas'},
    {  route: 'Tema',  key: 'tema'  },
  ]

  activeView: 'menu' | 'metas' | 'ciclos' | 'tarefas' | 'tema' = 'menu'
  isConfigOpen = true;

onSelect(item: NavItem) {
  this.isConfigOpen = false
  this.activeView = item.key
}

closeAll() {
  this.isConfigOpen = false
}

constructor(private configService: PomodoroConfig) {}
 ngOnInit(): void {
    const config = this.configService.getConfig()
    this.ismanual = config.isManualMode
  }

  setManual(): void {
    this.ismanual = true
    this.configService.updateConfig({ isManualMode: true })
  }

  setMeta(): void {
    this.ismanual = false
    this.configService.updateConfig({ isManualMode: false })
  }
}
