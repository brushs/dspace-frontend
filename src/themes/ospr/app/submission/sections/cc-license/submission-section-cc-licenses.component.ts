import { Component } from '@angular/core';
import { SectionsType } from '../../../../../../app/submission/sections/sections-type';
import { renderSectionFor } from '../../../../../../app/submission/sections/sections-decorator';
import { SubmissionSectionCcLicensesComponent as BaseComponent } from '../../../../../../app/submission/sections/cc-license/submission-section-cc-licenses.component';

/**
 * This component represents the submission section to select the Creative Commons license.
 */
@Component({
  selector: 'ds-submission-section-cc-licenses',
  templateUrl: './submission-section-cc-licenses.component.html',
  styleUrls: ['./submission-section-cc-licenses.component.scss']
})
@renderSectionFor(SectionsType.CcLicense)
export class SubmissionSectionCcLicensesComponent extends BaseComponent {
}
