import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './schemas/form.schema';
import { Submission, SubmissionSchema } from './schemas/submission.schema';

@Module({
  imports: [ ConfigModule.forRoot(), MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }, { name: Submission.name, schema: SubmissionSchema }])],
  providers: [FormService],
  controllers: [FormController]
})
export class FormModule {}
