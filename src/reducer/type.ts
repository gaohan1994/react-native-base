import { Hello } from './hello/type';
import { Home } from './home/type';
import { Status } from './status/type';
import { Video } from './video/type';

export interface Store {
    hello: Hello;
    home: Home;
    status: Status;
    video: Video;
}