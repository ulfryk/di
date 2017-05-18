import { getInjectorSingleton, Injector, Token, Type } from '../injector';

import * as METADATA from './metadata-keys';

export const Injectable = (injector: Injector = getInjectorSingleton()) => (target: Type) => {
  const constructorParams: Token[] = Reflect.getMetadata(METADATA.PARAM_TYPE, target);
  const dependenciesMetadata: Token[] | undefined =
    Reflect.getMetadata(METADATA.DEPENDENCIES, target);
  const metadata = dependenciesMetadata === undefined ? constructorParams : dependenciesMetadata;
  if (metadata.length > 0) {
    injector.registerClass(target, ...metadata);
  } else {
    injector.registerClass(target);
  }
};
