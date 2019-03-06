import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from 'src/app/services/courses.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  ID: any;
  results: any;
  course_status:any;
  closeResult: string;
  UserForm: FormGroup;
  CourseForm: FormGroup;
  ProjectForm: FormGroup;
  iD: any;
  token: any;
  dd: any;
  selectedImage: File;
  image: any;
  user_role: any;
  show: boolean = true;
  hidden: boolean = false;
  id_teacher: any;
  courses: any;
  i: any;
  userRole:any;
  course: any;
  id_course: any;
  id_user: any;
  projects: any;
  id_project: any;
  project: any;
  public imagePath;
  imgURL: any;
  public message: string;
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  constructor(private apiService: UsersService, private cookieService: CookieService, private modalService: NgbModal,
    private CourseService: CoursesService, 
    private ProjectService : ProjectsService) {
    this.UserForm = new FormGroup({
      user_first_name: new FormControl('', [Validators.required]),
      user_last_name: new FormControl('', [Validators.required]),
      user_email: new FormControl('', [Validators.email, Validators.required]),
      user_birthday: new FormControl('', [Validators.required])

    })
    this.CourseForm = new FormGroup({
      course_title: new FormControl('', [Validators.required]),
      course_content: new FormControl('', [Validators.required]),
      course_description: new FormControl('', [Validators.required]),
      course_statement: new FormControl('', [Validators.required])
    })
    this.ProjectForm= new FormGroup({
      project_title : new FormControl('',[Validators.required]),
      project_content : new FormControl('',[Validators.required])
    })
  }

  ngOnInit() {
    this.ID = jwt_decode(this.cookieService.get('token')).id._id;
    this.user_role = jwt_decode(this.cookieService.get('token')).id.user_role
    this.apiService.getUser(this.ID).subscribe(async (doc: any) => {
     console.log('ngOnInit',doc.user_role);
      this.userRole = doc.user_role;
      this.results = [doc];
      this.courses = doc.user_courses;
      this.projects= doc.user_project;
      console.log('this.projects',this.projects)
/* 
      if (this.user_role === 2) {
        this.show = true
        this.hidden
      }
      else {
        this.show = false
        this.hidden= true
      }
    */ })
  }

  getid(i) {
    this.i = i;
    console.log(this.i);
    this.CourseForm.controls['course_title'].setValue(this.courses[i].course_title)
    this.CourseForm.controls['course_content'].setValue(this.courses[i].course_content)
    this.CourseForm.controls['course_description'].setValue(this.courses[i].course_description)
    this.CourseForm.controls['course_statement'].setValue(this.courses[i].course_statement)
    this.course_status = this.courses[i].course_status;
  }
  getindex() {
    this.ID = jwt_decode(this.cookieService.get('token')).id
    console.log(this.ID)
    this.CourseForm.controls['course_title'].setValue("")
    this.CourseForm.controls['course_content'].setValue("")
    this.CourseForm.controls['course_description'].setValue("")
    this.CourseForm.controls['course_statement'].setValue("")


  }
  openProfileDetails(content){
    const user = jwt_decode(this.cookieService.get('token')).id
    console.log('user', user)
    this.UserForm = new FormGroup({
      user_first_name: new FormControl(user.user_first_name, [Validators.required]),
      user_last_name: new FormControl(user.user_last_name, [Validators.required]),
      user_email: new FormControl(user.user_email, [Validators.email, Validators.required]),
      user_birthday: new FormControl(user.user_birthday, [Validators.required])

    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  selectedFile(event) {
    console.log(event.target.files[0])
    this.selectedImage = event.target.files[0]
  }
  EditProfil() {
    console.log(this.UserForm.value, "user");

    if (this.UserForm.valid) {
      const formData = new FormData();
      formData.append('user_first_name', this.UserForm.value.user_first_name)
      formData.append('user_last_name', this.UserForm.value.user_last_name)
      formData.append('user_email', this.UserForm.value.user_email)
      formData.append('user_birthday', this.UserForm.value.user_birthday)
      console.log('userform', this.UserForm.value)
      this.iD = jwt_decode(this.cookieService.get('token')).id._id;
      console.log('iD', this.iD)
      if (this.selectedImage) {
        formData.append('user_image', this.selectedImage)
      }
      console.log(this.UserForm.value.user_birthday);
      this.apiService.updateUser(this.iD, formData).subscribe((file: any) => {
        // console.log(file);
        // this.results = [file];
        this.token = file.token;
        this.cookieService.deleteAll();
        this.cookieService.set('token', this.token);
        console.log('birthday', this.token)
        //this.dd = jwt_decode(this.cookieService.get('token')).id._id;
        this.ngOnInit()
      })
      // else {
      // this.apiService.updateUser(this.iD, formData).subscribe((file: any) => {
      //   console.log(file);
      //   this.results = [file];
      //   this.token = file.token;
      //   this.cookieService.deleteAll();
      //   this.cookieService.set('token', this.token);
      //   //this.dd = jwt_decode(this.cookieService.get('token')).id._id;
      //   this.ngOnInit()
      //   this.getindex()

      // })
      // }
    }
  }
  createcourseDraft() {
    if (this.CourseForm.value) {
      const formData = new FormData();
      formData.append('course_title', this.CourseForm.value.course_title)
      formData.append('course_content', this.CourseForm.value.course_content)
      formData.append('course_description', this.CourseForm.value.course_description)
      formData.append('course_statement', this.CourseForm.value.course_statement)
      formData.append('course_image', this.selectedImage)
      this.id_teacher = jwt_decode(this.cookieService.get('token')).id._id
      this.CourseService.draftcourse(this.id_teacher, formData).subscribe((file: any) => {
        console.log(file)
        this.ngOnInit()
        // this.courses = file
      })

    }
  }
  publishedCourse() {
    if (this.CourseForm.value) {
      const formData = new FormData();
      formData.append('course_title', this.CourseForm.value.course_title)
      formData.append('course_content', this.CourseForm.value.course_content)
      formData.append('course_description', this.CourseForm.value.course_description)
      formData.append('course_statement', this.CourseForm.value.course_statement)
      formData.append('course_image', this.selectedImage)
      this.id_teacher = jwt_decode(this.cookieService.get('token')).id._id
      this.CourseService.publishecourse(this.id_teacher, formData).subscribe((file: any) => {
        console.log(file)
        this.ngOnInit()
        // this.courses = file
      })

    }
  }
  editCourse(i){
    if (this.CourseForm.value) {
      this.id_teacher=jwt_decode(this.cookieService.get('token')).id._id
      const formData = new FormData();
      formData.append('course_title', this.CourseForm.value.course_title)
      formData.append('course_content', this.CourseForm.value.course_content)
      formData.append('course_description', this.CourseForm.value.course_description)
      formData.append('course_statement', this.CourseForm.value.course_statement)
      formData.append('course_teacher', this.id_teacher)
      console.log('CourseForm', this.CourseForm.value)
      this.course_status = this.courses[i].course_status
      console.log('this.id_course', this.id_course)
      if (this.selectedImage) {
        formData.append('course_image', this.selectedImage)
      }
      this.CourseService.editCourse(this.id_course,formData).subscribe((file: any) => {
     
        console.log('file',file)
        //this.dd = jwt_decode(this.cookieService.get('token')).id._id;
        this.ngOnInit()
      })
    }
  }
  deleteCourse(i){
    console.log(i)
    this.id_course=this.courses[i]._id
    this.id_user=jwt_decode(this.cookieService.get('token')).id._id;
    this.CourseService.deleteCourse(this.id_course,this.id_user,i).subscribe((data:any) =>{
      console.log(data.msg)
      this.ngOnInit()

    })
  }
  draftStudentCourse(){
    if (this.CourseForm.value) {
      const formData = new FormData();
      formData.append('course_title', this.CourseForm.value.course_title)
      formData.append('course_content', this.CourseForm.value.course_content)
      formData.append('course_description', this.CourseForm.value.course_description)
      formData.append('course_statement', this.CourseForm.value.course_statement)
      formData.append('course_image', this.selectedImage)
      this.id_user = jwt_decode(this.cookieService.get('token')).id._id
      this.CourseService.studentCreateDraftCourse(this.id_user, formData).subscribe((file: any) => {
        console.log('hello file',file)
        this.ngOnInit()
        // this.courses = file
      })

    }
  }
  CourseSendedToValidate(){
    if (this.CourseForm.value) {
      const formData = new FormData();
      formData.append('course_title', this.CourseForm.value.course_title)
      formData.append('course_content', this.CourseForm.value.course_content)
      formData.append('course_description', this.CourseForm.value.course_description)
      formData.append('course_statement', this.CourseForm.value.course_statement)
      formData.append('course_image', this.selectedImage)
      this.id_user = jwt_decode(this.cookieService.get('token')).id._id
      this.CourseService.studentSendCoursetoValidate(this.id_user, formData).subscribe((file: any) => {
        console.log('hello file',file)
        this.ngOnInit()
        // this.courses = file
      })

    }
  }
  getProjectIndex(i){
    this.i = i;
    console.log(i)
    this.ProjectForm.controls['project_title'].setValue(this.projects[i].project_title)
    this.ProjectForm.controls['project_content'].setValue(this.projects[i].project_content)
   
  }
  EditPtojectUser(i){
    
      this.id_user = jwt_decode(this.cookieService.get('token')).id._id
      this.id_project = this.projects[i]._id
      const formdata = new FormData
      formdata.append('project_title',this.ProjectForm.value.project_title)
      formdata.append('project_content',this.ProjectForm.value.project_content)
      formdata.append('project_user', this.id_user)
      if (this.selectedImage) {
        formdata.append('project_image', this.selectedImage)
      }
      this.ProjectService.UserEditProject(this.id_project,formdata).subscribe((data :any)=>{
        this.project = data
        console.log(data)
        this.ngOnInit()
      })
    
  }
  Userdeleteproject(i){
    this.id_user = jwt_decode(this.cookieService.get('token')).id._id;
    this.id_project = this.projects[i]._id
    this.ProjectService.UserDeleteProject(this.id_project,this.id_user,i).subscribe((data: any)=>{
      this.results=[data];
      alert(data.msg)
      this.ngOnInit()
    })
  }
  logout(){
    this.cookieService.deleteAll();
  }
}