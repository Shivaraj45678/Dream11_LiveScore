import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup;
  submitted = false;
  user: any;

  constructor(private formBuilder: FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() { return this.registrationForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }else{
      this.user=this.registrationForm.value
      console.log('Form Submitted!', this.registrationForm.value);
      this.userService.addUser(this.user).subscribe((res)=>{
        console.log(res)
      })
    }

  }
}
