import { Component } from '@angular/core';
import { Api } from '../../services/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  contactForm: FormGroup;
  constructor(
    private apiService: Api,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  onSubmit() {
    this.apiService.submitForm(this.contactForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.contactForm.reset();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
