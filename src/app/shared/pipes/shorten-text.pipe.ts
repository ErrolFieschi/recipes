import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})

export class ShortenTextPipe implements PipeTransform {
    transform(value: string, maxLength = 50): string {

        if (value.length <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength) + '...';
    }
}