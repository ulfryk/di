import { getInjector, Token } from '../injector';
import { METADATA } from '../metadata';

const InjectProp = <T>(token?: Token<T>, getInj = getInjector) => (target: T, key: string) => {
  const theToken = token === undefined ? Reflect.getMetadata(METADATA.TYPE, target, key) : token;
  Object.defineProperty(target, key, {
    get(): T { return getInj().get<T>(theToken); },
    set(__: T) { /* */ },
  });
};

export default InjectProp;
