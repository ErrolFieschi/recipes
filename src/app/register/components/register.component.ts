import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { RegisterService } from '../services/register.service';
import { confirmEqualValidator } from '../../shared/validators/confirm-equal.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
  ]
})
export class RegisterComponent implements OnInit {

  loading = false;
  alertSuccess: boolean = false;
  alertError: boolean = false;
  alertValue!: any;

  mainForm!: FormGroup;

  emailForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;

  loginInfoForm!: FormGroup;
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      emailGroup: this.emailForm,
      loginInfo: this.loginInfoForm
    });
  }

  private initFormControls(): void {

    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.confirmEmailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);

    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'
    });

    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);

    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
  }

  private initFormObservables() {
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.emailCtrl.value && this.confirmEmailCtrl.value)
    )

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.passwordCtrl.value && this.confirmPasswordCtrl.value)
    );
  }

  // onSubmitForm() {
  //   console.log(this.mainForm.value);
  //   this.registerService.addUser(this.mainForm.value).subscribe((result) => console.warn(result)); //console.warn(result) me renvoi la reponse du serveur
  //   this.mainForm.reset();
  // };

  onSubmitForm() {
    this.loading = true;
    console.log(this.mainForm.value);
    this.registerService.addUser(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          console.log(saved);
          this.alertValue = saved;
          this.alertSuccess = true;
          this.resetForm();
        } else {
          this.alertError = true;
          console.error('Echec de l\'enregistrement');
        }
      })
    ).subscribe((result) => console.warn(result));
  };

  private resetForm() {
    this.mainForm.reset();
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
