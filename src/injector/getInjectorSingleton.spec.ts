/* tslint:disable:no-unused-expression max-classes-per-file */
import { expect } from 'chai';

import { cleanInjectorSingleton } from '../testing';

import getInjectorSingleton from './getInjectorSingleton';
import { GlobalObject, KEY } from './getSingleton';
import Injector from './Injector';

describe('getInjectorSingleton', () => {

  afterEach(cleanInjectorSingleton);

  it('should create Injector instance when it does not exist', () => {
    expect(GlobalObject[KEY]).to.be.undefined;
    const injector = getInjectorSingleton();
    expect(GlobalObject[KEY]).to.be.instanceof(Injector);
    expect(GlobalObject[KEY]).to.equal(injector);
  });

});
