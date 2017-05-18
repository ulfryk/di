import { getSingleton, KEY } from './getSingleton';
import Injector from './Injector';

const getInjectorSingleton = (): Injector => getSingleton(KEY);

export default getInjectorSingleton;
