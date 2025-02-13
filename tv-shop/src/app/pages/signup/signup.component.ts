
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService, User } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

    const newUser: User = this.signupForm.value;

    this.signupService.signup(newUser).subscribe({
      next: (user) => {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('userName', user.name);
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = "Une erreur est survenue lors de l'inscription.";
      }
    });
  }
}
