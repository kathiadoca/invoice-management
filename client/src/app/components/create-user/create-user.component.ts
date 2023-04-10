import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/model/response-login.interface';
import { UserDto } from 'src/app/model/user.dto';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router){}
  crearUser = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onAddUser(){

  }
  ngOnInit(): void {
    
  }

  postForm(user: Partial<{ name: string | null; email: string | null; country: string | null; city: string | null; username: string | null; password: string | null;}>){
    const userDto: UserDto = user as UserDto;
    this.apiService.signup(userDto).subscribe((data)=>{
      let responseAuth: ResponseLogin = data;
      console.log(data)
      if(responseAuth.responseCode === 201){
        this.router.navigate(['login'])
      }
    });
  }
}
