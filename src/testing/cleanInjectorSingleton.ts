import { GlobalObject, KEY } from '../injector/getSingleton';

const cleanInjectorSingleton = () => {
  GlobalObject[KEY] = undefined;
};

export default cleanInjectorSingleton;
