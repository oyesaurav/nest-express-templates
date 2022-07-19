import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer';
import {Document} from 'mongoose';
import { content, contentModel } from './content.model';

export type bplanDoc = bplan & Document;
@Schema()
export class bplan {
    @Prop({ required: true })
    t_id: String; 

    @Prop({ type: [contentModel] })
    @Type(() => content)
    content: [
        content
    ]

    @Prop()
    c_id: String; 
}

export const bplanModel = SchemaFactory.createForClass(bplan)