import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { CandidateService } from '../../../services/candidate.service';
import { CandidateDto } from '../common/model';

@Component({
  selector: 'app-edit-candidate-page',
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
    MatProgressSpinnerModule, 
    MatIconModule
  ],
  templateUrl: './edit-candidate-page.component.html',
  styleUrls: ['./edit-candidate-page.component.css'] 
})
export class EditCandidatePageComponent implements OnInit {
  candidateId: string | null = null;
  candidateData: CandidateDto | null = null; 


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
    private route: ActivatedRoute, 
    private router: Router,       
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get('id');
    if (this.candidateId) {
      this.candidateService.getCandidateById(this.candidateId).subscribe({
        next: (data: CandidateDto) => {
          this.candidateData = data;
          this.candidateData.ownerHrEmail = localStorage.getItem('email') ?? ''; 
          console.log('Fetched candidate data:', this.candidateData);
        },
        error: (err) => {
          console.error('Error fetching candidate data:', err);
          alert(`Không tìm thấy candidate hoặc có lỗi xảy ra: ${err.message}`);
          this.router.navigate(['/candidates']);
        }
      });
    } else {
      console.error('Candidate ID not found in route parameters.');
      alert('Không tìm thấy ID của Candidate trong đường dẫn.');
      this.router.navigate(['/candidates']); 
    }
  }

  updateCandidate(candidateForm: NgForm): void {
    if (candidateForm.invalid) {
      alert('Vui lòng kiểm tra lại các trường thông tin bắt buộc.');
       Object.values(candidateForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (!this.candidateId || !this.candidateData) {
      console.error('Cannot update: Candidate ID or data is missing.');
      alert('Dữ liệu candidate không hợp lệ để cập nhật.');
      return;
    }
  
    this.candidateService.updateCandidate(this.candidateId, this.candidateData).subscribe({
      next: (updatedCandidate) => {
        console.log('Candidate updated successfully!', updatedCandidate);
        alert('Cập nhật Candidate thành công!');
        this.router.navigate(['/candidates']); // Điều hướng về trang danh sách
      },
      error: (err) => {
        console.error('Error updating candidate:', err);
        alert(`Lỗi khi cập nhật Candidate: ${err.message}`);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/candidates']); 
  }
}