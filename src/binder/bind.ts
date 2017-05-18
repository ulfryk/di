import { Definition, getInjectorSingleton, Label, Token, Type } from '../injector';

import ClassBinder from './ClassBinder';
import TokenBinder from './TokenBinder';

export interface IBinder {
  <T>(token: Label): TokenBinder<T>; // tslint:disable-line:readonly-interface
  <T>(token: Type<T>): ClassBinder<T>; // tslint:disable-line:readonly-interface
  <T>(definition: Definition<T>): void; // tslint:disable-line:readonly-interface
}

const isType = (token: Token | Definition): token is Type =>
  token instanceof Function && Boolean(token.name);

const isLabel = (token: Token | Definition): token is Label =>
  token.constructor as any === Symbol || String(token) === token;

const isDefinition = (token: Token | Definition): token is Definition =>
  token instanceof Definition;

const bind: IBinder = (<T>(
  token: Type<T> | Label | Definition<T>,
  getInjector = getInjectorSingleton,
) => {
  if (isType(token)) {
    return new ClassBinder<T>(token, getInjector);
  }
  if (isLabel(token)) {
    return new TokenBinder<T>(token, getInjector);
  }
  if (isDefinition(token)) {
    getInjector().register(token);
  }
  throw new Error('Invalid value passed to "bind" function');
}) as any as IBinder;

export default bind;
