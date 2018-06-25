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

  constructor(
    private _service: ToDoServices) { }

  ngOnInit() {

    this.tryConnect();
  }

  tryConnect() {

      this._service
        .getToDos()
        .retry(2)
        .subscribe(
          todos => {
          this.myTasks = todos.slice()
          //this.myTasksCopy = todos.slice()
          },
          error => {
          this.errorMessage = <any>error,
          console.log("true") 
          }//,
          //() => { this.modal.openModal(false),
          //console.log("false") }
        );

      
  }

  messageValue: string;
  errorMessage: string;
  private filterShowCompletedOnly: boolean = false;

  //private myTasksCopy: IToDo[] = [];
  //private tempTasks: IToDo[] = [];
  myTasks: IToDo[] = [];

  showInProgres(): void {

    //this.updateInProgress();
    this.toggleVisiblity();
  }

  /*updateInProgress(): void {

    if (this.filterShowCompletedOnly == false) {
      //show only not completed
      this.myTasks = this.myTasks.slice().filter(x => x.IsComplete == false);
      console.log(this.myTasks);
    }
    else {
      //show all
      this.combineAllUpToDate();
      this.myTasks = this.tempTasks.slice();
      this.myTasksCopy = this.tempTasks.slice();
      console.log(this.myTasks);
    }
  }

  combineAllUpToDate() {
    this.tempTasks.length = 0;
    this.myTasksCopy.slice().forEach(task => {
      var match = this.myTasks.find(t => t.Id == task.Id);
      //use visible element as default to pass around
      if (match != null) {
        this.tempTasks.push(match);
      }
      else {
        this.tempTasks.push(task);
      }
    });
  }*/

  toggleVisiblity(): void {

    this.filterShowCompletedOnly = !this.filterShowCompletedOnly;
  }

  updateTask(id: number) {

    let task = this.myTasks.find(x => x.Id == id);


    /*if (this.filterShowCompletedOnly == true) {

      this.myTasks = this.myTasks.filter(x => x.IsComplete == false);
      console.log(this.myTasks);
    }*/

    this._service.updateComment(task).subscribe();
  }

  clearCompleted(): void {

    this.myTasks.slice(0).forEach(element => {
      if (element.IsComplete) {

        this._service.deleteTodo(element.Id)
          .subscribe(
            (error: any) => this.errorMessage = <any>error
          );

        let index = this.myTasks.findIndex(x => x.Id == element.Id);
        this.myTasks.splice(index, 1);
        //let indexCopy = this.myTasksCopy.findIndex(x => x.Id == element.Id);
        //this.myTasksCopy.splice(indexCopy, 1);
      }
    });
  }

  deleteEntry(id: number): void {

    let index = this.myTasks.findIndex(x => x.Id == id);
    this.myTasks.splice(index, 1);
    //let indexCopy = this.myTasksCopy.findIndex(x => x.Id == id);
    //this.myTasksCopy.splice(indexCopy, 1);
    console.log("delete entry: " + id);

    this._service.deleteTodo(id)
      .subscribe();
  }

  addToDo() {

      let dummyToDo = new ToDo();
      this._service.createToDo(dummyToDo).subscribe(todo => {
      this.myTasks.push(todo)
      //this.myTasksCopy.push(todo);
      console.log("Add entry: " + todo.Id);
    });
  }
}
