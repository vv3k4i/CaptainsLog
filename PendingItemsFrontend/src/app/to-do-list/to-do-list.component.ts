import { Component, OnInit } from '@angular/core';
import { ToDoServices } from '../Server/todo.service'
import { ToDo, IToDo } from './todo';

import 'rxjs/add/operator/do';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  providers: [ToDoServices]
})
export class ToDoListComponent implements OnInit {

  constructor(private _service: ToDoServices) { }

  ngOnInit() {
    
    this._service
    .getToDos()
    .subscribe(todos => {
      this.myTasks = todos.slice(),
      this.myTasksCopy = todos.slice()},
    error => this.errorMessage = <any>error);
  }

  messageValue: string;
  errorMessage: string;
  private currentFilterSetting: boolean = false;

  private myTasksCopy: IToDo[] = [];
  private tempTasks: IToDo[] = [];
  myTasks: IToDo[] = [];
  /*get todos(): IToDo[]{

      return this.myTasks;
  }
  set todos(value: IToDo[]) {

      this.myTasks = value;
      this.myTasksCopy = Object.assign({}, value);
  }*/

  showInProgres(): void {

    if (this.currentFilterSetting == false) {

      this.myTasks = this.myTasks.slice().filter(x => x.IsComplete == this.currentFilterSetting);
    }
    else {
      this.tempTasks.length = 0;
      this.myTasksCopy.slice().forEach(task => {
        var match = this.myTasks.find(t => t.Id == task.Id );
        if (match != null)
        {
            this.tempTasks.push(match);
        }
        else
        {
          this.tempTasks.push(task);
        }
      })
      this.myTasks = this.tempTasks.slice();
      this.myTasksCopy = this.tempTasks.slice();
    }
    this.toggleVisiblity();
  }

  toggleVisiblity(): void {

    this.currentFilterSetting = !this.currentFilterSetting;
  }

  updateDb(id: number) {

    let task = this.myTasks.find(x => x.Id == id);
    console.log("update entry : " + task.Id);
    
    this._service.updateComment(task).subscribe();
  }

  clearCompleted(): void {
    
      this.myTasks.slice(0).forEach(element => {
        if (element.IsComplete) {

          this._service.deleteTodo(element.Id)
          .subscribe(
              (error: any) => this.errorMessage = <any>error
          );

          this.myTasks.splice(this.myTasks.indexOf(element), 1);
          this.myTasksCopy.splice(this.myTasks.indexOf(element), 1);
        }
      });
  }

  deleteEntry(id: number): void {
    
    let index = this.myTasks.findIndex(x => x.Id == id);
    this.myTasks.splice(index, 1);
    this.myTasksCopy.splice(index, 1);
    console.log("delete entry: " + id);
    
    this._service.deleteTodo(id)
    .subscribe();
  }

  addToDo() {
    
    let dummyToDo = new ToDo();
    this._service.createToDo(dummyToDo).subscribe(todo => {
      this.myTasks.push(todo)
      this.myTasksCopy.push(todo);
      console.log("Add entry: " + todo.Id);
    });  
  }
}
