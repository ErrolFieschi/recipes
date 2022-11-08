import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loading = false;
  alertSuccess: boolean = false;
  alertError: boolean = false;
  alertValue!: any;

  mainForm!: FormGroup;
  emailCtrl!: FormControl;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initMainForm();
  }

  private initMainForm(): void {
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.mainForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.formBuilder.control('', Validators.required)
    })
  };

  onLogin(): void {
    console.log(this.mainForm.value);
    //this.auth.login(); // faire l'appelle serveur, retourner la réponse ok si ok pas ok si pas ok
    //this.router.navigateByUrl('/mes-recettes');

    this.loading = true;
    console.log(this.mainForm.value);
    this.authService.getTokenFromLogin(this.mainForm.value).pipe(
      tap(connected => {
        this.loading = false;
        if (connected) {
          console.log(connected);
          this.alertValue = connected;
          this.authService.login(this.alertValue.token);
          this.authService.getToken();
          this.authService._isLoggedIn$.next(true);
          localStorage.setItem('auth', this.authService.getToken());
        } else {
          this.alertError = true;
          console.error('Echec de la connexion');
        }
      })
    ).subscribe((result) => console.warn(result));
  }
  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'Merci de rentrer une adresse mail valide'
    } else {
      return 'Ce champ contient une erreur';
    }
  }

}
