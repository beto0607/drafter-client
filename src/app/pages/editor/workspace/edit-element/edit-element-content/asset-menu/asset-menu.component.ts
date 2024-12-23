import { Component, effect, inject, input, viewChild } from '@angular/core';
import {
  IconComponent,
  KebabItemDirective,
  KebabMenuComponent,
  KebabSeparatorDirective,
} from '../../../../../../components';
import { IElement } from '../../../../../../domain';
import { WorkspaceStateService } from '../../../../../../state/workspace';

@Component({
  selector: 'app-asset-menu',
  imports: [
    IconComponent,
    KebabItemDirective,
    KebabMenuComponent,
    KebabSeparatorDirective,
  ],
  templateUrl: './asset-menu.component.html',
  styleUrls: [
    '../../../../../../styles/menu.styles.scss',
    './asset-menu.component.scss',
  ],
})
export class AssetMenuComponent {
  private workspaceStateService = inject(WorkspaceStateService);

  elementId = input.required<IElement['id']>();
  asset = input.required<IElement['assets'][0]>();

  private menu = viewChild.required(KebabMenuComponent);

  constructor() {
    effect(() => {
      const _elements = this.workspaceStateService.elements();
      this.menu().close();
    });
  }
  onDuplicateAssetClicked(): void {
    const elementId = this.elementId();
    const assetId = this.asset().id;
    this.workspaceStateService.duplicateAssetInElement(elementId, assetId);
  }

  onCopyLinkClicked(): void {
    console.log('onCopyLinkClicked');
  }

  onDeleteAssetClicked(): void {
    const elementId = this.elementId();
    const assetId = this.asset().id;
    this.workspaceStateService.deleteAssetFromElement(elementId, assetId);
  }
}
