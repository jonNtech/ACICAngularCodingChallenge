import { Component, OnInit, Input } from '@angular/core';
import { InMemoryDataService } from '../in-memory-data.service';
import { PopularCoverage } from '../PopularCoverage';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularComponent implements OnInit {
  //variable used in component html
  popular: PopularCoverage[] = [];

  constructor(private inMemoryDataService: InMemoryDataService) {}

  ngOnInit(): void {
    //this is the code that will pull the getPopular function from inMemoryDataServices.
    this.inMemoryDataService
      .getPopular()
      .subscribe((popular) => (this.popular = popular));
  }
}
