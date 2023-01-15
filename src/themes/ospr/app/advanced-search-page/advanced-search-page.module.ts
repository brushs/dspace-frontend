import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../../../app/core/core.module';

import { SharedModule } from '../../../../app/shared/shared.module';
import { SearchTrackerComponent } from '../../../../app/search-page/search-tracker.component';
//import { StatisticsModule } from '../statistics/statistics.module';
//import { SearchPageComponent } from './search-page.component';
//import { SidebarFilterService } from '../shared/sidebar/filter/sidebar-filter.service';
import { SearchFilterService } from '../../../../app/core/shared/search/search-filter.service';
import { SearchConfigurationService } from '../../../../app/core/shared/search/search-configuration.service';
//import { ThemedSearchPageComponent } from '../../../../app/search-page/themed-search-page.component';
import { SearchModule } from '../../../../app/shared/search/search.module';
import { AdvancedSearchPageComponent } from './advanced-search-page.component';
import { MyThemedSearchComponent } from './mythemed-search.component';

const components = [
  //SearchPageComponent,
  //SearchTrackerComponent,
  //ThemedSearchPageComponent
  AdvancedSearchPageComponent,
  MyThemedSearchComponent
];

@NgModule({
  imports: [
    CommonModule,
    SearchModule,
    SharedModule.withEntryComponents(),
    CoreModule.forRoot(),
  ],
  declarations: components,
  providers: [
    //SidebarService,
    //SidebarFilterService,
    SearchFilterService,
    //ConfigurationSearchPageGuard,
    SearchConfigurationService
  ],
  exports: components
})

/**
 * This module handles all components and pipes that are necessary for the search page
 */
export class AdvancedSearchPageModule {
}
