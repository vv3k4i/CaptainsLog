import { Injectable } from "@angular/core";
import { Response } from '@angular/http';

import { IToDo, ToDo } from "../to-do-list/todo";

import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable() 
export class ToDoServices{

    private _url = 'http://localhost:65533/api/todo';
    constructor(private _http: HttpClient) {}

    getToDo(id: number): Observable<IToDo> {

        return this.getToDos()
            .map((todo: IToDo[]) => todo.find(p => p.Id === id));
    }

    getToDos() : Observable<IToDo[]> {
        
        return this._http.get<IToDo[]>(this._url, {headers: this.headers()})
        .catch(this.handleError);
    }

    createToDo(todo: ToDo): Observable<IToDo> {
        
        return this._http.post<IToDo>(this._url, todo, {headers: this.headers()})
        .catch(this.handleError);
    }

    deleteTodo(id: number): Observable<object> {
        
        const url = `${this._url}/${id}`;
        return this._http.delete(url, {headers: this.headers()})
        .catch(this.handleError);
    }

    updateComment(todo: IToDo): Observable<IToDo> {
        
        return this.updateToDo(todo);
    }

    private updateToDo(todo: IToDo): Observable<IToDo> {

        const url = `${this._url}/${todo.Id}`;
        console.log(url)
        return this._http.put(url, todo, {headers: this.headers()})
            .map(() => todo)
            .do(data => console.log('update: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private headers() : HttpHeaders {

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application;/json');
        headers.append("Access-Control-Allow-Origin", "*");

        return headers;
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
