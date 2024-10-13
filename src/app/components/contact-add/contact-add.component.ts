// import { Component, Output, EventEmitter } from '@angular/core';
// import { Contact } from '../../Models/contact';
// import { ContactApiServiceService } from '../../services/contact-api-service.service';
// import { MessageService } from 'primeng/api';
// import { DialogModule } from 'primeng/dialog';
// import { ButtonModule } from 'primeng/button';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-contact-add',
//   templateUrl: './contact-add.component.html',
//   styleUrls: ['./contact-add.component.css'],
//   standalone: true,
//   providers: [MessageService],
//   imports: [DialogModule, ButtonModule, FormsModule, CommonModule]
// })
// export class ContactAddComponent {
//   visible: boolean = false;
//   newContact: Contact = { firstName: '', lastName: '', email: '', phone: '', id: 0 };

//   @Output() save = new EventEmitter<void>();

//   constructor(
//     private contactService: ContactApiServiceService,
//     private messageService: MessageService
//   ) {}

//   show(): void {
//     this.visible = true;
//   }

//   addContact(): void {
//     if (this.newContact.firstName && this.newContact.lastName && this.newContact.email && this.newContact.phone) {
//       this.contactService.addContact(this.newContact).subscribe(
//         () => {
//           this.save.emit();
//           this.visible = false;
//           this.messageService.add({ severity: 'success', summary: 'Contact Added', detail: 'The contact was added successfully' });
//         },
//         (error) => console.error('Error adding contact', error)
//       );
//     } else {
//       this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fill in all fields.' });
//     }
//   }

//   cancel(): void {
//     this.visible = false;
//   }
// }



import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../Models/contact';
import { ContactApiServiceService } from '../../services/contact-api-service.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { NgModule } from '@angular/core';
// import { ImportsModule } from '../../../imports';
import { AnimateModule } from 'primeng/animate';



@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  standalone: true,
  providers: [MessageService],
  imports: [DialogModule, ButtonModule, FormsModule, CommonModule, StyleClassModule,DynamicDialogModule, AnimateModule ]
})
export class ContactAddComponent {
  visible: boolean = false;
  newContact: Contact = { firstName: '', lastName: '', email: '', phone: '', id: 0 };
  selectedFile: File | null = null;

  @Output() save = new EventEmitter<void>();

  constructor(
    private contactService: ContactApiServiceService,
    private messageService: MessageService
  ) {}

  show(): void {
    this.visible = true;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Convert image to Base64 string
        this.newContact.profileImage = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  addContact(): void {
    if (this.newContact.firstName && this.newContact.lastName && this.newContact.email && this.newContact.phone) {
      this.contactService.addContact(this.newContact).subscribe(
        () => {
          this.save.emit();
          this.visible = false;
          this.messageService.add({ severity: 'success', summary: 'Contact Added', detail: 'The contact was added successfully' });
        },
        (error) => console.error('Error adding contact', error)
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fill in all fields.' });
    }
  }

  cancel(): void {
    this.visible = false;
  }
}
