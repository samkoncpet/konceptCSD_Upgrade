import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[NgAceClass]'
})
export class NgAceClass implements AfterViewInit {
  @Input() NgAceClass: any; // the options passed to Directive

  element: any;
  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement
  }

  ngAfterViewInit() {
    if (typeof this.NgAceClass === 'object') {
      for (let index in this.NgAceClass) {
        if (Object.prototype.hasOwnProperty.call(this.NgAceClass, index)) {
          let level = Number(index)          
          this._updateClass(this.NgAceClass[index], Math.abs(level), level >= 0) // if level is negative, we remove class names, otherwise we add them
        }
      }
    }

    else if (typeof this.NgAceClass === 'string') {
      this._updateClass(this.NgAceClass) // if a string, just add the class to current element
    }
  }


  _updateClass(className: string, level: number = 0, add: boolean = true) {
    let target = this.element
    // level 0 or 1 means our target is current element
    // otherwise target is an ancestor
    if (level > 1)  {
      let _level_ = 1;
      while (target && _level_ < level) {
        _level_++;
        target = target.parentNode
      }
    }

    let _classes = className.split(/\s/)
    for (let _class of _classes) {
      _class = <string>_class.trim()
      if (_class.length == 0)  continue
      
      if (add) {
        target.classList.add(_class)
      }
      else {
        target.classList.remove(_class)
      }
    }
  }

}
