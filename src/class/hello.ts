import Base from './base';

class Hello extends Base {

    constructor () {
        super();
        this.helloMethod = this.helloMethod.bind(this);
    }

    public helloMethod = (): void => {
        this.baseMethod();
    }
}

export default new Hello();