/* tslint:disable:no-unused-expression max-classes-per-file */
import { expect } from 'chai';

import getInjectorSingleton from './getInjectorSingleton';

const injector = getInjectorSingleton();

injector.registerFactory('a', () => 'a', 'b');
injector.registerFactory('b', () => 'b', 'c');
injector.registerFactory('c', () => 'c', 'd');
injector.registerFactory('d', () => 'd', 'a');

class Mock {}

class MockC {}

class MockA extends Mock {
  constructor(public readonly cMock: MockC) {
    super();
  }
}

class MockB extends Mock {
  constructor(public readonly cMock: MockC) {
    super();
  }
}

injector.registerClass(MockC);
injector.registerBoundClass(Mock, MockA)(MockC);

describe('Injector', () => {

  it('should throw on circular dependency', () => {
    expect(() => {
      injector.get('a');
    }).to.throw(/Circular dependency: "a" <- "b" <- "c" <- "d" <- "a"/);
  });

  it('should throw when there is no requested dependency', () => {
    expect(() => {
      injector.get(Symbol('c'));
    }).to.throw(
      /"Symbol\(c\)(?:_[\w\d.]+)?" not registered \( path: "Symbol\(c\)(?:_[\w\d.]+)?" \)/);
  });

  it('should throw on attempt to register already registered dependency', () => {
    expect(() => {
      injector.registerValue('a', 'xyz');
    }).to.throw(/Cannot register "a". Value is already registered./);

    expect(() => {
      injector.registerClass(Mock);
    }).to.throw(/Cannot register "Mock". Class is already registered./);

    expect(() => {
      injector.registerBoundClass(Mock, MockB)(Mock);
    }).to.throw(/Cannot register "MockB" as "Mock". Class "Mock" is already registered./);

    expect(() => {
      injector.registerFactory('c', () => 'xyz');
    }).to.throw(/Cannot register "c". Factory is already registered./);

    expect(() => {
      injector.register({
        dependencies: [],
        factory: () => new MockC(),
        token: Mock,
      });
    }).to.throw(/Cannot register "Mock". It is already registered./);

  });

});
