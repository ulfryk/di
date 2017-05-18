import Injector from './Injector';

let injector: Injector | undefined; // tslint:disable-line:no-let

const getInjectorSingleton = (): Injector => {
  if (injector === undefined) {
    injector = new Injector();
  }
  return injector;
};

export default getInjectorSingleton;
