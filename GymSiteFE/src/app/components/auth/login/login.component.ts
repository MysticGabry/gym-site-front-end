import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {LoginRequest} from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  hidePassword: boolean = true;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      return;
    }

    const request: LoginRequest = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(request).subscribe({
      next: (response) => {

        if (!response || !response.token || !response.role) {
          this.errorMessage = 'Risposta incompleta dal server.';
          return;
        }

        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);

        localStorage.setItem('user_id', response.username);

        console.log("LOGIN USER:", response.username);
        console.log("LOGIN ROLE:", response.role);

        // Redireziona in base al ruolo
        if (response.role === 'ADMIN' || response.role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/products']);
        }
      },

      error: (err) => {
        this.errorMessage = 'Credenziali errate o server non raggiungibile.';
        console.error(err);
      }
    });
  }
}
