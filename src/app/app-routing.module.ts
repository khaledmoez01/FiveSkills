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
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './dashboard/users/users.component';
import { UserComponent } from './dashboard/user/user.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { CourseComponent } from './dashboard/course/course.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { ProjectComponent } from './dashboard/project/project.component';
import { CommentsComponent } from './dashboard/comments/comments.component';
import { HomeDComponent } from './dashboard/home-d/home-d.component';
import { ProfileAComponent } from './dashboard/profile-a/profile-a.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      allowedRoles: [userRoleEnum.admin]
    },
    children: [
      { path: '', component: HomeDComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/:id', component:UserComponent },

      { path: 'courses', component: CoursesComponent },
      { path: 'course/:id', component:CourseComponent },

      { path: 'projects', component: ProjectsComponent },
      { path: 'project/:id', component:ProjectComponent },

      { path: 'comments', component: CommentsComponent },
      { path: 'profile', component: ProfileAComponent },
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/not-found' }
    ]
  },
  {
    path: 'simpleuser/project/new', 
    component: ProjectFormComponent, 
    canActivate: [RoleGuard], 
    data: { 
      allowedRoles: [userRoleEnum.student]
    } 
  },
  {
    path: 'simpleuser',
    component: HeaderUserComponent,  
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      allowedRoles: [userRoleEnum.teacher, userRoleEnum.student]
    },
    children: [
      { path: 'user', component: SingleUserComponent },
      { path: 'courses', component: CourseListComponent },
      { path: 'course/new',  component: CourseFormComponent  },
      { path: 'course/:id', component: SingleCourseComponent },
      { path: 'project/:id', component: SingleProjectComponent },
      // { path: 'comment/new' , component: CommentFormComponent }  --> d'apres Chehir mettre en modal
      { path: '', component: CourseListComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/not-found' }
    ]
  },
   { path: 'createCourse',component:CourseFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
