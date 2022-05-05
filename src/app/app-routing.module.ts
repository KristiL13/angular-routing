import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', // localhost:4200/users
    // when the abovementioned path is reached, which component should be loaded
    component: UsersComponent,
    children: [
      { path: ':id/:name', component: UserComponent },
      // peale : tuleb parameeter, selle nimega saame pärast
      // antud parameetri väärtuse kätte. : ütleb Angularile, et see osa pathist
      // on dünaamiline.
    ],
  },
  {
    path: 'servers',
    component: ServersComponent,
    // using nested routing
    children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), // nüüd on meie ülal defineeritud appRoutes
    // registreeritud ja meie app tunneb seal defineeritut ja oskab kasutada seda.
  ],
  // Määrab, et kui ma impordin siinse mooduli teise moodulisse, et mis peaks siit
  // moodulist olema kättesaadav seal, kuhu siinset impordin.
  exports: [RouterModule], // see on siin ülal juba confitud
})
export class AppRoutingModule {}
