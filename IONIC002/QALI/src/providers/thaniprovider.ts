import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class thaniProvider {

  private rEndpoint = 'https://thaniservices.azurewebsites.net/';
  public id = 0;

  constructor(public  http: HttpClient) {
  }

  private getUrl(command: string) {
    return this.rEndpoint + command;
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public LogIn(user: string, password: string): Observable<{}> {
    let url: string = this.getUrl("/api/Usuario/ValidateUser/" + user + "/" + password);
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public GetUserDetails(id: number): Observable<{}> {
    let url: string = this.getUrl("/api/MiBand/GetUserDataDetails?id=" + id);
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public GetUserByCell(cell: string): Observable<{}> {
    let url: string = this.getUrl("/api/Usuario/GetUserByCel/" + cell);
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
