import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemedComponent } from '../../../../app/shared/theme-support/themed.component';
import { SearchComponent } from '../../../../app/shared/search/search.component';
import { SearchConfigurationOption } from '../../../../app/shared/search/search-switch-configuration/search-configuration-option.model';
import { Context } from '../../../../app/core/shared/context.model';
import { CollectionElementLinkType } from '../../../../app/shared/object-collection/collection-element-link.type';
import { SelectionConfig } from '../../../../app/shared/search/search-results/search-results.component';
import { ViewMode } from '../../../../app/core/shared/view-mode.model';
import { SearchObjects } from '../../../../app/shared/search/models/search-objects.model';
import { DSpaceObject } from '../../../../app/core/shared/dspace-object.model';
import { ListableObject } from '../../../../app/shared/object-collection/shared/listable-object.model';

/**
 * Themed wrapper for SearchComponent
 */
@Component({
  selector: 'ds-mythemed-search',
  styleUrls: [],
  templateUrl: '../../../../app/shared/search/search.component.html',
})
export class MyThemedSearchComponent extends SearchComponent {
  protected inAndOutputNames: (keyof SearchComponent & keyof this)[] = ['configurationList', 'context', 'configuration', 'fixedFilterQuery', 'useCachedVersionIfAvailable', 'inPlaceSearch', 'linkType', 'paginationId', 'searchEnabled', 'sideBarWidth', 'searchFormPlaceholder', 'selectable', 'selectionConfig', 'showSidebar', 'showViewModes', 'useUniquePageId', 'viewModeList', 'showScopeSelector', 'resultFound', 'deselectObject', 'selectObject'];

  @Input() configurationList: SearchConfigurationOption[] = [];

  @Input() context: Context = Context.Search;

  @Input() configuration = 'default';

  @Input() fixedFilterQuery: string;

  @Input() useCachedVersionIfAvailable = true;

  @Input() inPlaceSearch = true;

  @Input() linkType: CollectionElementLinkType;

  @Input() paginationId = 'spc';

  @Input() searchEnabled = true;

  @Input() sideBarWidth = 3;

  @Input() searchFormPlaceholder = 'search.search-form.placeholder';

  @Input() selectable = false;

  @Input() selectionConfig: SelectionConfig;

  @Input() showSidebar = true;

  @Input() showViewModes = true;

  @Input() useUniquePageId: false;

  @Input() viewModeList: ViewMode[];

  @Input() showScopeSelector = true;

  @Output() resultFound: EventEmitter<SearchObjects<DSpaceObject>> = new EventEmitter<SearchObjects<DSpaceObject>>();

  @Output() deselectObject: EventEmitter<ListableObject> = new EventEmitter<ListableObject>();

  @Output() selectObject: EventEmitter<ListableObject> = new EventEmitter<ListableObject>();

  protected getComponentName(): string {
    return 'SearchComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    //return import(`../../../themes/${themeName}/app/shared/search/search.component`);
    return import(`../../../../themes/${themeName}/app/shared/search/search.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    //return import('./search.component');
    return import('../../../../app/shared/search/search.component');
  }
}
