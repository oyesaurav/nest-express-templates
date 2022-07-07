import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type bplanDoc = bplan & Document;
@Schema()
export class bplan {
    @Prop({ required: true })
    t_id: String; 

    @Prop()
    content: [{
            section: [{   // array of the different sections
            heading: String; // heading of each section
            body: String; // body in html including all sub heads, images and formatted text.
        }] 
    }]

    @Prop()
    c_id: String; 
}

export const bplanModel = SchemaFactory.createForClass(bplan)