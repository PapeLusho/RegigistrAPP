import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { user } from '../models/Usuario.model';

@Component({
  selector: 'app-inicio-p',
  templateUrl: './inicio-p.page.html',
  styleUrls: ['./inicio-p.page.scss'],
})
export class InicioPPage implements OnInit {
  nombreUsuario: string | null;
  correoUsuario: string | null;

  constructor() {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      const usuarioObj = JSON.parse(storedUsuario);
      this.nombreUsuario = usuarioObj.nombre || null;
    } else {
      this.nombreUsuario = null;
    }
    if (storedUsuario) {
      const usuarioObj = JSON.parse(storedUsuario);
      this.correoUsuario = usuarioObj.correo || null;
    } else {
      this.correoUsuario = null;
    }
  }

  FirebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): user {
    return this.utilsSvc.getfromLocalStorage('users');
  }
}