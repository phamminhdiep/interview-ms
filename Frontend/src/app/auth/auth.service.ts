import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationRequest, AuthenticationResponse, RegisterRequest}  from '../DTO/commonDto'; // Đảm bảo đường dẫn đúng

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth'; 
  private readonly TOKEN_KEY = 'authToken';

  // Sử dụng BehaviorSubject để các component khác có thể theo dõi trạng thái đăng nhập
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  

  // Kiểm tra xem có token trong localStorage không
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Lưu token vào localStorage và cập nhật trạng thái đăng nhập
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  // Xóa token và cập nhật trạng thái đăng nhập
  private removeAuthItem(): void {
    localStorage.removeItem('token'); // Hoặc this.removeToken() nếu bạn đã định nghĩa hàm này
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.isAuthenticatedSubject.next(false);
  }

  // Phương thức đăng nhập
  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, request)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.saveToken(response.token);
          }
          // Bạn có thể lưu thêm thông tin người dùng vào localStorage/sessionStorage nếu backend trả về
          // ví dụ: userId, name, email, roles, expiresIn, v.v.
          localStorage.setItem('name', response.name);
          localStorage.setItem('email', response.email);
        })
      );
  }

  // Phương thức đăng ký tài khoản
  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/create-account`, request)
      .pipe(
        tap(response => {
          // Thông thường sau khi đăng ký thành công, backend có thể trả về token luôn
          // Hoặc bạn có thể điều hướng người dùng đến trang đăng nhập
          if (response && response.token) {
            // this.saveToken(response.token); // Tùy chọn: tự động đăng nhập sau khi đăng ký
          }
        })
      );
  }

  // Phương thức đăng xuất
  logout(): void {
    this.removeAuthItem(); 
    this.router.navigate(['/login']); 

    console.log('AuthService: User logged out, tokens cleared.');
  }

  // Kiểm tra trạng thái đăng nhập hiện tại (dùng cho AuthGuard)
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Thêm logic kiểm tra token hết hạn nếu cần (ví dụ: dùng thư viện jwt-decode)
    return !!token;
  }

  // Cập nhật trạng thái BehaviorSubject khi ứng dụng khởi động
  // Bạn có thể gọi hàm này trong constructor của AppComponent
  checkInitialAuthentication(): void {
    this.isAuthenticatedSubject.next(this.hasToken());
  }
}