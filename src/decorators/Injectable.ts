import Type from '../Type';

import { getInjectorSingleton } from '../getInjectorSingleton';
import Injector from '../Injector';
import * as METADATA from './metadata-keys';

export const Injectable = (injector: Injector = getInjectorSingleton()) => (target: Type) => {
  const dependencies = Reflect.getMetadata(METADATA.PARAM_TYPE, target);
  if (dependencies !== undefined && dependencies.length > 0) {
    injector.registerClass(target, ...dependencies);
  } else {
    injector.registerClass(target);
  }
};
