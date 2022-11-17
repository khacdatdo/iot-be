import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = exception.status || exception.response?.status || 500;
    const message =
      exception.response?.data?.error || // HttpModule error message
      exception.response?.message ||
      exception.message ||
      'Something went wrong';
    const error =
      (statusCode === 401 && (exception.response?.error || 'Unauthorized')) ||
      exception.response?.error ||
      (exception.response?.data?.error && 'HttpModule Error');
    ('Internal Server Error');
    const body = {
      statusCode,
      message,
      error,
      path: request.path,
    };

    // Log
    Logger.error(
      JSON.stringify(body) +
        ' ---- ' +
        'Host: ' +
        request.headers.host +
        ', User-agent: ' +
        request.headers['user-agent'],
      'AllExceptionsFilter',
    );

    response.status(statusCode).json(body);
  }
}
