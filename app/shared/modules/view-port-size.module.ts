import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';

import {ViewPortSizeDirective} from '../directives/view-port-size.directive';
import {ViewPortSizeService} from '../services/view-port-size.service';
import {ViewPortSizeConfig, ViewPortSize} from '../interfaces/view-port-size';

@NgModule({
  declarations: [ViewPortSizeDirective],
  imports: [
    CommonModule
  ],
  exports: [ViewPortSizeDirective]
})
export class ViewPortSizeModule {
  constructor(@Optional() @SkipSelf() parentModule?: ViewPortSizeModule) {
    if (parentModule) {
      throw new Error(
        'ViewPortSizeModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: ViewPortSizeConfig): ModuleWithProviders<ViewPortSizeModule> {
    return {
      ngModule: ViewPortSizeModule,
      providers: [
        ViewPortSizeService,
        {provide: ViewPortSize, useValue: config },
      ]
    };
  }
}
