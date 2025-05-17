import { IsString } from "class-validator";

export class CreateCotegoryeDto {
    @IsString()
    name: string
    @IsString()
    description: string
    @IsString()
    slug:string
}
