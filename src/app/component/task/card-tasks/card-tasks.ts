import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-tasks',
  imports: [],
  templateUrl: './card-tasks.html',
  styleUrl: './card-tasks.css',
})
export class CardTasks {
  @Input({required: true}) task!: string

  isEditing = false;
  editText = '';
}
