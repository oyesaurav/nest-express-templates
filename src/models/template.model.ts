import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type templateDoc = template & Document;
@Schema()
export class template {
    @Prop({ required: true })
    template_code: String; 

    @Prop()
    content: [{
        heading: String,
        body : String
    }]
}

export const templateModel = SchemaFactory.createForClass(template)