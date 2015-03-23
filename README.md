# express-secure-cookie

An opinionated replacement for express' `res.cookie` method.

Automatically detects whether to set `secure` flag dependent on request protocol. Defaults `httpOnly` to true.

## Install

```
npm install express-secure-cookie
```

## Usage

```
var app = require('express')();

app.use(require('express-secure-cookie'));

app.get('*', function (req, res) {
    res.cookie('foo', 'bar');
    // this cookie will now have its `secure` flag set appropriately for
    // the protocol of the inbound request - i.e. http/s
    // the cookie will also have its `httpOnly` flag set to true meaning
    // it cannot be read by `document.cookies`
});

...

app.listen(8080);
```