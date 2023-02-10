import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private socket: Socket,
    private authService: AuthService) { 

    socket.fromEvent('conected').subscribe((message: any) => {
      console.log('handle conected event')
        console.log('notificacion', message)
    });

    socket.fromEvent('new_message').subscribe((message: any) => {
      console.log('handle new_message event')
        console.log('notificacion', message)
    });

    socket.fromEvent('disconnect').subscribe(() => {
      const user = this.authService.currentUser;
      this.joinRoom(user.email);
    });
  }


  joinRoom(email: string): void {
    this.socket.emit('event_join', email);
  }

}
