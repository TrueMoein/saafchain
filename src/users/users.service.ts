import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto).save();

    return user;
  }

  async login(dto: CreateUserDto) {
    const query = this.userRepo
      .createQueryBuilder('user')
      .where(
        `user.username = '${dto.username}' AND user.password = '${dto.password}'`,
      );

    const user = await query.getOne();

    return { user, isOk: !!user };
  }
}
