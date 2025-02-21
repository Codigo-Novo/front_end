import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  
})

export class ModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();

  close() {
    this.showModal = false;
    this.closeModal.emit(this.showModal);
  }
}
