import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ezo_task';
  constructor(private router: Router) {}
  ngOnInit(): void {}
  goToShopping() {
    this.router.navigate(['shopping-list']);
  }
  goToAtm() {
    this.router.navigate(['atm']);
  }
}
