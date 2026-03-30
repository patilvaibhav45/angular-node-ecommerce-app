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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _auth = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  loginForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  passwordVisible = signal(false);

  private returnUrl = signal<string | null>(null);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.returnUrl.set(this._route.snapshot.queryParams['returnUrl'] || null);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this._auth
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          const url = this.returnUrl() || '/';
          this._router.navigateByUrl(url);
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Authentication failed');
          this.loading.set(false);
        },
      });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((v) => !v);
  }
}

