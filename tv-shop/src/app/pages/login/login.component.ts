
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe(
      (users) => {
        if (users && users.length > 0) {
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('userName', users[0].name);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = "Identifiants invalides.";
        }
      },
      (error) => {
        this.errorMessage = "Une erreur est survenue lors de la connexion.";
      }
    );
  }
}
