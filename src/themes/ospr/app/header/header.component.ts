import { Component } from '@angular/core';
import { MenuService as BaseComponentMenuService } from '../../../../app/shared/menu/menu.service';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-header',
  styleUrls: ['header.component.scss'],
  //styleUrls: ['../../../../app/header/header.component.scss'],
  templateUrl: 'header.component.html',
  //templateUrl: '../../../../app/header/header.component.html',
})
export class HeaderComponent extends BaseComponent {

    // OSPR code start
    public locationPath: string;
    // OSPR code end

    constructor(
      private menuService2: BaseComponentMenuService
    ) {
       super(menuService2)
      // OSPR code start
        this.getPath();
        // OSPR code end
      
    }

        // OSPR code start
        public getPath(): string {
          this.locationPath = document.location.href;
          if(this.locationPath.indexOf("#") > 0) {
            this.locationPath.substring(this.locationPath.indexOf("#") + 1);
          }
          return this.locationPath;
        }
        // OSPR code end
}
