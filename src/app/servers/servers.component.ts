import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute // refers to currently active route
    ) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // this.router.navigate(['/servers']); // absolute path. We're already on this page, so nothing happens.
    this.router.navigate(['servers'], {relativeTo: this.route}); // relative path. Unlike routerLink, navigate() doesn't know on
    // which route you're currently on.
    // We can add a second argument to navigate, to tell it where we're at, as a JS object.
    // Default value for relativeTo is the root. It doesn't take a string, it takes a route.
    // Adding relativeTo as currently active route we will get an error, because we navigate to /servers/servers now.
  }
}
