
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {

    @Prop({ required: true })
    formid: string;

    @Prop({ required: true })
    userid: string;

    @Prop({ required: true , type: []})
    data: object;

    @Prop({ default: Date.now() })
    createdAt: Date;
}


export const SubmissionSchema = SchemaFactory.createForClass(Submission);
