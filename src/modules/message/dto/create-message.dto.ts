import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    default: 'Hello',
    description: '消息内容',
    example: 'Hello',
    required: true,
  })
  content: string;
  @ApiProperty({
    default: 'Bbbtt04',
    description: '发送者',
    example: 'Bbbtt04',
    required: true,
  })
  sender: string;
  @ApiProperty({
    default: 'wbt',
    description: '接收者',
    example: 'wbt',
    required: true,
  })
  receiver: string;
}
