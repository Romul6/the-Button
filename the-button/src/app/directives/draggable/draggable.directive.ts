import { AfterViewInit, contentChildren, Directive, ElementRef, HostListener, viewChildren } from '@angular/core';

@Directive({
  selector: '[btn-draggable]',
  standalone: true
})

export class DraggableDirective implements AfterViewInit {

  div: HTMLDivElement | null = null
  x: number = 0
  y: number = 0
  selectables: any[] = []

  bookComponents = contentChildren(DraggableHostDirective, { descendants: true })

  constructor(parentEl: ElementRef) {

  }

  ngAfterViewInit(): void {

    this.bookComponents().forEach(el => {
      const { x, y, width, height } = el.el.getBoundingClientRect();
      this.selectables.push({
        x: x + window.scrollX,
        y: y + window.scrollY,
        width,
        height,
        elem: el.el,
      })
    })

    // document.querySelectorAll('.selectable').forEach((selectable) => {
    //   const { x, y, width, height } = selectable.getBoundingClientRect();
    //   this.selectables.push({
    //     x: x + window.scrollX,
    //     y: y + window.scrollY,
    //     width,
    //     height,
    //     elem: selectable,
    //   })
    // })

    // for (let index = 0; index < element.children.length; index++) {
    //   const el = element.children[index];
    //   console.log(el);
    //   console.log(el.attributes);
    // }

  }

  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent) {
    console.log(event);

    event.preventDefault();

    this.x = event.pageX;
    this.y = event.pageY;

    this.div = document.createElement("div");

    this.div.style.position = "absolute";
    this.div.style.width = "0";
    this.div.style.height = "0";
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
    this.div.classList.add("drag-select");

    document.body.append(this.div);
  }

  @HostListener('pointermove', ['$event']) onPointermove(event: PointerEvent) {
    if (!this.div) return

    const diffX = event.pageX - this.x;
    const diffY = event.pageY - this.y;

    this.div.style.left = diffX < 0 ? this.x + diffX + "px" : this.x + "px";
    this.div.style.top = diffY < 0 ? this.y + diffY + "px" : this.y + "px";

    this.div.style.height = Math.abs(diffY) + "px";
    this.div.style.width = Math.abs(diffX) + "px";

    this.checkSelected(); // extra line 1
  }

  @HostListener('pointerup') onPointerUp() {
    this.div?.remove();

    const a = document.querySelectorAll('.intersected')

    a.forEach((e) => e.classList.add('is-selected'))

    console.log(document.querySelectorAll('.intersected'));
  }

  checkSelected() {
    const { x, y, height, width } = this.div!.getBoundingClientRect();
    for (const selectable of this.selectables) {
      if (this.checkRectIntersection({ x: x + window.scrollX, y: y + window.scrollY, height, width }, selectable)) {
        selectable.elem.classList.add("intersected");
      } else {
        selectable.elem.classList.remove("intersected");
      }
    }
  }

  checkRectIntersection(r1: any, r2: any) {
    return !(
      r1.x + r1.width < r2.x ||
      r2.x + r2.width < r1.x ||
      r1.y + r1.height < r2.y ||
      r2.y + r2.height < r1.y
    );
  }
}

@Directive({
  selector: '[btn-draggable-host]',
  standalone: true
})
export class DraggableHostDirective implements AfterViewInit {

  el!: HTMLElement
  public domRect!: HTMLElement

  constructor(el: ElementRef) {
    this.el = el.nativeElement as HTMLElement
  }

  ngAfterViewInit(): void {
    this.domRect = this.el
  }

}
