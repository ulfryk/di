import FactoryFn from './FactoryFn';
import Token from './Token';

abstract class Definition<T = any> {
  public readonly dependencies: Token[];
  public readonly factory: FactoryFn<T>;
  public readonly token: Token<T>;
}

export default Definition;
