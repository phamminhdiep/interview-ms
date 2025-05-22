import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../common/header/header.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CandidateRequestDto } from '../../../DTO/CandidateRequestDto';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';
import { CandidateDto } from '../common/model';
import { Page } from '../common/model';
import { FormatTitlePipe } from '../../../pipes/format-title.pipe';


@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    FormatTitlePipe
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  pageIndex: unknown;
  candidateRequestDto: CandidateRequestDto;

  totalItems: number = 0;
  currentPage: number = 0; // pageNumber (0-indexed)
  pageSize: number = 10; // pageSize
  pageSizeOptions: number[] = [5, 10, 20, 50];

  listStatus = [
    { id: 'WAITING_FOR_INTERVIEW', name: 'Waiting for interview' },
    { id: 'WAITING_FOR_APPROVAL', name: 'Waiting for approval' },
    { id: 'WAITING_FOR_RESPONSE', name: 'Waiting for response' },
    { id: 'OPEN', name: 'Open' },
    { id: 'PASSED_INTERVIEW', name: 'Passed interview' },
    { id: 'APPROVED_OFFER', name: 'Approved offer' },
    { id: 'REJECTED_OFFER', name: 'Rejected offer' },
    { id: 'ACCEPTED_OFFER', name: 'Accepted offer' },
    { id: 'DECLINED_OFFER', name: 'Declined offer' },
    { id: 'CANCELLED_OFFER', name: 'Cancelled offer' },
    { id: 'FAILED_INTERVIEW', name: 'Failed interview' },
    { id: 'CANCELED_INTERVIEW', name: 'Canceled interview' },
    { id: 'BANNED', name: 'Banned' }
  ];

  displayedColumns: string[] = ['name', 'email', 'phone', 'currentPosition', 'ownerHR', 'status', 'action'];
  dataSource = new MatTableDataSource<CandidateDto>([]);

  constructor(
    private candidateService: CandidateService,
    // private fb: FormBuilder,
    // private router: Router
  ) {
    this.candidateRequestDto = {
      name: '',
      status: 'OPEN',
      pageSize: this.pageSize,
      pageNumber: this.currentPage,
    };

  }

  ngOnInit() {
    this.loadCandidates();

    
  }

  onFilter() {
    this.currentPage = 0; // Reset về trang đầu khi filter
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
  
  
    this.candidateRequestDto.pageNumber = this.currentPage;
    this.candidateRequestDto.pageSize = this.pageSize;
  
    console.log('Component: Gọi service filter với DTO:', this.candidateRequestDto);
  
    this.candidateService.getCandidatesByNameAndStatus(this.candidateRequestDto).subscribe({
      next: (pageData: Page<CandidateDto>) => {
        const candidateDtosForTable = pageData.content.map(candidate => ({
          ...candidate,
    
        }));
        this.dataSource.data = candidateDtosForTable;
        this.totalItems = pageData.totalElements;
      },
      error: (err) => {
        console.error('Lỗi khi lọc candidates:', err);
        this.dataSource.data = [];
        this.totalItems = 0;
        alert(`Lỗi khi lọc: ${err.message}`);
      }
    });
  }


  onReset() {
    this.candidateRequestDto.name = '';
    this.candidateRequestDto.status = 'OPEN'; 
    this.candidateRequestDto.pageNumber = 0; 
    this.candidateRequestDto.pageSize = this.pageSize; 
  
    if (this.paginator) {
      this.paginator.pageIndex = 0; 
    }
  
    this.loadCandidates(); 
  }


  loadCandidates() {
    this.candidateService.getAllCandidates(this.currentPage, this.pageSize)
      .subscribe({
        next: (pageData: Page<CandidateDto>) => {
          const candidateDtos: CandidateDto[] = pageData.content.map(candidate => ({
            ...candidate,
          }));
          this.dataSource.data = candidateDtos;
          this.totalItems = pageData.totalElements;
        },
        error: (err) => {
          console.error('Lỗi khi tải danh sách candidates:', err);
          this.dataSource.data = [];
          this.totalItems = 0;
        }
      });
  }

  onMatPaginatorChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCandidates();
  }

  onDelete(id:string): void {
    if (confirm('Bạn có chắc chắn muốn xóa candidate này không?')) {
      this.candidateService.deleteCandidate(id).subscribe({
        next: () => {
          alert('Xóa candidate thành công!');
          this.loadCandidates(); // Tải lại danh sách sau khi xóa
        },
        error: (err) => {
          console.error('Lỗi khi xóa candidate:', err);
          alert('Xóa candidate thất bại!');
        }
      });
    }
  }
  

}
