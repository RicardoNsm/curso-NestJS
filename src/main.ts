import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)


  //versionamento
  app.enableVersioning({
    type: VersioningType.URI,
  })

  // swagger
   const config = new DocumentBuilder()
    .setTitle('Curso NestJS - Tasks API')
    .setDescription('API desenvolvida durante o curso de NestJS - monaro Dev')
    .setVersion('1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // validações

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
