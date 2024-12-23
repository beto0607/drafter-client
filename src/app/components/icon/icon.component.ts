import { Component, computed, input } from '@angular/core';
import { FaIconComponent, IconName } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon',
  imports: [FaIconComponent],
  styles: `
    fa-icon {
      color: var(--ui-icon-color, #000);
    }
  `,
  template: `<fa-icon [icon]="faIcon()" />`,
})
export class IconComponent {
  icon = input.required<IconName>();

  faIcon = computed(() => {
    const iconName = this.icon();
    return fas[iconName];
  });
}
