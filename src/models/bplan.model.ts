import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type bplanDoc = bplan & Document;
@Schema()
export class bplan {
    @Prop({ required: true })
    t_id: String; 

    @Prop()
    content: [{
        heading: String,
        body : String
    }]

    @Prop()
    c_id: String; 
}

export const bplanModel = SchemaFactory.createForClass(bplan)