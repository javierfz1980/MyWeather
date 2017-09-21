import {Pipe, PipeTransform} from '@angular/core';

export const units = {
  fahrenheit: 'Fahrenheit',
  celsius: 'Celsius'
}

@Pipe({
  name: 'tempConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform(value: number, unitTo: string): number {
    if (unitTo === units.celsius) {
      return Math.round((Number(value) - 32) * 5 / 9);
    } else {
      return value;
    }
  }

}
