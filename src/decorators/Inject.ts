import { Token, Type } from '../injector';
import { extractMetadata, METADATA } from '../metadata';

const Inject = (token: Token) => (target: Type, __: string, index: number) => {
  const params = extractMetadata(target).map((param, i) => i === index ? token : param);
  Reflect.defineMetadata(METADATA.DEPENDENCIES, params, target);
};

export default Inject;
