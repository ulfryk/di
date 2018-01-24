/* tslint:disable:no-unused-expression max-classes-per-file no-let */
import { expect } from 'chai';
import 'reflect-metadata';

import { Injectable } from '../decorators';
import { Definition, getInjector, Injector, Type } from '../injector';
import { GlobalObject, KEY } from '../injector/getSingleton';
import { cleanInjectorSingleton } from '../testing';

import bind from './bind';

let ClassA: Type;
let ClassB: Type;
let ClassC: Type<{ readonly a: any; readonly b: any }>;

describe('bind', () => {

  beforeEach(() => {

    @Injectable()
    class A {}

    ClassA = A;

    @Injectable()
    class B {}

    ClassB = B;

    @Injectable()
    class C {
      constructor(public readonly a: A, public readonly b: B) {}
    }

    ClassC = C;
  });

  afterEach(cleanInjectorSingleton);

  it('should create Injector instance when it does not exist (for a Type)', () => {
    expect(GlobalObject[KEY]).to.be.undefined;
    bind(ClassA).toSelf();
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
    bind(ClassA).toSelf();
    bind(ClassB).toSelf();
    bind(ClassC).toSelf();
    const c = getInjector().get(ClassC);
    expect(c).to.be.instanceof(ClassC);
    expect(c.a).to.be.instanceof(ClassA);
    expect(c.b).to.be.instanceof(ClassB);
  });

  it('bind Type to factory', () => {
    bind(ClassB).toSelf();
    bind(ClassA).toFactory(BClass => ({ _xx: BClass } as any), ClassB);
    const a = getInjector().get(ClassA);
    expect(a).to.not.be.instanceof(ClassA);
    expect(a._xx).to.be.instanceOf(ClassB);
  });

});
