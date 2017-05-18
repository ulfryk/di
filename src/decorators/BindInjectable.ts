import { getInjectorSingleton, Injector, Type } from '../injector';
import { extractMetadata } from '../metadata';

export const Injectable = (injector: Injector = getInjectorSingleton()) => (target: Type) => {
  injector.registerClass(target, ...extractMetadata(target));
};
