import { Component, OnInit, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar-megamenu',
  templateUrl: './navbar-megamenu.component.html',
  styleUrls: []
})
export class NavbarMegamenuComponent implements OnInit {

  @ViewChild('template', {static: true}) template!: TemplateRef<{}>

  constructor(private readonly viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.template)
  }

}
