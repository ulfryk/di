import { Type } from '../injector';
import { extractMetadata, METADATA } from '../metadata';

const Injectable = () => (target: Type) => {
  Reflect.defineMetadata(METADATA.DEPENDENCIES, extractMetadata(target), target);
};

export default Injectable;
