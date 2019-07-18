import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  mode: string = "Create";
  constructor(private _quickreachService: ProductService, private router: Router,
    private fb: FormBuilder) { }

  items: any[] = [];
  errorMsg: string = "";
  isVisible: boolean = false;
  productForm: FormGroup;
  productAdd: any = {};

  ngOnInit() {
    this.initProductForm(true);
    this.displayProduct();
    console.log(this.items);
  }

  initProductForm(isNew: boolean) {
    if (isNew) {
      this.productForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        imgURL: ['', Validators.required],
        price: ['', Validators.required]
      });
    } else {
      this.productForm = this.fb.group({
        id: [this.productAdd.id],
        name: [this.productAdd.name, Validators.required],
        description: [this.productAdd.description, Validators.required],
        imgURL: [this.productAdd.imgURL, Validators.required],
        price: [this.productAdd.price, Validators.required]
      });
    }
  }

  assignProductFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.productForm.value);

    if (isNew) {
      this.productAdd = {}
      this.productAdd.name = formValues['name'];
      this.productAdd.description = formValues['description'];
      this.productAdd.imgURL = formValues['imgURL'];
      this.productAdd.price = formValues['price'];
    } else {
      this.productAdd = {}
      this.productAdd.id = formValues['id'];
      this.productAdd.name = formValues['name'];
      this.productAdd.description = formValues['description'];
      this.productAdd.imgURL = formValues['imgURL'];
      this.productAdd.price = formValues['price'];
    }
  }

  displayProduct() {
    this._quickreachService.getItem().subscribe(data => this.items = data, error => this.errorMsg = error);
  }

  addProduct() {
    // ''this.productAdd.id = this.items.slice(-1).find( x => this.id = x.id+1);''
    this.assignProductFormValue(true)
    this._quickreachService.addItem(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProduct();
      }, error => { this.errorMsg = error });
    console.log(this.productForm.value)
  }

  updateProduct() {
    this.assignProductFormValue(false)
    this._quickreachService.updateItem(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProduct();
        this.mode = "Create";
      }, error => { this.errorMsg = error });
  }

  submitForm() {
    if (this.mode == "Create") {
      this.addProduct()
    } else {
      this.updateProduct()
    }
  }

  showProduct() {
    this.isVisible = !this.isVisible;
    this.mode = "Create";
    this.initProductForm(true);
  }

  showUpdateForm(item: any) {
    this.isVisible = !this.isVisible;

    this.productAdd.id = item.id;
    this.productAdd.name = item.name;
    this.productAdd.description = item.description;
    this.productAdd.price = item.price;
    this.productAdd.imgURL = item.imgURL;
    this.mode = "Edit"
    this.initProductForm(false);
  }

  deleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this._quickreachService.deleteItem(id)
        .subscribe(data => { alert('deleted'), this.displayProduct() }, error => this.errorMsg = error);
    } else {
      alert('canceled deletion')
    }

  }
}
