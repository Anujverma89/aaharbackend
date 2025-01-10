import { Controller, Post, Body, HttpCode, Res, HttpStatus } from "@nestjs/common";
import { AdminDto, LoginDTO } from "src/entities/admin.dto";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';

@Controller("/auth")
export class AuthContoller {
    constructor(private authService: AuthService) { }


    @Post("/handlerequest")
    @HttpCode(200)
    async handlereq(@Body() adminDTO: AdminDto) {
        return this.authService.handlerequest(adminDTO)
    }


    @Post("/login")
    @HttpCode(200)
    async login(@Res() res:any, @Body() loginDto: LoginDTO) {
        const result = await this.authService.login(loginDto)
        if (result.isvalid === 1) {
            const jwt = await this.authService.generateJwt(result.user);
            res.cookie("jwt", jwt, {
                secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
                maxAge: 3600000, // 1 hour
              });
        
              return res.status(200).json({
                message: 'Login successful',
                user: result.user,
                role:result.role,
              });
        } else {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
    }
}