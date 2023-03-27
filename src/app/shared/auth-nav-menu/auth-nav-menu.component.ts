import { Observable, of as observableOf, Subscription } from 'rxjs';
import { HttpClient ,HttpHeaders, HttpResponse} from '@angular/common/http';  
import { environment } from '../../../environments/environment';

import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';

import { fadeInOut, fadeOut } from '../animations/fade';
import { HostWindowService } from '../host-window.service';
import { AppState, routerStateSelector } from '../../app.reducer';
import { isNotUndefined } from '../empty.util';
import { isAuthenticated, isAuthenticationLoading } from '../../core/auth/selectors';
import { EPerson } from '../../core/eperson/models/eperson.model';
import { AuthService, LOGIN_ROUTE, LOGOUT_ROUTE } from '../../core/auth/auth.service';

@Component({
  selector: 'ds-auth-nav-menu',
  templateUrl: './auth-nav-menu.component.html',
  styleUrls: ['./auth-nav-menu.component.scss'],
  animations: [fadeInOut, fadeOut]
})
export class AuthNavMenuComponent implements OnInit {
  /**
   * Whether user is authenticated.
   * @type {Observable<string>}
   */
  public isAuthenticated: Observable<boolean>;
  public isIpValid: Observable<boolean>;
  //private ipUrl = 'http://localhost:8080/server/api/authn/validateip';

  //public isValid = false;
  public passwordLogin = environment.auth?.login?.enablePassword;

  /**
   * True if the authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;

  public isXsOrSm$: Observable<boolean>;

  public showAuth = observableOf(false);

  public user: Observable<EPerson>;

  public sub: Subscription;

  constructor(private store: Store<AppState>,
              private windowService: HostWindowService,
              private authService: AuthService,
              private http: HttpClient
  ) {
    this.isXsOrSm$ = this.windowService.isXsOrSm();
  }

  //getIp(): Observable<any> {
  //  return this.http.get(this.ipUrl, {responseType: 'text'})
  //  //return this.http.get<any>(this.ipUrl, { responseTye: 'text'});
  //}

  //checkIp(ipAddress:string): boolean {
  //  return true;
  //}
  
  ngOnInit(): void {
    // set isAuthenticated
    this.isAuthenticated = this.store.pipe(select(isAuthenticated));

    // set loading
    this.loading = this.store.pipe(select(isAuthenticationLoading));

    this.user = this.authService.getAuthenticatedUserFromStore();

    this.showAuth = this.store.pipe(
      select(routerStateSelector),
      filter((router: RouterReducerState) => isNotUndefined(router) && isNotUndefined(router.state)),
      map((router: RouterReducerState) => (!router.state.url.startsWith(LOGIN_ROUTE)
        && !router.state.url.startsWith(LOGOUT_ROUTE))
      )
    );

    //this.getIp().subscribe(data => {
    //  var response:string= data;
    //  //check if ip is valid
    //  console.log("###response:"+response)
    //  this.isValid = true;
    //  //this.isIpValid = this.checkIp(ipAddress);
    //}
    //);
  }
}
