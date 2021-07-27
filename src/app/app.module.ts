import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SysbrijHomeComponent } from './sysbrij-home/sysbrij-home.component';
import { SysbrijDeploymentDashboardComponent } from './sysbrij-deployment-dashboard/sysbrij-deployment-dashboard.component';
import { SysbrijPageContainerComponent } from './sysbrij-page-container/sysbrij-page-container.component';
import { SysbrijNavigationComponent } from './sysbrij-navigation/sysbrij-navigation.component';
import { SysbrijStartNewDeploymentComponent } from './sysbrij-start-new-deployment/sysbrij-start-new-deployment.component';
import { SysbrijHelpFilesComponent } from './sysbrij-help-files/sysbrij-help-files.component';
import { SysbrijMyWorkflowsComponent } from './sysbrij-my-workflows/sysbrij-my-workflows.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
//services
import { LoginService } from './services/login.service';
import { CommonService } from './services/common.service';
import { WorkflowPdfComponent } from './workflow-pdf/workflow-pdf.component';
import { WrapperPageContainerComponent } from './wrapper-page-container/wrapper-page-container.component';
import { WrapperNavigationComponent } from './wrapper-navigation/wrapper-navigation.component';
import { WrapperIntegrationDetailComponent } from './wrapper-integration-detail/wrapper-integration-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WrapperStartNewDeploymentComponent } from './wrapper-start-new-deployment/wrapper-start-new-deployment.component';
import { WrapperMyWorkflowsComponent } from './wrapper-my-workflows/wrapper-my-workflows.component';
import { WrapperOverviewComponent } from './wrapper-overview/wrapper-overview.component';
import { WrapperNodeDetailComponent } from './wrapper-node-detail/wrapper-node-detail.component';
import { WrapperPhpDetailComponent } from './wrapper-php-detail/wrapper-php-detail.component';
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
    SysbrijMyWorkflowsComponent,
    WorkflowPdfComponent,
    WrapperPageContainerComponent,
    WrapperNavigationComponent,
    WrapperIntegrationDetailComponent,
    PageNotFoundComponent,
    WrapperStartNewDeploymentComponent,
    WrapperMyWorkflowsComponent,
    WrapperOverviewComponent,
    WrapperNodeDetailComponent,
    WrapperPhpDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [CommonService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
