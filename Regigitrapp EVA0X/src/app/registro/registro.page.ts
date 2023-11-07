import { Component, OnInit, inject } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { user } from '../models/Usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController) {
    this.formularioRegistro = this.fb.group({
      uid: new FormControl(''),
      'nombre': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    })
  }

  firebaseSvc = inject(FirebaseService)
  utilsvc = inject(UtilsService)

  ngOnInit() {
  }

  async guardar() {
    const formData = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    const usuariosString = localStorage.getItem('usuarios');
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];

    usuarios.push({
      nombre: formData.nombre,
      correo: formData.correo,
      password: formData.password
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const alert = await this.alertController.create({
      header: 'Datos guardados',
      message: 'Tus datos han sido guardados',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async submit() {
    if (this.formularioRegistro.valid) {
      const loading = await this.utilsvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.formularioRegistro.value as user).then(async res => {

        await this.firebaseSvc.updateUser(this.formularioRegistro.value.nombre);

        let uid = res.user.uid;
        this.formularioRegistro.controls['uid'].setValue(uid);

        this.SetuserInfo(uid);

        console.log(res)
      }).catch(error => {
        console.log(error);

        this.utilsvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'dark',
          position: 'middle',
          icon: 'alert-circle-outline',
          mode : "ios"
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async SetuserInfo(uid: string) {
    if (this.formularioRegistro.valid) {
      const loading = await this.utilsvc.loading();
      await loading.present();

      const path = `users/${uid}`;

      this.firebaseSvc.setDocumente(path, this.formularioRegistro.value).then(async res => {

        this.utilsvc.saveinlocalStorage('users', this.formularioRegistro.value);

        this.utilsvc.presentToast({
          message: `Usuario registrado con exito`,
          duration: 1500,
          color: 'dark',
          position: 'middle',
          icon: 'person-circle-outline',
          mode : "ios"
        })

        console.log(res)

      }).catch(error => {
        console.log(error);

        this.utilsvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'dark',
          position: 'middle',
          icon: 'alert-circle-outline',
          mode : "ios"
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}