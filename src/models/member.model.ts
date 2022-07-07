import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type memberDoc = member & Document;
@Schema()
export class member {
    @Prop({ required: true })
    email: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true })
    company_id: String;
}

export const memberModel = SchemaFactory.createForClass(member)