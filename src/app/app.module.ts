import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CommentsService } from './services/comments.service';
import { CoursesService } from './services/courses.service';
import { DashboardService } from './services/dashboard.service';
import { ProjectsService } from './services/projects.service';
import { RoleGuardService } from './services/role-guard.service';
import { UsersService } from './services/users.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderAdminComponent,
    UserListComponent,
    SingleUserComponent,
    CourseListComponent,
    SingleCourseComponent,
    CourseFormComponent,
    ProjectListComponent,
    SingleProjectComponent,
    ProjectFormComponent,
    CommentListComponent,
    DashboardComponent,
    HeaderUserComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    CookieService,
    AuthGuardService,
    AuthService,
    CommentsService,
    CoursesService,
    DashboardService,
    ProjectsService,
    RoleGuardService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
