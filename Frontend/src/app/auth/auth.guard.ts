// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; // Đảm bảo đường dẫn đúng

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Cho phép truy cập route
  } else {
    // Nếu chưa đăng nhập, điều hướng về trang login
    // Lưu lại URL người dùng muốn truy cập để có thể redirect lại sau khi login (returnUrl)
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Chặn truy cập route
  }
};