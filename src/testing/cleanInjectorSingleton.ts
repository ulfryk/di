import { GlobalObject, KEY } from '../injector/getInjectorSingleton';

const cleanInjectorSingleton = () => {
  GlobalObject[KEY] = undefined;
};

export default cleanInjectorSingleton;
