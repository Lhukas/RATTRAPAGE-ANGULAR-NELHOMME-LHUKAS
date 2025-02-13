import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath'
})
export class ImagePathPipe implements PipeTransform {
  transform(imageFilename?: string): string {
    if (!imageFilename) {
      return 'assets/images/default.jpg';
    }
    return `assets/images/${imageFilename}`;
  }
}
