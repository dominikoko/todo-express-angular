import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todo = {
    id:'',
    userId:'',
    title: '',
    task: ''
  };
  message = '';
  userIdentity:any
  todos: any;
  editTodo: Todo;
  currentTodo = null;
  currentIndex = -1;
  submitted = false;
  constructor(private todoListService: TodoService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.userIdentity = sessionStorage.getItem('userIdentity');
    }
    this.getTodoList();
 
  }

  edit(todo) {
    this.editTodo = todo
  }

// get todo list
  getTodoList(){ 
    this.todoListService.getAll(this.userIdentity).subscribe(
      data =>{
        this.todos = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    )
  }
 
// create new item for TodoList
  createTask(){
    const data = {
      title: this.todo.title,
      task: this.todo.task,
      userIdentity: this.userIdentity
    };
    this.todoListService.create(data).subscribe(
      response =>{
        console.log(response);
        this.submitted = true;
        this.getTodoList();
      },
      error =>{
        console.log(error);
      }
      );
      }
// New empty task ready to be send to the server
      newTask(){
        this.submitted = false;
        this.todo = {
          id:'',
          title: '',
          task: '',
          userId:''
        };
  }
// updating task
  updateTask(todoId:String) {
    if (this.editTodo) {
      this.todoListService.update(todoId, this.editTodo).subscribe(response => {
        console.log(response);
        this.message = 'The tutorial was updated successfully!';
        this.getTodoList();
      },
      error => {
        console.log(error);
      
      this.editTodo = undefined
    });
    }
  }

  deleteTask(todoId: String) {
    this.todoListService.delete(todoId)
      .subscribe(
        response => {
          console.log(response);
          this.getTodoList();
        },
        error => {
          console.log(error);
        });
  }



}

