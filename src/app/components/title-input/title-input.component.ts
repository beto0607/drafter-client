import { Component, input, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FaIconComponent],
  selector: 'app-title-input',
  templateUrl: './title-input.component.html',
  styleUrl: './title-input.component.scss',
})
export class TitleInputComponent {
  value = input.required<string>();

  allowEmpty = input(false);

  valueChange = output<string>();

  editIcon = faPen;
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
