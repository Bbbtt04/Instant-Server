import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import QueryUserDto from './dto/query-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(query: QueryUserDto) {
    if (query.username) {
      return await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.username', 'user.avatar'])
        .where('user.username = :username', { username: query.username })
        .getMany();
    }
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.avatar'])
      .getMany();
  }

  async findOne(username: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async create(user: CreateUserDto) {
    // 如果有重复的用户名，就抛出异常
    const existUser = await this.findOne(user.username);
    if (existUser) {
      throw new HttpException('用户名已存在', 401);
    }
    return await this.userRepository.save(user);
  }
}
