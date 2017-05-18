/* tslint:disable:no-unused-expression max-classes-per-file */
import { expect } from 'chai';
import 'reflect-metadata';

import { Injectable } from '../decorators';
import { Definition, getInjectorSingleton, Injector } from '../injector';
import { GlobalObject, KEY } from '../injector/getSingleton';
import { cleanInjectorSingleton } from '../testing';

import bind from './bind';

@Injectable()
class A {}

@Injectable()
class B {}

@Injectable()
class C {
  constructor(public a: A, public b: B) {}
}

describe('bind', () => {

  afterEach(cleanInjectorSingleton);

  it('should create Injector instance when it does not exist (for a Type)', () => {
    expect(GlobalObject[KEY]).to.be.undefined;
    bind(A).toSelf();
    expect(GlobalObject[KEY]).to.be.instanceof(Injector);
  });

  it('should create Injector instance when it does not exist (for a Label)', () => {
    expect(GlobalObject[KEY]).to.be.undefined;
    bind('aa').toValue('abc');
    expect(GlobalObject[KEY]).to.be.instanceof(Injector);
  });

  it('should create Injector instance when it does not exist (for a Factory)', () => {
    const def = new Definition([], () => 'abc', 'bb');
    expect(GlobalObject[KEY]).to.be.undefined;
    expect(def).to.be.instanceof(Definition);
    expect(def instanceof Definition).to.be.true;
    bind(def);
    expect(GlobalObject[KEY]).to.be.instanceof(Injector);
  });

  it('should provide instance with resolved dependencies', () => {
    bind(A).toSelf();
    bind(B).toSelf();
    bind(C).toSelf();
    const c = getInjectorSingleton().get(C);
    expect(c).to.be.instanceof(C);
    expect(c.a).to.be.instanceof(A);
    expect(c.b).to.be.instanceof(B);
  });

});
