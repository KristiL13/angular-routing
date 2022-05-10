import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
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
    // Siia saan panna kõik guardid, mida tuleb jälgida. Kehtib siinsele routeile
    // ja kõigile tema lastele.
    // canActivate: [AuthGuard],
    // Kui tahame kaitsta ainult kõiki lapsi, aga vanemat mitte.
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    // using nested routing
    children: [
      {
        path: ':id',
        component: ServerComponent,
        // siin all selle nime 'server' valin ise. resolve väärtus on key-value pairs.
        // Pärast selle to-be-loaded komponendi sees on see info saadaval sel juhul nt
        // 'server' property nime all.
        resolve: { server: ServerResolver },
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    // Saame routimisel kaasa anda staatilist datat objektis key-value paarina.
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), // nüüd on meie ülal defineeritud appRoutes
    // registreeritud ja meie app tunneb seal defineeritut ja oskab kasutada seda.

    // RouterModule.forRoot(appRoutes, { useHash: true }),
    // useHash: true -- vajalik, et server ei otsiks neid route backist vaid laseks
    // Angularil frontis nendega majandada. Muidu kui backist seda rada ei leia,
    // siis saab 404 veateate lehe. Vanemad brauserid võivad ka mitte toetada kuidas
    // Angular tahaks toimida. Selleks peame käsitsi siin selle useHash asja panema,
    // et 404 korral suunataks index.html lehele tagasi.
    // Siis route muutub http://host.server(localhost või misiganes)/#/servers nt ja
    // hostiv server ignoreerib kõike, peale #, ehk ta ei hakka kusagilt neid lõppusid
    // otsima backis ega nii. Pärast räägib ka, kuidas on parem lähenemine serveri
    // confimiseks, et suunaks 404 korral index.html peale.
  ],
  // Määrab, et kui ma impordin siinse mooduli teise moodulisse, et mis peaks siit
  // moodulist olema kättesaadav seal, kuhu siinset impordin.
  exports: [RouterModule], // see on siin ülal juba confitud
})
export class AppRoutingModule {}
