import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

@Pipe({
  name: 'wcsFormlyOptions'
})
export class WcsFormlyOptionsPipe implements PipeTransform {
  transform(options: any): Observable<any[]> {
    if (!(options instanceof Observable)) {
      options = observableOf(options);
    }

    return options;
  }
}
