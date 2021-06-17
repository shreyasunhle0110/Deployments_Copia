import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SysbrijHomeComponent } from './sysbrij-home/sysbrij-home.component';
import { SysbrijDeploymentDashboardComponent } from './sysbrij-deployment-dashboard/sysbrij-deployment-dashboard.component';
import { SysbrijPageContainerComponent } from './sysbrij-page-container/sysbrij-page-container.component';
import { SysbrijStartNewDeploymentComponent } from './sysbrij-start-new-deployment/sysbrij-start-new-deployment.component';
import { SysbrijHelpFilesComponent } from './sysbrij-help-files/sysbrij-help-files.component';
import { SysbrijMyWorkflowsComponent } from './sysbrij-my-workflows/sysbrij-my-workflows.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'sysbrijHome', component: SysbrijHomeComponent
  },
  {
    path: 'sysbrijMaster', component: SysbrijPageContainerComponent, children: [
      {
        path: 'sysbrijDeploymentDashboard', component: SysbrijDeploymentDashboardComponent
      },
      {
        path: 'sysbrijStartNewDeployment', component: SysbrijStartNewDeploymentComponent
      },
      {
        path: 'sysbrijHelpFiles', component: SysbrijHelpFilesComponent
      },
      {
        path: 'sysbrijMyWorkflows', component: SysbrijMyWorkflowsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
