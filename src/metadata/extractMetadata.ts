import { Token, Type } from '../injector';

import * as METADATA from './metadata-keys';

/** @private */
const extractMetadata = (target: Type): Token[] => {
  const constructorParams: Token[] | undefined = Reflect.getMetadata(METADATA.PARAM_TYPE, target);
  const dependenciesMetadata: Token[] | undefined =
    Reflect.getMetadata(METADATA.DEPENDENCIES, target);
  return dependenciesMetadata !== undefined ?
    dependenciesMetadata :
    constructorParams !== undefined ? constructorParams : [];
};

export default extractMetadata;
