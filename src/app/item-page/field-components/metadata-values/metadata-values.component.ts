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

  active: boolean //  active that the logic based on language is applied. Otherwise keep original
  activeContent: String // the content to be displayed when the active is true

  /**
   */
  ngOnInit() {
    // The dc.title is inserted with no lable but with language.
    // This is the condtion to check if the mdValues contains the dc.title
    this.active = false; // default keep orignal

    if (this.mdValues && this.mdValues.length > 0) { // not empty
      var bothLanguages:boolean = false;
      if (this.mdValues.length > 1)  // there are 2 languages
        bothLanguages = true;
      
      var mdValue0 = this.mdValues[0];
      if (mdValue0 && mdValue0.language && ! this.label) { // dc.title case, at least one mdValue and no label

          if (bothLanguages) { // 2 languages, the new logic is take control
            this.active = true; // flag on  so the template will display the activeContent
            // now select the content based on the language
            for (var i = 0; i < this.mdValues.length; i++) {
              var mdValue = this.mdValues[i];
              if ( mdValue.language == this.language) 
                this.activeContent = mdValue.value;
            }
          }
      } 
    }

  }

}
