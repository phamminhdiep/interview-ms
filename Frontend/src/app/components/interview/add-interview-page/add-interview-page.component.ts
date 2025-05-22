import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';   

import { InterviewService } from '../../../services/interview.service';
import { InterviewDto } from '../../candidate/common/model';

@Component({
  selector: 'app-add-interview-page',
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
    MatNativeDateModule
  ],
  templateUrl: './add-interview-page.component.html',
  styleUrls: ['./add-interview-page.component.css'] 
})
export class AddInterviewPageComponent implements OnInit {
  interviewData: InterviewDto = {
    
    title: '',
    candidate: '',    
    interviewer: '',  
    schedule: '',    
    result: '',       
    status: 'SCHEDULED', 
    job: ''           
  };

  isLoading: boolean = false;

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
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  saveInterview(interviewForm: NgForm): void {
    if (interviewForm.invalid) {
      alert('Please fill in all required fields.');
      Object.values(interviewForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    
    const payload: InterviewDto = {
      ...this.interviewData,
      schedule: this.formatScheduleDate(this.interviewData.schedule) 
    };


    this.interviewService.createInterview(payload).subscribe({
      next: (savedInterview) => {
        this.isLoading = false;
        console.log('Interview saved successfully!', savedInterview);
        alert('Interview đã được tạo thành công!');
        this.router.navigate(['/interviews']); 
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error saving interview:', err);
        alert(`Lỗi khi tạo Interview: ${err.message || 'Vui lòng thử lại.'}`);
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
        } catch (e) { }
        return dateInput;
    }
  
    return dateInput.toISOString(); 
 
  }
}
