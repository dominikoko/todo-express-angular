import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:any = {};
  signUpSuccessed = false;
  signUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
   

    this.authService.registration(this.form).subscribe(
      data =>{
        console.log(data);
        this.signUpSuccessed = true;
        this.signUpFailed = false;
      },
      err =>{
        console.log(err);
        this.errorMessage = err.error;
        this.signUpFailed = true;
      }
    );
  }

}
