import { FormService } from './form.service';
import { Get, Body, Controller, Post, Req, Res, Query} from '@nestjs/common';

@Controller('form')
export class FormController {
    constructor(private readonly appService: FormService) {}
    @Get('')
    async getForms(@Query() query:any, @Res() res:any){
        console.log(query);
        if(query.id){
            const data = await this.appService.getFormById(query.id)
            res.send(data)
        }
        else{
            const data = await this.appService.getForms(res.locals.user.id)
            res.send(data)
        }
    }

    @Post('create')
    async create(@Req() req: any,@ Res() res: any){
        console.log(req.body);
        console.log(res.locals.user);   
      if(req.body.title && req.body.components 
      ){
        const data = await this.appService.createForm(req.body, res.locals.user.id)
        res.send(data)
      }
      else{
        res.send({status: 0, message:"Please fill up the form correctly"})
      }
    }

    @Post('submit')
    async submit(@Req() req: any,@ Res() res: any){
        console.log(req.body);
        console.log(res.locals.user);   
    //   if(req.body.title && req.body.components 
    //   ){
        const data = await this.appService.createSubmission(req.body.formid, req.body.data, res.locals.user.id)
        res.send(data)
    //   }
    //   else{
    //     res.send({status: 0, message:"Please fill up the form correctly"})
    //   }
    }
}
