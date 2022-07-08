import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type memberDoc = member & Document;
@Schema()
export class member {
    @Prop({ required: true })
    email: String;

    @Prop()
    password: String;
    
    @Prop()
    name: String;

    @Prop({ required: true })
    company_id: String;
}

export const memberModel = SchemaFactory.createForClass(member)