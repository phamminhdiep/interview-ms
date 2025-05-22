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
import { CandidateService } from '../../../services/candidate.service';
import { CandidateDto } from '../common/model';


export interface CandidateData {
  name: string;
  email: string;
  phone: string;
  currentPosition: string;
  ownerHR: string; 
  status: string;
}

@Component({
  selector: 'app-add-candidate-page',
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
    MatIconModule
  ],
  templateUrl: './add-candidate-page.component.html',
  styleUrls: ['./add-candidate-page.component.css']
})
export class AddCandidatePageComponent implements OnInit { // Implement OnInit
  candidateData: CandidateDto = {
    name: '',
    email: '',
    phoneNumber: '',
    currentPosition: '',
    ownerHrEmail: localStorage.getItem('email') || 'admin', 
    status: 'OPEN' 
  };

  statuses = [
    { id: 'WAITING_FOR_INTERVIEW', name: 'Waiting for Interview' },
    { id: 'WAITING_FOR_APPROVAL', name: 'Waiting for Approval' },
    { id: 'WAITING_FOR_RESPONSE', name: 'Waiting for Response' },
    { id: 'OPEN', name: 'Open' },
    { id: 'PASSED_INTERVIEW', name: 'Passed Interview' },
    { id: 'APPROVED_OFFER', name: 'Approved Offer' },
    { id: 'REJECTED_OFFER', name: 'Rejected Offer' },
    { id: 'ACCEPTED_OFFER', name: 'Accepted Offer' },
    { id: 'DECLINED_OFFER', name: 'Declined Offer' },
    { id: 'CANCELLED_OFFER', name: 'Cancelled Offer' },
    { id: 'FAILED_INTERVIEW', name: 'Failed Interview' },
    { id: 'CANCELED_INTERVIEW', name: 'Canceled Interview' },
    { id: 'BANNED', name: 'Banned' }
  ];
  positions = [
    { id: 'BACKEND_DEVELOPER', name: 'Backend Developer' },
    { id: 'FRONTEND_DEVELOPER', name: 'Frontend Developer' },
    { id: 'BUSINESS_ANALYST', name: 'Business Analyst' },
    { id: 'TESTER', name: 'Tester' },
    { id: 'HR', name: 'HR' },
    { id: 'PROJECT_MANAGER', name: 'Project Manager' },
    { id: 'NOT_AVAILABLE', name: 'Not Available' }
  ];

  constructor(
    private router: Router,
    private candidateService: CandidateService

  ) { }

  ngOnInit(): void {

    this.candidateData.ownerHrEmail = localStorage.getItem('email') || "admin"; 
  
  }


  private getCurrentUserMock(): string {
  
    return 'admin';
  }
 

  saveCandidate(candidateForm: NgForm): void { // Truyền NgForm vào
    if (candidateForm.invalid) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      // Đánh dấu tất cả các control là touched để hiển thị lỗi (nếu cần)
      Object.values(candidateForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    if (!this.candidateData.ownerHrEmail) {
        alert('Không thể xác định Owner HR. Vui lòng thử lại.');
        return;
    }

  
    this.candidateService.addCandidate(this.candidateData).subscribe({
      next: (savedCandidate) => {
        console.log('Candidate saved successfully!', savedCandidate);
        alert('Candidate đã được lưu thành công!');
      
        this.router.navigate(['/candidates']); 
      },
      error: (err) => {
        console.error('Error saving candidate:', err);
        alert(`Lỗi khi lưu Candidate: ${err.message || 'Vui lòng thử lại.'}`);
    
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/candidates']); 
  }
}