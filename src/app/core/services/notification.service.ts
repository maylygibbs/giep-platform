import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

//import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /*socket = io('ws://bofficegiepstage.pafar.com.ve:8090/public/chat/php-socket.php', {
    upgrade:true,
    protocols:'http'
  });*/

  constructor(private socket: Socket,
    private authService: AuthService) { 

    socket.fromEvent('connected_user').subscribe((message: any) => {
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
    this.socket.emit('add_user', email);
    
  }

}
