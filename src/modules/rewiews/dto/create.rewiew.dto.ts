import { IsInt, IsString } from "class-validator"

export class RewiewDto{
    @IsInt()
    rating: number
    @IsString()
    comment:string
}