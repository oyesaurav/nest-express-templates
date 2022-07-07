import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type templateDoc = template & Document;
@Schema()
export class template {
    @Prop({ required: true })
    template_code: String; 

    @Prop()
    content: [{
            section: [{   // array of the different sections
            heading: String; // heading of each section
            body: String; // body in html including all sub heads, images and formatted text.
        }] 
    }]
}

export const templateModel = SchemaFactory.createForClass(template)