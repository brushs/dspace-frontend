import { Component } from '@angular/core';
import { LogInComponent as BaseComponent} from '../../../../../app/shared/log-in/log-in.component';


/**
 * /users/sign-in for NRCan
 * @class NrcanLogInComponent
 */
@Component({
  selector: 'ds-log-in2',
  templateUrl: './nrcan-log-in.component.html',
  //styleUrls: ['./log-in.component.scss']
})
export class NrcanLoginComponent extends BaseComponent {
}
