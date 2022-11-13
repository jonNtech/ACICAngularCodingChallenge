import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: ['./lineOfBusiness-detail.component.css'],
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  quoteCount: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private location: Location,
    private inMemoryDataService: InMemoryDataService
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
    this.getCoverageIdQuoteCount();
  }

  //getCoverageIdQuoteCount function gets the number of times the currently displayed line of business was recently quoted. takes in the id # of the currently displayed line of business
  getCoverageIdQuoteCount() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService;
    this.inMemoryDataService
      .getQuoteCounts(id)
      .subscribe((quoteCount) => (this.quoteCount = quoteCount));
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService
      .getLineOfBusiness(id)
      .subscribe((lineOfBusiness) => (this.lineOfBusiness = lineOfBusiness));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService
        .updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
