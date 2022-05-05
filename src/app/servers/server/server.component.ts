import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   // the + in front of params turns the string param to a number.
    //   this.server = this.serversService.getServer(+params['id']);
    // });
    this.route.data.subscribe((data: Data) => {
      // siin 'server' on sama nimi, mis app-routing module'is resolve:
      // all key-value pairi key nimi on.
      this.server = data['server'];
    });
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit'], {
    // we just want to append 'edit' to the currently loaded route, thus:
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      // 'merge' - would merge old query params with any new we might add here.
      // If we were to add new ones and use preserve, the old would overwrite new.

      // queryParams: { allowEdit: '1' },
      // fragment: 'loading',
    });
  }
}
