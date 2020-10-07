# react-admin-dashboard v2.0

**Live demo**: [https://llorentegerman.github.io/react-admin-dashboard/](https://llorentegerman.github.io/react-admin-dashboard/)

This UI is based on the following Figma design:
https://www.figmafreebies.com/download/figma-admin-dashboard-ui-kit/

Although the code has been totally refactored, in order to use of functional components, hooks and integrated 100% with react-router, you can still find the original project post here "Building a UI from scratch, based on a design with ReactJS" [here](POST.md) or [here](https://dev.to/llorentegerman/building-a-ui-from-scratch-based-on-a-design-with-reactjs-3l1e).

## Folder Structure

### base folder: /src:

-   **/assets**:
    /icons: SVGs icons
    other assets (i.e. images)

-   **/components**:
    generic components, or components that will be used by multiple routes
    i.e.: form components, tables, cards

-   **/hooks**:
    every hook should be in this folder, and its name should start with the prefix "use":
    i.e.: useSidebar, useQuery, etc.

-   **/resources**:
    -   slugs.js: a list of the routes that will be used in the app
    -   theme.js: an object with the theme structure, colors, typographies.
    -   utilities.js: any utility function, for example "convertSlugToUrl", which is used in conjunction with "history.push" (react router) for redirects and links.

-   **/routes**:
    We have 2 types of routes, public and private.
    public: are all those that do not require the user to be logged into the app, such as Login, Signup, etc.
    private: to access these routes the user must be logged in.
    Each main section of the application has its own route:
    -   auth (for login, signup, etc)
    -   dashboard
    -   overview
    -   tickets
    -   ideas
    -   contacts
    -   agents
    -   articles
    -   settings
    -   subscription

## Current dependencies:

[react-hook-form](https://www.npmjs.com/package/react-hook-form): form handling.

[react-jss](https://www.npmjs.com/package/react-jss): styles.

[react-router-dom](https://www.npmjs.com/package/react-router-dom): routing.

[simple-flexbox](https://www.npmjs.com/package/simple-flexbox): flexbox utility.

## License

This software is released under the [MIT License](https://github.com/llorentegerman/react-admin-dashboard/blob/master/LICENSE).

## Author

![me](https://avatars3.githubusercontent.com/u/21162888?s=100&v=4)

[Germán Llorente](https://github.com/llorentegerman)
