// indexeddb.service.ts
import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'bddMandamientos';
  private storeName = 'myStore';
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    this.dbPromise = openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('myStore', { keyPath: 'id', autoIncrement: true });
      }
    });
  }

  async addData(data: any) {
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    const id = await store.add(data);
    await tx.done;
    return id;
  }

  async getAllData() {
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    return store.getAll();
  }

  async removeData(id: number) {
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.delete(id);
    await tx.done;
  }
}
