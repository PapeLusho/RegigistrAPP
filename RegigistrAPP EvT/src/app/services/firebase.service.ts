import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { user } from '../models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  Fairstore = inject(AngularFirestore);

  signIn(user: user) {
    return signInWithEmailAndPassword(getAuth(), user.correo, user.password);
  }
  signUp(user: user) {
    return createUserWithEmailAndPassword(getAuth(), user.correo, user.password);
  }
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }
  setDocumente(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data)
  }
  async getdocumente(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
}