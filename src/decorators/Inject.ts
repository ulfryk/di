import { Token, Type } from '../injector';

import * as METADATA from './metadata-keys';

export const Inject = (token: Token) => (target: Type, __: string, index: number) => {
  // use MonetJS maybe ?
  const constructorParams: Token[] = Reflect.getMetadata(METADATA.PARAM_TYPE, target);
  const dependenciesMetadata: Token[] | undefined =
    Reflect.getMetadata(METADATA.DEPENDENCIES, target);
  const metadata = dependenciesMetadata === undefined ? constructorParams : dependenciesMetadata;
  const params = metadata.map((param, i) => i === index ? token : param);
  Reflect.defineMetadata(METADATA.DEPENDENCIES, params, target);
};
