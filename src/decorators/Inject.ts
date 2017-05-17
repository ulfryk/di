import Token from '../Token';
import Type from '../Type';

import * as METADATA from './metadata-keys';

export const Inject = (token: Token) => (target: Type, __: string, index: number) => {
  const constructorParams: Token[] = Reflect.getMetadata(METADATA.PARAM_TYPE, target);
  const params = constructorParams.map((param, i) => i === index ? token : param);
  Reflect.defineMetadata(METADATA.PARAM_TYPE, params, target);
};
