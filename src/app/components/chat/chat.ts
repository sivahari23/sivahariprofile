import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ChatService } from '../../service/chat';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements AfterViewChecked {

  private readonly chatService = inject(ChatService);

  // Chat is CLOSED initially
  isOpen = false;

  // Input field
  message = '';

  // Chat messages
  messages: ChatMessage[] = [
    {
      role: 'assistant',
      content: 'Hi! I am Siva AI. Ask me anything about Siva.'
    }
  ];

  // Chat message container
  @ViewChild('messagesContainer')
  messagesContainer?: ElementRef<HTMLDivElement>;

  private shouldScroll = false;

  /**
   * Open / close chat
   */
  toggleChat(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.shouldScroll = true;
    }
  }

  /**
   * Send message
   */
  sendMessage(): void {

    const text = this.message.trim();

    // Don't send empty message
    if (!text) {
      return;
    }

    console.log('User message:', text);

    // Add user message
    this.messages.push({
      role: 'user',
      content: text
    });

    // IMPORTANT:
    // Send `text`, NOT this.message
    // because this.message will be cleared.
    this.chatService.sendMessage(text).subscribe({

      next: (response) => {

        console.log('FULL API RESPONSE:', response);
        console.log('ANSWER:', response.answer);

        // Add AI response
        this.messages.push({
          role: 'assistant',
          content: response.answer
        });

        // Scroll after AI response
        this.shouldScroll = true;
      },

      error: (error) => {

        console.error('API ERROR:', error);

        this.messages.push({
          role: 'assistant',
          content: 'Sorry, I could not process your request.'
        });

        this.shouldScroll = true;
      }

    });

    // Clear input AFTER sending
    this.message = '';

    // Scroll to user's message
    this.shouldScroll = true;
  }

  /**
   * Scroll chat to bottom
   */
  ngAfterViewChecked(): void {

    if (!this.shouldScroll) {
      return;
    }

    this.scrollToBottom();

    this.shouldScroll = false;
  }

  private scrollToBottom(): void {

    const container =
      this.messagesContainer?.nativeElement;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }
}