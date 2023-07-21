import { UserService } from './user.service';
import { Body, Controller, Post, Res} from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly appService: UserService) {}

    @Post('register')
    async register(@Body() createUser: any){
      if(createUser.email && createUser.password && createUser.password.length>=6 
      ){
        return await this.appService.register(createUser)
      }
      else if(createUser.password.length<6){
        return({status: 0, message:"Password must be at least 6 characters long"})
      }
      else{
        return({status: 0, message:"Please fill up the form correctly"})
      }
    }
    @Post('login')
    async login(@Body() loginUser: any, @Res() res:any){
      if(loginUser.email && loginUser.password.length>=6){
        const data= await this.appService.login(loginUser)
        console.log('data', data);
       if(data.status==0){
        res.send(data)
       }
       else{
        res.cookie('access_token', data.JWT, 
        {
          httpOnly: true,
          secure: false,
          // sameSite: 'lax',
          expires: new Date(Date.now() + 30 * 24 * 60 * 1000),
      })
        data.JWT = undefined
        res.send({status: 1, data:data})
       }
    }
    else{
        res.send({status: 0, message: "Invalid username or password"})
    }
    }
}
