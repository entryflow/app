import { Component, OnInit } from '@angular/core';
import	{	ModalController	}	from	'@ionic/angular';

import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-modal-reg-entry-n-exit',
  templateUrl: './modal-reg-entry-n-exit.component.html',
  styleUrls: ['./modal-reg-entry-n-exit.component.scss'],
})
export class ModalRegEntryNExitComponent implements OnInit {

  public started_register = false;
  public num:any;
  video: any;
  canvas: any;
  cameraSelect: any;
  socket: WebSocket | null = null;
  intervalId: any;
  IMAGE_INTERVAL_MS: number = 42;

  constructor(private formBuilder:FormBuilder, private modalCtrl:ModalController){

  }

  ngOnInit() {
    console.log(this.num)
    // Inicializar lógica aquí si es necesario al cargar la página.
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.cameraSelect = document.getElementById('camera-select');

    // Listar cámaras disponibles y rellenar la selección
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      for (const device of devices) {
        if (device.kind === 'videoinput' && device.deviceId) {
          const deviceOption = document.createElement('option');
          deviceOption.value = device.deviceId;
          deviceOption.innerText = device.label;
          this.cameraSelect.appendChild(deviceOption);
        }
      }
    });
  }

  startDetection() {
    this.started_register = true;
    const deviceId = this.cameraSelect.selectedOptions[0].value;
    this.socket = this.startFaceDetection(this.video, this.canvas, deviceId);
  }

  drawFaceRectangles(video: any, canvas: any, faces: any) {
    const ctx = canvas.getContext('2d');
    ctx.width = video.videoWidth;
    ctx.height = video.videoHeight;

    ctx.beginPath();
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    for (const [x, y, width, height] of faces.faces) {
      ctx.strokeStyle = "#49fb35";
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.stroke();
    }
  }

  startFaceDetection(video: any, canvas: any, deviceId: string) {
    const socket = new WebSocket('wss://entryflow-api.redirectme.net:443/face-detection/'+this.num);

  if (socket) {
    // Connection opened
    socket.addEventListener('open', () => {
      // Comenzar a leer video desde el dispositivo
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId,
          width: { max: 640 },
          height: { max: 480 },
        },
      }).then((stream) => {
        if (video) {
          video.srcObject = stream;
          video.play().then(() => {
            // Adaptar el tamaño del lienzo superpuesto al tamaño del video
            if (canvas) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;

              // Enviar una imagen en el WebSocket cada 42 ms
              this.intervalId = setInterval(() => {
                const tempCanvas = document.createElement('canvas');
                const ctx = tempCanvas.getContext('2d');
                if (ctx) {
                  tempCanvas.width = video.videoWidth;
                  tempCanvas.height = video.videoHeight;
                  ctx.drawImage(video, 0, 0);

                  tempCanvas.toBlob((blob) => {
                    if (blob && socket) {
                      socket.send(blob);
                    }
                  }, 'image/jpeg');
                }
              }, this.IMAGE_INTERVAL_MS);
            }
          });
        }
      });
    });

    // Escuchar mensajes
    socket.addEventListener('message', (event) => {
      console.log(event.data)
      if (canvas) {

        this.drawFaceRectangles(video, canvas, JSON.parse(event.data));
      }
    });

    // Detener el intervalo y la lectura de video al cerrar
    socket.addEventListener('close', () => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      if (video) {
        video.pause();
      }
    });
  }

  return socket;
}

cancel() {
  this.modalCtrl.dismiss(null, 'cancel');

}

}
