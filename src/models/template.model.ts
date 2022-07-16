import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';
import * as mongoose from 'mongoose'
import { Type } from 'class-transformer';
import { contentModel, content } from './content.model';

export type templateDoc = template & Document;
@Schema()
export class template {
    @Prop({ required: true })
    template_code: String; 

    @Prop({ type: [contentModel] })
    @Type(() => content)
    content: [
        content
    ]
}


export const templateModel = SchemaFactory.createForClass(template)