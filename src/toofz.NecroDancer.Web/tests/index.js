// For webpack, require all test files.
const context = require.context('./src', true, /\.ts$/);
context.keys().forEach(context);
