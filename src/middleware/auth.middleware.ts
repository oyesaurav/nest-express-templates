import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.AT;
  const refreshToken = req.cookies.RT;
  console.log(accessToken);
  console.log(refreshToken);

  if (accessToken === null) return res.status(401).send(false)

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) return res.status(400).send(false)
          const newAccessToken = jwt.sign(
            {
              email: user.email,
              name: user.name,
              phone: user.phone,
              stCode: user.stCode,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '1d',
            },
          );
          res.cookie('AT', newAccessToken);
          req.body = user;
          next();
        },
      );
    } else {
      req.body = user;
      next();
    }
  });
}
