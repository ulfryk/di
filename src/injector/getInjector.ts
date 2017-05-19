import { getSingleton, KEY } from './getSingleton';
import Injector from './Injector';

const getInjector = (): Injector => getSingleton(KEY);

export default getInjector;
