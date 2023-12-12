import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { user } from '../models/Usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  firebaseSvc = inject(FirebaseService);
  utilsvc = inject(UtilsService);

  constructor(public fb: FormBuilder, public alertController: AlertController, public router: Router) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;

    const usuariosString = localStorage.getItem('usuarios');
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];

    const usuario = usuarios.find((u: { nombre: any; password: any; }) => u.nombre === f.nombre && u.password === f.password);

    if (usuario) {

      localStorage.setItem('nombreUsuario', usuario.nombre);

      console.log('Ingresado');
      localStorage.setItem('ingresado', 'true');

      this.router.navigate(['/inicio-p']);

      const alert = await this.alertController.create({
        header: 'Entraste a la pagina',
        message: 'Has entrado a la aplicacion satisfactoriamente.',
        buttons: ['Aceptar']
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ha ingresado son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  async GETuserInfo(uid: string) {
    if (this.formularioLogin.valid) {
      const loading = await this.utilsvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firebaseSvc.getdocumente(path).then((user: user) => {

        this.utilsvc.saveinlocalStorage('users', user);
        this.utilsvc.routerlinker('/inicio-p');
        this.utilsvc.presentToast({
          message: `Bienvenido a RegistrApp, ${user.nombre.toUpperCase()}`,
          mode : "ios",
          duration: 1500,
          color: 'dark',
          position: 'middle',
          icon: 'person-circle-outline',
        })

      }).catch(error => {
        console.log(error);

        this.utilsvc.presentToast({
          mode : "ios",
          message: error.message,
          duration: 2500,
          color: 'dark',
          position: 'middle',
          icon: 'alert-circle-outline',
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async submit() {
    if (this.formularioLogin.valid) {
      const loading = await this.utilsvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.formularioLogin.value as user).then(async res => {
        this.GETuserInfo(res.user.uid);

        console.log(res)
      }).catch(error => {
        console.log(error);

        this.utilsvc.presentToast({
          mode : "ios",
          message: error.message,
          duration: 2500,
          color: 'dark',
          position: 'middle',
          icon: 'alert-circle-outline',
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}