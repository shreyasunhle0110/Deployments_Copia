import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-wrapper-integration-detail',
  templateUrl: './wrapper-integration-detail.component.html',
  styleUrls: ['./wrapper-integration-detail.component.css']
})
export class WrapperIntegrationDetailComponent implements OnInit {
  activateGoTop: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  scrollToElement(element): void {
    console.log(element);
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY > 500) {
      this.activateGoTop = true;
    } else {
      this.activateGoTop = false;
    }
  }
}
