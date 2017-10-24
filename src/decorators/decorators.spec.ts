/* tslint:disable:no-unused-expression max-classes-per-file */
import { expect } from 'chai';
import 'reflect-metadata';

import { bind } from '../binder';
import { getInjector } from '../injector';
import { cleanInjectorSingleton } from '../testing';

import BindInjectable from './BindInjectable';
import Inject from './Inject';
import Injectable from './Injectable';
import InjectProp from './InjectProp';

@Injectable()
class A {}

@Injectable()
class B {}

@Injectable()
class C {

  @InjectProp('lorem ipsum') public readonly ll: string;

  constructor(
    public readonly a: A,
    public readonly b: B,
  ) {}
}

@Injectable()
class D {

  @InjectProp() public readonly a: A;

  constructor(
    public readonly c: C,
    @Inject('lorem ipsum') public readonly l: string,
  ) {}
}

describe('decorators', () => {

  beforeEach(() => {
    bind('lorem ipsum').toValue('dolor sit amet');
    bind(A).toSelf();
    bind(B).toSelf();
    bind(C).toSelf();
    bind(D).toSelf();
  });

  afterEach(cleanInjectorSingleton);

  it('should resolve all dependencies correctly', () => {
    const d = getInjector().get(D);
    expect(d).to.be.instanceof(D);
    expect(d.a).to.be.instanceof(A);
    expect(d.c).to.be.instanceof(C);
    expect(d.c.a).to.be.instanceof(A);
    expect(d.c.b).to.be.instanceof(B);
    expect(d.c.ll).to.equal('dolor sit amet');
    expect(d.l).to.equal('dolor sit amet');
    expect(d.c.a).to.equal(d.a);
    expect(d.c.ll).to.equal(d.l);
  });

  describe('@BindInjectable', () => {

    it('should bind class to self immediately', () => {

      @BindInjectable()
      class Z {
        constructor(
          public a: A,
          public b: B,
          public c: C,
          public d: D,
        ) {}
      }

      const z = getInjector().get(Z);

      expect(z).to.be.instanceof(Z);
      expect(z.a).to.be.instanceof(A);
      expect(z.b).to.be.instanceof(B);
      expect(z.c).to.be.instanceof(C);
      expect(z.d).to.be.instanceof(D);

    });

  });

});
