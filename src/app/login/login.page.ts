import { Component, OnInit } from '@angular/core';
import { loginService } from '../services/login.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string = 'testuser3@abc.com';
  public password: string = '123456789';

  constructor(
    public loginService: loginService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.logearse(this.email, this.password).then(async (res)=>{
      console.log(res.data.token)
 
        await Preferences.set({
          key: 'token',
          value: res.data.token,
        });
      this.onQuienSoy();
    })
    }

  async onQuienSoy() {
    const { value } = await Preferences.get({ key: 'token' });
    if(value)
    this.loginService.QsoyYo(value).then((res)=>{
      console.log("Este soy yo ", res);
    })
  }
  }

