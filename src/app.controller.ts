import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard, RoleGuard, Public, RoleMatchingMode, Roles, Scopes } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get("token-validate")
  //@Roles({roles:["FRESHER_SELLER"]})
  @UseGuards(AuthGuard,RoleGuard)
  @Scopes('view-profile')
  tokenValidate(): string{
    return this.appService.getHello();
  }
}
