import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  form!: FormGroup
  todoArrayControl!: FormArray

  constructor(private fb: FormBuilder) { }

  get invalid(): boolean {
    return this.form.invalid
  }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  getValues() {
    return this.form.value
  }

  private createForm():FormGroup {
    this.todoArrayControl = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      todos: this.todoArrayControl
    })
  }

  hasError(controlName: string) {
    return this.form.get(controlName)?.hasError('required')
  }

  processForm() {
    console.info("Form data: ", this.form.value)
  }

  addTodo() {
    const todo = this.fb.group({
      task: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<number>(1, [Validators.min(1), Validators.max(5)])
    })
    this.todoArrayControl.push(todo)
  }

  removeTask(idx:number) {
    this.todoArrayControl.removeAt(idx);
  }

}
