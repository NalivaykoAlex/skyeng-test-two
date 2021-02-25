import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { ViewPortSizeService } from "../services/view-port-size.service";

@Directive({
  selector: "[ifViewportSize]"
})
export class ViewPortSizeDirective implements OnInit, OnDestroy {
  private viewPortSizeSubscription: Subscription;

  @Input() ifViewportSize: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private viewPortSizeService: ViewPortSizeService
  ) {}

  ngOnInit(): void {
    this.checkLarge(this.viewPortSizeService.getLayoutValue());

    this.viewPortSizeSubscription = this.viewPortSizeService
      .getLayout$()
      .subscribe(item => {
        this.checkLarge(item);
      });
  }

  ngOnDestroy(): void {
    this.viewPortSizeSubscription.unsubscribe();
  }

  private checkLarge(size: string): void {
    this.viewContainer.clear();

    if (this.ifViewportSize === size) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
