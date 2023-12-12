import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router)

  loading(){
    return this.loadingCtrl.create({message : "Cargando...", mode : "ios", showBackdrop : true});
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerlinker(url: string){
    return this.router.navigateByUrl(url);
  }

  saveinlocalStorage(key: string, value: any){
    return localStorage.setItem(key,JSON.stringify(value)); 
  }

  getfromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
  }
}   