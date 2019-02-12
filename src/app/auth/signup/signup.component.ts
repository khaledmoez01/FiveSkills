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
      user_first_name: new FormControl('', [Validators.required]),
      user_last_name: new FormControl('', [Validators.required]),
      user_email: new FormControl('', [Validators.required, Validators.email]),
      user_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      user_birthday: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
  }
  addUsers() {
    console.log(this.userForm.value)
    const formData = new FormData();
    formData.append('user_first_name', this.userForm.value.user_first_name)
    formData.append('user_last_name', this.userForm.value.user_last_name)
    formData.append('user_email', this.userForm.value.user_email)
    formData.append('user_password', this.userForm.value.user_password)
    formData.append('user_birthday', this.userForm.value.user_birthday)
    formData.append('user_image', this.selectedImage, this.selectedImage.name)

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
