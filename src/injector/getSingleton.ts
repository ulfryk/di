import Injector from './Injector';

/** @private */
export const KEY_STRING = '@samwise-tech/di/global-singleton-injector';

/** @private */
export const KEY = Symbol.for(KEY_STRING);

/** @private */
export const GlobalObject: any = (() => {
  try {
    return window;
  } catch (e) {
    return global;
  }
})();

/** @private */
export const getSingleton = (key: symbol): Injector => {
  if (GlobalObject[key] === undefined) {
    GlobalObject[key] = new Injector();
  }
  if (GlobalObject[key] instanceof Injector) {
    return GlobalObject[key];
  }
  throw new Error('Injector instance singleton was replaced with unknown object.');
};
