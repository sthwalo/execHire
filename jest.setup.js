import '@testing-library/jest-dom';

global.Headers = class Headers {
  constructor(init) {
    this._headers = new Map();
    if (init) {
      for (const [key, value] of Object.entries(init)) {
        this._headers.set(key.toLowerCase(), value);
      }
    }
  }

  get(name) {
    return this._headers.get(name.toLowerCase()) || null;
  }

  set(name, value) {
    this._headers.set(name.toLowerCase(), value);
  }
};

class Response {
  constructor(body, init) {
    this.body = body;
    this.init = init;
    this.status = init?.status || 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = init?.statusText || '';
    this.headers = new Headers(init?.headers);
  }

  json() {
    return Promise.resolve(
      typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    );
  }

  text() {
    return Promise.resolve(
      typeof this.body === 'string' ? this.body : JSON.stringify(this.body)
    );
  }
}

global.Response = Response;

jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: (data, init) => {
        return new Response(data, init);
      }
    }
  };
});

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn()
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  }
}));

jest.mock('next/headers', () => ({
  cookies() {
    return {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn()
    };
  }
}));

jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn().mockImplementation((req) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return {
        ...decoded,
        sub: decoded.id
      };
    } catch {
      return null;
    }
  })
}));
