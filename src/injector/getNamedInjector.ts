import { getSingleton, KEY_STRING } from './getSingleton';
import Injector from './Injector';

const getNamedInjector = (name: string): Injector =>
  getSingleton(Symbol.for(`${KEY_STRING}::${name}`));

export default getNamedInjector;
