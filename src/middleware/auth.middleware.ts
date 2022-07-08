import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.AT;
  const refreshToken = req.cookies.RT;

  if (accessToken === null) next()

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error: any, user: any) => {
          if (error) return next()
          const newAccessToken = jwt.sign(
            {
              msg:"refresh"
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '15min',
            },
          );
          res.cookie('AT', newAccessToken);
          res.set('Authorization', 'Bearer ' + newAccessToken);
          next();
        },
      );
    } else {
      next();
    }
  });
}
