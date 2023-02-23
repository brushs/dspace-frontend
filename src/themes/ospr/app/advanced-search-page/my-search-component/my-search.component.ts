import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import {MatRadioModule } from '@angular';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { uniqueId } from 'lodash';

//import { PaginatedList } from '../../core/data/paginated-list.model';
import { PaginatedList } from '../../../../../app/core/data/paginated-list.model';
import { RemoteData } from '../../../../../app/core/data/remote-data';
import { DSpaceObject } from '../../../../../app/core/shared/dspace-object.model';
import { pushInOut } from '../../../../../app/shared/animations/push';
import { HostWindowService } from '../../../../../app/shared/host-window.service';
import { SidebarService } from '../../../../../app/shared/sidebar/sidebar.service';
import { hasValue } from '../../../../../app/shared/empty.util';
import { RouteService } from '../../../../../app/core/services/route.service';
import { SEARCH_CONFIG_SERVICE } from '../../../../../app/my-dspace-page/my-dspace-page.component';
import { PaginatedSearchOptions } from '../../../../../app/shared/search/models/paginated-search-options.model';
import { SearchResult } from '../../../../../app/shared/search/models/search-result.model';
import { SearchConfigurationService } from '../../../../../app/core/shared/search/search-configuration.service';
import { SearchService } from '../../../../../app/core/shared/search/search.service';
import { currentPath } from '../../../../../app/shared/utils/route.utils';
import { Context } from '../../../../../app/core/shared/context.model';
import { SortOptions } from '../../../../../app/core/cache/models/sort-options.model';
import { SearchConfig } from '../../../../../app/core/shared/search/search-filters/search-config.model';
import { SearchConfigurationOption } from '../../../../../app/shared/search/search-switch-configuration/search-configuration-option.model';
import { getFirstCompletedRemoteData } from '../../../../../app/core/shared/operators';
import { followLink } from '../../../../../app/shared/utils/follow-link-config.model';
import { Item } from '../../../../../app/core/shared/item.model';
import { SearchObjects } from '../../../../../app/shared/search/models/search-objects.model';
import { ViewMode } from '../../../../../app/core/shared/view-mode.model';
import { SelectionConfig } from '../../../../../app/shared/search/search-results/search-results.component';
import { ListableObject } from '../../../../../app/shared/object-collection/shared/listable-object.model';
import { CollectionElementLinkType } from '../../../../../app/shared/object-collection/collection-element-link.type';
import { environment } from 'src/environments/environment';
import { GeoSearchPageComponent } from '../../geo-search-page/geo-search-page.component';
import { DepartmentComponent } from '../department-component/department.component';

@Component({
  selector: 'ds-search',
  styleUrls: ['./my-search.component.scss'],
  templateUrl: './my-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pushInOut],
})

/**
 * This component renders a sidebar, a search input bar and the search results.
 */
export class MySearchComponent implements OnInit {

  /**
   * The list of available configuration options
   */
  @Input() configurationList: SearchConfigurationOption[] = [];

  /**
   * The current context
   * If empty, 'search' is used
   */
  @Input() context: Context = Context.Search;

  /**
   * The configuration to use for the search options
   * If empty, 'default' is used
   */
  @Input() configuration = 'default';

  /**
   * The actual query for the fixed filter.
   * If empty, the query will be determined by the route parameter called 'filter'
   */
  @Input() fixedFilterQuery: string;

  /**
   * If this is true, the request will only be sent if there's
   * no valid cached version. Defaults to true
   */
  @Input() useCachedVersionIfAvailable = true;

  /**
   * True when the search component should show results on the current page
   */
  @Input() inPlaceSearch = true;

  /**
   * The link type of the listed search results
   */
  @Input() linkType: CollectionElementLinkType;

  /**
   * The pagination id used in the search
   */
  @Input() paginationId = 'spc';

  /**
   * Whether or not the search bar should be visible
   */
  @Input() searchEnabled = true;

  /**
   * The width of the sidebar (bootstrap columns)
   */
  @Input() sideBarWidth = 3;

  /**
   * The placeholder of the search form input
   */
  @Input() searchFormPlaceholder = 'search.search-form.placeholder';

  /**
   * A boolean representing if result entries are selectable
   */
  @Input() selectable = false;

  /**
   * The config option used for selection functionality
   */
  @Input() selectionConfig: SelectionConfig;

  /**
   * A boolean representing if show search sidebar button
   */
  @Input() showSidebar = true;

  /**
   * Whether to show the view mode switch
   */
  @Input() showViewModes = true;

  /**
   * List of available view mode
   */
  @Input() useUniquePageId: false;

  /**
   * List of available view mode
   */
  @Input() viewModeList: ViewMode[];

  /**
   * Defines whether or not to show the scope selector
   */
  @Input() showScopeSelector = true;

  /**
   * The current configuration used during the search
   */
  currentConfiguration$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * The current context used during the search
   */
  currentContext$: BehaviorSubject<Context> = new BehaviorSubject<Context>(null);

  /**
   * The current sort options used
   */
  currentScope$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * The current sort options used
   */
  currentSortOptions$: BehaviorSubject<SortOptions> = new BehaviorSubject<SortOptions>(null);

  /**
   * The current search results
   */
  resultsRD$: BehaviorSubject<RemoteData<PaginatedList<SearchResult<DSpaceObject>>>> = new BehaviorSubject(null);

  /**
   * The current paginated search options
   */
  searchOptions$: BehaviorSubject<PaginatedSearchOptions> = new BehaviorSubject<PaginatedSearchOptions>(null);

  /**
   * The available sort options list
   */
  sortOptionsList$: BehaviorSubject<SortOptions[]> = new BehaviorSubject<SortOptions[]>([]);

  /**
   * TRUE if the search option are initialized
   */
  initialized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Observable for whether or not the sidebar is currently collapsed
   */
  isSidebarCollapsed$: Observable<boolean>;

  /**
   * Emits true if were on a small screen
   */
  isXsOrSm$: Observable<boolean>;

  /**
   * Link to the search page
   */
  searchLink: string;

  /**
   * Subscription to unsubscribe from
   */
  sub: Subscription;

  //gdata: any;
  selectedOp: String = 'AND';
  @ViewChild(GeoSearchPageComponent) geoComponent: GeoSearchPageComponent;

  /**
   * Emits an event with the current search result entries
   */
  @Output() resultFound: EventEmitter<SearchObjects<DSpaceObject>> = new EventEmitter<SearchObjects<DSpaceObject>>();

  /**
   * Emits event when the user deselect result entry
   */
  @Output() deselectObject: EventEmitter<ListableObject> = new EventEmitter<ListableObject>();

  /**
   * Emits event when the user select result entry
   */
  @Output() selectObject: EventEmitter<ListableObject> = new EventEmitter<ListableObject>();

  // author for query
  author: string = '';

  constructor(protected service: SearchService,
              protected sidebarService: SidebarService,
              protected windowService: HostWindowService,
              @Inject(SEARCH_CONFIG_SERVICE) public searchConfigService: SearchConfigurationService,
              protected routeService: RouteService,
              protected router: Router) {
    this.isXsOrSm$ = this.windowService.isXsOrSm();
  }

  /**
   * Listening to changes in the paginated search options
   * If something changes, update the search results
   *
   * Listen to changes in the scope
   * If something changes, update the list of scopes for the dropdown
   */
  ngOnInit(): void {
    if (this.useUniquePageId) {
      // Create an unique pagination id related to the instance of the SearchComponent
      this.paginationId = uniqueId(this.paginationId);
    }

    this.searchConfigService.setPaginationId(this.paginationId);

    if (hasValue(this.configuration)) {
      this.routeService.setParameter('configuration', this.configuration);
    }
    if (hasValue(this.fixedFilterQuery)) {
      this.routeService.setParameter('fixedFilterQuery', this.fixedFilterQuery);
    }

    this.isSidebarCollapsed$ = this.isSidebarCollapsed();
    this.searchLink = this.getSearchLink();
    this.currentContext$.next(this.context);

    // Determinate PaginatedSearchOptions and listen to any update on it
    const configuration$: Observable<string> = this.searchConfigService
      .getCurrentConfiguration(this.configuration).pipe(distinctUntilChanged());
    const searchSortOptions$: Observable<SortOptions[]> = configuration$.pipe(
      switchMap((configuration: string) => this.searchConfigService
        .getConfigurationSearchConfig(configuration)),
      map((searchConfig: SearchConfig) => this.searchConfigService.getConfigurationSortOptions(searchConfig)),
      distinctUntilChanged()
    );
    const sortOption$: Observable<SortOptions> = searchSortOptions$.pipe(
      switchMap((searchSortOptions: SortOptions[]) => {
        const defaultSort: SortOptions = searchSortOptions[0];
        return this.searchConfigService.getCurrentSort(this.paginationId, defaultSort);
      }),
      distinctUntilChanged()
    );
    const searchOptions$: Observable<PaginatedSearchOptions> = this.getSearchOptions().pipe(distinctUntilChanged());

    this.sub = combineLatest([configuration$, searchSortOptions$, searchOptions$, sortOption$]).pipe(
      filter(([configuration, searchSortOptions, searchOptions, sortOption]: [string, SortOptions[], PaginatedSearchOptions, SortOptions]) => {
        // filter for search options related to instanced paginated id
        return searchOptions.pagination.id === this.paginationId;
      }),
      debounceTime(100)
    ).subscribe(([configuration, searchSortOptions, searchOptions, sortOption]: [string, SortOptions[], PaginatedSearchOptions, SortOptions]) => {
      // Build the PaginatedSearchOptions object
      const combinedOptions = Object.assign({}, searchOptions,
        {
          configuration: searchOptions.configuration || configuration,
          sort: sortOption || searchOptions.sort
        });
      const newSearchOptions = new PaginatedSearchOptions(combinedOptions);
      if (this.geoComponent != null) {
        var geodata = this.geoComponent.getGeoData();
        var [lat1,lng1,lat2,lng2] = geodata.split(',');
        var geoquery = 'nrcan.geospatial.bbox:[' + lat1 +','+ lng1 + ' TO '+ lat2+ ','+ lng2 + ']';
        newSearchOptions['geoquery'] = geoquery;
        newSearchOptions['boolOp'] = this.selectedOp;
      }

      // check if search options are changed
      // if so retrieve new related results otherwise skip it
      if (JSON.stringify(newSearchOptions) !== JSON.stringify(this.searchOptions$.value)) {
        // Initialize variables
        this.currentConfiguration$.next(configuration);
        this.currentSortOptions$.next(newSearchOptions.sort);
        this.currentScope$.next(newSearchOptions.scope);
        this.sortOptionsList$.next(searchSortOptions);
        this.searchOptions$.next(newSearchOptions);
        this.initialized$.next(true);
        // retrieve results
        console.log('retrieveSearchResults');
        var geodata = this.geoComponent.getGeoData();
        var [lat1,lng1,lat2,lng2] = geodata.split(',');
        var geoquery = 'nrcan.geospatial.bbox:[' + lat1 +','+ lng1 + ' TO '+ lat2+ ','+ lng2 + ']';
        console.log("###" + geodata);
        newSearchOptions['geoquery'] = geoquery;
        newSearchOptions['author'] = this.author;
        //newSearchOptions['query'] = newquery;
        //newSearchOptions['query'] = newquery + ' +' + newSearchOptions['query'];
        newSearchOptions['boolOp'] = this.selectedOp;
        this.retrieveSearchResults(newSearchOptions);
      }
    });
  }

  /**
   * Change the current context
   * @param context
   */
  public changeContext(context: Context) {
    this.currentContext$.next(context);
  }

  /**
   * Set the sidebar to a collapsed state
   */
  public closeSidebar(): void {
    this.sidebarService.collapse();
  }

  /**
   * Reset result list on view mode change
   */
  public changeViewMode() {
    this.resultsRD$.next(null);
  }

  /**
   * Set the sidebar to an expanded state
   */
  public openSidebar(): void {
    this.sidebarService.expand();
  }

  /**
   * Unsubscribe from the subscription
   */
  ngOnDestroy(): void {
    if (hasValue(this.sub)) {
      this.sub.unsubscribe();
    }
  }

  /**
   * Get the current paginated search options
   * @returns {Observable<PaginatedSearchOptions>}
   */
  protected getSearchOptions(): Observable<PaginatedSearchOptions> {
    return this.searchConfigService.paginatedSearchOptions;
  }

  /**
   * Retrieve search result by the given search options
   * @param searchOptions
   * @private
   */
  private retrieveSearchResults(searchOptions: PaginatedSearchOptions) {
    this.resultsRD$.next(null);
    var cloneSearchOptions = new PaginatedSearchOptions(searchOptions);
    //PaginatedSearchOptions cloneSearchOptions = Object.assign({}, searchOptions);
    //cloneSearchOptions['query'] = searchOptions['geoquery'] + ' +' + searchOptions['query'];
    var boolOp = searchOptions['boolOp'];
    if (searchOptions['query'] == null || searchOptions['query'] == undefined || searchOptions['query'] == '')
      cloneSearchOptions['query'] = searchOptions['geoquery'];
    else
      if (boolOp == 'OR') 
        cloneSearchOptions['query'] = searchOptions['geoquery'] + ' OR ' + searchOptions['query'];
      else
        cloneSearchOptions['query'] = searchOptions['geoquery'] + ' ' + searchOptions['query'];


    
    //cloneSearchOptions['query'] = searchOptions['geoquery'];// + ' |' + searchOptions['query'];
    this.service.search(
      cloneSearchOptions,
      undefined,
      this.useCachedVersionIfAvailable,
      true,
      followLink<Item>('thumbnail', { isOptional: true }),
      followLink<Item>('accessStatus', { isOptional: true, shouldEmbed: environment.item.showAccessStatuses })
    ).pipe(getFirstCompletedRemoteData())
      .subscribe((results: RemoteData<SearchObjects<DSpaceObject>>) => {
        if (results.hasSucceeded && results.payload?.page?.length > 0) {
          this.resultFound.emit(results.payload);
        }
        this.resultsRD$.next(results);
      });
  }

  /**
   * Check if the sidebar is collapsed
   * @returns {Observable<boolean>} emits true if the sidebar is currently collapsed, false if it is expanded
   */
  private isSidebarCollapsed(): Observable<boolean> {
    return this.sidebarService.isCollapsed;
  }

  /**
   * @returns {string} The base path to the search page, or the current page when inPlaceSearch is true
   */
  private getSearchLink(): string {
    if (this.inPlaceSearch) {
      return currentPath(this.router);
    }
    return this.service.getSearchLink();
  }


}
