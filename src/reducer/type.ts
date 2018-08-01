import { Hello } from './hello/type';
import { Home } from './home/type';

export interface Store {
    hello: Hello;
    home: Home;
}