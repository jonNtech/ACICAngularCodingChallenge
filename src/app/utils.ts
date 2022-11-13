import { RecentQuote } from './RecentQuote';

export class Utils {
  static getHash(array: RecentQuote[]) {
    const hashMap: any = {};

    for (let i = 0; i < array.length; i++) {
      const quote = array[i].lineOfBusiness;
      hashMap[quote] ? hashMap[quote]++ : (hashMap[quote] = 1);
    }

    return hashMap;
  }

  static biggest(x: any) {
    let biggest: any = 0;
    let bigKey: string = '';
    let second: number = 0;
    let secondKey: string = '';

    for (const [key, value] of Object.entries(x)) {
      const val: any = value;
      if (val > biggest) {
        biggest = value;
        bigKey = key;
      } else if (val > second) {
        second = val;
        secondKey = key;
      }
    }

    return [bigKey, biggest, secondKey, second];
  }
}
