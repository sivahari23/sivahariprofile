import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

export interface ChatResponse {
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://ne9dkpezxf.execute-api.us-east-2.amazonaws.com/dev/APIrequest';

  sendMessage(
    message: string
  ): Observable<ChatResponse> {

    console.log(
      'Sending message to API:',
      message
    );

  return this.http.post<{ answer: string }>(
      this.apiUrl,
      {
        message: message
      }
    );
  }
}