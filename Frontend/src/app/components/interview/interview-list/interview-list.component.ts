import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select'; 
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';


import { InterviewService } from '../../../services/interview.service';
import { InterviewDto } from '../../candidate/common/model';
import { Page } from '../../candidate/common/model';
import { HeaderComponent } from "../../../common/header/header.component"; 

@Component({
  selector: 'app-interview-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'] 
})
export class InterviewListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'candidate', 'interviewer', 'schedule', 'result', 'status', 'job', 'actions'];
  dataSource = new MatTableDataSource<InterviewDto>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  isLoading: boolean = false;

 

  constructor(
    private interviewService: InterviewService,
    private router: Router,
    
  ) {
 
  }

  ngOnInit(): void {
    this.loadInterviews();
   
  }

  ngAfterViewInit(): void {
  
  }

  loadInterviews(): void {
    this.isLoading = true;
    this.interviewService.getAllInterviews(this.currentPage, this.pageSize)
      .subscribe({
        next: (pageData: Page<InterviewDto>) => {
          this.dataSource.data = pageData.content;
          this.totalItems = pageData.totalElements;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading interviews:', err);
          this.dataSource.data = [];
          this.totalItems = 0;
          this.isLoading = false;
          alert(`Error loading interviews: ${err.message}`);
        }
      });
  }

  onMatPaginatorChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadInterviews();
  }

  editInterview(id?: string): void {
    if (!id) return;
    this.router.navigate(['/interviews/edit', id]);
  }

  deleteInterview(id?: string): void {
    if (!id) return;
    if (confirm(`Are you sure you want to delete this interview`)) {
      this.isLoading = true;
      this.interviewService.deleteInterview(id).subscribe({
        next: () => {
          alert('Delete Successfully!');
          if (this.dataSource.data.length === 1 && this.currentPage > 0) {
            this.currentPage--;
            if(this.paginator) this.paginator.pageIndex = this.currentPage;
          }
          this.loadInterviews(); 
        },
        error: (err) => {
          this.isLoading = false;
          alert(`Error deleting: ${err.message}`);
          console.error('Error deleting interview:', err);
        }
      });
    }
  }
}