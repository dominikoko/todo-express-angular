import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  info: any;
  userInfo: any;
  content: string;
  errorMessage: string;
 
  constructor(private userService: UserService,  private token: TokenStorageService) { }
 
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
    this.info = {
      token: this.token.getToken(),
    };
  }
  logout(){
    this.token.signOut(),
    window.location.reload();
  } 
}
