export interface Candidate {
  id?: number | string; 
  name: string;
  email: string;
  phone: string;
  currentPosition: string;
  ownerHR: string;
  status: string;
}

export interface CandidateDto {
  id?: string; 
  name: string;
  email: string;
  phoneNumber: string;       
  currentPosition: string;
  ownerHrEmail: string;
  status: string;
}

export interface CandidateRequestDto {
  name?: string | null;
  status?: string  | null;
  pageSize?: number;
  pageNumber?: number;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;       
  number: number;     
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface AuthenticationRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface InterviewDto {
  id?: string;
  title: string;
  candidate: string;
  interviewer: string;
  schedule: string;
  result: string;
  status: string;
  job: string;
}
