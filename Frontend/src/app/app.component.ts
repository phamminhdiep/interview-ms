import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service'; // Đường dẫn tới AuthService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  constructor(private authService: AuthService,
    private router: Router // << Inject Router
  ) {}
  ngOnInit(): void {
    this.authService.checkInitialAuthentication();
   
  }

  title = 'Frontend';

  navbarRows = [
    { name: 'Candidates', route: '/candidates', icon : 'people' },
    { name: 'Jobs', route: '/jobs' , icon : 'cases'},
    { name: 'Interviews', route: '/interviews', icon : 'chat' },
    { name: 'Offers', route: '/offers' , icon : 'email'},
    { name: 'Logout', icon: 'exit_to_app', action: 'logout'},
  ];

  handleLogout(): void {
    this.authService.logout(); // Gọi hàm logout từ AuthService
    this.router.navigate(['/login']); // << Điều hướng đến trang login (thay '/login' bằng route login của bạn)
  }
}
