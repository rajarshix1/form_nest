import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';

@Injectable()
export class FormService {
    constructor(
        @InjectModel(Form.name)
        private formModel: Model<FormDocument>,
        @InjectModel(Submission.name)
        private submissionModel: Model<SubmissionDocument>,
      ) { }

    async getForms(userid:string): Promise<any> {
        console.log(userid);
        
        const forms = await this.formModel.find({userid: userid})
          return(forms)
    }
    async getFormById(id:any): Promise<any> {  
        console.log('ID',id);
              
        const forms = await this.formModel.findById(id)
          return(forms)
    }

    async createForm(data: any, userid:string): Promise<any> {
        try {
          console.log(data);
            const created = await (
              await this.formModel.create({...data, userid: userid})
            ).save();
    
            return {
                status: 1,
              message: "Form Created Successfully",
              data: created
            };
          } 
         catch (error) {
          return { status: 0, message: error.message };
        }
      }

    async createSubmission(formid:string, data: any, userid:string): Promise<any> {
        try {
          console.log(data);
            const created = await (
              await this.submissionModel.create({formid: formid, userid:userid, data:data})
            ).save();
    
            return {
                status: 1,
              message: "Submission Created Successfully",
              data: created
            };
          } 
         catch (error) {
          return { status: 0, message: error.message };
        }
      }
}
