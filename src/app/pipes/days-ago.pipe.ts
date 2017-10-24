import { Pipe, PipeTransform } from '@angular/core';

import * as timeSinceInputDay from 'date-fns/distance_in_words_to_now';
import * as frLocal from 'date-fns/locale/fr';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return timeSinceInputDay(new Date(value), {
      locale: frLocal
    });
  }

}
