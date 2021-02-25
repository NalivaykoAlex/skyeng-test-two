import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TestComponent } from "./test.component";

import { ViewPortSizeModule } from "./shared/modules/view-port-size.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ViewPortSizeModule.forRoot({ medium: 400, large: 1024 })
  ],
  declarations: [AppComponent, HelloComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
