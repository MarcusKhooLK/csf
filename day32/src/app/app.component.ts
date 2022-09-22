import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild('todo')
  todoComp!: TodoComponent

  @ViewChildren(TodoComponent)
  todoComps!: QueryList<TodoComponent>

  value : number = 3
  numList: number[] = []

  ngOnInit(): void {
    console.info(">>>> todoComp: ", this.todoComp)
    for(let i = 0; i < 5; i++) {
      this.numList.push(Math.floor(Math.random() * 100))
    }
  }

  ngAfterViewInit(): void {
    console.info(">>>> todoComp: ", this.todoComp)
    console.info(">>>>> todoLists: ", this.todoComps)
  }

  randomize() {
    this.value = Math.floor(Math.random() * 100)
    // create new array
    const tmp: number[] = [...this.numList, this.value]
    this.numList = tmp
  }

  saveTodo() {
    console.info(">>>>>> saveTodo")
    const todo = this.todoComp.getValues()
    console.info(">>>>> todos: ", todo)
  }

}
