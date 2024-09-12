import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatService } from './cat.service';

describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService]
    });

    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get breeds', () => {
    const mockBreeds = [{ id: '1', name: 'Persian' }, { id: '2', name: 'Siamese' }];
    
    service.getBreeds().subscribe(breeds => {
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne(`${apiUrl}/breeds`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });

  it('should search breeds', () => {
    const query = 'Persian';
    const mockBreeds = [{ id: '1', name: 'Persian' }];
    
    service.searchBreeds(query).subscribe(breeds => {
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne(`${apiUrl}/breeds/search?q=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });

  it('should get images by breed ID', () => {
    const breedId = '1';
    const mockImages = [{ url: 'http://example.com/image1.jpg' }, { url: 'http://example.com/image2.jpg' }];
    
    service.getImagesByBreedId(breedId).subscribe(images => {
      expect(images).toEqual(mockImages);
    });

    const req = httpMock.expectOne(`${apiUrl}/imagesbybreedid/${breedId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });

  it('should register user', () => {
    const userData = { username: 'john', password: '1234' };
    const mockResponse = { success: true };
    
    service.registerUser(userData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
    req.flush(mockResponse);
  });

  it('should login user', () => {
    const username = 'john';
    const password = '1234';
    const mockResponse = { token: 'abcdef' };
    
    service.loginUser(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/login?username=${username}&password=${password}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
