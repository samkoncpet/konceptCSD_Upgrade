import { Component, OnInit, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: []
})
export class NavbarSearchComponent implements OnInit {

  @ViewChild('template', {static: true}) template!: TemplateRef<{}>

  isMenuCollapsed = true

  constructor(private readonly viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.template)
  }
}
