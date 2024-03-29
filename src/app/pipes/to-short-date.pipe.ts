import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate'
})
export class ToShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    if (value.toLowerCase() === 'asap') {
      return 'dès que possible';
    } else if (value.indexOf('-') > 1) {
      let fullDate, rest;
      [fullDate, rest] = value.toLowerCase().split('t');
      let year, month, day;
      [year, month, day] = fullDate.split('-');

      return `${month}/${day}/${year}`;
    } else {
      return '--';
    }
  }

}
