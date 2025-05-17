import { IsBoolean, IsIn, IsInt, IsObject, IsString, IsUUID } from "class-validator"

export class PaymentDto {
    @IsUUID()
    userSubscriptionId: string
    @IsString()
    paymentMethod: string
    @IsObject()
    paymentDetails: object
    @IsString()
    externalTransactionId: string
    @IsInt()
    amount: number
    @IsString()
    status:string
}