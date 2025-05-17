import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { PlanModule } from './modules/plan/plan.module';
import { UsersModule } from './modules/users/users.module';
import { PaymenModule } from './modules/payment/payment.module';
import { UserSubscriptionModule } from './modules/user-subscription/user-subscription.module';
import { TransformInterceptor } from './common/interceptors/data.intercepto';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MoviesModule } from './modules/movies/movies.module';
import { CotegoryesModule } from './modules/cotegoryes/cotegoryes.module';
import { MovieCategoryModule } from './modules/movie-category/movie-category.module';
import { RewiewsModule } from './modules/rewiews/rewiews.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { MovieFilesModule } from './modules/movie-files/movie-files.module';


@Module({
  imports: [AuthModule, CoreModule, PlanModule, UsersModule, PaymenModule, UserSubscriptionModule, MoviesModule, CotegoryesModule, MovieCategoryModule, RewiewsModule, FavouritesModule, MovieFilesModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }
  ],
})
export class AppModule { }
