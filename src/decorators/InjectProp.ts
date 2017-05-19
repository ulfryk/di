import { getInjector, Injector, Token, Type } from '../injector';
import { METADATA } from '../metadata';

const InjectProp = <T>(token?: Token<T>, getInj = getInjector) =>
  (target: T, key: string) => {
    const theToken = token === undefined ?
      (Reflect.getMetadata(METADATA.TYPE, target, key) as Type<T>) :
      token;
    Object.defineProperty(target, key, {
      // tslint:disable-next-line:no-unnecessary-type-assertion
      get(): T { return (getInj() as Injector).get<T>(theToken); },
      set(__: T) { /* */ },
    });
  };

export default InjectProp;
