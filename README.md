# rainboots

A site for learning languages.

---

## Technical Features

* Fully Restful and stateless communication with the [API](https://github.com/silverback78/parka)
* Uses [JSON Web Tokens](https://jwt.io/) for authentication and authorization
* Configuration provider and manual bootstrapping to handle fetching and merging UI and API configurations during the config portion of the Angular application lifecycle.
  * Features controlled by configuration. This allows features to be released "dark".
  * Server configuration overrides UI configuration. This allows the server to tell the UI what it supports and what it doesn't, and the UI will respond accordingly. Useful in a distributed environment leveraging the stateless nature of the application.
* Leverages stateleness to become fully scalable. Instances of the UI and API can be spun up and down as necessary, connections can be interchanged even mid-session without any loss of data or communication.
* 100% unit test code coverage

## [RequestHandler model](https://github.com/silverback78/rainboots/blob/master/app/models/RequestHandler/RequestHandler.js)
This model was created to handle requests during the config lifcecycle stage. Because Angular is not initialized, manual xmlHttpRequest had to be performed. Written as a Javascript class-like model, it can be instantiated and handle multiple requests with individual callbacks, as well as a final callback once all requests have been completed.

## [Log Service](https://github.com/silverback78/rainboots/blob/master/app/services/log/log.js)
The log service allows full stack tracing in a dev environment, and will eventually allow full stack logging to production environment databases on any error. It simplifies the logging and debugging process, especially in instances where an error has happened in production and no other details are known.

![Log example](https://lh3.googleusercontent.com/q5Xsj1Cj5f69ShoX5yjF-TlQjv-aB5oAZKDwdIzEEM04JXn1SFdEJ3MzTWKlvNRYp84hropRHRpq3BljBxeU=w1920-h959-rw)

## [Unit Testing](https://github.com/silverback78/rainboots/blob/master/app/models/RequestHandler/RequestHandler.spec.js)
Fully mocked unit testing for immediate developer feedback. Unit test are designed with speed in mind and strive to cover not just every code path, but every type of possibility to minimize the chance of common mistakes such as null references, as well as to ensure stability when refactoring or restructuring code.