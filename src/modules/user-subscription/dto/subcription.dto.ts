import { IsBoolean, IsInt, IsString } from "class-validator"

export class subscriptionDto {
    @IsString()
    userId: string
    @IsString()
    planId: string
    @IsInt()
    endDate: number
    @IsString()
    status: string
    @IsBoolean()
    autoRenew: boolean
}