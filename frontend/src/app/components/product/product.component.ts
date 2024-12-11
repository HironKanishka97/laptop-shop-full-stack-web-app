import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
// @ts-ignore
import {Modal} from 'bootstrap';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  modal: Modal;
  modal2: Modal;
  productForm!: FormGroup;
  products!: Product[];
  product!: Product;
  newProduct!: Product;
  enaAdd: boolean = false;
  imageRMUrl: any =`default.jpg`;


  constructor(private ps: ProductService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.modal = new Modal(document.getElementById("modal"));
    this.modal2 = new Modal(document.getElementById("confirmModal"));


    this.ps.getAllProducts().subscribe({
      next: data => {
        this.products = data.data;
      },
      error: err => {
        console.log(err);
      }
    })

    this.productForm = this.fb.group({
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      rop: new FormControl('', Validators.required),
      image: new FormControl(''),
    })



  }
  loadedImageUrl(p:any):string{
        return atob(p);
  }

  openModal(code: number, product?: Product) {
    if (code == 1) {
      this.enaAdd = true;
    }
    // @ts-ignore
    this.product = product;
    this.modal.show();

    if (code == 2) { // @ts-ignore
      this.product = this.products.find((p) => p.id === product.id);
      this.productForm.patchValue({
        name: product?.name,
        brand: product?.brand,
        price: product?.price,
        description: product?.description,
        quantity: product?.quantity,
        rop: product?.rop,
      });

      if (this.product.image != null) {
        this.imageRMUrl = atob(this.product.image);}

      }
    document.getElementById("modal")?.addEventListener('hidden.bs.modal', () => {
      this.productForm.reset();
      this.enaAdd = false;
    });

  }

  updateProduct() {
    this.newProduct = new Product(0, '', '', '', 0, 0, 0,'');

    const fileInput = document.getElementById('image') as HTMLInputElement;
    let base64String;
// Check if a file was selected
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Add an event listener for when the file is read
      reader.onload = (event) => {
        base64String = event.target?.result as string;
//api  req
        //@ts-ignore
        this.newProduct.id = this.product.id;
        this.newProduct.name = this.productForm.controls['name'].value;
        this.newProduct.brand = this.productForm.controls['brand'].value;
        this.newProduct.description = this.productForm.controls['description'].value;
        this.newProduct.price = this.productForm.controls['price'].value;
        this.newProduct.quantity = this.productForm.controls['quantity'].value;
        this.newProduct.rop = this.productForm.controls['rop'].value;
        this.newProduct.image = btoa(this.imageRMUrl);


        this.ps.updateProduct(this.newProduct.id, this.newProduct).subscribe({
          next: data => {
            if (data.code === 200) {
              alert(data.message);
              this.formReset();
            } else if (data.code === 404) {
              alert(data.message);
            } else {
              alert(data.message);
            }
          },
          error: err => {
            console.log(err);
          }
        })


      };
      // Start reading the file as Data URL (base64)
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected.");
    }
//



  }

  formReset() {
    this.productForm.reset();
    this.enaAdd = false;
    this.modal.hide();
    this.imageRMUrl =`default.jpg`;
    this.initialize();
  }

  deleteProduct() {
    this.modal2.hide();
    this.modal.hide();

    //   delete request
    // @ts-ignore
    this.ps.deleteProduct(this.product.id).subscribe({
      next: data => {
        if (data.code === 200) {
          alert(data.message);
          this.enaAdd = false;
          this.formReset();
        } else {
          alert(data.message);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteProductModal() {
    this.modal2.show();
    document.body.classList.add('blur');

    document.getElementById("modal")?.classList.add('blur');

    document.getElementById("confirmModal")?.addEventListener('hidden.bs.modal', function () {
      document.getElementById("modal")?.classList.remove('blur');
    });

  }


  addProduct() {
    this.newProduct = new Product(0, '', '', '', 0, 0, 0,'');
    const fileInput = document.getElementById('image') as HTMLInputElement;
    let base64String;
// Check if a file was selected
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Add an event listener for when the file is read
      reader.onload = (event) => {
        base64String = event.target?.result as string;

        //api request
        this.newProduct.name = this.productForm.controls['name'].value;
        this.newProduct.brand = this.productForm.controls['brand'].value;
        this.newProduct.description = this.productForm.controls['description'].value;
        this.newProduct.price = this.productForm.controls['price'].value;
        this.newProduct.quantity = this.productForm.controls['quantity'].value;
        this.newProduct.rop = this.productForm.controls['rop'].value;
        this.newProduct.image = btoa(this.imageRMUrl);
        console.log(this.newProduct);
        this.ps.saveProduct(this.newProduct).subscribe({
          next: data => {
            if (data.code === 201) {
              alert(data.message);
              this.formReset();
            } else {
              alert(data.message);
            }
          },
          error: err => {
            console.log(err);
          }
        })


      };
      reader.readAsDataURL(file);
      // Start reading the file as Data URL (base64)
    } else {
      console.error("No file selected.");
    }

  }

  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageRMUrl = event.target.result;
      }
    }
  }

  clearImage(): void {
    this.imageRMUrl =`default.jpg`;
    this.productForm.controls['image'].reset();
  }
}
