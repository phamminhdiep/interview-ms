import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InterviewDto } from '../components/candidate/common/model';
import { Page } from '../components/candidate/common/model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl = 'http://localhost:8080';
  private baseUrl = `${this.apiUrl}/api/v1/interview`;

  constructor(private http: HttpClient) { }

  getAllInterviews(pageNumber: number, pageSize: number): Observable<Page<InterviewDto>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Page<InterviewDto>>(`${this.baseUrl}/get-all`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getInterviewById(id: string): Observable<InterviewDto> {
    return this.http.get<InterviewDto>(`${this.baseUrl}/get-by-id/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createInterview(interviewDto: InterviewDto): Observable<InterviewDto> {
    const payload = { ...interviewDto };
    delete payload.id;
    return this.http.post<InterviewDto>(`${this.baseUrl}/create`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateInterview(id: string, interviewDto: InterviewDto): Observable<InterviewDto> {
    return this.http.put<InterviewDto>(`${this.baseUrl}/update/${id}`, interviewDto)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteInterview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API Error in InterviewService:', error);
    let errorMessage = 'An API error occurred with Interviews.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Server Error: ${error.status} - ${error.statusText || ''}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'object' && error.error.message) {
        errorMessage += `\nDetails: ${error.error.message}`;
      } else if (typeof error.error === 'string' && error.error.trim() !== '') {
         errorMessage += `\nDetails: ${error.error}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
