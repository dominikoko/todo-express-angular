import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserComponent } from './user/user.component';
import { httpInterceptorProviders } from './helpers/auth-interceptor';
import {ReactiveFormsModule} from  '@angular/forms';
import { AlertsModule } from 'angular-alert-module';
import {TodoService} from './services/todo.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TodoListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AlertsModule.forRoot(),

  ],
  providers: [httpInterceptorProviders, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
