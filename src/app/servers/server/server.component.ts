import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    this.route.params.subscribe((params: Params) => {
      // the + in front of params turns the string param to a number.
      this.server = this.serversService.getServer(+params['id']);
    });
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit'], {
    // we just want to append 'edit' to the currently loaded route, thus:
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      // queryParams: { allowEdit: '1' },
      // fragment: 'loading',
    });
  }
}
