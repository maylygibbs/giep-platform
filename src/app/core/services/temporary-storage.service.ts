import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemporaryStorageService {


  constructor() { }

  	// I get the data associated with the given key.
	public get( key: string ) : Promise<any> {
    const data = localStorage.getItem( key );
    return data ? JSON.parse(data) : null;
	}

	// I remove the data associated with the given key.
	public remove( key: string ) : void {
		localStorage.removeItem( key );
	}

	// I store the given value with the given key.
	public set( key: string, value: any ) : void {
		localStorage.setItem( key, JSON.stringify(value) );
	}
}
