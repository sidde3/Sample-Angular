		import { APP_INITIALIZER, NgModule } from '@angular/core';
		import { BrowserModule } from '@angular/platform-browser';
		import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
		import { AppRoutingModule } from './app-routing.module';
		import { AppComponent } from './app.component';

		function initializeKeycloak(keycloak: KeycloakService) {
		  return () =>
		    keycloak.init({
		      config: {
		        url: 'http://127.0.0.1:8080/auth',
		        realm: 'demo',
		        clientId: 'mi-application'
		      },
		      initOptions: {
				checkLoginIframe: false,
		        onLoad: 'check-sso',
		        silentCheckSsoRedirectUri:
		          window.location.origin + '/assets/verificar-sso.html'
		      }
		    });
		}

		@NgModule({
		  declarations: [AppComponent],
		  imports: [AppRoutingModule, BrowserModule, KeycloakAngularModule],
		  providers: [
		    {
		      provide: APP_INITIALIZER,
		      useFactory: initializeKeycloak,
		      multi: true,
		      deps: [KeycloakService]
		    }
		  ],
		  bootstrap: [AppComponent]
		})
		export class AppModule {}
