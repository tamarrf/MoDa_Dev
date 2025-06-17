import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { trace, empty, getparams } from "ems-web-app-utils";
import { environment } from '../../environments/environment';

@Injectable({
	 providedIn: 'root'
})
export class AppService {
	public readonly TRANSITION_SPEED = 250;

	private header: BehaviorSubject<string> = new BehaviorSubject<string>("&nbsp;");
	public header$: Observable<string> = this.header.asObservable();

	public setHeader(header: string) {
		this.header.next(header);
	}
}