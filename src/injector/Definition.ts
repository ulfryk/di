import FactoryFn from './FactoryFn';
import Token from './Token';

export default class Definition<T = any> {
  constructor(
    public readonly dependencies: Token[],
    public readonly factory: FactoryFn<T>,
    public readonly token: Token<T>,
  ) {}
}
