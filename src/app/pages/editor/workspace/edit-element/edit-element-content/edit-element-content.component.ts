import { Component, input } from '@angular/core';
import { IElement } from '../../../../../domain';
import { IconComponent } from '../../../../../components';
import { AssetMenuComponent } from './asset-menu/asset-menu.component';

@Component({
  imports: [IconComponent, AssetMenuComponent],
  selector: 'app-edit-element-content',
  templateUrl: './edit-element-content.component.html',
  styleUrl: './edit-element-content.component.scss',
})
export class EditElementContentComponent {
  element = input.required<IElement>();
}
