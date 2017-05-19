import Label from './Label';
import Type from './Type';

type Token<T = any> = Type<T> | Label;

export default Token;
