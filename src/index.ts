import { getInjectorSingleton } from './getInjectorSingleton';
import Injector from './Injector';

export const injector: Injector = getInjectorSingleton();

export * from './decorators';
export * from './Injector';
export * from './TestInjector';
