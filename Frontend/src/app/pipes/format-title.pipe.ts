import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitle', // Tên bạn sẽ dùng trong template, ví dụ: {{ myValue | formatJobTitle }}
  standalone: true
})
export class FormatTitlePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value || typeof value !== 'string') {
      return ''; // Hoặc trả về giá trị gốc: value || ''
    }

    // Chuyển đổi chuỗi: BACKEND_DEVELOPER -> Backend Developer
    return value
      .toLowerCase() // chuyển tất cả thành chữ thường: backend_developer
      .split('_')     // tách theo dấu gạch dưới: ['backend', 'developer']
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu mỗi từ: ['Backend', 'Developer']
      .join(' ');     // Nối lại bằng khoảng trắng: "Backend Developer"
  }

}