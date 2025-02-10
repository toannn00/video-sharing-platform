import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(userInfo: UserDto): Promise<{ token: string }> {
    const { email, password } = userInfo;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      return this.signUp(userInfo);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async signUp(userInfo: UserDto): Promise<{ token: string }> {
    const { email, password } = userInfo;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: encryptedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
