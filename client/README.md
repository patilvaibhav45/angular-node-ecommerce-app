# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Development with backend (proxy)

This project is configured to forward API requests under `/api` to the backend during development using the dev-server proxy file `proxy.conf.json`. This avoids CORS issues and keeps API calls in the client code relative (for example: `/api/v1/products`).

- Proxy config: `proxy.conf.json` (forwards `/api` to `http://localhost:5000`)
- Client dev script: `npm start` (runs `ng serve --proxy-config proxy.conf.json`)

To run the app locally with the backend:

1. Start the backend (from the repository root or `backend` folder):

```powershell
cd ..\backend
npm install
npm run dev   # or `npm start` depending on your backend scripts
```

2. Start the client (in the `client` folder):

```powershell
cd ..\client
npm install
npm start
```

3. Open your browser at `http://localhost:4200`.

Quick API check through the dev-server proxy (PowerShell examples):

```powershell
# Fetch products via the client proxy
Invoke-RestMethod -Method Get -Uri http://localhost:4200/api/v1/products

# Or hit the backend directly
Invoke-RestMethod -Method Get -Uri http://localhost:5000/api/v1/products
```

Notes:
- The client uses relative API paths (for example `/api/v1/`) so the proxy takes effect automatically when running `ng serve --proxy-config proxy.conf.json`.
- For production builds, update `src/environments/environment.prod.ts` to point `apiUrl` at your real API host.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
