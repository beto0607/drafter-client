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
import { SafeHtml } from '@angular/platform-browser';
import { IElement } from '../../../../../domain';
import { MarkdownService } from '../../services';

@Component({
  selector: 'app-element-caption',
  styleUrl: './element-caption.component.scss',
  templateUrl: './element-caption.component.html',
})
export class ElementCaptionComponent {
  private markdownService = inject(MarkdownService);

  element = input.required<IElement>();
  captionUpdated = output<IElement['caption']>();

  caption = computed(() => this.computeCaption());

  private captionWrapper =
    viewChild<ElementRef<HTMLDivElement>>('captionWrapper');

  constructor() {
    effect(() => {
      this.caption();
      requestAnimationFrame(() => {
        this.handleCaptionHtmlUpdate();
      });
    });
  }

  private handleCaptionHtmlUpdate(): void {
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
      const mdCaption = this.markdownService.makeMarkdown(innerHtml);
      this.captionUpdated.emit(mdCaption);
    };

    for (const checkbox of checkboxesInCaption) {
      checkbox.removeAttribute('disabled');
      checkbox.onchange = onValueChange;
    }
  }

  private computeCaption(): SafeHtml | undefined {
    const caption = this.element()?.caption;
    if (!caption) {
      return undefined;
    }
    const html = this.markdownService.makeSafeHtml(caption);
    return html;
  }
}
