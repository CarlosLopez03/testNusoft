import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export class BaseService {
  public http = new HttpClient(
    new HttpXhrBackend({ build: () => new XMLHttpRequest() })
  );
  urlApi = environment.baseUrl;

  constructor() {}

  protected get(
    urlComplementary: string,
    params?: any,
    options?: any
  ): Observable<any> {
    if (options) {
      options = options;
    } else {
      options = this.getOptions();
    }

    const urlFull = this.getUrl(urlComplementary, params);

    return this.http.get(urlFull, options);
  }

  protected post(
    urlComplementary: string,
    params?: any,
    body?: any,
    options?: any
  ): Observable<any> {
    if (options) {
      options = options;
    } else {
      options = this.getOptions();
    }

    const urlFull = this.getUrl(urlComplementary, params);
    return this.http.post<any>(urlFull, body, options);
  }

  protected put(
    urlComplementary: string,
    params?: any,
    body?: any,
    options?: any
  ): Observable<any> {
    if (options) {
      options = options;
    } else {
      options = this.getOptions();
    }

    const urlFull = this.getUrl(urlComplementary, params);
    return this.http.put<any>(urlFull, body, options);
  }

  protected deleteWhitBody(
    urlComplementary: string,
    options?: any
  ): Observable<any> {
    if (options) {
      options = options;
    } else {
      options = this.getOptions();
    }

    const urlFull = this.getUrl(urlComplementary);
    return this.http.delete<any>(urlFull, options);
  }

  private getUrl(urlComplementary: string, params?: any) {
    let paramsString: string;

    if (params) {
      paramsString = '/' + params;
    } else {
      paramsString = '';
    }
    return this.urlApi + `/${urlComplementary}${paramsString}`;
  }

  private getOptions() {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return {
      headers: httpHeaders,
    };
  }
}
