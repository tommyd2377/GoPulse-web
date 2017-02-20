import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterModule, 
  Routes, 
  CanActivate,
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'welcomescreen',
  templateUrl: './welcomescreen.component.html',
  styleUrls: ['./welcomescreen.component.css']
})

export class WelcomescreenComponent {

  constructor(public router: Router) {}
  
  signUp() {
    this.router.navigate(['/signup']); 
  }

  login() {
    this.router.navigate(['/login']); 
  }
}
