# toofz

[![Build status](https://ci.appveyor.com/api/projects/status/83e8eikypiri2lhi/branch/master?svg=true)](https://ci.appveyor.com/project/leonard-thieu/toofz-necrodancer-webclient/branch/master)
[![codecov](https://codecov.io/gh/leonard-thieu/crypt.toofz.com/branch/master/graph/badge.svg)](https://codecov.io/gh/leonard-thieu/crypt.toofz.com)

## Overview

[**toofz**](https://crypt.toofz.com/) is a [Crypt of the NecroDancer](http://necrodancer.com/) information website, featuring information on items and enemies, 
fast and easy to navigate leaderboards, and player profiles which showcase a player's personal bests.

This repo contains the frontend which is an AngularJS-based Single-Page Application (SPA) written in TypeScript. It uses ASP.NET Core as a thin supporting layer and 
relies on [toofz API](https://api.toofz.com/) for data.

---

Information about other projects that support **toofz** can be found in the [meta-repository](https://github.com/leonard-thieu/toofz-necrodancer).

### Dependencies

* [toofz API](https://github.com/leonard-thieu/api.toofz.com)
* [toofz Build](https://github.com/leonard-thieu/toofz-build)

## Requirements

* .NET Core 2.0

## Contributing

Contributions are welcome for toofz.

* Want to report a bug or request a feature? [File a new issue](https://github.com/leonard-thieu/crypt.toofz.com/issues).
* Join in design conversations.
* Fix an issue or add a new feature.
  * Aside from trivial issues, please raise a discussion before submitting a pull request.

### Development

Depending on what code you're working with, you may need to be familiar with TypeScript, SCSS, AngularJS, or AngularUI Router. Otherwise, knowledge of 
JavaScript or CSS can be sufficient for many tasks.

#### Requirements

* Visual Studio 2017
* Node.js
* WebStorm *(optional)* - Visual Studio can be flaky in how it handles TypeScript. WebStorm is recommended for editing TypeScript files.

#### Getting started

From the [`src/toofz.NecroDancer.Web`](src/toofz.NecroDancer.Web) directory, run:

```
npm install
npm run build-dev
```

You may now start the application through Visual Studio.

In order to run tests, run:

```
npm run build-dev-test
npm test
```

Scripts that produce optimized code ready for production (`build-prod` and `build-prod-test`) are also available.

**Note**: Test build scripts produce slightly different output for `app.js` (code is instrumented and wrapped to make it easier to test). This means that 
if you've built a non-test build and you want to test, you _must_ run a test build script. Likewise, if you've built a test build and you want to view the 
site in your browser, you must run a non-test build script.

To view a code coverage report (after running tests), run:

```
npm run report
```

This will open a code coverage report in your browser.

#### Repository layout

* [`wwwroot`](src/toofz.NecroDancer.Web/wwwroot)
  * `app` - build output directory
* [`lib`](src/toofz.NecroDancer.Web/lib) - customized 3rd party libraries
* [`src`](src/toofz.NecroDancer.Web/src)
  * [`characters`](src/toofz.NecroDancer.Web/src/characters) - character icons (used in the leaderboards dropdown and on the leaderboards page)
  * [`currency`](src/toofz.NecroDancer.Web/src/currency) - currency icons (used on items, enemies, and leaderboard pages)
  * [`dropdown`](src/toofz.NecroDancer.Web/src/dropdown) - dropdown menu (used in the navbar)
  * [`enemies`](src/toofz.NecroDancer.Web/src/enemies) - enemy section
  * [`entry-filters`](src/toofz.NecroDancer.Web/src/entry-filters) - AngularJS filters that formats leaderboard entry data for display
  * [`items`](src/toofz.NecroDancer.Web/src/items) - item section
  * [`landing`](src/toofz.NecroDancer.Web/src/landing) - landing page
  * [`leaderboard`](src/toofz.NecroDancer.Web/src/leaderboard) - displays leaderboard entries
  * [`leaderboards`](src/toofz.NecroDancer.Web/src/leaderboards) - leaderboards search page
  * [`navbar`](src/toofz.NecroDancer.Web/src/navbar) - main navigation element featured at the top of every page
  * [`ordinal`](src/toofz.NecroDancer.Web/src/ordinal) - AngularJS filter that formats leaderboard entry rank as an ordinal (used on the profile page)
  * [`otherwise`](src/toofz.NecroDancer.Web/src/otherwise) - page served when a URL cannot be routed to
  * [`page-title`](src/toofz.NecroDancer.Web/src/page-title) - service that manages changes to the page title
  * [`pagination`](src/toofz.NecroDancer.Web/src/pagination) - pagination controls
  * [`profile`](src/toofz.NecroDancer.Web/src/profile) - player profile section
  * [`root`](src/toofz.NecroDancer.Web/src/root) - root template and route
  * [`search`](src/toofz.NecroDancer.Web/src/search) - search feature
  * [`slug`](src/toofz.NecroDancer.Web/src/slug) - AngularJS filter that formats player names into URL slugs
  * [`titlecase`](src/toofz.NecroDancer.Web/src/titlecase) - AngularJS filter that formats a string in titlecase
  * [`toofz-rest-api`](src/toofz.NecroDancer.Web/src/toofz-rest-api) - toofz API client
  * [`app.module.ts`](src/toofz.NecroDancer.Web/src/app.module.ts) - main entry point
  * [`app.scss`](src/toofz.NecroDancer.Web/src/app.scss) - site-wide styles
* [`test`](src/toofz.NecroDancer.Web/test)
  * [`src`](src/toofz.NecroDancer.Web/test/src) - structure mirrors that of [`src`](src/toofz.NecroDancer.Web/src)
* [`Views`](src/toofz.NecroDancer.Web/Views)
  * [`Shared`](src/toofz.NecroDancer.Web/Views/Shared)
    * [`_Layout.cshtml`](src/toofz.NecroDancer.Web/Views/Shared/_Layout.cshtml) - the main template for the site

## License

**toofz** is released under the [MIT License](LICENSE).
