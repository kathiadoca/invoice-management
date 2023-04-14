import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
import { Login } from 'src/app/model/login.interface';
import { ResponseLogin } from 'src/app/model/response-login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router){}
  loginError: string = '';
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required) 
  })

  onSubmit() {
    // Aquí iría la lógica para enviar la información del formulario al servidor
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  onclick(){

  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      //this.router.navigate(['admin-order']);
    }
  }
  
  onLogin(loginData: Partial<{ usuario: string | null; password: string | null; }>) {
    const login: Login = loginData as Login;
    this.apiService.login(login).subscribe(data=>{
      let responseAuth: ResponseLogin = data;
      console.log('*--->', responseAuth);
      if(responseAuth.message === 'Ok'){
        localStorage.setItem("token", responseAuth.data.token)
        this.router.navigate(['admin-order'])
      } 
    },
    error => {
      if (error.status === 403) {
        this.loginError = 'Contraseña inválida';
        setTimeout(() => {
          this.loginError = '';
        }, 2000);
      }
      if (error.status === 404) {
        this.loginError = 'Usuario inválido';
        setTimeout(() => {
          this.loginError = '';
        }, 2000);
      }
    }
    );
  }
}
