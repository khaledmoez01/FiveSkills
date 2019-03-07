import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode'
import { CommentsService } from 'src/app/services/comments.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
  ID: any;
  IDp: any;
  result;
  CommentForm: FormGroup;
  ProjectForm: FormGroup;
  selectedImage: File;
  results: any;
  res: any;
  re: any;
  comments: any;
  closeResult: string;
  id_user: any;
  public imagePath;
  imgURL: any;
  public message: string;
  number: any;
  followers: any;
  followersNumber: any;
  id_project: any;
  commentsNumber: any;
  show: boolean = true;
  hidden: boolean = false;
  shows: boolean = true;
  hiddens: boolean = true
  commentShow: boolean = true
  commentShowDelete: boolean = true
  hiddensDeleteProject: boolean = true;
  i: any;
  id_projec: any;
  projects: any;
  ProjectVotes: any;
  like = [];
  teachers: any;
  IdComment;
  id_comment: any;
  id_course: string;
  user_role: any;
  project: any;
  getpara: any;
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
  constructor(private apiService: CoursesService,
    private cookiesService: CookieService, private ApiService: CommentsService,
    private modalService: NgbModal, private APIService: ProjectsService,
    private router: ActivatedRoute) {
    this.CommentForm = new FormGroup({
      comment_content: new FormControl('', [Validators.required]),
    })
    this.ProjectForm = new FormGroup({
      project_title: new FormControl('', [Validators.required]),
      project_content: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.ID = this.router.snapshot.paramMap.get('id')
    this.CommentForm.controls['comment_content'].setValue("")
    // this.ID = this.apiService.getid();
    console.log('this.ID ngOnInit', this.ID)
    this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;
    this.user_role = jwt_decode(this.cookiesService.get('token')).id.user_role
    console.log('user_role', this.user_role)
    console.log('zzz', this.id_user)
    this.apiService.getCoursesById(this.ID).subscribe((data: any) => {
      console.log(data);
      this.result = [data];
      this.comments = data.course_comment
      this.teachers = data.course_teacher
      this.commentsNumber = data.course_comment.length
      this.followers = data.course_followers
      this.followersNumber = this.followers.length
      this.projects = data.course_project;
      console.log('this.id_user', this.id_user)
      console.log('this.teachers', this.teachers._id)
      // this.ProjectVotes = this.projects[0]['project_vote']
      console.log('projects', this.projects)
      // console.log('projectVotes', this.ProjectVotes)

      if (this.id_user == this.teachers._id) {
        this.shows = false
      }
      else {
        this.shows
      }
    /*   for (let i = 0; i < this.projects.length; i++) {
        if (this.id_user === this.projects[i].project_user._id) {
          this.hiddens
        }
        else {
          this.hiddens = false
        }

      } */
    /*   for (let i = 0; i < this.projects.length; i++) {
        if (this.id_user === this.projects[i].project_user._id || this.id_user === this.teachers._id) {
          this.hiddensDeleteProject
        }
        else {
          this.hiddensDeleteProject = false
        }

      } */
           console.log('followersNumber', this.followers.length)
      for (let i = 0; i < this.followers.length; i++) {
        console.log('cc', this.followers[i].user_id)
        if (this.followers[i].user_id === this.id_user) {
          this.show = false
          this.hidden = true
        }
        else {
          this.show;
          this.hidden
        }
      }


    });

    this.APIService.getApiproject().subscribe(doc => {
      console.log(doc);
      this.results = doc;
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

  checkLike(likes: any[]) {
    return likes.includes(this.id_user);
  }

  addproject() {
    if (this.ProjectForm.value) {

      console.log(this.ProjectForm.value)
      this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;
      const formData = new FormData();
      formData.append('project_title', this.ProjectForm.value.project_title)
      formData.append('project_content', this.ProjectForm.value.project_content)
      formData.append('project_image', this.selectedImage)
      formData.append('project_course', this.ID)
      formData.append('project_user', this.id_user)
      console.log('id_user', this.id_user)
      console.log('id course', this.ID)
      console.log('formdata', formData)

      this.APIService.addproject(this.ID, this.id_user, formData).subscribe(doc => {
        console.log(doc);
        this.result = [doc];
        this.ngOnInit()
      });
    }
    else {
      alert('Please check if all fields are correctly filled')
    }
  }


  addcommentcourse() {

    const id_user = jwt_decode(this.cookiesService.get('token')).id._id;
    console.log('aaaaaa', id_user)
    const commentObj = {
      comment_content: this.CommentForm.value.comment_content,
      comment_user: id_user,
      comment_course: this.ID
    }
    this.ApiService.addcomment(commentObj, this.ID, id_user).subscribe(doc => {
      console.log(doc);
      this.results = doc;
      this.ngOnInit()



    });
  }

  followthecourse() {
    this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;
    this.ID = this.router.snapshot.paramMap.get('id')
    console.log('id_userFollow', this.id_user)
    console.log('ID Course', this.ID)
    this.apiService.followcourse(this.id_user, this.ID).subscribe(doc => {
      this.re = doc;
      console.log(this.re.length);
      this.ngOnInit()

    });

  }
  projectbyid(f) {
    this.APIService.getApiprojectbyid(f).subscribe((file: any) => {
      console.log(file);
      this.res = [file];
      this.id_project = this.res._id
    });
  }
  AddVote(f) {
    this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;
    this.APIService.StudentVoteProject(this.id_user, f).subscribe((data: any) => {
      console.log('add vote', data)
      this.ngOnInit()
    })
  }
  unfollowCourse() {
    this.id_course = this.router.snapshot.paramMap.get('id');
    this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;
    this.APIService.UnfollowCourse(this.id_user, this.id_course).subscribe((data: any) => {
      console.log(data);
      // this.hidden= true;
      /*  for (let i = 0; i < this.followers.length; i++) {
        console.log('cc', this.followers[i].user_id)
        if( this.followers[i].user_id === this.id_user){
          this.show;
          this.hidden
        }
        else{
          this.show=false;
          this.hidden=true;
          }
      } */
      this.show = true;
      this.hidden = false;
      this.ngOnInit()
    })
  }

  unvoteprojrct(f) {
    this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;
    this.APIService.studentdeleteVote(this.id_user, f).subscribe((data: any) => {
      console.log(data)
      this.show = true;
      this.hidden = false;
      this.ngOnInit()
    })


  }
  editComment(f) {
    this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;

    let commentObj = {
      comment_user: this.id_user,
      comment_course: this.router.snapshot.paramMap.get('id'),
      comment_content: this.CommentForm.value.comment_content
    }
    this.ApiService.editComment(f, commentObj).subscribe((data: any) => {
      console.log(data)
      this.ngOnInit()
    })
  }
  getIdComment(f, a) {
    this.IdComment = f
    this.CommentForm.controls['comment_content'].setValue(a)
  }

  deleteComment(f) {
    this.ID = this.router.snapshot.paramMap.get('id')

    this.ApiService.deleteComment(this.ID, f).subscribe((data: any) => {
      console.log(data)
      this.ngOnInit()
    })
  }
  StudentDeleteProject(id_project) {
    this.id_user = jwt_decode(this.cookiesService.get('token')).id._id;
    this.id_course = this.router.snapshot.paramMap.get('id');
    this.APIService.StudentDeleteProject(id_project, this.id_user, this.id_course).subscribe((data: any) => {
      console.log(data)
      this.ngOnInit()
    })
  }
  getProjectIndex(i) {
    this.i = i;
    console.log(i)
    this.ProjectForm.controls['project_title'].setValue(this.projects[i].project_title)
    this.ProjectForm.controls['project_content'].setValue(this.projects[i].project_content)

  }
  StudentEditPtoject(i) {
    if (this.ProjectForm.value) {
      this.id_user = jwt_decode(this.cookiesService.get('token')).id._id
      const formdata = new FormData
      formdata.append('project_title', this.ProjectForm.value.project_title)
      formdata.append('project_content', this.ProjectForm.value.project_content)
      formdata.append('project_user', this.id_user)
      if (this.selectedImage) {
        formdata.append('project_image', this.selectedImage)
      }
      this.APIService.UserEditProject(i, formdata).subscribe((data: any) => {
        this.project = data
        console.log(data)
        this.ngOnInit()
      })
    }
  }
  slice(f) {
    console.log(f);
    this.getpara = f.slice(0, -50);
    return this.getpara;
  }
}





