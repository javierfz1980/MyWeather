import {ModuleWithProviders} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {SigningEffects} from './login/signin-effects';
import {UserEffects} from './user/user-effects';
import {DashboardsEffects} from './dashboards/dashboards-effects';
import {SignupEffects} from './signup/signup-effects';
import {PollingEffect} from './polling/polling-effects';
import {SearchEffects} from './search/search-effects';

export const applicationEffectImports: ModuleWithProviders[] = [
  EffectsModule.forRoot([
    SigningEffects,
    UserEffects,
    DashboardsEffects,
    SignupEffects,
    PollingEffect,
    SearchEffects
  ])
];
