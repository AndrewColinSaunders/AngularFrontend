import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContactApiServiceService } from '../../services/contact-api-service.service';
import { Contact } from '../../Models/contact';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import { ContactAddComponent } from '../contact-add/contact-add.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';
import { GlobalNavBarComponent } from '../menu-bar/menu-bar.component';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AnimateModule } from 'primeng/animate';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [DialogService, ConfirmationService, MessageService],
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    ContactAddComponent,
    ContactEditComponent,
    GlobalNavBarComponent,
    MenubarModule,
    DialogModule,
    DynamicDialogModule,
    AnimateModule
  ]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  paginatedContacts: Contact[] = [];
  selectedContact: Contact | null = null;
  ref: DynamicDialogRef | undefined;
  totalRecords: number = 0;
  rowsPerPage: number = 5;
  currentPage: number = 0;

  @ViewChild(ContactAddComponent) contactAddComponent!: ContactAddComponent;
  @ViewChild(ContactEditComponent) contactEditComponent!: ContactEditComponent;
  @Input() contact!: Contact;

  constructor(
    private contactService: ContactApiServiceService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
        this.totalRecords = this.contacts.length;
        this.paginatedContacts = this.contacts.slice(0, this.rowsPerPage);
      },
      (error) => {
        console.error('Error fetching contacts', error);
      }
    );
  }

  openEditDialog(contact: Contact): void {
    this.ref = this.dialogService.open(ContactEditComponent, {
      header: 'Edit Contact',
      width: '25rem',
      data: { contact: { ...contact } }
    });

    this.ref.onClose.subscribe((updatedContact: Contact) => {
      if (updatedContact) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact updated successfully' });
        this.getContacts();
      }
    });
  }

  openAddDialog(): void {
    this.contactAddComponent.show();  
  }

  handleSave(): void {
    this.getContacts();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Operation completed successfully' });
  }

  onPageChange(event: any): void {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedContacts = this.contacts.slice(start, end);
  }

  confirmDelete(contact: Contact): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-primary p-button-text',
      accept: () => {
        this.deleteContact(contact);
      }
    });
  }

  deleteContact(contact: Contact): void {
    this.contactService.deleteContact(contact.id).subscribe(
      () => {
        this.getContacts();
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Contact deleted successfully' });
      },
      (error) => {
        console.error('Error deleting contact', error);
      }
    );
  }

  
}
