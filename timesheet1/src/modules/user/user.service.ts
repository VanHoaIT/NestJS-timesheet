import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BranchEntity } from '../branch/branch.entity';
import { LevelEntity } from '../level/level.entity';
import { PostitionEntity } from '../postition/postition.entity';
import { UserTypeEntity } from '../UserType/userType.entity';
import { CreateUserDto } from './dto/creater-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>,
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
    @InjectRepository(PostitionEntity)
    private postitionRepository: Repository<PostitionEntity>,
    @InjectRepository(UserTypeEntity)
    private userTypeRepository: Repository<UserTypeEntity>,
  ) {}

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return Boolean(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password, sex, branchId, typeId, levelId, postition } =
      createUserDto;
    if (await this.isEmailExist(email)) {
      throw new BadRequestException('Email already exists');
    }

    const branch = await this.branchRepository.findOneBy({ id: branchId });
    const type = await this.userTypeRepository.findOneBy({ id: typeId });
    const level = await this.levelRepository.findOneBy({ id: levelId });
    const postitionEntity = await this.postitionRepository.findOneBy({
      id: postition,
    });

    if (!branch || !type || !level || !postitionEntity) {
      throw new BadRequestException(
        'Invalid branch, type, level, or postition',
      );
    }

    const user = this.userRepository.create({
      email,
      password,
      sex,
      branch,
      type,
      level,
      postition: postitionEntity,
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
