import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'orderByVote'})
export class OrderByVote implements PipeTransform {
  transform(value: Array<any>, args: any):Array<any> {  
                value.sort((a, b) => {
                    if (a.project_vote.length < b.project_vote.length ) {
                      return 1;
                    }
                    if (a.project_vote.length > b.project_vote.length) {
                      return -1;
                    } else {
                        return 0;
                    }                 
                  });
                  console.log(value)
    return value;
  }
}