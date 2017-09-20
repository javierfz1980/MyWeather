import {async, TestBed} from '@angular/core/testing';
import {SignInWrapperComponent} from './sign-in-wrapper.component';

describe('when loads the signin component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignInWrapperComponent
      ]
    }).compileComponents();
  }))

  it('it should has the store inyected', () => {

  })
})
