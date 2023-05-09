import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class loginService {

  constructor() { }
  logearse = async (email: string,password: string) => {
    const options = {
      url: environment.backend + 'users/login/',
      headers: {  
       accept: 'application/json',
       'Content-Type': 'application/json',
      },
      data: { email: email, password: password },
    };
  
    const response: HttpResponse = await Http.post(options);
    return response;
  };

  // Example of a GET request
QsoyYo = async (token: string) => {
  const options = {
    url: environment.backend + 'whoAmI',
    headers: {  
     accept: 'application/json',
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token
    },
  }
  const response: HttpResponse = await Http.get(options);
  return response;
  // or...
  // const response = await Http.request({ ...options, method: 'GET' })
};
}
