import { Component } from '@angular/core';
import { SidebarFilterComponent as BaseComponent } from '../../../../../../app/shared/sidebar/filter/sidebar-filter.component';
import { slide } from '../../../../../../app/shared/animations/slide';

@Component({
  selector: 'ds-sidebar-filter',
  styleUrls: ['./sidebar-filter.component.scss'],
  templateUrl: './sidebar-filter.component.html',
  animations: [slide],
})
/**
 * This components renders a sidebar filter including the label and the selected values.
 * The filter input itself should still be provided in the content.
 */
export class SidebarFilterComponent extends BaseComponent {

}
