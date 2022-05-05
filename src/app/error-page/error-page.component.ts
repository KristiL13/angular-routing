import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieving the static data sent with the route.
    // this.errorMessage = this.route.snapshot.data['message'];
    // or if the data might change while I'm on that page:
    this.route.data.subscribe(
      (data: Data) => (this.errorMessage = data['message'])
    );
  }
}
