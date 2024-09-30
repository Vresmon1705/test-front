import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DashboardComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mfa: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit() {
    const { email, password, mfa } = this.loginForm.value;

    const validEmail = 'prueba@nuvantglobal.com';
    const validPassword = 'Nu12345';
    const validMFA = '123456';

    if (email === validEmail && password === validPassword && mfa === validMFA) {
      
    this.errorMessage = 'Login Exitoso, Bienvenido!!!';
    this.router.navigate(['/dashboard']);
    }

    this.errorMessage = 'Credenciales incorrectas, Intenta de nuevo';
  }
}
