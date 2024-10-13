// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';  
// import { FormsModule } from '@angular/forms';
// import { ButtonModule } from 'primeng/button';
// import { DomSanitizer } from '@angular/platform-browser';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   standalone: true,
//   imports: [FormsModule, ButtonModule]
// })
// export class LoginComponent {

//   username: string = '';
//   password: string = '';

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private sanitizer: DomSanitizer
//   ) {}

//   sanitizeInput(input: string): string {

//     const safeInput = this.sanitizer.sanitize(1, input); 

//     return safeInput || '';
//   }

//   async login() {
//     if (!this.username.trim()) {

//       alert('Please enter a username.');

//       return;
//     }
    
//     if (!this.password.trim()) {

//       alert('Please enter a password.');

//       return;
//     }

//     const sanitizedUsername = this.sanitizeInput(this.username);
//     const sanitizedPassword = this.sanitizeInput(this.password);

//     if (!sanitizedUsername || sanitizedUsername.trim() === '') {

//       alert('Invalid username. Please avoid using special characters.');

//       return;
//     }

//     if (!sanitizedPassword || sanitizedPassword.trim() === '') {

//       alert('Invalid password. Please avoid using special characters.');

//       return;
//     }

//     const success = await this.authService.login(sanitizedUsername, sanitizedPassword);

//     if (success) {

//       this.router.navigate(['/contacts']); 

//     } else {

//       alert('Incorrect username or password.');
      
//     }
//   }

//   navigateToRegister() {

//     this.router.navigate(['/register']);

//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    MessageModule,
    DividerModule,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  sanitizeInput(input: string): string {
    const safeInput = this.sanitizer.sanitize(1, input); // 1: SecurityContext.HTML
    return safeInput || '';
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginError = 'Please fill in both fields.';
      return;
    }

    const sanitizedUsername = this.sanitizeInput(this.loginForm.value.username);
    const sanitizedPassword = this.sanitizeInput(this.loginForm.value.password);

    if (!sanitizedUsername || sanitizedUsername.trim() === '') {
      this.loginError = 'Invalid username. Please avoid using special characters.';
      return;
    }

    if (!sanitizedPassword || sanitizedPassword.trim() === '') {
      this.loginError = 'Invalid password. Please avoid using special characters.';
      return;
    }

    const success = await this.authService.login(sanitizedUsername, sanitizedPassword);
    if (success) {
      this.router.navigate(['/contacts']); 
    } else {
      this.loginError = 'Incorrect username or password.';
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
