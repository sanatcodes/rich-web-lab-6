const {Observable} = require ('rxjs')

const wrapArrayIntoObservable = arr => {
    return new Observable(subscriber => {
        for(let item of arr) {
            subscriber.next(item);
        }
    });
}

const data = [1,2,3,4,5]

const observable = wrapArrayIntoObservable(data)

observable.subscribe(val => console.log('subsriber: ', + val));
