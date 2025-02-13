
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateHeader();
  }

  updateHeader(): void {
    this.isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    this.userName = sessionStorage.getItem('userName');
  }

  logout(): void {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userName');
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/']);

    setTimeout(() => {
      this.updateHeader();
    }, 0);
  }
}
