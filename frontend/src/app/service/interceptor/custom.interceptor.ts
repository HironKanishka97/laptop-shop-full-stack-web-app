import {HttpInterceptorFn} from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = localStorage.getItem('token');
  const cloneReq = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${myToken}`
    }
  });
  return next(cloneReq);
};
