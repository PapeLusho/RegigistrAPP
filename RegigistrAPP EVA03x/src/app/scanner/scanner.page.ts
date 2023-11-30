import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  constructor(private qrScanner: QRScanner) { }

  
  ngOnInit() {
  }

  // Opcionalmente solicitamos los permisos antes de hacer nada
this.qrScanner.prepare()
.then((status: QRScannerStatus) => 
   if (status.authorized) {
     // Los permisos están concedidos

     // Comenzamos a escanear
     let scanSub = this.qrScanner.scan().subscribe((text: string) => {
       console.log('Scanned something', text);
       this.qrScanner.hide(); // Ocultamos el preview
       scanSub.unsubscribe(); // Dejamos de Scannear
     });

   } else if (status.denied) {

     // Los permisos de la cámara están denegados permanentemente
     // Para poder volver a usar la cámara, el usaurio tendrá que abrir los ajustes de persmisos
     // Y dar permisos desde allí con la función "openSettings"

   } else {

     // Los permisos han sido denegados, pero no permanentemente. Si los solicitas otra vez volverá a aparecer la solicitud.

   }
})

.catch((e: any) => console.log('Error is', e));


// *Tuve errores al momento de intentar instalar __ionic cordova plugin add cordova-plugin-qrscanner 
// *y tambien al querer intalar __npm install @ionic-native/qr-scanner