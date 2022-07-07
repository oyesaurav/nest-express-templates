import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose';

export type templateDoc = template & Document;
@Schema()
export class template {
    @Prop({ required: true })

    @Prop({ required: true })

    @Prop({ required: true })
}

export const templateModel = SchemaFactory.createForClass(template)