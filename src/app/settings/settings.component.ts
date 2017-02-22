import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent {

  constructor(private router: Router) { }

  about() {
    this.router.navigate(['/about']); 
  }

   contact() {
    this.router.navigate(['/contact']); 
  }

  terms() {
    this.router.navigate(['/terms']); 
  }

  privacy() {
    this.router.navigate(['/privacy']); 
  }

  profile() {
    this.router.navigate(['/profile']); 
  }

}
