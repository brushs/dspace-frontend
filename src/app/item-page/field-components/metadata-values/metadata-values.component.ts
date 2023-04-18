import { Component, Input } from '@angular/core';
import { MetadataValue } from '../../../core/shared/metadata.models';

/**
 * This component renders the configured 'values' into the ds-metadata-field-wrapper component.
 * It puts the given 'separator' between each two values.
 */
@Component({
  selector: 'ds-metadata-values',
  styleUrls: ['./metadata-values.component.scss'],
  templateUrl: './metadata-values.component.html'
})
export class MetadataValuesComponent {

  /**
   * The metadata values to display
   */
  @Input() mdValues: MetadataValue[];

  /**
   * The seperator used to split the metadata values (can contain HTML)
   */
  @Input() separator: string;

  /**
   * The label for this iteration of metadata values
   */
  @Input() label: string;

  /**
   *  The current language
   */
  @Input() language: string;

  active: boolean
  activeContent: String

  /**
   */
  ngOnInit() {
    // The dc.title is inserted with no lable but with language.
    // This is the condtion to check if the mdValues contains the dc.title
    this.active = false;
    if (this.language) 
      console.log("++ currentLanguage exist: this.currentLanguage = " + this.language);
    if (this.mdValues && this.mdValues.length > 0) {
      var bothLanguages:boolean = false;
      if (this.mdValues.length > 1)  // there are 2 languages
        bothLanguages = true;
      var mdValue0 = this.mdValues[0];
      if (mdValue0 && mdValue0.language && ! this.label) { // dc.title case
          console.log("++ language exist: mdValue0.language = " + mdValue0.language);
          console.log("mdValue0.value = " + mdValue0.value);
          if (bothLanguages) {
            this.active = true; // flag on to deal with the 2 languages
            for (var i = 0; i < this.mdValues.length; i++) {
              var mdValue = this.mdValues[i];
              if ( mdValue.language == this.language) 
                //this.mdValues.splice(i, 1);
                this.activeContent = mdValue.value;
            }
          }
      } 
    }
    console.log("++ mdValues = " + this.mdValues);
      

  }

}
