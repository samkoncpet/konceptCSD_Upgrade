import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';


// @ts-ignore
import SimpleMDE from 'simplemde';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class WysiwygComponent implements OnInit {

  constructor(private ngZone: NgZone) { }

  config = {
    height: 400,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarInlineForSelection: false,
    //statusbar: false,

    sourceEditor: 'area',// disable it to use Ace Editor
    beautifyHTML: false,

    events: {
      getIcon: function (name: any, control: any, clearName: any) {
        let icon = '';

        switch (clearName) {
          case 'source':
            icon = 'fa fa-code text-secondary-d1';
          break;
          case 'italic':
            icon = 'fa fa-italic text-secondary-d1';
          break;
          case 'bold':
            icon = 'fa fa-bold text-secondary-d1';
          break;

          case 'ol':
            icon = 'fa fa-list-ol text-blue';
          break;
          case 'ul':
            icon = 'fa fa-list-ul text-blue';
          break;

          case 'eraser':
            icon = 'fa fa-eraser text-secondary-d1';
          break;

          case 'font':
            icon = 'fa fa-font text-secondary-d1';
          break;
          case 'fontsize':
            icon = 'fa fa-text-width text-secondary-d1';
          break;

          case 'brush':
            icon = 'fa fa-paint-brush text-pink';
          break;

          case 'paragraph':
            icon = 'fa fa-paragraph text-secondary-d1';
          break;

          case 'image':
            icon = 'fa fa-image text-purple-d1';
          break;
          case 'table':
            icon = 'fa fa-table text-danger-m2';
          break;

          case 'link':
            icon = 'fa fa-link text-success-m1';
          break;

          case 'left':
            icon = 'fa fa-align-left text-secondary-d1';
          break;
          case 'center':
            icon = 'fa fa-align-center text-secondary-d1';
          break;
          case 'right':
            icon = 'fa fa-align-right text-secondary-d1';
          break;
          case 'justify':
            icon = 'fa fa-align-justify text-secondary-d1';
          break;

          case 'undo':
            icon = 'fa fa-undo text-grey';
          break;
          case 'redo':
            icon = 'fa fa-redo text-grey';
          break;

          case 'fullsize':
            icon = 'fa fa-arrows-alt text-secondary-d1';
          break;
          case 'shrink':
            icon = 'fa fa-arrows-alt text-secondary-d1';
          break;
        }     
        return icon.length == 0 ? null : `<span class="position-tl w-100 h-100 bgc-white bgc-h-secondary-l3 border-1 brc-h-secondary-l2"><i class="${icon} text-md pt-2"></i></span>`
      }
    },

    buttons: [
      'source',
      '|',
      'bold',
      'italic',
      '|',
      'ul',
      'ol',
      'eraser',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'image',
      'table',
      'link',
      '|',
      'align',
      '|',
      'undo',
      'redo',
      '|',
      'fullsize'
    ]
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      new SimpleMDE({
        element: document.getElementById('markdown-editor'),
        autoDownloadFontAwesome: false,
        spellChecker: false,
        toolbar: [
          {
            name: "bold",
            action: SimpleMDE.toggleBold,
            className: "fa fa-bold",
            title: "Bold",
          },
          {
            name: "italic",
            action: SimpleMDE.toggleItalic,
            className: "fa fa-italic",
            title: "Italic",
          },
          {
            name: "heading",
            action: SimpleMDE.toggleHeadingSmaller,
            className: "fa fa-heading",
            title: "Heading",
            default: true
          },
          "|", // Separator
          {
            name: "quote",
            action: SimpleMDE.toggleBlockquote,
            className: "fa fa-quote-left",
            title: "Quote",
            default: true
          },
          {
            name: "unordered-list",
            action: SimpleMDE.toggleUnorderedList,
            className: "fa fa-list-ul",
            title: "Generic List",
            default: true
          },
          {
            name: "ordered-list",
            action: SimpleMDE.toggleOrderedList,
            className: "fa fa-list-ol",
            title: "Numbered List",
            default: true
          },
          "|", // Separator
          {
            name: "link",
            action: SimpleMDE.drawLink,
            className: "fa fa-link",
            title: "Create Link",
            default: true
          },
          {
            name: "image",
            action: SimpleMDE.drawImage,
            className: "fa fa-image",
            title: "Insert Image",
            default: true
          },
          "|", // Separator
          {
            name: "preview",
            action: SimpleMDE.togglePreview,
            className: "fa fa-eye no-disable",
            title: "Toggle Preview",
            default: true
          },
          
          {
            name: "fullscreen",
            action: SimpleMDE.toggleFullScreen,
            className: "fa fa-arrows-alt no-disable no-mobile",
            title: "Toggle Fullscreen",
            default: true
          },
        ]
      })
    })
  }

}
