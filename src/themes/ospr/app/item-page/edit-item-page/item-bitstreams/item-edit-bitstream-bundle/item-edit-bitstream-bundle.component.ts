import { Component, ViewContainerRef as BaseComponentViewContainerRef } from '@angular/core';
import { ItemEditBitstreamBundleComponent as BaseComponent } from '../../../../../../../app/item-page/edit-item-page/item-bitstreams/item-edit-bitstream-bundle/item-edit-bitstream-bundle.component';

@Component({
  selector: 'ds-item-edit-bitstream-bundle',
  styleUrls: ['../../../../../../../app/item-page/edit-item-page/item-bitstreams/item-bitstreams.component.scss'],
  templateUrl: './item-edit-bitstream-bundle.component.html',
})
/**
 * Component that displays a single bundle of an item on the item bitstreams edit page
 * Creates an embedded view of the contents. This is to ensure the table structure won't break.
 * (which means it'll be added to the parents html without a wrapping ds-item-edit-bitstream-bundle element)
 */
export class ItemEditBitstreamBundleComponent extends BaseComponent {
  constructor(private viewContainerRefBaseComponnet: BaseComponentViewContainerRef) {
    super(viewContainerRefBaseComponnet);
  }
}
