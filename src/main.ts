import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transfom.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 跨域
  app.enableCors();

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Instant Messaging')
    .setDescription('冰糖的即时通讯系统')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000).then(() => {
    console.log(
      '后台服务已经开启：' +
        'http://localhost:3000\n' +
        'swagger文档：' +
        'http://localhost:3000/api',
    );
  });
}
bootstrap();
