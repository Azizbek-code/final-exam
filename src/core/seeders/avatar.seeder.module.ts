import { Module } from "@nestjs/common";
import { SeederService } from "./avatar.seeder.service";


@Module({
    providers: [SeederService],
})
export class AvatarseederModule { }