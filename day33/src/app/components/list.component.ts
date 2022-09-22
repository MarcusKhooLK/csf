import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../models';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  todos: Todo[] = []

  sub$!: Subscription

  constructor(private toDoSvc: TodoService) { }

  ngOnInit(): void {
    this.sub$ = this.toDoSvc.onNewData.subscribe(data => {
      this.todos = data
    })
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }

  //$event
  // processData(data: Todo[]) {
  //   this.todos = data
  // }

}
