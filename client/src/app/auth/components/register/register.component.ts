import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // standalone: true,
  imports: [NzButtonModule, FormsModule],
})
export class RegisterComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;
  private returnUrl: string | null = null;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || null;
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.fullName && this.password && this.email && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
      } else {
        this.loading = true;
        this._auth
          .register({
            fullName: this.fullName,
            email: this.email,
            password: this.password,
          })
          .subscribe(
            (res) => {
              this.loading = false;
              const queryParams: any = {};
              if (this.returnUrl) queryParams.returnUrl = this.returnUrl;
              this._router.navigate(['/login'], { queryParams });
            },
            (err) => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      }
    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  canSubmit(): boolean {
    return this.fullName && this.email && this.password && this.confirmPassword
      ? true
      : false;
  }
}
