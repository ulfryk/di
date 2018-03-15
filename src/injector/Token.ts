import AbstractType from './AbstractType';
import Label from './Label';
import Type from './Type';

type Token<T = any> = AbstractType<T> | Type<T> | Label;

export default Token;
