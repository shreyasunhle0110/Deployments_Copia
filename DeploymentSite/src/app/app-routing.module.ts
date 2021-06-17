import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SysbrijHomeComponent } from './sysbrij-home/sysbrij-home.component';
import { SysbrijDeploymentDashboardComponent } from './sysbrij-deployment-dashboard/sysbrij-deployment-dashboard.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'sysbrijHome', component: SysbrijHomeComponent
  },
  {
    path: 'sysbrijDeploymentDashboard', component: SysbrijDeploymentDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
