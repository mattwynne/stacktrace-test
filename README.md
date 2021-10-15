# Attempt to isolate a problem with line numbers in TypeScript stack traces

It seems that if we try to use the [V8 stack trace API](https://v8.dev/docs/stack-trace-api) to get an array of structured `CallSite` objects when using ts-node, those objects don't have the correct line numbers or columns on them.

This project is an attempt to make a minimal reproducable example.

To reproduce, clone the repo, then:

		npm install
		npm run start:ts

You should see:

```
➜  stacktrace-test npm run start:ts

> stacktrace-test@1.0.0 start:ts
> ts-node src/index.ts

Stack trace passed to Error.prepareStackTrace:
[
  '/Users/matt/git/github.com/cucumber/stacktrace-test/src/index.ts:13:5',
  '/Users/matt/git/github.com/cucumber/stacktrace-test/src/index.ts:15:1',
  'internal/modules/cjs/loader.js:999:30',
  '/Users/matt/git/github.com/cucumber/stacktrace-test/node_modules/ts-node/dist/index.js:735:29',
  'internal/modules/cjs/loader.js:1027:10',
  '/Users/matt/git/github.com/cucumber/stacktrace-test/node_modules/ts-node/dist/index.js:737:16',
  'internal/modules/cjs/loader.js:863:32',
  'internal/modules/cjs/loader.js:708:14',
  'internal/modules/run_main.js:60:12',
  '/Users/matt/git/github.com/cucumber/stacktrace-test/node_modules/ts-node/dist/bin.js:238:16'
]
Stack trace rendered by Error.stack:
Error: 
    at myFunction (/Users/matt/git/github.com/cucumber/stacktrace-test/src/index.ts:16:3)
    at Object.<anonymous> (/Users/matt/git/github.com/cucumber/stacktrace-test/src/index.ts:19:1)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Module.m._compile (/Users/matt/git/github.com/cucumber/stacktrace-test/node_modules/ts-node/src/index.ts:1365:23)
    at Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Object.require.extensions.<computed> [as .ts] (/Users/matt/git/github.com/cucumber/stacktrace-test/node_modules/ts-node/src/index.ts:1368:12)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at main (/Users/matt/git/github.com/cucumber/stacktrace-test/node_modules/ts-node/src/bin.ts:331:12)
```

Notice how the line numbers in the `prepareStackTrace` output are wrong - 13 and 15 when they should be 16 and 19.