import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type bplanDoc = bplan & Document;
@Schema()
export class bplan {
    @Prop({ required: true })
    

    @Prop({ required: true })
    

    @Prop({ required: true })
    
}

export const bplanModel = SchemaFactory.createForClass(bplan)