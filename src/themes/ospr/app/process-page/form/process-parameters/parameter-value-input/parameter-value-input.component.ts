import { Component, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { controlContainerFactory } from '../../../../../../../app/process-page/form/process-form.component';
import { ParameterValueInputComponent as BaseComponent } from '../../../../../../../app/process-page/form/process-parameters/parameter-value-input/parameter-value-input.component';

/**
 * Component that renders the correct parameter value input based the script parameter's type
 */
@Component({
  selector: 'ds-parameter-value-input',
  templateUrl: './parameter-value-input.component.html',
  styleUrls: ['./parameter-value-input.component.scss'],
  viewProviders: [ { provide: ControlContainer,
    useFactory: controlContainerFactory,
    deps: [[new Optional(), NgForm]] } ]
})
export class ParameterValueInputComponent extends BaseComponent {
 
}
