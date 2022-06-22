import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://localhost:44396',
  redirectUri: window.location.origin + '/',
  clientId: 'MRAAngular',
  dummyClientSecret: 'AngularSecret',
  responseType: 'code',
  scope: 'openid profile email my_scope',

  showDebugInformation: true,
};