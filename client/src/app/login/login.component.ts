import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthLoginInfo } from '../helpers/auth-login-info';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any;  
  userId:any;
  form: any = {};
  isLoggedIn = false;
  loginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(){
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUsername();
      this.userId = this.tokenStorage.getUserId();
    }
  }

  onSubmit()
  { console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.login(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveUserId(data.id);

        this.loginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.error.reason;
        this.loginFailed = true;
      }
    );
  
  }
  reloadPage(){
    window.location.reload();
  }
}
