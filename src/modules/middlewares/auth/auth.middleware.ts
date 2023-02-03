import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import * as Cryptr from 'cryptr';

import { SecretsService } from 'src/modules/utils/secrets/service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly secretsService: SecretsService
    ) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
      
          const token = req.headers.authorization.split(' ')[1];
      
          const verifyToken = jwt.verify(token, this.secretsService.CRYPT_KEY);
      
          if (!verifyToken) {
              return res.status(401).json({ message: 'Unauthorized' });
          }
      
          const cryptr = new Cryptr(this.secretsService.CRYPT_KEY);
      
          const data = cryptr.decrypt(verifyToken.data);
      
          const authData = JSON.parse(data);
      
          req.headers.authData = authData;
      
          next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }


  }
}
