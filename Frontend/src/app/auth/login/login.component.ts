import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { Router, RouterModule ,ActivatedRoute} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { AuthService } from '../auth.service';
import { AuthenticationRequest } from '../../DTO/commonDto';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: AuthenticationRequest = { email: '', password: '' };
  isLoading: boolean = false;
  errorMessage: string | null = null;
  private returnUrl: string = '/candidates';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/candidates'; 
    });
 
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Đăng nhập thành công:', response);
        this.router.navigate(['/candidates']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Bad Creadentials';
        console.error('Login Error:', err);
      }
    });
  }
}