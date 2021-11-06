import { Component, NgZone, OnInit } from '@angular/core';

import Sortable from 'sortablejs';

import tasks from './tasks.json'

@Component({
  selector: 'dashboard-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {

  tasks: any;

  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
    this.tasks = tasks
    this.enableSortableTasks()
  }

  enableSortableTasks() {
    this.zone.runOutsideAngular(() => {
      Sortable.create(document.getElementById('tasks'), {
        draggable: ".task-item",
        filter: "label.checkbox",
        preventOnFilter: false,
        animation: 200,
    
        ghostClass: "bgc-yellow-l1",  // Class name for the drop placeholder
        chosenClass: "",  // Class name for the chosen item
        dragClass: "",  // Class name for the dragging item
      })
    })
  }

}
