import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatService } from '../../../app/services/cat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ FormsModule ],
  standalone: true,
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private catService: CatService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = { username: this.username, password: this.password };
    this.catService.registerUser(userData).subscribe(
      
      () => {
        console .log(userData)
        alert('User registered successfully');
        this.router.navigate(['/login']); 
      },
      (error) => {
        console .log(userData)
        console.error('Error registering user', error);
        alert('Ha ocurrido un error. Verifique todos los campos');
      }
    );
  }
}
