import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: `${path}/uploads`,
            serveRoot: '/uploads',
        }),
        ConfigModule.forRoot(),
        AuthModule,
        CategoryModule,
        UserModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
