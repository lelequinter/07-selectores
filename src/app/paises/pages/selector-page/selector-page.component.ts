import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisSmall } from '../../interfaces/paises.interface';
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
    pais: ['', Validators.required]
  });

  //llenar selectores

  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor(private fb: FormBuilder,
    private paisesSvc: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.paisesSvc.regiones;

    //Cuando cambie la region
    this.miFormulario.get('region')?.valueChanges
      .subscribe(region => {
        console.log(region);

        this.paisesSvc.getPaisesPorRegion(region)
          .subscribe(paises => {
            console.log('paises', paises);

            this.paises = paises
          })

      })
  }

  guardar() {
    console.log(this.miFormulario.value);

  }

}
