import Injector from './Injector';

let injector: Injector | undefined; // tslint:disable-line:no-let

export const getInjectorSingleton = (): Injector => {
  if (injector === undefined) {
    injector = new Injector();
  }
  return injector;
};
