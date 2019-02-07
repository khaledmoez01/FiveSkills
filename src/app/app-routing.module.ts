import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { SingleUserComponent } from './user-list/single-user/single-user.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SingleCourseComponent } from './course-list/single-course/single-course.component';
import { CourseFormComponent } from './course-list/course-form/course-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SingleProjectComponent } from './project-list/single-project/single-project.component';
import { ProjectFormComponent } from './project-list/project-form/project-form.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

import { userRoleEnum } from "./models/user-roles.enum";

const routes: Routes = [

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: HeaderAdminComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: userRoleEnum.admin
    },
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'user/:id', component: SingleUserComponent },

      { path: 'courses', component: CourseListComponent },
      { path: 'course/:id', component: SingleCourseComponent },

      { path: 'projects', component: ProjectListComponent },
      { path: 'project/:id', component: SingleProjectComponent },

      { path: 'comments', component: CommentListComponent },
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/not-found' }
    ]
  },
  {
    path: 'simpleuser',
    component: HeaderUserComponent,  
    canActivate: [AuthGuard],
    children: [
      { path: 'user/:id', component: SingleUserComponent },
      { path: 'courses', component: CourseListComponent },
      { 
        path: 'course/new',
        component: CourseFormComponent,
        canActivate: [RoleGuard],
        data: { 
          expectedRole: userRoleEnum.teacher
        }
      },
      { path: 'course/:id', component: SingleCourseComponent },
      { 
        path: 'project/new', 
        component: ProjectFormComponent, 
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: userRoleEnum.student 
        } 
      },
      { path: 'project/:id', component: SingleProjectComponent },
      // { path: 'comment/new' , component: CommentFormComponent }  --> d'apres Chehir mettre en modal
      { path: '', component: CourseListComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/not-found' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
