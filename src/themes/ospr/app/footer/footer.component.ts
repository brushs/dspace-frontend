import { Component, Optional } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { KlaroService as BaseComponentKlaroService } from '../../../../app/shared/cookies/klaro.service';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  //styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: 'footer.component.html'
  //templateUrl: '../../../../app/footer/footer.component.html'
})
export class FooterComponent extends BaseComponent {
  public locationPath: string;

  constructor(@Optional() private cookiesKlaro: BaseComponentKlaroService) {
    super(cookiesKlaro);
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
