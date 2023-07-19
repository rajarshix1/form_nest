
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormDocument = Form & Document;

@Schema()
export class Form {

    @Prop({ required: true })
    userid: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true , type: []})
    components: object;

    @Prop({ default: Date.now() })
    createdAt: Date;
}


export const FormSchema = SchemaFactory.createForClass(Form);
