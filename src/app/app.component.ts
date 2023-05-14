import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  element: any[] = [
    {
      id: 0,
      name: "comida",
      products: [
        {
          id: 0,
          name: "pasta",
          marcas: [
            {
              id: 0,
              name: "pasta1",
              sales: [100, 234, 342, 243, 150]
            },
            {
              id: 1,
              name: "pasta2",
              sales: [333, 234, 267, 480, 123]
            },
            {
              id: 2,
              name: "pasta3",
              sales: [50, 333, 211, 500, 111]
            },
          ]
        },
        {
          id: 1,
          name: "sushi",
          marcas: [
            {
              id: 0,
              name: "sushi1",
              sales: [111, 235, 78, 344, 478]
            },
            {
              id: 1,
              name: "sushi2",
              sales: [456, 234, 123, 444, 368]
            },
            {
              id: 2,
              name: "sushi3",
              sales: [432, 234, 114, 333, 123]
            },
          ]
        },
        {
          id: 2,
          name: "tacos",
          marcas: [
            {
              id: 0,
              name: "tacos1",
              sales: [328, 278, 190, 478, 106],
            },
            {
              id: 1,
              name: "tacos2",
              sales: [478, 178, 278, 455, 325],
            },
            {
              id: 2,
              name: "tacos3",
              sales: [344, 289, 319, 466, 167],
            },
          ]
        },
      ],
    },
    {
      id: 1,
      name: "zapatos",
      products: [
        {
          id: 0,
          name: "nike",
          marcas: [
            {
              id: 0,
              name: "nike1",
              sales: [322, 244, 288, 477, 111]
            },
            {
              id: 1,
              name: "nike2",
              sales: [388, 243, 333, 187, 421]
            },
            {
              id: 2,
              name: "nike3",
              sales: [399, 498, 344, 480, 199]
            },
          ]
        },
        {
          id: 1,
          name: "adidas",
          marcas: [
            {
              id: 0,
              name: "adidas1",
              sales: [222, 332, 234, 444, 111]
            },
            {
              id: 1,
              name: "adidas2",
              sales: [299, 234, 431, 149, 123]
            },
            {
              id: 2,
              name: "adidas3",
              sales: [333, 169, 277, 124, 543]
            },
          ]
        },
        {
          id: 2,
          name: "puma",
          marcas: [
            {
              id: 0,
              name: "puma1",
              sales: [431, 154, 286, 465, 129]
            },
            {
              id: 1,
              name: "puma2",
              sales: [397, 243, 257, 480, 154]
            },
            {
              id: 2,
              name: "puma3",
              sales: [333, 234, 267, 480, 123]
            },
          ]
        },
      ],
    },
    {
      id: 2,
      name: "carro",
      products: [
        {
          id: 0,
          name: "audi",
          marcas: [
            {
              id: 0,
              name: "audi1",
              sales: [366, 433, 221, 432, 199]
            },
            {
              id: 1,
              name: "audi2",
              sales: [321, 266, 288, 411, 122]
            },
            {
              id: 2,
              name: "audi3",
              sales: [444, 222, 278, 497, 111]
            },
          ]
        },
        {
          id: 1,
          name: "ferrari",
          marcas: [
            {
              id: 0,
              name: "ferrari1",
              sales: [398, 288, 255, 476, 156]
            },
            {
              id: 1,
              name: "ferrari2",
              sales: [388, 288, 255, 411, 194]
            },
            {
              id: 2,
              name: "ferrari3",
              sales: [222, 543, 266, 411, 177]
            },
          ]
        },
        {
          id: 2,
          name: "bmw",
          marcas: [
            {
              id: 0,
              name: "bmw1",
              sales: [222, 335, 211, 476, 122]
            },
            {
              id: 1,
              name: "bmw2",
              sales: [333, 234, 267, 480, 123]
            },
            {
              id: 2,
              name: "bmw3",
              sales: [345, 265, 359, 276, 444]
            },
          ]
        },
      ],
    },
  ]

  chart: any;
  categorias: any[] = [];
  marcas: any[] = [];
  productos: any[] = [];
  data: any

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.categorias = this.element;
    this.productos = this.element[0].products;
    this.marcas = this.productos[0].marcas;
    this.data = this.marcas[0].sales;
  }

  f = this.formBuilder.group({
    category: [0],
    product: [0],
    marc: [0],

  });

  ngOnInit(): void {
    this.createChart();
  }



  HandlerSelectCategoria(value: any) {
    this.productos = this.categorias[value].products
    this.f.get('product')?.setValue(0);
    this.HandlerSelectProducto(0);
  }

  HandlerSelectProducto(value: any) {
    this.marcas = this.productos[value].marcas;
    this.f.get('marc')?.setValue(0);
    this.HandlerSelectMarca(0);
  }

  HandlerSelectMarca(value: any) {
    this.addData(this.marcas[value].sales)
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',],
        datasets: [
          {
            label: "Sales",
            data: this.data,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 3.5
      }
    });
  }

  addData(data: any) {
    this.chart.data.datasets.forEach((dataset: any) => {
      dataset.data = data;
    });
    this.chart.update();
  }
}
