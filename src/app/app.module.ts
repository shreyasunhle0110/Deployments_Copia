import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SysbrijHomeComponent } from './sysbrij-home/sysbrij-home.component';
import { SysbrijDeploymentDashboardComponent } from './sysbrij-deployment-dashboard/sysbrij-deployment-dashboard.component';
import { SysbrijPageContainerComponent } from './sysbrij-page-container/sysbrij-page-container.component';
import { SysbrijNavigationComponent } from './sysbrij-navigation/sysbrij-navigation.component';
import { SysbrijStartNewDeploymentComponent } from './sysbrij-start-new-deployment/sysbrij-start-new-deployment.component';
import { SysbrijHelpFilesComponent } from './sysbrij-help-files/sysbrij-help-files.component';
import { SysbrijMyWorkflowsComponent } from './sysbrij-my-workflows/sysbrij-my-workflows.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SysbrijHomeComponent,
    SysbrijDeploymentDashboardComponent,
    SysbrijPageContainerComponent,
    SysbrijNavigationComponent,
    SysbrijStartNewDeploymentComponent,
    SysbrijHelpFilesComponent,
    SysbrijMyWorkflowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
