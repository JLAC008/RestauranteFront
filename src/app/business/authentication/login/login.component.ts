import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { loginEs } from '../../../../settings/idiomas/esp'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  username: string = '';
  password: string = '';
  fcmToken: string = 'tokenrandomdepruebas';
  errorMessage: string = '';

  //Texto plano
  loginTexts = loginEs;
  //Fin texto plano
  
  constructor(private authService: AuthService, private router: Router){

  }

  login(): void{
    this.authService.login(this.username,this.password, this.fcmToken).subscribe({
      next: ()=> this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMessage = err.error.errorDescription; 
      }
    })
  }

}
