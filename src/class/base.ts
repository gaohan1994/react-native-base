class Base {

    constructor () {
        this.baseMethod = this.baseMethod.bind(this);
    }

    public baseMethod = (): void => {
        console.log('hello');
    }
}

export default Base;