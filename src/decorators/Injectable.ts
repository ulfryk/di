import { Type } from '../injector';
import { extractMetadata, METADATA } from '../metadata';

export const Injectable = () => (target: Type) => {
  Reflect.defineMetadata(METADATA.DEPENDENCIES, extractMetadata(target), target);
};
