import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  //llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  //UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
    private paisesSvc: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.paisesSvc.regiones;

    //Cuando cambie la region
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap(() => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap(region => this.paisesSvc.getPaisesPorRegion(region))
      )
      .subscribe(paises => {
        // console.log(paises);
        this.paises = paises;
        this.cargando = false;
      })

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          this.miFormulario.get('frontera')?.reset();
          this.cargando = true;
        }),
        switchMap(codigo => this.paisesSvc.getPaisPorCodigo(codigo))
      )
      .subscribe(pais => {
        // console.log(pais);
        this.fronteras = pais?.borders || [];
        this.cargando = false;
      })

    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe(region => {
    //     console.log(region);
    //     this.paisesSvc.getPaisesPorRegion(region)
    //       .subscribe(paises => {
    //         console.log('paises', paises);
    //         this.paises = paises
    //       })
    //   })
  }

  guardar() {
    console.log(this.miFormulario.value);

  }

}
