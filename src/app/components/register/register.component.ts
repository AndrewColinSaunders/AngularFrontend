import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    DividerModule,
    CommonModule
  ]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  registerError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeInput(input: string): string {
    const safeInput = this.sanitizer.sanitize(1, input); 
    return safeInput || '';
  }

  async register() {
    const sanitizedUsername = this.sanitizeInput(this.username);
    const sanitizedPassword = this.sanitizeInput(this.password);

    if (!sanitizedUsername || sanitizedUsername.trim() === '') {
      this.registerError = 'Invalid username. Please avoid using special characters.';
      return;
    }

    if (!sanitizedPassword || sanitizedPassword.trim() === '') {
      this.registerError = 'Invalid password. Please avoid using special characters.';
      return;
    }

    const result = await this.authService.register(sanitizedUsername, sanitizedPassword);
    if (result) {
      alert('Registration successful');
      this.router.navigate(['/login']);
    } else {
      this.registerError = 'Registration failed';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
