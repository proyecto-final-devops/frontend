import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { Router, RouterLink } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
   imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink] ,
  styleUrls: ['./vista-admin.component.scss']
})
export class VistaAdminComponent implements OnInit {
  productos: any[] = [];

  form = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    precio: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  async cargarProductos() {
    try {
      const response = await this.http.get<any[]>(`${environment.apiUrl}/productos`).toPromise();
      this.productos = response ?? [];
    } catch (err) {
      console.error('Error al cargar productos', err);
    }
  }

  async agregarProducto() {
    if (this.form.invalid) return;

    try {
      const nuevoProducto = this.form.value;
      await this.http.post(`${environment.apiUrl}/productos`, nuevoProducto).toPromise();
      this.form.reset();
      this.cargarProductos();
    } catch (err) {
      console.error('Error al agregar producto', err);
    }
  }

  async actualizarProducto(producto: any) {
    try {
      await this.http.put(
        `${environment.apiUrl}/productos/${producto.id}`,
        {
        titulo: producto.titulo,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        precio: producto.precio,
        stock: producto.stockTemp ?? producto.stock 
        }
      ).toPromise();

      alert('Producto actualizado correctamente');
      this.cargarProductos();
    } catch (err) {
    console.error('Error al actualizar producto', err);
    alert('Error al actualizar producto');
    }
  }
    async eliminarProducto(id: number) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await this.http.delete(`${environment.apiUrl}/productos/${id}`).toPromise();
      alert('Producto eliminado correctamente');
      this.cargarProductos();
    } catch (err) {
      console.error('Error al eliminar producto', err);
      alert('Error al eliminar producto');
    }
  }
  

}
