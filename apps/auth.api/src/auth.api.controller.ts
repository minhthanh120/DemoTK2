import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthApiService } from './auth.api.service';
import { AuthGuard, Public } from 'nest-keycloak-connect';
import { RegisterDto } from '@app/foundation.business/dto/register.dto';
import { AuthService } from './service/auth.service';

@Controller()
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService, private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
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

  @Post('logoutall')
  @UseGuards(AuthGuard)
  async logoutall(@Request() req) {
      try {
          const result = await this.authService.logoutall(req.sub);
          return {
              message: 'User logged out all successfully',
          };
      } catch (error) {
          return {
              message: 'Logout failed',
              error: error.message,
          };
      }
  }

  @Get('resetpwd/:userId')
  async resetpwd(@Param('userId') userId: string) {
      try {
          const result = await this.authService.generateResetPasswordToken(userId)
          return result;
      } catch (error) {
          return {
              message: 'Logout failed',
              error: error.message,
          };
      }
  }
  @Get('hello')
  getHello(): string {
    return this.authApiService.getHello();
  }
}
