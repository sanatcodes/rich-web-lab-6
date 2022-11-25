# Exercise Questions

**Q.1 Explain what is meant by the stream abstraction. What is the relationship between
streams and the observer pattern? What are streams useful for modelling and when
might you use them in Rich Web development?**


A stream is an abstract concept created to get data in pieces rather than altogether to reduce memory usage. Streams are very useful when the size of data flowing in is not known while processing. An analogy of a pipe can be used to denote a stream, you open the pipe when you want to get data and you close it once you don’t need more.

The observer pattern is used to implement steams from a technical point of view. An observer is used in place of a promise or callback to get data from a stream. It is asynchronous in nature. An example of the observer in action would be a subject that observers subscribe to and it is notified when a state change is made, providing a new stream of data to utilise.

Streams are useful for getting any kind of data in pieces, this could be events, user inputs, arrays or any data structure. This means that they are very useful in Rich Web when we are getting large data from an API. Where need to do all of this in an asynchronous way, which is non-blocking for the browser. In this case, streams would be much better than promises or callbacks.




**Q.1 Explain what is meant by the stream abstraction. What is the relationship between
streams and the observer pattern? What are streams useful for modelling and when
might you use them in Rich Web development?**


In order to design an API to interface with my Rich web app using RxJS I would create observers for all of the data points that I need to return to my application. These would be what search for the data coming in. Then I would add subscribers in the program where the data from the API will be consumed, to get information from the observers into the web app. 

The benefits of using a stream would be to handle large amounts of data from events in real-time, which can’t really be done with multiple sources from callbacks or promises. This would also ensure better state management as any changes would be propagated whenever data changes as the subscribers would get notified by the observer. This makes code much more scalable and robust. The downside of using streams would be adding unnecessary complexity to the code when it isn’t necessary.



**Q.1 Explain what is meant by the stream abstraction. What is the relationship between
streams and the observer pattern? What are streams useful for modelling and when
might you use them in Rich Web development?**

The problem with running so many asynchronous tasks together with a shared global state is that there is a risk that these events are not handled correctly. There would be a race problem which would lead to a lack of information propagation in the system. As these functions are using the global state. 

Hence, as a best practice, it would be wise to use async await to make sure that these async functions wait for other tasks to finish before proceeding on. There needs to be some mechanism to make sure that tasks don’t overwrite the global state in a way that causes a race problem.


