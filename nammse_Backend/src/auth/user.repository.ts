import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const secretkey = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, secretkey);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('이미 존재하는 아이디 입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
