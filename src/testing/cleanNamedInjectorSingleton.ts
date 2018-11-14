import { GlobalObject, KEY_STRING } from '../injector/getSingleton';

const cleanNamedInjectorSingleton = (name: string) => {
  // tslint:disable-next-line:no-object-mutation
  GlobalObject[Symbol.for(`${KEY_STRING}::${name}`)] = undefined;
};

export default cleanNamedInjectorSingleton;
