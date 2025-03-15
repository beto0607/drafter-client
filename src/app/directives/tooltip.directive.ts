import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTooltip]',
})
export class TooltipDirective {
  appTooltip = input.required<string>();
  appTooltipDisabled = input<boolean>(false);
  appTooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

  constructor() {
    const elementRef = inject(ElementRef);
    const hostElement = elementRef.nativeElement as HTMLElement;

    effect(() => {
      const disabled = this.appTooltipDisabled();
      if (disabled) {
        hostElement.classList.remove('app-tooltip');
        return;
      }
      hostElement.classList.add('app-tooltip');
    });

    effect(() => {
      const text = this.appTooltip();
      if (!text) {
        return;
      }
      hostElement.setAttribute('tooltip-text', text);
    });

    effect(() => {
      const position = this.appTooltipPosition();
      hostElement.classList.add('app-tooltip-' + position);
    });
  }
}
