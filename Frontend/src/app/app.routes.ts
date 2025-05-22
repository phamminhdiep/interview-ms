import { Routes } from '@angular/router';
import { CandidateListComponent } from './components/candidate/candidate-list/candidate-list.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { InterviewListComponent } from './components/interview/interview-list/interview-list.component';
import { OfferListComponent } from './components/offer/offer-list/offer-list.component';
import { AddCandidatePageComponent } from './components/candidate/add-candidate-page/add-candidate-page.component';
import { EditCandidatePageComponent } from './components/candidate/edit-candidate-page/edit-candidate-page.component';
import { LoginComponent } from './auth/login/login.component'; 
import { authGuard } from './auth/auth.guard'; 
import { AddInterviewPageComponent } from './components/interview/add-interview-page/add-interview-page.component';
import { EditInterviewPageComponent } from './components/interview/edit-interview-page/edit-interview-page.component';
export const routess: Routes = [
    { path: '', component: CandidateListComponent },
    { path: 'candidates', component: CandidateListComponent },
    { path: 'candidates/new', component: AddCandidatePageComponent },
    { path: 'candidates/edit/:id', component: EditCandidatePageComponent },
    { path: 'job', component: JobListComponent },
    { path: 'interview', component: InterviewListComponent },
    { path: 'offer', component: OfferListComponent },
];

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
   
    {
        path: 'candidates',
        component: CandidateListComponent,
        canActivate: [authGuard] 
    },
    {
        path: 'candidates/new',
        component: AddCandidatePageComponent,
        canActivate: [authGuard] 
    },
    {
        path: 'candidates/edit/:id',
        component: EditCandidatePageComponent,
        canActivate: [authGuard] 
    },
    { path: 'job', component: JobListComponent, canActivate: [authGuard] },
    // Interview Routes
    { path: 'interviews', component: InterviewListComponent, canActivate: [authGuard] },
    { path: 'interviews/new', component: AddInterviewPageComponent, canActivate: [authGuard] },
    { path: 'interviews/edit/:id', component: EditInterviewPageComponent, canActivate: [authGuard] },

    { path: 'offer', component: OfferListComponent, canActivate: [authGuard] },

    { path: '', redirectTo: '/candidates', pathMatch: 'full' }, 
    { path: '**', redirectTo: '/candidates' } 
]

