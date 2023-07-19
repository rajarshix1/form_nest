import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  Res,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
 
  async use(req: Request, @Res() res: any, next: NextFunction) {
    console.log('inside auth middleware');

    const accessToken = req.cookies.access_token;
    let user: any;
    let data: any;

    if (!accessToken) {
      res.send({ status: 0, message: 'Session Expired! Please log in again!' });
    }

    try {
      data = verify(accessToken, process.env.JWTSECRET);
      console.log(data);
    } catch (error) {
      throw new ForbiddenException({
        status: 0,
        message: 'Session Expired! Please log in again!',
        data: error.name,
      });
    }
    res.locals.user = data.data;
    next();
  }
}
