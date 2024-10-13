import { Component, Output, EventEmitter } from '@angular/core';
import { ContactApiServiceService } from '../../services/contact-api-service.service';
import { Contact } from '../../Models/contact';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    DynamicDialogModule,
    StyleClassModule
  ],
  providers: [MessageService]
})
export class ContactEditComponent {
  contact: Contact;
  selectedFile: File | null = null;
  visible: boolean = true; 

  constructor(
    private contactService: ContactApiServiceService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.contact = { ...config.data.contact };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.contact.profileImage = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveContact(): void {
    this.contactService.updateContact(this.contact.id, this.contact).subscribe(
      () => {
        this.ref.close(this.contact);  
      },
      (error) => console.error('Error updating contact', error)
    );
  }

  cancel(): void {
    this.ref.close();  
  }
}
