import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todo = {
    userId:'',
    title: '',
    task: ''
  };
  userIdentity:any
  todos: any;
  currentTodo = null;
  currentIndex = -1;
  submitted = false;
  constructor(private todoListService: TodoService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.userIdentity = sessionStorage.getItem('userIdentity');
    }
    this.getTodoList();
  }

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
  refreshList() {
    this.getTodoList();
    this.currentTodo = null;
    this.currentIndex = -1;
  }
  setActiveTodo(todo, index) {
    this.currentTodo = todo;
    this.currentIndex = index;
  }

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
      },
      error =>{
        console.log(error);
      }
      );
      }
      newTask(){
        this.submitted = false;
        this.todo = {
          title: '',
          task: '',
          userId:''
        };
  }
}
