import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private _quickreachService: CategoryService, private router: Router,
    private fb: FormBuilder) { }

  mode: string = "Create";
  title: string = "Category";
  items: any[] = [];
  errorMsg: string = "";
  isVisible: boolean = false;

  categoryForm: FormGroup;
  categoryAdd: any = {};

  ngOnInit() {
    this.initCategoryForm(true);
    this.displayCategory();
    console.log(this.items);
  }

  initCategoryForm(isNew: boolean) {
    if (isNew) {
      this.categoryForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
    } else {
      this.categoryForm = this.fb.group({
        id: [this.categoryAdd.id],
        name: [this.categoryAdd.name, Validators.required],
        description: [this.categoryAdd.description, Validators.required]
      });
    }
  }

  assignCategoryFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.categoryForm.value);

    if (isNew) {
      this.categoryAdd = {}
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
    } else {
      this.categoryAdd = {}
      this.categoryAdd.id = formValues['id'];
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
    }
  }

  displayCategory() {
    this._quickreachService.getCategories().subscribe(data => this.items = data, error => this.errorMsg = error);
  }

  addCategory() {
    this.assignCategoryFormValue(true)
    this._quickreachService.addCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.displayCategory();
      }, error => { this.errorMsg = error });
    console.log(this.categoryForm.value)
  }

  updateCategory() {
    this.assignCategoryFormValue(false)
    this._quickreachService.updateCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.displayCategory();
        this.mode = "Create";
      }, error => { this.errorMsg = error });
  }

  submitForm() {
    if (this.mode == "Create") {
      this.addCategory()
    } else {
      this.updateCategory()
    }
  }

  showCategory() {
    this.isVisible = !this.isVisible;
    this.mode = "Create";
    this.initCategoryForm(true);
  }

  showUpdateForm(item: any) {
    this.isVisible = !this.isVisible;

    this.categoryAdd.id = item.id;
    this.categoryAdd.name = item.name;
    this.categoryAdd.description = item.description;
    this.mode = "Edit"
    this.initCategoryForm(false);
  }

  deleteCategory(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this._quickreachService.deleteCategory(id)
        .subscribe(data => { this.displayCategory() }, error => { this.errorMsg = error });
    } else {
      alert('canceled deletion')
    }
  }
}
