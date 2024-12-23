import { Component, input, output, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  imports: [IconComponent],
  selector: 'app-title-input',
  templateUrl: './title-input.component.html',
  styleUrl: './title-input.component.scss',
})
export class TitleInputComponent {
  value = input.required<string>();

  allowEmpty = input(false);

  valueChange = output<string>();

  isEditing = signal(false);

  onClick(): void {
    if (this.isEditing()) {
      return;
    }
    this.isEditing.set(true);
  }

  onInputBlur(): void {
    this.isEditing.set(false);
  }

  onValueChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value.trim();
    if (!newValue && !this.allowEmpty()) {
      return;
    }
    const projectName = this.value();
    if (newValue !== projectName) {
      this.valueChange.emit(newValue);
    }
    this.isEditing.set(false);
  }
}
