import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SysbrijHomeComponent } from './sysbrij-home/sysbrij-home.component';
import { SysbrijDeploymentDashboardComponent } from './sysbrij-deployment-dashboard/sysbrij-deployment-dashboard.component';
import { SysbrijPageContainerComponent } from './sysbrij-page-container/sysbrij-page-container.component';
import { SysbrijStartNewDeploymentComponent } from './sysbrij-start-new-deployment/sysbrij-start-new-deployment.component';
import { SysbrijHelpFilesComponent } from './sysbrij-help-files/sysbrij-help-files.component';
import { SysbrijMyWorkflowsComponent } from './sysbrij-my-workflows/sysbrij-my-workflows.component';
import { WorkflowPdfComponent } from './workflow-pdf/workflow-pdf.component';
import { WrapperPageContainerComponent } from './wrapper-page-container/wrapper-page-container.component';
import { WrapperIntegrationDetailComponent } from './wrapper-integration-detail/wrapper-integration-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WrapperOverviewComponent } from './wrapper-overview/wrapper-overview.component';
import { WrapperStartNewDeploymentComponent } from './wrapper-start-new-deployment/wrapper-start-new-deployment.component';
import { WrapperMyWorkflowsComponent } from './wrapper-my-workflows/wrapper-my-workflows.component';
import { WrapperNodeDetailComponent } from './wrapper-node-detail/wrapper-node-detail.component';
import { WrapperPhpDetailComponent } from './wrapper-php-detail/wrapper-php-detail.component';

const routes: Routes = [
  {
    path: '', component: SysbrijHomeComponent
  },
  {
    path: 'sysbrijHome', component: HomeComponent
  },
  {
    path: 'sysbrijWorkflowPDF/:id', component: WorkflowPdfComponent
  },
  {
    path: 'sysbrijMaster', component: SysbrijPageContainerComponent, children: [
      {
        path: 'sysbrijDeploymentDashboard', component: SysbrijDeploymentDashboardComponent
      },
      {
        path: 'sysbrijStartNewDeployment/:id/:pageStatus', component: SysbrijStartNewDeploymentComponent
      },
      {
        path: 'sysbrijHelpFiles', component: SysbrijHelpFilesComponent
      },
      {
        path: 'sysbrijMyWorkflows', component: SysbrijMyWorkflowsComponent
      }
    ]
  },
  {
    path: 'wrapperMaster', component: WrapperPageContainerComponent, children : [
      {
        path: "wrapperIntegration", component: WrapperIntegrationDetailComponent, children: [
          {
            path:"wrapperNodeDetail", component: WrapperNodeDetailComponent
          },
          {
            path:"wrapperPhpDetail", component: WrapperPhpDetailComponent
          }
        ]
      },
      {
        path: "wrapperOverview", component: WrapperOverviewComponent
      },
      {
        path: "wrapperStartNewDeployment", component: WrapperStartNewDeploymentComponent
      },
      {
        path: "wrapperMyWorkflows", component: WrapperMyWorkflowsComponent
      }
    ]
  },
  {
    path: "pageNotFound", component:PageNotFoundComponent
  },
  {
    path: '**', redirectTo:"pageNotFound"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 48]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
