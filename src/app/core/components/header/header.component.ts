import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenVerif: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  checkLogedIn(): boolean {
    const tokenChecker = localStorage.getItem('auth');
    if (tokenChecker) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('auth');
    this.router.navigateByUrl('/auth/login');
  }

}
