const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      res.status(500).json({ message: error.message });
    });
  };
  
  export default asyncHandler;
  












































// ✔ It’s a Higher-Order Function → It takes an async function (fn) as input and returns a new function.
// ✔ The returned function gets (req, res, next) as parameters, like an Express middleware.
// ✔ Promise.resolve(fn(req, res, next)) → Runs the async function safely.
// ✔ .catch((error) => { ... }) → If an error occurs, it automatically sends a 500 response instead of crashing the server.


// Imagine you are driving a self-driving car (async function).

// Normally, you have to watch for accidents (errors) and take action (try-catch).
// But this async handler is like an automatic safety system that detects problems and brakes for you.
// So instead of manually checking for every error, this function automatically stops the crash (handles errors).



// Avoids writing try-catch in every async function.
// Automatically catches errors and sends a 500 response.
// Makes code cleaner and easier to maintain.