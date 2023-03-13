import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    default: 'Bbbtt04',
    description: '用户名称',
    required: true,
  })
  username: string;
  @ApiProperty({
    default:
      'https://p3-passport.byteimg.com/img/user-avatar/6d960c848dd846feeec6cc2ae0fd834c~180x180.awebp',
    description: '用户头像',
    required: true,
  })
  avatar: string;
}
