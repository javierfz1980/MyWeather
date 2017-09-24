import {Component, HostListener, OnDestroy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from '@ngrx/store';
import {ApplicationState} from './commons/store/application-state';
import {ResolutionChanged, ScrollChanged} from './commons/store/device/device-actions';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  readonly maxMobRes: number = 768;
  private subscriptions: Subscription[] = [];

  constructor(private store$: Store<ApplicationState>,
              private translate: TranslateService) {

    translate.setDefaultLang('en');
    translate.use('en');

    Observable.fromEvent(window, 'resize')
      //.debounceTime(150)
      .subscribe((event) => {
        const payload: {width: number, height: number, isMobile: boolean} = this.getResizePayload();
        this.store$.dispatch(new ResolutionChanged(payload));
      });

    Observable.fromEvent(window, 'scroll')
      //.debounceTime(150)
      .subscribe((event) => {
        const payload: number =  window.pageYOffset;
        if (window.screen.width <= this.maxMobRes) this.store$.dispatch(new ScrollChanged(payload));
      });

    // initial resolution
    this.store$.dispatch(new ResolutionChanged(this.getResizePayload()));
  }

  getResizePayload(): {width: number, height: number, isMobile: boolean} {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= this.maxMobRes
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
