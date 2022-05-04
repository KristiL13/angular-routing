import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], // siin pääseb ligi ainult nendele
      // params propertytele, mis ma defineerisin Routes all.
      name: this.route.snapshot.params['name']
    }
    // snapshoti kasutamise tõttu: Kui juba olen selle komponendi peal, mis
    // peaks saama laetud, siis Angular ei lae seda uuesti ja sisu ei uuene.
    // Angular üritab olla kokkuhoidlik.
    // this.route.params on Observable (rxjs), mis võimaldab jälgida asünkroonseid toiminguid.
    this.paramsSubscription = this.route.params.subscribe(
      // first parameter of subscribe: fired whenever the parameters change (in this use case)
      // params will be an object that will hold the parameters as I defined them as properties.
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
    // Kui ma tean, et minu komponenti ei üritata kunagi laadida selle komponendi enda seest uuesti,
    // siis on täiesti okei kasutada ainult snapshoti lahendust ka.
    // Muul juhul, kasuta kindlasti subscribe varianti, et uuendada infot vastavalt mu
    // route parameetrite muutumisele.
  }

  // Kui Angular ei hävitaks iga kord mu subscriptionit, kui lähen selle
  // komponendi pealt mujale ära, siis tahaksin selle ise iga kord hävitada:
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
  // Routeimise subscriptioneid Angular hävitab automaatselt ise igakord.
  // Aga kui teen oma Observable-id, siis neid pean sarnaselt ise hävitama.
}
