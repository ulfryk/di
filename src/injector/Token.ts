import Type from './Type';

type Token<T = any> = Type<T> | string | Symbol;

export default Token;
