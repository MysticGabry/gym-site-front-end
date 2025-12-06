
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AuthResponse } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  hidePassword = true;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.]{8,}$/;
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(passwordRegex)
      ]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      this.authService.register({ username, email, password }).subscribe({
        next: (response: AuthResponse) => {
          console.log('Registrazione riuscita:', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = 'Registrazione fallita. Username o email già in uso.';
          console.error('Errore Registrazione:', err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
