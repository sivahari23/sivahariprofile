import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {

  isOpen = signal(false);

  toggleChat(): void {
    this.isOpen.update((open) => !open);
  }
}
