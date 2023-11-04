import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins} from '@capacitor/core';

const { Camera, Permissions } = Plugins;

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss'],
})
export class ModalTestComponent  implements OnInit {

  // @ViewChild('video', { static: true }) videoElement: ElementRef;
  // @ViewChild('canvas', { static: true }) canvasElement: ElementRef;
  // @ViewChild('cameraSelect', { static: true }) cameraSelectElement: ElementRef;

  // private socket: WebSocket;
  // private intervalId: any;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      // Solicita permisos de cámara después de que la plataforma esté lista
    });
  }

  ngOnInit() {
    this.requestCameraPermission();
    // this.initializeCamera();
    // this.setupCameraOptions();
  }

  private async requestCameraPermission() {
    try {
      const status = await Permissions['requestPermissions']({ permissions: ['camera'] });

      if (status.camera && status.camera.state === 'granted') {
        // Permiso de cámara concedido
      } else {
        console.error('Permiso de cámara no concedido');
      }
    } catch (error) {
      console.error('Error al solicitar permiso de cámara:', error);
    }
  }

}
