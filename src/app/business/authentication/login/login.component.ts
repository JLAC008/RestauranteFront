import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  user: string = '';
  password: string = '';
  fcmToken: string = 'tokenrandomdepruebas';

  constructor(private authService: AuthService, private router: Router){

  }

  login(): void{
    this.authService.login(this.user,this.password, this.fcmToken).subscribe({
      next: ()=> this.router.navigate(['/dashboard']),
      error: (err) => console.error('Login failed', err)
    })
  }

}
