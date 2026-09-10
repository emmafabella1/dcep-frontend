<<<<<<< HEAD
# dcep-frontend
<img width="1200" height="1386" alt="dcep_frontend_wireframe" src="https://github.com/user-attachments/assets/41ebfd0e-38d3-4ace-ae52-d0649f01877b" />
=======
# DCEP Web Portal — Angular 18 Reference Codebase

Companion code for the DCEP wireframe. Implements the header, hero, quick
actions, and product catalog as standalone Angular 18 components, matching
the architecture diagram's "Web (Angular 18)" client channel.

## Structure

```
src/
├── app/
│   ├── app.component.ts          root component, composes everything
│   ├── app.config.ts             bootstrap providers (HttpClient, zone CD)
│   ├── models/
│   │   └── product.model.ts
│   ├── services/
│   │   └── product.service.ts    <- webservice connection (see below)
│   └── components/
│       ├── header/
│       ├── hero/
│       ├── quick-actions/
│       ├── product-card/
│       ├── product-catalog/
│       └── footer/
├── environments/
│   ├── environment.ts             production API base URL
│   └── environment.development.ts local/dev API base URL
├── main.ts
├── index.html
└── styles.css
```

## Webservice connection — hardcoded data for now

`ProductService` is wired for a real backend call (`HttpClient` injected,
`environment.apiBaseUrl` set, `provideHttpClient()` registered in
`app.config.ts`), but every method currently **returns hardcoded data**
instead of calling the API:

```ts
getProducts(): Observable<Product[]> {
  // return this.http.get<Product[]>(this.baseUrl);
  return of(HARDCODED_PRODUCTS).pipe(delay(300));
}
```

To connect it to the real Product Catalog Service once it's ready:
1. Uncomment the `this.http...` line, delete the hardcoded line below it.
2. Set the correct path on `baseUrl` / `environment.apiBaseUrl` if it differs.
3. Nothing in the components needs to change — they only depend on the
   `Observable<Product[]>` return type, not on where the data comes from.

The same pattern is used for `getRecommended()` and `addToCart()`.

## Angular 18 features used (useful interview talking points)

- **Standalone components** — no `NgModule`, each component declares its own `imports`.
- **`input()` / `input.required()` / `output()`** — the newer signal-based function APIs for component I/O, alongside the classic `@Input()`/`@Output()` decorators.
- **`signal()` / `computed()`** — local reactive state (cart count, active category filters) without `RxJS` boilerplate.
- **`toSignal()`** (`@angular/core/rxjs-interop`) — bridges an `Observable` (from the service) into a `Signal` the template can read directly, no `async` pipe needed.
- **New control-flow syntax** — `@for`, `@if`, `@empty` instead of `*ngFor`/`*ngIf` structural directives (no `CommonModule` import needed).
- **`inject()`** — function-based dependency injection instead of constructor injection.
- **`provideHttpClient()`** — standalone-style provider registration instead of `HttpClientModule`.

## Running this for real

This folder has the application source only (no `angular.json`/`tsconfig.json`
scaffolding). To actually run it: `ng new dcep-web --standalone`, then drop
these files into the generated `src/` folder, `npm install`, and `ng serve`.
>>>>>>> eca40b5 (codebase)
