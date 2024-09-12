import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { CatService } from '../../../app/services/cat.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let catService: CatService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RegisterComponent
      ],
      providers: [
        CatService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an alert if passwords do not match', () => {
    spyOn(window, 'alert');
    component.password = 'password';
    component.confirmPassword = 'differentPassword';
    component.register();
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
  });

  it('should call registerUser and navigate on successful registration', () => {
    spyOn(window, 'alert');
    const mockResponse = { success: true };
    spyOn(catService, 'registerUser').and.returnValue(of(mockResponse));
    
    component.username = 'testuser';
    component.password = 'password';
    component.confirmPassword = 'password';
    component.register();

    expect(catService.registerUser).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(window.alert).toHaveBeenCalledWith('User registered successfully');
  });

  it('should handle error during registration', () => {
    spyOn(window, 'alert');
    spyOn(catService, 'registerUser').and.returnValue(throwError(() => new Error('Error')));
    
    component.username = 'testuser';
    component.password = 'password';
    component.confirmPassword = 'password';
    component.register();

    expect(catService.registerUser).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
    expect(router.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ha ocurrido un error. Verifique todos los campos');
  });
});
