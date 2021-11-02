import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';
import { BootstrapTheme } from '@fullcalendar/bootstrap';

import { Draggable } from '@fullcalendar/interaction';
import Util from '@ace/util';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit {

  calendarOptions!: CalendarOptions;
  dropRemove = false;
  newEventTitle = '';
  editingEventTitle = '';

  @ViewChild('externalEvents') externalEvents!: ElementRef;
  @ViewChild('calendar') calendarComponent!: any;

  @ViewChild('newEventModal') newEventModal: any;
  @ViewChild('editEventModal') editEventModal: any;


  constructor(private ngbModalService: NgbModal) { }

  touchDevice = 'ontouchstart' in window

  ngOnInit(): void {
 
    // change styling options and icons
    BootstrapTheme.prototype.classes = {
      root: 'fc-theme-bootstrap',
      table: 'table-bordered table-bordered brc-default-l2 text-secondary-d1 h-95',
      tableCellShaded: 'bgc-secondary-l3',
      buttonGroup: 'btn-group',
      button: 'btn btn-white btn-h-lighter-blue btn-a-blue',
      buttonActive: 'active',
      popover: 'card card-primary',
      popoverHeader: 'card-header',
      popoverContent: 'card-body',
    }

    BootstrapTheme.prototype.baseIconClass = 'fa';
    BootstrapTheme.prototype.iconClasses = {
      close: 'fa-times',
      prev: 'fa-chevron-left',
      next: 'fa-chevron-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    }

    BootstrapTheme.prototype.iconOverrideOption = 'FontAwesome';
    BootstrapTheme.prototype.iconOverrideCustomButtonOption = 'FontAwesome';
    BootstrapTheme.prototype.iconOverridePrefix = 'fa-';

    //for some random events to be added
    var date = new Date();
    var m = date.getMonth();
    var y = date.getFullYear();

    var day1 = Math.random() * 20 + 2;
    var day2 = Math.random() * 25 + 1;

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      themeSystem: 'bootstrap',
      headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },

      events: [
        {
          title: 'Some Event',
          start: new Date(y, m, 1, Math.random() * 23 + 1),
          allDay: true,
          className: 'bgc-red-d1 text-white text-95'
        },
        {
          title: 'Long Event',
          start: new Date(y, m, day1, Math.random() * 23 + 1),
          end: new Date(y, m, day1 + 4, Math.random() * 23 + 1),
          allDay: true,
          className: 'bgc-green-d2 text-white text-95'
        },
        {
          title: 'Other Event',
          start: new Date(y, m, day2, Math.random() * 23 + 1),
          allDay: true,
          className: 'bgc-blue-d2 text-white text-95'
        }
      ],

      selectable: true,
      selectLongPressDelay: 200,

      editable: true,
      droppable: true,

      drop: (info: any) => {
        // is the "remove after drop" checkbox checked?
        if ( this.dropRemove ) {
          Util.remove(info.draggedEl)
        }
      },

      select: (date: any) => {
        this.ngbModalService.open(this.newEventModal, {backdrop: 'static'}).result.then((result) => {
          if (result === 'save') {
            this.calendarComponent.calendar.addEvent({
              title: this.newEventTitle,
              start: date.start,
              end: date.end,
              allDay: true,
              classNames: ['text-95', 'bgc-info-d2', 'text-white']
            })
          }
        })
      },

      eventClick: (info: any) => {
        this.editingEventTitle = info.event.title
        this.ngbModalService.open(this.editEventModal).result.then((result) => {
          if (result === 'save') {
            info.event.setProp('title', this.editingEventTitle);
          }
          else if (result === 'delete') {
            info.event.remove();
          }
        })
      }

    };
  }



  ngAfterViewInit(): void {
    // enable external draggable events
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      longPressDelay: 50,
      eventData: function(eventEl: any) {
        return {
          title: eventEl.innerText,
          classNames: eventEl.getAttribute('data-class').split(' ')
        }
      }
    })
  }

}
