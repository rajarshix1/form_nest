import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from "bcrypt";
import { Model } from 'mongoose';
import { sign } from "jsonwebtoken";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
      ) { }

  async register(createUser: any): Promise<any> {
    try {
      console.log(createUser);
      const existingEmail = await this.userModel
        .findOne(
          { email: createUser.email }
        )
        .exec();

      console.log("here");

      if (!existingEmail ) {
        const newUser: any = createUser;
        newUser.hashPassword = await bcrypt.hash(createUser.password, 10);
        const users = await (
          await this.userModel.create({
            ...newUser,
          })
        ).save();

        return {
            status: 1,
          message: "Registration Successful",
          data: this.sanitizeUser(users)
        };
      }  else if (existingEmail) {
        return { status: 0, message: "Email already registered" };

      } 
    } catch (error) {
      return { status: 0, message: error.message };
    }
  }

  /////////////////////////////Login////////////////////////////////

  async login(loginUser: any): Promise<any> {
    try {
      console.log(loginUser);


      let users = null
      users = await this.userModel
        .findOne({ email: loginUser.email  })

      console.log('usr', users);

      if (users) {
        const check = await bcrypt.compare(
          loginUser.password,
          users.hashPassword
        );
        console.log("check", check);
        let secret = process.env.JWTSECRET
        if (check) {
            return ({
                status: 1,
              message: "Login Successful",
              JWT: sign(
                {
                  data: {
                    id: users._id,
                    username: users.username,
                    createdAt: Date.now(),
                  },
                },
                secret,

              ),
              data: this.sanitizeUser(users)
            });
          } 
        
        else {
          return {
            status: 0,
            message: "Password didn't match"
          };
        }
      } else {
        return { status: 0, message: "No user found" };
      }
    } catch (error) {
      return { status: 0, message: error.message };
    }
  }


  sanitizeUser(user: User) {
    const sanitized = user;
    sanitized.hashPassword = undefined;
    return sanitized;
  }
}
