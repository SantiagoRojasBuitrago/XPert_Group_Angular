import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatService } from '../../../app/services/cat.service';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private catService: CatService, private router: Router) {}

  login(): void {
    this.catService.loginUser(this.username, this.password).pipe(
      catchError(error => {
        this.errorMessage = 'Las credenciales son invalidas'; 
        alert(this.errorMessage); 
        return of(null);
      })
    ).subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
