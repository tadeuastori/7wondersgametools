import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private dbService: NgxIndexedDBService) {}

  public add<T>(storeName: string, data: T): Observable<T> {
    return this.dbService.add<T>(storeName, data);
  }

  public update<T>(storeName: string, data: T): Observable<T> {
    return this.dbService.update(storeName, data);
  }

  public deleteByKey<T>(storeName: string, id: number): Observable<T[]> {
    return this.dbService.delete(storeName, id); 
  }

  public getByKey<T>(storeName: string, key: number): Observable<T> {
    return this.dbService.getByKey<T>(storeName, key);
  }

  public getByColumn<T>(storeName: string, column: string, value: string): Observable<T> {
    return this.dbService.getByIndex<T>(storeName, column, value);
  }

  public getAllByProperty<T>(
    storeName: string,
    property: string,
    value: string
  ): Observable<T[]> {
    return this.dbService.getAllByIndex<T>(
      storeName,
      property,
      IDBKeyRange.only(value)
    );
  }

  public getAll<T>(storeName: string): Observable<T[]> {
    return this.dbService.getAll<T>(storeName);
  }
}
