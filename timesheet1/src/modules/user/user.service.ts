import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/creater-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return Boolean(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password, sex, branchId, typeId, levelId, postitionId } =
      createUserDto;
    if (await this.isEmailExist(email)) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.userRepository.create({
      email,
      password,
      sex,
      branch: { id: branchId },
      type: { id: typeId },
      level: { id: levelId },
      postition: { id: postitionId },
    });
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async getAll(): Promise<UserEntity[] | null> {
    return this.userRepository.find();
  }

  async findOne(
    findData: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: findData,
    });
  }

  async setRefreshToken(userId: number, refreshToken: string) {
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepository.update(userId, {
      hashRefreshToken,
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['branch', 'type', 'level', 'postition'],
    });
    return user;
  }
}
