// src/app/auth.interceptor.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { StorageService } from '../servicios/storage.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let storageService: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: StorageService, useValue: { getToken: () => 'fake-token' } }, // Mock del StorageService
        { provide: Router, useValue: { navigate: () => {} } } // Mock del Router
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header if token is present', () => {
    const testData = { name: 'Test' };
    const mockToken = 'mock-token';

    // Configura el servicio para devolver el token simulado
    spyOn(storageService, 'getToken').and.returnValue(mockToken);

    httpClient.get('/test').subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${mockToken}`);
    req.flush(testData);
  });

  it('should handle 401 error and redirect to login', () => {
    const mockError = new HttpErrorResponse({
      error: 'Unauthorized',
      status: 401,
      statusText: 'Unauthorized'
    });

    spyOn(router, 'navigate');
    httpClient.get('/test').subscribe(
      () => fail('should have failed with 401 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(401);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      }
    );

    const req = httpTestingController.expectOne('/test');
    req.flush(mockError.error, mockError);
  });

  it('should handle 403 error without redirect', () => {
    const mockError = new HttpErrorResponse({
      error: 'Forbidden',
      status: 403,
      statusText: 'Forbidden'
    });

    spyOn(router, 'navigate');
    httpClient.get('/test').subscribe(
      () => fail('should have failed with 403 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(403);
        expect(router.navigate).not.toHaveBeenCalled();
      }
    );

    const req = httpTestingController.expectOne('/test');
    req.flush(mockError.error, mockError);
  });
});
