import {ModuleWithProviders} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {SigningEffects} from './login/signin-effects';
import {UserEffects} from './user/user-effects';
import {DashboardsEffects} from './dashboards/dashboards-effects';
import {SignupEffects} from './signup/signup-effects';

export const applicationEffectImports: ModuleWithProviders[] = [
  EffectsModule.forRoot([
    SigningEffects,
    UserEffects,
    DashboardsEffects,
    SignupEffects
  ])
];
