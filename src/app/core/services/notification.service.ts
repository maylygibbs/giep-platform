import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

//import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showNotification$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private socket: Socket,
    private authService: AuthService) { 




    socket.fromEvent('connected_user').subscribe((message: any) => {
        console.log('handle conected event')
        console.log('notificacion', message)
    });
    

    socket.fromEvent('new_message').subscribe((message: any) => {
      console.log('handle new_message event')
        console.log('notificacion', message);
        this.changeStatusNotification(true);
    });

    socket.fromEvent('disconnect').subscribe(() => {
      const user = this.authService.currentUser;
      this.joinRoom(user.email);
    });
  }

  get showNotification():Observable<boolean>{
    return this.showNotification$.asObservable();
  }

  changeStatusNotification(value: boolean){
    this.showNotification$.next(value)
  }

  joinRoom(email: string): void {
    this.socket.emit('add_user', email);
    
  }

}
