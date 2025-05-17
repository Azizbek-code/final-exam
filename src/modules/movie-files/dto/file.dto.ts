import { IsString } from "class-validator";

export class FileMovie{
    @IsString()
    movieId: string
    @IsString()
    quality: string
    @IsString()
    language:string
}