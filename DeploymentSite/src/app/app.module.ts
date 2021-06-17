import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SysbrijHomeComponent } from './sysbrij-home/sysbrij-home.component';
import { SysbrijDeploymentDashboardComponent } from './sysbrij-deployment-dashboard/sysbrij-deployment-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SysbrijHomeComponent,
    SysbrijDeploymentDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
