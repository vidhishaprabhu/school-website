import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  constructor(
    private authService: Auth,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.max(3)]],
    });
  }
  register() {
    this.authService
      .register(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password,
      )
      .subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigateByUrl('/login');
          this.registerForm.reset();
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
