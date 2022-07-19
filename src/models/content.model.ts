import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type contentDoc = content & Document;

@Schema()
export class content{
    @Prop()
    heading: String;

    @Prop({type: {}})
    body: {}
}

export const contentModel = SchemaFactory.createForClass(content)