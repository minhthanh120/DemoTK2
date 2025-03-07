import { HttpService } from '@nestjs/axios';
import { HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { resourceUsage } from 'process';

@Injectable()
export class AuthService {
    constructor(
        @Inject('CACHE_MANAGER') private cacheManager:Cache,
        private readonly httpService: HttpService,
        ) {}  // Inject HttpService vào constructor

    async login(username: string, password: string): Promise<any> {
      const keycloakUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
      const clientId = `${process.env.KEYCLOAK_CLIENT_ID}`;
      const clientSecret = `${process.env.KEYCLOAK_CLIENT_SECRET}`;
  
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
  
      const data = new URLSearchParams();
      data.append('grant_type', 'password');
      data.append('client_id', clientId);
      data.append('client_secret', clientSecret);
      data.append('username', username);
      data.append('password', password);
      try {
        const response = await firstValueFrom(
          this.httpService.post(keycloakUrl, data, { headers }),
        );
        return response.data;
      } catch (error) {
        console.log('Login failed: ' + error);
      }
    }

    private async getMasterToken():Promise<any>{
        var mastertoken = await this.cacheManager.get('admin_token');
        if(typeof mastertoken === 'string' && await this.isTokenValid(mastertoken)){
          return mastertoken;
        }
        const keycloakUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
        const clientId = `${process.env.KEYCLOAK_CLIENT_ID}`;
        const clientSecret = `${process.env.KEYCLOAK_CLIENT_SECRET}`;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };
        try{
            const data = new URLSearchParams();
            data.append('grant_type', 'client_credentials');
            data.append('client_id', clientId);
            data.append('client_secret', clientSecret);
            const response = await firstValueFrom(
                this.httpService.post(keycloakUrl,data,{headers})
            );
            await this.cacheManager.set('admin_token', response.data.access_token, 600000);
            await this.cacheManager.get('admin_token');
            
            return response.data.access_token;
        }
        catch(error){
            console.log(`register failed: ${error.response?.data?.error_description}`);
        }
        return null;
    }

    async createUser(payload):Promise<any>{
        var token = await this.getMasterToken();
        try{
            const keycloakUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`;
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              };
              const response = await firstValueFrom(
                this.httpService.post(keycloakUrl,payload,{headers})
            );
            return  {
              message: 'User registered successfully',
              statusCode: HttpStatus.CREATED
          }
        }
        catch(error){
          if (error.response && error.response.status === 409) {
            console.log('Conflict: User already exists or invalid state');
            return {message: 'Register failed',statusCode: HttpStatus.CONFLICT};
          }
          else{
            console.log(`Register failed: ${error.response?.data?.error_description}`);
            return {message: 'Register failed', statusCode: HttpStatus.BAD_REQUEST};
          }
        }
    }

    async register(userPayload):Promise<any>{
        const result = await this.createUser(userPayload);
        return result;
    }

    async logout(accessToken: string):Promise<any>{
      const keycloakUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
            const response = await firstValueFrom(
                this.httpService.post(keycloakUrl, null, { headers })
            );
            return response.data;
        } catch (error) {
            console.log('Logout failed:', error.response?.data?.error_description);
            throw new Error('Logout failed');
        }
    }

    async logoutall(userId: string):Promise<any>{
      const keycloakUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const clientId = `${process.env.KEYCLOAK_CLIENT_ID}`;
      const clientSecret = `${process.env.KEYCLOAK_CLIENT_SECRET}`;
        try{
            const data = new URLSearchParams();
            data.append('grant_type', 'client_credentials');
            data.append('client_id', clientId);
            data.append('client_secret', clientSecret);
            const response = await firstValueFrom(
                this.httpService.post(keycloakUrl,data,{headers})
            );
            return response.data;
        } catch (error) {
            console.log('Logout failed:', error.response?.data?.error_description);
            throw new Error('Logout failed');
        }
    }

    private async isTokenValid(token: string): Promise<boolean> {
      const url = `http://localhost:8080/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`;
      const headers= { 'Content-Type': 'application/x-www-form-urlencoded' }
      const data = {
        token:token,
        client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
        client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      }
      try {
        const response = await firstValueFrom(
          this.httpService.post(url, data, { headers })
        );
        console.log(response.data);
        return response.data.active; // true nếu token hợp lệ
      } catch (error) {
        console.log(`error: ${error.response?.data?.error_description}`);
        return false;
      }
    }

    async generateResetPasswordToken(userId: string): Promise<string> {
      const adminToken = await this.getMasterToken();
      const keycloakUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
      const clientId = `${process.env.KEYCLOAK_CLIENT_ID}`;
      const clientSecret = `${process.env.KEYCLOAK_CLIENT_SECRET}`;
      const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${adminToken}`
        };
      try{
          const data = new URLSearchParams();
          data.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
          data.append('subject_token',`${adminToken}`);
          data.append('requested_subject',`${userId}`);
          data.append('client_id', clientId);
          data.append('client_secret', clientSecret);
          data.append('requested_token_type','urn:ietf:params:oauth:token-type:access_token');
      const response = await  firstValueFrom(
        this.httpService.post(keycloakUrl, data, {headers}));
      return response.data; 
      } catch (error) {
        return 'false';
      }
    }

    

}
