import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';

// @ts-ignore
import PhotoSwipe from 'photoswipe';
// @ts-ignore
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

  tags = 1;

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
        this.initGallery()
    })
  }

  initGallery(): void {
      // set pointer-events to none for dark layers that appear on hover above dark images
      document.querySelectorAll('#gallery .h-100.w-100').forEach((el: any) => el.style.pointerEvents='none')
  
      var pswpElement = document.querySelector('.pswp')
  
      var items : any = null // the items to be used in the lightbox
  
      var triggerBtns = document.querySelectorAll('.show-lightbox') // these are the buttons/images that are supposed to trigger lightbox for each image when clicked
      
      // and each time we click an image/button to open lightbox, it should be initialized ... this is how the plugin works
      triggerBtns.forEach((el: any) => {
       el.addEventListener('click', (e: Event) => {
          e.preventDefault()          
  
          if(items == null) {
              items = []
              let index = 0;
              document.querySelectorAll('#gallery img[data-size]').forEach((img: any) => {
                  var size = img.getAttribute('data-size').split(/\D/)
                  items.push({
                      src: img.src.replace('/thumb', '/'),
                      w: size[0], 
                      h: size[1],
                      ref: img,
                      title: img.getAttribute('alt') || 'Image '+(index+1)+' caption'
                  })
                  triggerBtns[index].setAttribute('data-index', `${index}`)

                  index++;
              })
          }
  
          var options = {
              index: +el.getAttribute('data-index'),
  
              bgOpacity: 0.8,
              history: false,
              closeOnScroll: false,
  
              getThumbBoundsFn: (index: any) => {
                  var thumbnail = items[index].ref,
                      pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                      rect = thumbnail.getBoundingClientRect()

                  return {x:rect.left, y:rect.top + pageYScroll, w:rect.width}
              },
              addCaptionHTMLFn: (item: any, captionEl: any) => {
                  if(!item.title) {
                      return false
                  }
                  captionEl.children[0].innerHTML = item.title
                  return true
              }
  
          }
 
          var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
          gallery.init()
      })// click
    })
  }

}
