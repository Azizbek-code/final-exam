import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @Type(() => Number)
    @IsNumber()
    releaseYear: number;

    @Type(() => Number)
    @IsNumber()
    durationMinutes: number;

    @IsString()
    subscriptionType: string;

    @Type(() => Number)
    @IsNumber()
    rating: number;

    @IsString()
    slug: string
}
