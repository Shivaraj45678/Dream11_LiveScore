import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  user: any;

  constructor(private formBuilder: FormBuilder,private userService:UserService,private router: Router ) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((res:any)=>{
      console.log(res)


    })
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }else{
      this.user=this.loginForm.value
      console.log('Form Submitted!', this.loginForm.value);
      this.userService.getAllUser().subscribe((res:any)=>{
        const user = res.find((u: { email: any; password: any; }) => u.email === this.loginForm.value.email && u.password === this.loginForm.value.password);
        if (user) {
          console.log('Login successful!');
          this.router.navigate(['register']);
        } else {
          console.error('Invalid email or password');
        }

      })
    }

  }
}
