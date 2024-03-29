import { environment } from './../../../environments/environment';
import { AuthService } from './../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isInclude = this.isOnTheBlackList(request.url, environment.endpoints.handle_error_blackList);
        if(isInclude){
            return next.handle(request);
        }
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    Swal.fire('Su sesión expiró','','error').then(()=>{
                        this.authService.logout();
                        this.router.navigate(['/auth/login']);
                    });                    
                } else if (err.status === 404) {
                    Swal.fire('Error 404', `${ err.error.msg }`, 'error');
                } else if (err.status === 500) {
                    Swal.fire('Error 500', `${ err.error.msg }`, 'error');
                }
                return throwError(err);
            })
        );
    }

    isOnTheBlackList(url:string, paths: string[]):boolean{
    
        let isInclude:boolean = false;
    
        paths.forEach((path:string)=>{
          if(url.endsWith(path)){
            isInclude = true;
          }
        });

        return isInclude;
      }

}
