import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
     origin: ['https://aahar-i3ph.vercel.app','https://aahar-i3ph.vercel.app/'],
     credentials: true,
  };
  app.use(cors(corsOptions));
  await app.listen(process.env.PORT ?? 5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
