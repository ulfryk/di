import { Token, Type } from '../injector';

import * as METADATA from './metadata-keys';

/** @private */
const extractDependenciesMetadata = (target: Type): Token[] => {
  const dependenciesMetadata: Token[] | undefined =
    Reflect.getMetadata(METADATA.DEPENDENCIES, target);
  if (dependenciesMetadata === undefined) {
    throw new Error('No metadata');
  }
  return dependenciesMetadata;
};

export default extractDependenciesMetadata;
