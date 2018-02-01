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

From the `src\toofz.NecroDancer.Web` directory, run:

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

* `wwwroot`
  * `app` - build output directory
* `lib` - customized 3rd party libraries
* `src`
  * `characters` - character icons (used in the leaderboards dropdown and on the leaderboards page)
  * `currency` - currency icons (used on items, enemies, and leaderboard pages)
  * `dropdown` - dropdown menu (used in the navbar)
  * `enemies` - enemy section
  * `entry-filters` - AngularJS filters that formats leaderboard entry data for display
  * `items` - item section
  * `landing` - landing page
  * `leaderboard` - displays leaderboard entries
  * `leaderboards` - leaderboards search page
  * `navbar` - main navigation element featured at the top of every page
  * `ordinal` - AngularJS filter that formats leaderboard entry rank as an ordinal (used on the profile page)
  * `otherwise` - page served when a URL cannot be routed to
  * `page-title` - service that manages changes to the page title
  * `pagination` - pagination controls
  * `profile` - player profile section
  * `root` - root template and route
  * `search` - search feature
  * `slug` - AngularJS filter that formats player names into URL slugs
  * `titlecase` - AngularJS filter that formats a string in titlecase
  * `toofz-rest-api` - toofz API client
  * `app.module.ts` - main entry point
  * `app.scss` - site-wide styles
* `test`
  * `src` - structure mirrors that of `src`
* `Views`
  * `Shared`
    * `Layout.cshtml` - the main template for the site

## License

**toofz** is released under the [MIT License](LICENSE).
