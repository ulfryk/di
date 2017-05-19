import { getInjector, Injector, Type } from '../injector';
import { extractMetadata } from '../metadata';

const BindInjectable = (injector: Injector = getInjector()) => (target: Type) => {
  injector.registerClass(target, ...extractMetadata(target));
};

export default BindInjectable;
