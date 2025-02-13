
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return value ? value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : 'Prix non disponible';
  }
}
