import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  // constructor(private readonly configService:ConfigService)
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(`start timeoutIntercptor`);
    return next.handle().pipe(
      // timeout(this.configServer.get<number>('TIMEOUT'))
      tap((res) => {
        console.log(`response is${res}`);
      }),
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => new Error(err));
      }),
    );
  }
}
