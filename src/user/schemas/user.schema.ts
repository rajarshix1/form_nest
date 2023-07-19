
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    email: string;

    @Prop({ required: false })
    hashPassword: string;

    @Prop({ default: Date.now() })
    createdAt: Date;
}


export const UserSchema = SchemaFactory.createForClass(User);