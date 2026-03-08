import { Component } from '@angular/core';
import { ContactForm } from '../../components/contact-form/contact-form';
import { Map } from '../../components/map/map';
import { Api } from '../../services/api';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, Map],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  
    
}
