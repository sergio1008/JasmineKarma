import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClienteModel } from '../models/cliente-model';
import { ProductoModel } from '../models/producto-model';
import { ClienteService } from '../services/clientes/cliente.service';
import { PersonaService } from '../services/persona.service';

@Component({
	selector: 'app-persona',
	templateUrl: './persona.component.html',
	styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

	productNameControl: FormControl;
	products: Array<ProductoModel> = [];
	product?: ProductoModel | null;
	price = 0;
	constructor(
		private readonly personaService: PersonaService,
		private readonly clientsService : ClienteService
		) {
		this.productNameControl = new FormControl('');
	}

	ngOnInit(): void {
		this.personaService.getProducts().then(data => {
			this.products = data;
		}).catch((err: Error) => {
			console.error(err.message)
		});
		this.productNameControl.valueChanges.subscribe((data : string)=>{
			if(data.length >= 3){
				this.getProductByName(data);
			}else{
				this.getProductByName('');
			}
		 });

		 this.clientsService.getAllClients().subscribe(data => {
			 if(data.status == 200){
				console.log(data.body);
				
			 }
		 });
	}

	getTotalPrice(products: Array<ProductoModel>): number {
		let total = 0;
		products.forEach(prod =>{
			total = total + prod.price;
		});
		return total;
	}

	getProductMoreExpensive() {

	}

	getProductById(id: number) {
		this.personaService.getProductById(id)
			.then((data) => {
				this.product = data;
			}).catch((err: Error) => {
				console.error(err.message)
			});
	}

	getProductByName(name: string) {
		this.personaService.getProductByName(name)
			.then((data) => {
				this.products = data;
			}).catch((err: Error) => {
				console.error(err.message)
			});
	}
}
