import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  lastModified: string = '';

  constructor() {}

  ngOnInit() {
    // Get the last modified date from the document
    // This will show when the HTML document was last modified
    this.getLastModifiedDate();
  }

  private getLastModifiedDate() {
    // Use document.lastModified to get when the page was last modified
    if (document.lastModified) {
      const lastMod = new Date(document.lastModified);
      this.lastModified = lastMod.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        // day: 'numeric'
      });
    } else {
      // Fallback if document.lastModified is not available
      this.lastModified = 'Date unavailable';
    }
  }
}
