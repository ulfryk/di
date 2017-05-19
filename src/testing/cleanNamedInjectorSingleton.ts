import { GlobalObject, KEY_STRING } from '../injector/getSingleton';

const cleanNamedInjectorSingleton = (name: string) => {
  GlobalObject[Symbol.for(`${KEY_STRING}::${name}`)] = undefined;
};

export default cleanNamedInjectorSingleton;
