import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientOrder} from "../../model/clientOrder";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
// @ts-ignore
import {Modal} from 'bootstrap';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  modal: Modal;
  modal2: Modal;
  clientForm!: FormGroup;
  clients!: Client[];
  client!: Client | undefined;
  newClient!: Client;
  enaAdd: boolean = false;

  constructor(private cs: ClientService,
              private fb: FormBuilder,
              private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.modal = new Modal(document.getElementById("modal"));
    this.modal2 = new Modal(document.getElementById("confirmModal"));

    this.cs.getAllClients().subscribe({
      next: data => {
        this.clients = data.data;
      },
      error: err => {
        console.log(err);
      }
    })

    this.clientForm = this.fb.group({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
    })

  }

  openModal(code: number, client?: Client) {
    if (code == 1) {
      this.enaAdd = true;
    }
    this.client = client;
    this.modal.show();

    if (code==2) { // @ts-ignore
      this.client = this.clients.find((c) => c.id === client.id);
      this.clientForm.patchValue({
        name: client?.name,
        address: client?.address,
        contact: client?.contact,
      });
    }
    document.getElementById("modal")?.addEventListener('hidden.bs.modal', () => {
      this.clientForm.reset();
      this.enaAdd=false;
    });

  }

  updateClient() {
    this.newClient = new Client(0, '', '', '');
    //@ts-ignore
    this.newClient.id = this.client.id;
    this.newClient.name = this.clientForm.controls['name'].value;
    this.newClient.address = this.clientForm.controls['address'].value;
    this.newClient.contact = this.clientForm.controls['contact'].value;

    this.cs.updateClient(this.newClient.id, this.newClient).subscribe({
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

  }

  formReset() {
    this.clientForm.reset();
    this.modal.hide();
    this.initialize();
  }

  deleteClient() {
    this.modal2.hide();
    this.modal.hide();

    //   delete request
    // @ts-ignore
    this.cs.deleteClient(this.client.id).subscribe({
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

  deleteClientModal() {
    this.modal2.show();
    document.body.classList.add('blur');

    document.getElementById("modal")?.classList.add('blur');

    document.getElementById("confirmModal")?.addEventListener('hidden.bs.modal', function () {
      document.getElementById("modal")?.classList.remove('blur');
    });

  }


  addClient() {
    this.newClient = new Client(0, '', '', '');
    //@ts-ignore
    this.newClient.name = this.clientForm.controls['name'].value;
    this.newClient.address = this.clientForm.controls['address'].value;
    this.newClient.contact = this.clientForm.controls['contact'].value;
    this.cs.saveClient( this.newClient).subscribe({
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

  }
}
