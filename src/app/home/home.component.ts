import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent {
  toggleFaq(faqId: number) {
    const faqContent = document.getElementById(`faq-${faqId}`);
    if (faqContent) {
      faqContent.classList.toggle('active');
    }
  }
}
