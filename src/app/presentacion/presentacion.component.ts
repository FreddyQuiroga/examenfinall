import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NgbCarouselModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexedDbService } from 'app/services/indexed-db.service';

import { ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-presentacion',
  standalone: true,
	imports: [NgbCarouselModule, NgbTabsetModule, FormsModule, BrowserModule],
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.scss'],
})
export class PresentacionComponent implements OnInit {

  nuevoMandamiento: string;
  listaMandamientos: any[];

  constructor(private indexedDbService: IndexedDbService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {

    this.indexedDbService.getAllData().then((data) => {
      console.log('desde ngInit Datos cargados:', data);
  
      // Asegurémonos de que estamos asignando un array
      const dataArray = Array.isArray(data) ? data : [];
      console.log('Longitud de listaMandamientos:', dataArray.length);
  
      // Realicemos una copia de los datos antes de asignarlos
      this.listaMandamientos = [...dataArray];
  
      console.log('Después de cargar:', typeof this.listaMandamientos);
  
      // Agreguemos un log adicional para verificar el contenido
      console.log('Primer mandamiento:', this.listaMandamientos[0]);
       // Forzar el ciclo de detección de cambios manualmente
    this.cdr.detectChanges();
    });
    
  }

  scrollTo(section) {
    const element = document.querySelector('#' + section) as HTMLElement;

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  agregarMandamiento() {
    if (this.nuevoMandamiento) {
      this.indexedDbService.addData({ texto: this.nuevoMandamiento }).then(() => {
        // Realizar cualquier acción adicional después de agregar el mandamiento
        console.log('Mandamiento añadido con éxito');
        // Puedes actualizar la lista de mandamientos o realizar otras acciones aquí
      });

      // Limpiar el campo después de agregar
      this.nuevoMandamiento = '';
      this.cargarListaMandamientos();
    }
  }
  // cargarListaMandamientos() {
  //   this.indexedDbService.getAllData().then((data) => {
  //     console.log('Datos cargados:', data);
  //     this.listaMandamientos = data;
  //   });
  // }
  cargarListaMandamientos() {
    
    console.log('Antes de cargar:', typeof this.listaMandamientos);
    this.indexedDbService.getAllData().then((data) => {
      console.log('Datos cargados:', data);
  
      // Asegurémonos de que estamos asignando un array
      const dataArray = Array.isArray(data) ? data : [];
      console.log('Longitud de listaMandamientos:', dataArray.length);
  
      // Realicemos una copia de los datos antes de asignarlos
      this.listaMandamientos = [...dataArray];
  
      console.log('Después de cargar:', typeof this.listaMandamientos);
  
      // Agreguemos un log adicional para verificar el contenido
      console.log('Primer mandamiento:', this.listaMandamientos[0]);
       // Forzar el ciclo de detección de cambios manualmente
    this.cdr.detectChanges();
    });
  }
  
  

  eliminarMandamiento(id: number) {
    this.indexedDbService.removeData(id).then(() => {
      console.log('Mandamiento eliminado con éxito');
      // Actualiza la lista después de eliminar
      this.cargarListaMandamientos();
    });
  }

}
