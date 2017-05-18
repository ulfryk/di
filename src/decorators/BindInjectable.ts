import { getInjectorSingleton, Injector, Type } from '../injector';
import { extractMetadata } from '../metadata';

const BindInjectable = (injector: Injector = getInjectorSingleton()) => (target: Type) => {
  injector.registerClass(target, ...extractMetadata(target));
};

export default BindInjectable;
