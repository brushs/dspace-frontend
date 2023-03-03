import { Component } from "@angular/core";
import { SearchResultsComponent } from "../../../../../app/shared/search/search-results/search-results.component";


@Component({
    selector: 'my-ds-search-results',
    //template: `<ng-content></ng-content>`,
    templateUrl: '../../../../../app/shared/search/search-results/search-results.component.html',
})

export class MySearchResultsComponent extends SearchResultsComponent {

isLoading() {
    console.log('isLoading');
    return false;
  }
}