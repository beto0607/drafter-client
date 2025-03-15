import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import showdown from 'showdown';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private domSanitizer = inject(DomSanitizer);

  private mdConverter = new showdown.Converter({
    strikethrough: true,
    tasklists: true,
  });

  constructor() {
    this.setupConverter();
  }

  makeHtml(caption: string): string {
    return this.mdConverter.makeHtml(caption);
  }

  makeSafeHtml(caption: string): SafeHtml {
    const html = this.mdConverter.makeHtml(caption);
    const trustedHtml = this.domSanitizer.bypassSecurityTrustHtml(html);
    return trustedHtml;
  }

  makeMarkdown(html: string): string {
    return this.mdConverter.makeMarkdown(html);
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
