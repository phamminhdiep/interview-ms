// src/app/services/candidate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 // Dùng environment cho API URL
import { Candidate, CandidateDto, CandidateRequestDto } from '../components/candidate/common/model';
import { Page } from '../components/candidate/common/model'; 


@Injectable({
  providedIn: 'root' 
})
export class CandidateService {
  private apiUrl = 'http://localhost:8080/api/v1/candidate'; 


  constructor(private http: HttpClient) { }

  getAllCandidates(pageNumber: number, pageSize: number): Observable<Page<CandidateDto>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Page<CandidateDto>>(`${this.apiUrl}/get-all`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCandidatesByNameAndStatus(requestDto: CandidateRequestDto): Observable<Page<CandidateDto>> {


    const requestBody: CandidateRequestDto = {
      name: requestDto.name && requestDto.name.trim() !== '' ? requestDto.name.trim() : '',
      status: requestDto.status && requestDto.status.trim() !== '' ? requestDto.status.trim() : "",
      pageNumber: requestDto.pageNumber,
      pageSize: requestDto.pageSize
    };

    console.log('request body:', requestBody);

    return this.http.post<Page<CandidateDto>>(`${this.apiUrl}/get-by-name-and-status`, requestBody)
      .pipe(
        catchError(this.handleError)
      );
  }


  getCandidateById(id:string): Observable<CandidateDto> {
    return this.http.get<CandidateDto>(`${this.apiUrl}/get-by-id/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCandidate(candidatePayload: CandidateDto): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.apiUrl}/create`, candidatePayload)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCandidate(id:string, candidatePayload: CandidateDto): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/update/${id}`, candidatePayload)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCandidate(id: string): Observable<any> { 
    console.log(`Deleting candidate with ID: ${id}`);
    
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('Error occurred while processing the request.'));
  }
}