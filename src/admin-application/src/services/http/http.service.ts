import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map, tap, take } from "rxjs/operators";
import { trace, empty, getparams } from "ems-web-app-utils";

import * as _ from "underscore";

export enum Status {
	"Success" = 200,
	"Unauthorized" = 401,
	"Forbidden" = 403,
	"NotFound" = 404
}

@Injectable({
	 providedIn: 'root'
})
export class HttpService {

	public jwt: string = "";
	private url: string = environment.endpoint;
	private authorization: string = "";

	constructor(private http: HttpClient) { 
	
	}

	public getTeachers():Promise<any> {
		const request = this.buildRequest("get-teachers");
		return this.executePostRequest(request);
	}

	public createTeachers(teachers:any[]):Promise<any> {
		const request = this.buildRequest("create-teachers");
		return this.executePostRequest(request, { teachers });
	}

	public getClassrooms():Promise<any> {
		const request = this.buildRequest("get-classrooms");
		return this.executePostRequest(request);
	}

	public getStudents(classId: number):Promise<any> {
		const request = this.buildRequest("get-students");
		return this.executePostRequest(request, { classId });
	}

	public getStudentNumbers(teacherId: number):Promise<any> {
		const request = this.buildRequest("get-student-numbers");
		return this.executePostRequest(request, { teacherId });
	}

	public enableStudents(classId: number, students:any[]) {
		const request = this.buildRequest("enable-students");
		return this.executePostRequest(request, { classId, students });
	}

	public disableStudents(classId: number, students:any[]) {
		const request = this.buildRequest("disable-students");
		return this.executePostRequest(request, { classId, students });
	}

	public createStudents(students: any[], classId: number, teacherId: number) {
		const request = this.buildRequest("create-students");
		return this.executePostRequest(request, { students, classId, teacherId });
	}

	public autoCreateStudents(numStudents: number, classId: number, teacherId: number) {
		const request = this.buildRequest("auto-create-students");
		return this.executePostRequest(request, { numStudents, classId, teacherId });
	}

	public createClassrooms(classrooms: any[]):Promise<any> {
		const request = this.buildRequest("create-classrooms");
		return this.executePostRequest(request, { classrooms });
	}

	public enableTeachers(teachers:any[]) {
		const request = this.buildRequest("enable-teachers");
		return this.executePostRequest(request, { teachers });
	}

	public disableTeachers(teachers:any[]) {
		const request = this.buildRequest("disable-teachers");
		return this.executePostRequest(request, { teachers });
	}

	private executeGetRequest(request: string, transform?: (input: any) => any, suppressErrors?: boolean ): Promise<any> {
		const headers = this.headers();
		return this.http.get(request, { headers, withCredentials: true } ).pipe(
				map((result: any) => 
					transform ?  transform(result) : result
				),
	      		catchError(suppressErrors ? this.handleErrorQuietly : this.handleError)
	  	).toPromise();
	}

	private executeDeleteRequest(request: string, suppressErrors: boolean = false): Promise<any> {
		const headers = this.headers();
		return this.http.delete(request, { headers, withCredentials: true }).pipe(
			catchError(suppressErrors ? this.handleErrorQuietly : this.handleError)
		).toPromise();
	}

	private executePutRequest(request: string, data: any, transform?: (input: any) => any, suppressErrors: boolean = false, errorHandler?: (error: HttpErrorResponse) => any): Promise<any> {
		const headers = this.headers();
		return this.http.put(request, data, { headers, withCredentials: true }).pipe(
			map((result: any) => 
					transform ?  transform(result) : result
			),
			catchError(suppressErrors ? this.handleErrorQuietly : (errorHandler || this.handleError))
		).toPromise();
	}

	private executePostRequest(request: string, data: any = {}, transform?: (input: any) => any, suppressErrors?: boolean): Promise<any> {
		const headers = this.headers();
		//@ts-ignore
		data[window.netlogo.tokenName] = window.netlogo.token;
		return this.http.post(request, data, { headers, withCredentials: true } ).pipe(
			map((result: any) => 
				transform ?  transform(result) : result
			),
			catchError(suppressErrors ? this.handleErrorQuietly : this.handleError)
		).toPromise();
	}


	private buildRequest(endpoint: string): string {
		//@ts-ignore
		return `${window.netlogo.endpoint}/${endpoint}`;
	}

	private handleError(error: HttpErrorResponse) {
		return throwError(error);
	}

	private handleErrorQuietly(error: HttpErrorResponse) {
		trace(error);
		return of(null);
	}

	private headers(custom: any = {}): HttpHeaders {
		const headers = _.extend({ 
	        "Content-Type": "application/json",
        	"X-Requested-With": "XMLHttpRequest"
	     }, custom);
		//@ts-ignore
		headers[window.netlogo.tokenName] = window.netlogo.token;
		return new HttpHeaders(headers);
	}
}
