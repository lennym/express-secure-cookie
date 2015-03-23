var middleware = require('../index');

describe('secure-cookie', function () {
    var req, res, next, setCookie;

    beforeEach(function () {
        setCookie = sinon.stub();
        req = {};
        res = {
            cookie: setCookie
        };
        next = sinon.stub();
    });

    it('exports a function', function () {
        middleware.should.be.a('function');
    });

    it('passes through to next middleware', function () {
        middleware(req, res, next);
        next.should.have.been.calledWithExactly();
    });

    it('calls res.cookie with secure flag set according to protocol', function () {
        req.protocol = 'http';
        middleware(req, res, next);
        res.cookie('foo', 'bar');
        setCookie.should.have.been.calledWithExactly('foo', 'bar', sinon.match({ secure: false }));

        req.protocol = 'https';
        middleware(req, res, next);
        res.cookie('foo', 'bar');
        setCookie.should.have.been.calledWithExactly('foo', 'bar', sinon.match({ secure: true }));
    });

    it('leaves secure flag set if it is passed as an option', function () {
        req.protocol = 'http';
        middleware(req, res, next);
        res.cookie('foo', 'bar', { secure: true });
        setCookie.should.have.been.calledWithExactly('foo', 'bar', sinon.match({ secure: true }));
    });

    it('sets httpOnly flag to true', function () {
        middleware(req, res, next);
        res.cookie('foo', 'bar');
        setCookie.should.have.been.calledWithExactly('foo', 'bar', sinon.match({ httpOnly: true }));
    });

    it('leaves httpOnly flag intact if it is set', function () {
        middleware(req, res, next);
        res.cookie('foo', 'bar', { httpOnly: false });
        setCookie.should.have.been.calledWithExactly('foo', 'bar', sinon.match({ httpOnly: false }));
    });

});