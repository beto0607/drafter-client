import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import showdown from 'showdown';
import {
  CarouselComponent,
  CarouselItemDirective,
} from '../../../../../components';
import { IElement } from '../../../../../domain';

@Component({
  imports: [CarouselComponent, CarouselItemDirective],
  selector: 'app-element-content',
  styleUrl: './element-content.component.scss',
  templateUrl: './element-content.component.html',
})
export class ElementContentComponent {
  private domSanitizer = inject(DomSanitizer);

  element = input.required<IElement>();
  captionUpdated = output<IElement['caption']>();
  caption = computed(() => this.computeCaption());
  private captionWrapper =
    viewChild<ElementRef<HTMLDivElement>>('captionWrapper');

  private mdConverter = new showdown.Converter({
    strikethrough: true,
    tasklists: true,
  });

  constructor() {
    this.setupConverter();

    effect(() => {
      this.captionHtmlUpdated();
    });
    effect(() => {
      this.caption();
      requestAnimationFrame(() => {
        this.captionHtmlUpdated();
      });
    });
  }

  private captionHtmlUpdated(): void {
    const captionWrapper = this.captionWrapper();
    if (!captionWrapper) {
      return;
    }
    const checkboxesInCaption: NodeListOf<HTMLInputElement> =
      captionWrapper.nativeElement.querySelectorAll('input[type="checkbox"]');

    const onValueChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        target.setAttribute('checked', '');
      } else {
        target.removeAttribute('checked');
      }

      const innerHtml = captionWrapper.nativeElement.innerHTML;
      const mdCaption = this.mdConverter.makeMarkdown(innerHtml);
      this.captionUpdated.emit(mdCaption);
    };

    for (const checkbox of checkboxesInCaption) {
      checkbox.removeAttribute('disabled');
      checkbox.onchange = onValueChange;
    }
  }

  private computeCaption(): SafeHtml | undefined {
    const element = this.element();
    const caption = element.caption;
    if (!caption) {
      return undefined;
    }
    const html = this.mdConverter.makeHtml(caption);
    const trustedHtml = this.domSanitizer.bypassSecurityTrustHtml(html);
    return trustedHtml;
  }

  private setupConverter(): void {
    const originalListItemParser = showdown.subParser('makeMarkdown.listItem');
    const checkedCheckbox =
      '<input type="checkbox" style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;" checked="">\n\n';
    const uncheckedCheckbox =
      '<input type="checkbox" style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;">\n\n';
    showdown.subParser(
      'makeMarkdown.listItem',
      (node, options, globals): string => {
        const updatedValue = originalListItemParser(node, options, globals);
        return updatedValue
          .replaceAll(checkedCheckbox, '[x]')
          .replaceAll(uncheckedCheckbox, '[]');
      },
    );
    this.mdConverter.setFlavor('github');
  }
}
