import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserInfoDto } from '../userInfo/dto/userInfo.dto';
import { CreateUserDto } from './dto/creater-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAll(): Promise<UserEntity[] | null> {
    return this.userService.getAll();
  }

  @Get(':email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<UserEntity | null> {
    return this.userService.getUserByEmail(email);
  }

  @Put('userinfo/:id')
  async updateUserInfo(
    @Param('id') id: number,
    @Body() updateUserinfo: UpdateUserInfoDto,
  ) {
    return this.userService.updateUserInfo(id, updateUserinfo);
  }
}
