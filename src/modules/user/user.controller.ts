import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @Get()
  getUserInfo(@Req() req) {
    return req.user;
  }

  @Get('all')
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Patch()
  updateUser(@Body() updateUser: UpdateUserDto) {
    return this.userService.update(updateUser);
  }

  @Post('register')
  create(@Body() user: any) {
    return this.userService.create(user);
  }
}
