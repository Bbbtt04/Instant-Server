import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { findMessageDTO } from './dto/find-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    return await this.messageRepository.save(createMessageDto);
  }

  async findAll(findMessage: findMessageDTO) {
    const { sender, receiver } = findMessage;
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.sender = :sender', { sender })
      .andWhere('message.receiver = :receiver', { receiver })
      .getMany();
    const messages2 = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.sender = :receiver', { receiver })
      .andWhere('message.receiver = :sender', { sender })
      .getMany();

    return [...messages, ...messages2].sort((a, b) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }
}
