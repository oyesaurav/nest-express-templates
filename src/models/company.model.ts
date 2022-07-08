import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CompanyDoc = company & Document;

@Schema()
export class company {
    @Prop({required: true})
    cname: String;

    @Prop({ required: true })
    cemail: String;

    @Prop({ required: true })
    cphone: String;

    @Prop()
    address: String;

    @Prop()
    logo_url: String;

    @Prop()
    domain: String;

    @Prop()
    members: [{
        pname: String;
        pemail: String;
    }]
}

export const companyModel = SchemaFactory.createForClass(company)