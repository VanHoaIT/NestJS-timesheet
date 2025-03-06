import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateUserInfoDto } from '../userInfo/dto/userInfo.dto';
import { UserInfoEntity } from '../userInfo/userInfo.entity';
import { CreateUserDto } from './dto/creater-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserInfoEntity)
    private userInfoRepository: Repository<UserInfoEntity>,
  ) {}

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return Boolean(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const {
      email,
      password,
      sex,
      branchId,
      typeId,
      levelId,
      positionId,
      phone,
      bank,
      bank_account,
      current_address,
    } = createUserDto;
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
      position: { id: positionId },
    });
    const savedUser = await this.userRepository.save(user);

    const newUserInfo = this.userInfoRepository.create({
      user: savedUser,
      phone,
      bank,
      bank_account,
      current_address,
    });

    const savedUserInfo = await this.userInfoRepository.save(newUserInfo);

    savedUser.userInfo = savedUserInfo;
    await this.userRepository.save(savedUser);

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
      relations: ['branch', 'type', 'level', 'position', 'userInfo'],
    });
    return user;
  }

  async updateUserInfo(user_id: number, updateUserInfo: UpdateUserInfoDto) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { user: { id: user_id } },
      relations: ['user'],
    });

    if (!userInfo) {
      throw new NotFoundException('UserInfo not found');
    }

    Object.assign(userInfo, updateUserInfo);
    return await this.userInfoRepository.save(userInfo);
  }
}
