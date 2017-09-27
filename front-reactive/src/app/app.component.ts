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

    this.translate.setDefaultLang('en');
    this.translate.use('en');

    // resize observable
    let resize$ = Observable.fromEvent(window, 'resize')
      .map((event) => {
        this.store$.dispatch(new ResolutionChanged(this.getResizePayload()));
      });

    // scroll observable
    let scroll$ = Observable.fromEvent(window, 'scroll')
      .map((event) => {
        const payload: number =  window.pageYOffset;
        if (window.screen.width <= this.maxMobRes) {
          return this.store$.dispatch(new ScrollChanged(payload));
        }
      });

    // subscribe to both events
    this.subscriptions.push(
      resize$
        .merge(scroll$)
        .subscribe()
    );

    // initial resolution
    this.store$.dispatch(new ResolutionChanged(this.getResizePayload()));
  }

  private getResizePayload(): {width: number, height: number, isMobile: boolean} {
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
