import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    console.log(this.loginForm.value);
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (res: any) => {
          if (res) {
            const token = res.token;
            if (token) {
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(res.user));
              this.authService.startSessionTimer();
              this.router.navigate(['/dashboard']);
            }
          }
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.snackBar.open(err.error.message, 'Close', {
              duration: 3000,
            });
          } else {
            this.snackBar.open(err.error.message, 'Close', {
              duration: 3000,
            });
          }
        },
      });
  }
}
