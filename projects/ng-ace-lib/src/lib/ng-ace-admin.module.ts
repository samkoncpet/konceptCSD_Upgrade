import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceCard } from './directives/ace-card.directive';
import { NgAceScroll } from './directives/ace-scroll.directive';

import { NgAceSidebar } from './directives/ace-sidebar.directive';
import { NgAceSubmenu } from './directives/ace-submenu.directive';
import { NgAceScrolltop } from './directives/ace-scrolltop.directive';

import { NgAceModal } from './directives/ace-modal.directive';
import { NgAceTabSwipe } from './directives/ace-tab-swipe.directive';
import { NgAceTabScroll, NgAceButtonScroll } from './directives/ace-tab-scroll.directive';
import { NgAceAccordion, NgAceAccordionCard, NgAceAccordionToggle } from './directives/ace-accordion.directive';

import { NgAcePopover } from './directives/ace-popover.directive';
import { NgAceFileInput } from './directives/ace-file-input.directive';

import { NgAceSticky } from './directives/ace-sticky.directive';

import { NgAceDropdownBackrop } from './directives/dropdown-backdrop.directive';
import { NgAceNavbarBackdrop } from './directives/navbar-backdrop.directive';
import { NgAceNavbarDropdown } from './directives/navbar-dropdown.directive';

import { NgAceAlertRemove } from './directives/alert-remove.directive';
import { NgAceAutofocus } from './directives/ace-autofocus.directive';

import { NgAceClass } from './directives/ace-ng-class.directive';

import { ToasterContainerComponent } from './components/toaster.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  declarations: [
    NgAceCard,
    NgAceScroll,
    NgAceScrolltop,
    NgAceClass,

    NgAceSidebar,
    NgAceSubmenu,

    NgAceModal,
    NgAceTabSwipe,

    NgAceTabScroll,
    NgAceButtonScroll,

    NgAceAccordion,
    NgAceAccordionCard,
    NgAceAccordionToggle,

    NgAcePopover,

    NgAceFileInput,

    NgAceAlertRemove,

    NgAceSticky,

    ToasterContainerComponent,

    NgAceDropdownBackrop,

    NgAceNavbarBackdrop,

    NgAceNavbarDropdown,

    NgAceAutofocus,

    SafeHtmlPipe    
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:      [
    NgAceCard,
    NgAceScroll, //make these accessible to PagesModule and AppModule
    NgAceScrolltop,
    NgAceClass,

    NgAceSidebar,
    NgAceSubmenu,

    NgAceModal,
    NgAceTabSwipe,

    NgAceTabScroll,
    NgAceButtonScroll,

    NgAceAccordion,
    NgAceAccordionCard,
    NgAceAccordionToggle,

    NgAceAlertRemove,
    NgAceSticky,
  
    NgAcePopover,
    NgAceFileInput,

    NgAceDropdownBackrop,
    NgAceNavbarBackdrop,
    NgAceNavbarDropdown,

    NgAceAutofocus,
    
    SafeHtmlPipe
  ]
})
export class NgAceAdminModule { }


