import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  // toUserId: string;
  time: number | string;
  message: string;
  status: string;
  role: string;
  url: string;
}

export class UserInfo {
  id: string;
  name: string;
  avatar: string;
}

@Injectable()
export class ChatService {

  constructor(private http: HttpClient,
              private events: Events) {
  }

  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Hancock',
      userAvatar: localStorage.getItem('login_avatar'),
      // toUserId: '140000198202211138',
      time: Date.now(),
      message: msg.message,
      status: 'success',
      role: 'user',
      url: ''
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  getMsgList(): Observable<ChatMessage[]> {
    const msgListUrl = './assets/mock/msg-list.json';
    return this.http.get<any>(msgListUrl)
    .pipe(map(response => response.array));
  }

  sendMsg(msg: ChatMessage) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    .then(() => this.mockNewMsg(msg));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: localStorage.getItem('login_account'),
      name: localStorage.getItem('login_name'),
      avatar: localStorage.getItem('login_avatar')
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
