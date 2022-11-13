import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { LineOfBusiness } from './LineOfBusiness';
import { RecentQuote } from './RecentQuote';
import { Utils } from './utils';
import { PopularCoverage } from './PopularCoverage';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const linesOfBusiness = [
      {
        id: 11,
        name: 'General Liability',
        description: 'Liability coverage for businesses.',
      },
      {
        id: 12,
        name: 'Commercial Property',
        description: 'Property coverage for businesses.',
      },
      {
        id: 13,
        name: 'Inland Marine',
        description: 'Coverage for tools and machinery on job sites.',
      },
      {
        id: 14,
        name: 'Ocean Marine',
        description: 'Coverage for dock and boat repair businesses.',
      },
      {
        id: 15,
        name: 'Garage',
        description: 'Coverage for auto repairs and car sales.',
      },
    ];

    const recentQuotes = [
      { id: 101, quoteNumber: 'AC123PC', lineOfBusiness: 11 },
      { id: 102, quoteNumber: 'AC124PC', lineOfBusiness: 12 },
      { id: 103, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
      { id: 104, quoteNumber: 'AC126PC', lineOfBusiness: 14 },
      { id: 105, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
      { id: 106, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
      { id: 107, quoteNumber: 'AC126PC', lineOfBusiness: 13 },
      { id: 108, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
    ];

    return { linesOfBusiness, recentQuotes };
  }

  // Overrides the genId method to ensure that a line of business always has an id.
  // If the lines of business array is empty,
  // the method below returns the initial number (11).
  // if the lines of business array is not empty, the method below returns the highest
  // line of business id + 1.
  genId(linesOfBusiness: LineOfBusiness[]): number {
    return linesOfBusiness.length > 0
      ? Math.max(
          ...linesOfBusiness.map((lineOfBusiness) => lineOfBusiness.id)
        ) + 1
      : 11;
  }

  //getPopular gets the 2 most recently quoted coverages and the number of quotes it has. called on popular component.
  // created a utils.ts file to store getHash function and biggest sorting function.
  getPopular(): Observable<PopularCoverage[]> {
    const recentQuotes = this.createDb().recentQuotes;
    const linesOfBusiness = this.createDb().linesOfBusiness;

    const theHashMap = Utils.getHash(recentQuotes);
    const theLargest = Utils.biggest(theHashMap);

    function findLine(lines: LineOfBusiness[], nums: number) {
      return lines.filter((line: LineOfBusiness) => line.id == nums);
    }

    const firstCov = findLine(linesOfBusiness, theLargest[0])
      .map((cov) => cov.name)
      .toString();
    const secondCov = findLine(linesOfBusiness, theLargest[2])
      .map((cov) => cov.name)
      .toString();

    const coverages = [
      {
        coverage: firstCov,
        count: theLargest[1],
      },
      {
        coverage: secondCov,
        count: theLargest[3],
      },
    ];
    return of(coverages);
  }

  //getQuoteCounts get the # of quotes that a coverage has recently had calculated from the RecentQuotes data in the createDb function
  //called to lineOfBusiness-details component for quoteCount variable
  getQuoteCounts(coverageId: number): Observable<number> {
    const recentQuotes = this.createDb().recentQuotes;
    const quoteCount = recentQuotes.filter(
      (line) => line.lineOfBusiness == coverageId
    );
    return of(quoteCount.length);
  }
}
