import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { IContact } from 'src/app/models/IContact';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: IContact | null | string = null;
  
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) {}

  // ngOnInit(): void {
  //   this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
  //     this.contactId = param.get('contactId');
  //   });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe(
        (data: IContact) => {
          this.contact = data;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }
}
