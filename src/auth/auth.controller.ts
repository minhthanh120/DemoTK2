import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { Public } from 'nest-keycloak-connect';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    async login(@Body() body: { username: string, password: string }) {
        const { username, password } = body;
        try{

            const token = await this.authService.login(username, password);
            if (!token) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }
            return token;
        }
        catch(error){
            throw new HttpException(error.message || 'Login failed', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('register')
    @Public()
    async register(@Body() body: RegisterDto) {
        try{
            const result  = await this.authService.register(body);
            return result;
        }
        catch(error){
            throw new HttpException(error.message || 'Login failed', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('logout')
    @Public()
    async logout(@Body() body: { access_token: string }) {
        try {
            const result = await this.authService.logout(body.access_token);
            return {
                message: 'User logged out successfully',
            };
        } catch (error) {
            return {
                message: 'Logout failed',
                error: error.message,
            };
        }
    }
}
