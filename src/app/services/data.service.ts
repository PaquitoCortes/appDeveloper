import { Injectable, numberAttribute } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export interface Number {
  id?: string;
  input: string;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getNumbers(): Observable<Number[]>{
    const numbersRef = collection(this.firestore, 'numbers')
    return collectionData(numbersRef, {idField: 'id'}) as Observable<Number[]>;
  }

  getNumbersById(id: any): Observable<Number>{
    const numbersDocRef = doc(this.firestore, `numbers/${id}`);
    return docData(numbersDocRef, {idField: 'id'}) as Observable<Number>;
  }

  addNumber(number: Number){
    const numbersRef = collection(this.firestore, 'numbers');
    return addDoc(numbersRef, number);
  }

  deleteNumber(number: Number){
    const numbersDocRef = doc(this.firestore, `numbers/${number.id}`);
    return deleteDoc(numbersDocRef)
  }

  updateNumber(number: Number){
    const numbersDocRef = doc(this.firestore, `numbers/${number}`);
    return updateDoc(numbersDocRef, {input: number.input, result: number.result})
  }

}
