import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { ViewPortSize, ViewPortSizeConfig } from "../interfaces/view-port-size";

@Injectable({
  providedIn: "root"
})
export class ViewPortSizeService {
  public layout$: BehaviorSubject<string>;
  public windowResize$: Observable<Event> = fromEvent<Event>(window, "resize");

  constructor(@Inject(ViewPortSize) private config: ViewPortSizeConfig) {
    this.resize();

    this.layout$ = new BehaviorSubject(this.checkSize(window.innerWidth));
  }

  private checkSize(width: number): string {
    if (width >= this.config.large) {
      return "large";
    }

    if (width >= this.config.medium) {
      return "medium";
    }

    return "small";
  }

  public getLayoutValue(): string {
    return this.layout$.value;
  }

  public getLayout$(): Observable<string> {
    return this.layout$.asObservable();
  }

  private resize(): void {
    this.windowResize$
      .pipe(
        map(event => (event.target as Window).innerWidth),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((innerWidth: number) => {
        this.layout$.next(this.checkSize(innerWidth));
      });
  }
}
