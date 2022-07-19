import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type tempDoc = temp & Document;

@Schema()
export class temp{
    @Prop()
    identifier: String;

    @Prop()
    expiresIn: Number;

    @Prop()
    otp: Number
}

export const tempModel = SchemaFactory.createForClass(temp)