import { AfterViewInit, contentChildren, Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
    selector: '[drag-selection]',
    standalone: true
})

export class DraggableDirective implements AfterViewInit {

    dragStyles = input<{ dragSelectionHover: string, dragSelectionOnSelection: string, dragSelectionSelected: string }>({ dragSelectionHover: "", dragSelectionOnSelection: "", dragSelectionSelected: "" })

    private x: number = 0
    private y: number = 0
    private selectables: any[] = []

    private bookComponents = contentChildren(DraggableHostDirective, { descendants: true })

    constructor(parentEl: ElementRef) { }

    ngAfterViewInit(): void {
        this.bookComponents().forEach(el => {
            const { x, y, width, height } = el.domRect.getBoundingClientRect();
            this.selectables.push({
                x: x + window.scrollX,
                y: y + window.scrollY,
                width,
                height,
                elem: el.domRect,
            })
        })
    }

    @HostListener('mousedown', ['$event']) onPointerDown(event: PointerEvent) {
        console.log(event);

        event.preventDefault();

        this.x = event.pageX;
        this.y = event.pageY;

        let div = document.createElement("div");
        div.setAttribute('id', 'divdiv')

        div.style.position = "absolute";
        div.style.width = "0";
        div.style.height = "0";
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.classList.add("drag-select");

        document.body.append(div);
    }

    @HostListener('mousemove', ['$event']) onPointermove(event: PointerEvent) {

        let div = document.getElementById('divdiv');

        if (!div) return

        const diffX = event.pageX - this.x;
        const diffY = event.pageY - this.y;

        div.style.left = diffX < 0 ? this.x + diffX + "px" : this.x + "px";
        div.style.top = diffY < 0 ? this.y + diffY + "px" : this.y + "px";

        // div.style.height = Math.abs(diffY) + "px";
        // div.style.width = Math.abs(diffX) + "px";
        if (diffY > 0)
            div.style.height = diffY + "px";
        else
            div.style.height = (diffY * -1) + "px";

        if (diffX > 0)
            div.style.width = diffX + "px";
        else
            div.style.width = (diffX + -1) + "px";

        this.checkSelected(div);
    }

    @HostListener('mouseup') onPointerUp() {
        let div = document.getElementById('divdiv');

        div!.remove();

        const a = document.querySelectorAll('.' + this.dragStyles()?.dragSelectionOnSelection)

        a.forEach((e) => e.classList.add(this.dragStyles()?.dragSelectionSelected))
        console.log(a);
    }

    checkSelected(div: any) {
        const { x, y, height, width } = div.getBoundingClientRect();
        for (const selectable of this.selectables) {
            if (this.checkRectIntersection({ x: x + window.scrollX, y: y + window.scrollY, height, width }, selectable)) {
                selectable.elem.classList.add(this.dragStyles()?.dragSelectionOnSelection);
            } else {
                selectable.elem.classList.remove(this.dragStyles()?.dragSelectionOnSelection);
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
    selector: '[drag-selectables]',
    standalone: true
})

export class DraggableHostDirective implements AfterViewInit {

    private el!: HTMLElement
    public domRect!: HTMLElement

    constructor(el: ElementRef) {
        this.el = el.nativeElement as HTMLElement
    }

    ngAfterViewInit(): void {
        this.domRect = this.el
    }

}
