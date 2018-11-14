import { GlobalObject, KEY } from '../injector/getSingleton';

const cleanInjectorSingleton = () => {
  // tslint:disable-next-line:no-object-mutation
  GlobalObject[KEY] = undefined;
};

export default cleanInjectorSingleton;
