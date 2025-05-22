import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { InterviewService } from '../../../services/interview.service';
import { InterviewDto } from '../../candidate/common/model';

@Component({
  selector: 'app-edit-interview-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule 
  ],
  templateUrl: './edit-interview-page.component.html',
  styleUrls: ['./edit-interview-page.component.css'] 
})
export class EditInterviewPageComponent implements OnInit {
  interviewId: string | null = null;
  interviewData: InterviewDto | null = null; 
  
  isLoading: boolean = false; 
  isFetchingInitialData: boolean = false; 

  interviewStatuses = [
    { id: 'SCHEDULED', name: 'Scheduled' },
    { id: 'IN_PROGRESS', name: 'In Progress' },
    { id: 'COMPLETED', name: 'Completed' },
    { id: 'PENDING_FEEDBACK', name: 'Pending Feedback' },
    { id: 'CANCELLED', name: 'Cancelled' },
    { id: 'RESCHEDULED', name: 'Rescheduled' }
  ];

  interviewResults = [
    { id: 'PENDING', name: 'Pending' },
    { id: 'PASS', name: 'Pass' },
    { id: 'FAIL', name: 'Fail' },
    { id: 'STRONG_HIRE', name: 'Strong Hire' },
    { id: 'HIRE', name: 'Hire' },
    { id: 'NO_HIRE', name: 'No Hire' }
  ];

  constructor(
    private interviewService: InterviewService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.isFetchingInitialData = true;
    this.interviewId = this.route.snapshot.paramMap.get('id'); 

    if (this.interviewId) {
      this.interviewService.getInterviewById(this.interviewId).subscribe({
        next: (data) => {
         
          this.interviewData = data;
          this.isFetchingInitialData = false;
          console.log('Fetched interview data for edit:', this.interviewData);
        },
        error: (err) => {
          this.isFetchingInitialData = false;
          console.error('Error fetching interview for edit:', err);
          alert(`Not Found: ${err.message}`);
          this.router.navigate(['/interviews']); 
        }
      });
    } else {
      this.isFetchingInitialData = false;
      console.error('Interview ID not found.');
      alert('Not found Interview ID.');
      this.router.navigate(['/interviews']);
    }
  }

  updateInterview(interviewForm: NgForm): void {
    if (interviewForm.invalid) {
      alert('Please fill in all required fields.');
       Object.values(interviewForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (!this.interviewId || !this.interviewData) {
      alert('Invalid interview data or ID. Please try again.');
      return;
    }

    this.isLoading = true;
    
    const payload: InterviewDto = {
      ...this.interviewData,
      schedule: this.formatScheduleDate(this.interviewData.schedule) 
    };


    this.interviewService.updateInterview(this.interviewId, payload).subscribe({
      next: (updatedInterview) => {
        this.isLoading = false;
        console.log('Interview updated successfully!', updatedInterview);
        alert('Successfully Update!');
        this.router.navigate(['/interviews']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error updating interview:', err);
        alert(`Error while editting: ${err.message || 'Please try again.'}`);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/interviews']);
  }
  
  private formatScheduleDate(dateInput: string | Date): string {
    if (!dateInput) return '';
    if (typeof dateInput === 'string') {
        try {
            const parsedDate = new Date(dateInput);
            if (!isNaN(parsedDate.getTime())) {
                 return parsedDate.toISOString(); 
            }
        } catch (e) {  }
        return dateInput;
    }
    return dateInput.toISOString();
  }
}