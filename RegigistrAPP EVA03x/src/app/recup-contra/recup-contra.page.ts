import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-recup-contra',
  templateUrl: './recup-contra.page.html',
  styleUrls: ['./recup-contra.page.scss'],
})
export class RecupContraPage implements OnInit {

  formularioRecuperacion: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public router: Router) {
    this.formularioRecuperacion = this.fb.group({
      'correo': new FormControl("", Validators.required),
    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsvc = inject(UtilsService);

  ngOnInit() { }
  
  async recoveryEmail() {
    if (this.formularioRecuperacion.valid) {
      const loading = await this.utilsvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.formularioRecuperacion.value.correo).then(async res => {

        this.utilsvc.presentToast({
          message: `Se ha enviado un correo con la solicitud`,
          duration: 1500,
          color: 'dark',
          position: 'middle',
          mode : "ios",
          icon: 'person-circle-outline'
        })

        console.log(res)
      }).catch(error => {
        console.log(error);

        this.utilsvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'dark',
          position: 'middle',
          mode : "ios",
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}