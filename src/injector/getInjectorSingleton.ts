import Injector from './Injector';

/** @private */
export const KEY = Symbol.for('@samwise-tech/di/global-singleton-injector');

/** @private */
export const GlobalObject: any = (() => {
  try {
    return window;
  } catch (e) {
    return global;
  }
})();

const getInjectorSingleton = (): Injector => {
  if (GlobalObject[KEY] === undefined) {
    GlobalObject[KEY] = new Injector();
  }
  if (GlobalObject[KEY] instanceof Injector) {
    return GlobalObject[KEY];
  }
  throw new Error('Injector instance singleton was replaced with unknown object.');
};

export default getInjectorSingleton;
