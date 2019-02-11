import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm : FormGroup;
  results: any;
  imageSrc: any;
  selectedImage: File;
  constructor( private ApiService :AuthService ) { 
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      birthday: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
  }
  addUsers() {
    console.log(this.userForm.value)
    const formData = new FormData();
    formData.append('firstname', this.userForm.value.firstname)
    formData.append('lastname', this.userForm.value.lastname)
    formData.append('email', this.userForm.value.email)
    formData.append('password', this.userForm.value.password)
    formData.append('birthday', this.userForm.value.birthday)
    formData.append('image', this.selectedImage, this.selectedImage.name)

    this.ApiService.login(formData).subscribe(async file => {
      //Read the result field from the JSON response.
      console.log(file)
      alert('you are added with success')

      console.log("file");
      this.results = file.data;
    })
}
selectedFile(event) {
  console.log(event.target.files[0])
  this.selectedImage = event.target.files[0]
}
 readURL(event): void {
  if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
  }
} 
}
