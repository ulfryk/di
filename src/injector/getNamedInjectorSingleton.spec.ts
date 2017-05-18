/* tslint:disable:no-unused-expression max-classes-per-file */
import { expect } from 'chai';

import { cleanNamedInjectorSingleton } from '../testing';

import getNamedInjectorSingleton from './getNamedInjectorSingleton';
import { GlobalObject, KEY_STRING } from './getSingleton';
import Injector from './Injector';

const name = 'lorem ipsum dolor';

describe('getInjectorSingleton', () => {

  afterEach(() => {
    cleanNamedInjectorSingleton(name);
  });

  it('should create Injector instance when it does not exist', () => {
    const key = Symbol.for(`${KEY_STRING}::${name}`);
    expect(GlobalObject[key]).to.be.undefined;
    const injector = getNamedInjectorSingleton(name);
    expect(GlobalObject[key]).to.be.instanceof(Injector);
    expect(GlobalObject[key]).to.equal(injector);
  });

});
