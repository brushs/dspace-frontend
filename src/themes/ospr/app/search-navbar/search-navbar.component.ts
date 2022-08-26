import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../../../app/core/shared/search/search.service';
import { expandSearchInput } from '../../../../app/shared/animations/slide';
import { SearchNavbarComponent as BaseComponent } from '../../app/search-navbar/search-navbar.component';

/**
 * The search box in the header that expands on focus and collapses on focus out
 */
@Component({
  selector: 'ds-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss'],
  animations: [expandSearchInput]
})
export class SearchNavbarComponent extends BaseComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private searchService: SearchService) {
    super(formBuilder, router, searchService);
  }
}
