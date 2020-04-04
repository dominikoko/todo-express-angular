import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo: any;
  content: string;
  errorMessage: string;
 
  constructor(private userService: UserService) { }
 
  ngOnInit() {
    this.userService.getUserContent().subscribe(
      data => {
        this.userInfo = {
          username: data.user.username,
          email: data.user.email,
        };
        this.content = data.description;
      },
      error => {
        this.errorMessage = `${error.status}: ${error.error}`;
      }
    );
  }
}