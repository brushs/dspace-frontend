import { Component, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { controlContainerFactory } from '../../../../../../../app/process-page/form/process-form.component';
import { ParameterSelectComponent as BaseComponent } from '../../../../../../../app/process-page/form/process-parameters/parameter-select/parameter-select.component';

/**
 * Component to select a single parameter for a process
 */
@Component({
  selector: 'ds-parameter-select',
  templateUrl: './parameter-select.component.html',
  styleUrls: ['./parameter-select.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: controlContainerFactory,
    deps: [[new Optional(), NgForm]]
  }]
})
export class ParameterSelectComponent extends BaseComponent {

}
