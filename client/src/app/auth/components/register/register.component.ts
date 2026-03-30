import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  DestroyRef,
} from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _auth = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  registerForm: FormGroup;
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  passwordVisible = signal(false);

  private returnUrl = signal<string | null>(null);

  constructor() {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.returnUrl.set(this._route.snapshot.queryParams['returnUrl'] || null);
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const { fullName, email, password } = this.registerForm.value;

    this._auth
      .register({ fullName, email, password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          const queryParams: any = {};
          if (this.returnUrl()) queryParams.returnUrl = this.returnUrl();
          this._router.navigate(['/login'], { queryParams });
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message || 'Registration failed');
          this.loading.set(false);
        },
      });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((v) => !v);
  }
}
