import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { of } from 'rxjs';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let dbServiceSpy: jasmine.SpyObj<NgxIndexedDBService>;

  beforeEach(async () => {
    dbServiceSpy = jasmine.createSpyObj('NgxIndexedDBService', ['add']);
    await TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: NgxIndexedDBService, useValue: dbServiceSpy },
      ],
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should add data to a valid store', () => {
    const storeName = 'test-store';
    const data = { foo: 'bar' };
    dbServiceSpy.add.and.returnValue(of({ id: 1 }));

    service.add(storeName, data).subscribe((result) => {
      expect(result).toEqual({});
    });

    expect(dbServiceSpy.add).toHaveBeenCalledTimes(1);
    expect(dbServiceSpy.add).toHaveBeenCalledWith(storeName, data);
  });

  it('should throw an error when adding data to an invalid store', () => {
    const storeName = ' invalid-store';
    const data = { foo: 'bar' };
    dbServiceSpy.add.and.throwError('Invalid store name');

    service.add(storeName, data).subscribe(
      () => fail('Expected an error'),
      (error) => expect(error).toBe('Invalid store name')
    );

    expect(dbServiceSpy.add).toHaveBeenCalledTimes(1);
    expect(dbServiceSpy.add).toHaveBeenCalledWith(storeName, data);
  });

  it('should throw an error when adding null or undefined data', () => {
    const storeName = 'test-store';
    const data = null;
    dbServiceSpy.add.and.throwError('Data cannot be null or undefined');

    service.add(storeName, data).subscribe(
      () => fail('Expected an error'),
      (error) => expect(error).toBe('Data cannot be null or undefined')
    );

    expect(dbServiceSpy.add).toHaveBeenCalledTimes(1);
    expect(dbServiceSpy.add).toHaveBeenCalledWith(storeName, data);
  });

  it('should throw an error when adding data with a non-string store name', () => {
    const storeName = '123';
    const data = { foo: 'bar' };
    dbServiceSpy.add.and.throwError('Store name must be a string');

    service.add(storeName, data).subscribe(
      () => fail('Expected an error'),
      (error) => expect(error).toBe('Store name must be a string')
    );

    expect(dbServiceSpy.add).toHaveBeenCalledTimes(1);
    expect(dbServiceSpy.add).toHaveBeenCalledWith(storeName, data);
  });
});
