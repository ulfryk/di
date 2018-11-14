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
    // tslint:disable-next-line:no-object-mutation
    GlobalObject[key] = new Injector();
  }
  if (String(GlobalObject[key].constructor) === String(Injector)) {
    return GlobalObject[key];
  }
  throw new Error('Injector instance singleton was replaced with unknown object.');
};
