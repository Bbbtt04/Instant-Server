import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly UserService: UserService,
  ) {
    super({});
  }

  async validate(username: string, password: string): Promise<any> {
    const isexit = await this.authService.findUser(username);
    if (!isexit) {
      this.UserService.create({
        username,
        password,
        avatar: `https://api.multiavatar.com/Binx%${Math.floor(
          Math.random() * 50000,
        )}`,
      });
    }
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('用户名或密码错误', 401);
    }
    return { username, password };
  }
}
