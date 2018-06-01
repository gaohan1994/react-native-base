import hello from '../hello';
import { getValue } from '../hello';
import { 
    RECEIVE_INCREMENT,
    RECEIVE_DECREMENT,
} from '../../constants/hello';
import initState from '../hello/state';
import store from '../state';

describe('hello reducer test begin', () => {

    it('should value add 1', () => {
        expect(hello(initState, {type: RECEIVE_INCREMENT})).toEqual({
            value: 1
        });
    });

    it('should value dec 1', () => {
        expect(hello(initState, {type: RECEIVE_DECREMENT})).toEqual({
            value: 0
        });
    });

    describe('get method test', () => {
        const Store = {
            ...store,
            hello: {
                ...initState,
                value: 10
            }
        };
        it('should get value', () => {
            expect(getValue(Store)).toEqual(10);
        }); 
    });
    
});
