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


    /** Subscribe to connected_user event sent from server */
    socket.fromEvent('connected_user').subscribe((message: any) => {
        console.log('notificacion', message)
    });
    
    /** Subscribe to new_message event sent from server */
    socket.fromEvent('new_message').subscribe((message: any) => {
        console.log('handle new_message event')
        console.log('notificacion', message);
        this.changeStatusNotification(true);
    });

    socket.fromEvent('disconnect').subscribe(() => {
      const user = this.authService.currentUser;      
    });

  }

  /**
   * handle icon display notification
   */
  get showNotification():Observable<boolean>{
    return this.showNotification$.asObservable();
  }

    /**
   * change icon display notification
   */
  changeStatusNotification(value: boolean){
    this.showNotification$.next(value)
  }

  /**
   * Send event join at user
   * @param email 
   */
  joinRoom(email: string): void {
    this.socket.emit('join_user', email);    
  }

  /**
   * Send to server change status notification
   * @param email 
   */
  sendChangeStatusNotification(email: string): void {
    this.socket.emit('change_status_notifications', { email: email, message: null });    
  }

}
