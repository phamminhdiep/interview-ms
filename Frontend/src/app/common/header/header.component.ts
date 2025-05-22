import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = 'Default Title';

  userName = localStorage.getItem('name') || 'Guest';
  userDepartment = localStorage.getItem('department') || 'HR Department';
  userEmail = localStorage.getItem('email') 

  user = {
    name: this.userName,
    department: this.userDepartment,
    email: this.userEmail
  };
}
