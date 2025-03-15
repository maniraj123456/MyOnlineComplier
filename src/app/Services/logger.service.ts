import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  logIn()
  {
    console.log("User Logged In");
    
  }
}
