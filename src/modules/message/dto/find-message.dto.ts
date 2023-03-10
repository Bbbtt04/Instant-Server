import { ApiProperty } from '@nestjs/swagger';

export class findMessageDTO {
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
