import { Component } from '@angular/core';
import { MenuService as BaseComponentMenuService} from '../shared/menu/menu.service';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  //styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: 'footer.component.html'
  //templateUrl: '../../../../app/footer/footer.component.html'
})
export class FooterComponent extends BaseComponent {
  public locationPath: string;

  constructor(
    private menuService: BaseComponentMenuService
  ) {
      super(menuService);
      this.getPath();
  }

  public getPath(): string {
    this.locationPath = document.location.href;
    if(this.locationPath.indexOf("#") > 0) {
      return this.locationPath.substring(0, this.locationPath.indexOf("#"));
    }
    return this.locationPath;
  }
}
