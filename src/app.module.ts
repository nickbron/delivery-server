import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [AuthModule, CategoryModule, UserModule, ProductModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
