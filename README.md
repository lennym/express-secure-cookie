# express-secure-cookie
Automatically detect whether to set secure flag in express `res.cookie` dependent on request protocol

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
});

app.listen(8080);
```