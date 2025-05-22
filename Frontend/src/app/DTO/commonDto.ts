// Khớp với AuthenticationRequest.java
export interface AuthenticationRequest {
    email: string;
    password?: string; // Password có thể là optional nếu request có thể dùng cho các mục đích khác
  }
  
  // Khớp với RegisterRequest.java
  export interface RegisterRequest {
    name: string;
    email: string;
    password?: string;
  }
  
  export interface AuthenticationResponse {
    token: string;
    name:string
    email:string
  }