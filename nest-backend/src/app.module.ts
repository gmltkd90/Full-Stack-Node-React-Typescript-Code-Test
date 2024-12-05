import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { AuthModule } from './auth/auth.module'; // Your AuthModule
import { InvoicesModule } from './invoices/invoices.module'; // Your InvoicesModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,  
    InvoicesModule,  
  ],
})
export class AppModule {}
