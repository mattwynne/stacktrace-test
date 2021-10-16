import { wrapCallSite } from "@cspotcode/source-map-support";

const myFunction = () => {
  const original = Error.prepareStackTrace || (() => { });
  Error.prepareStackTrace = (error, stack) => {
    console.log("Stack trace passed to Error.prepareStackTrace:");
    console.log(
      stack.map(
        wrapCallSite
      ).map(stackFrame =>
        `${stackFrame.getFileName()}:${stackFrame.getLineNumber()}:${stackFrame.getColumnNumber()}`
      )
    );
    console.log("Stack trace rendered by Error.stack:");
    console.log(original(error, stack));
  };

  // Trigger an error - this is the first line we should see in each stack trace
  new Error().stack;
};

myFunction();
