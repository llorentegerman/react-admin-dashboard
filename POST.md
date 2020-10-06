Today we will rewrite our Sidebar to make some improvements.

-   We'll write a Functional Component (using Hooks)
-   Items and subitems (collapsible menu)
-   Abstract the sidebar logic to manage the different states of the items (selected, expanded, active).
-   Improve this behaviour:

Before this post
http://g.recordit.co/6nacKHXv9c.gif

After this post:
http://g.recordit.co/hdixUPBrJF.gif

First of all, I converted it from Class Component to Functional Component to fix an [issue](https://github.com/llorentegerman/react-admin-dashboard/issues/8) related to Chrome.

You can see the changes [here](https://github.com/llorentegerman/react-admin-dashboard/commit/1c776171c54bdb9c9a6bd450e22e40bc62b74e10), it's not necessary to explain it because we will rewrite the component.

At the moment these are our Sidebar's components:

```
1- SidebarComponent
    2- LogoComponent <-- it won't change
    3- MenuItemComponent (collection)
```

We will add 3 files, 2 new Components and 1 Hook:

-   CollapsibleComponent: to allow expand and collapse the subItems of the menu.
-   SubItemComponent: to represent our subItems.
-   useSidebar: in this hook we will manage our Sidebar's logic.

And this will be our new Sidebar's structure:

```
SidebarComponent
    .useSidebar(hook)
    LogoComponent
    MenuItemComponent (collection)
        CollapsibleComponent
            SubItemComponent (collection)
```

### CollapsibleComponent:

We will use this component to show or hide content. In this case, we will use it to show or hide the sub items.
These are the expected props for this component:

```
CollapsibleComponent.propTypes = {
    children: oneOfType([arrayOf(element), element]).isRequired,
    expanded: bool, // by default is collapsed.
    style: object, // if you need to send some extra styles
    transitionDuration: string // default: 0.425s
};
```

As you can see, the state of the component (expanded or collapsed) will be managed from its parent by `expanded` prop, in our case `MenuItemComponent` is the parent and `SubItemComponent` are the children of `CollapsibleComponent`.

-- code here

There are 4 main "blocks":

1- Return:

```
<div
    style={{
        overflow: 'hidden',
        transitionProperty: 'max-height',
        transitionTimingFunction: 'ease-in-out',
        transitionDuration,
        maxHeight: expanded ? maxHeight.current : 0,
        ...style
    }}
    ref={contentContainerRef}
    {...others}
>
    {children}
</div>
```

The important stuff here are the styles:
`overflow: 'hidden'` to avoid show the elements when we are transitioning form `height: SOMEpx` to `height: 0px` as you can see in this picture:
http://g.recordit.co/IRGWT4IpdY.gif

We are transitioning by the `max-height` property, so, when the component is expanded `maxHeight: maxHeight` (in that state we are storing the height of our component when it's expanded), otherwise `maxHeight` is 0.
Note that we can't use `maxHeight: '100%'` or `auto` we have to use a specific height. Interesting article [here](https://css-tricks.com/using-css-transitions-auto-dimensions/)
To know the height of our component, we need the reference of the DOM element, and for that we are using `contentContainerRef`.

2: useRef and useState

```
const contentContainerRef = useRef(null);
const [maxHeight, setMaxHeight] = useState('100vh');
```

`contentContainerRef` is already explained, but the interesting thing here is `maxHeight`, we are using it to store the `height` of our component when it's expanded, but by default it's `100vh` (remember that we cannot use `100%` or `auto`).

3: useEffect excecuted when children changes.

```
useEffect(() => {
    let mounted = true;
    if (
        contentContainerRef.current &&
        maxHeight !== contentContainerRef.current.scrollHeight
    ) {
        setTimeout(
            () => {
                if (
                    mounted &&
                    maxHeight !== contentContainerRef.current.scrollHeight
                ) {
                    setMaxHeight(contentContainerRef.current.scrollHeight);
                }
            },
            0 // because scrollHeight could change after first render
        );
    }
    return () => { mounted = false; }; // prettier-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [children]);
```

This effect will be excecuted when children changes.
NOTE: It will be excecuted at least once (after first render). In this component, children will not change because they are static, but we want it to be generic and there are other cases where children could change.
To avoid unnecesary renders we check if the current `maxHeight` value is different of the DOM element height: `maxHeight !== contentContainerRef.current.scrollHeight`, in that case we set the new `maxHeight`.
See that we are doing this inside a `setTimeout` function with `timeout: 0`, and this is the most important part, why? The DOM may not be ready yet, because the children (subMenus) may not be rendered yet, so we can send this action to the end of the call stack, and by that time the DOM should be ready.
Hay otras alternativas como subscribirse mediante un onLoad a los children, pero es complicar las cosas al dope.
In fact, look at how the menu looks when we don't run the function inside the `setTimeout`.

-- SNAPSHOT

Why don't we just use `maxHeight: '100vh'`? Because during the `collapse` the height of our element won't change until `max-height` reaches the height of the element. For example if we are transitioning from `100vh` to `0px` in 1 second and let's assume that `100vh === 1000px` and the real height of our element (`scrollHeight`) is `600px` we won't see results until 0.4 seconds after the transition has started (it will depend on the `transitionTimingFunction` we were using, but the delay will exists anyway).

The last but not least part is `mounted`, we are using this to avoid excecute `setMaxHeight` if the component was unmounted, otherwise we could receive this message:

```
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

Read more about this [here](https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm)

# Building a UI from scratch, based on a design with ReactJS

In this article we will build a UI following a design. We will use `Figma` to visualize the design, but is also possible to use any other tool that allows you to extract the CSS code from the elements, such as `invisionapp`, `zeplin`, etc.

_Read this in [Spanish](README.es.md)_

**Live demo**: [https://llorentegerman.github.io/react-admin-dashboard/](https://llorentegerman.github.io/react-admin-dashboard/)

**Repository**: [https://github.com/llorentegerman/react-admin-dashboard](https://github.com/llorentegerman/react-admin-dashboard)

### Uploading a design to Figma

I will not enter in details about the tool, we only need a design.

1. Create an account in [https://www.figma.com](https://www.figma.com) (free).
2. I have selected a random _Figma file_ from [https://www.figmafreebies.com](https://www.figmafreebies.com) (free). The selected file is: [Figma Admin Dashboard UI Kit](https://www.figmafreebies.com/download/figma-admin-dashboard-ui-kit/).
   I'm using the web version of Figma, so, you have to click `DOWNLOAD FREEBIES` button, and the design will be added to your account.
3. You can double click on each element and see the css code related to it in the `code` tab that is in the right column.

![screenshot3](https://i.postimg.cc/76vy3ckT/screenshot3.png)

### Creating the app

For this step we will use [Create React App](https://facebook.github.io/create-react-app/):

```
npx create-react-app react-admin-dashboard
```

We will use [aphrodite](https://www.npmjs.com/package/aphrodite) for the styles and [simple-flexbox](https://www.npmjs.com/package/simple-flexbox) to make the layout.

`yarn add aphrodite simple-flexbox` or `npm install aphrodite simple-flexbox`

### Folder structure:

For this case we can keep a simple structure:

```
/src
    /assets
    /components
    App.js
```

## Let's do it

We are ready to start, first we need to identify the main blocks of the design. I have decided to split it into 4 main blocks as follows:

```
1- Sidebar
2- Main Block
    3- Header
    4- Content
```

As you can see in the image, blocks 3 and 4 are inside block 2.

![Screenshot1](https://i.postimg.cc/bNxzNq1S/screenshot1.png)

### Sidebar

We can split the Sidebar in 2 parts, `Logo` block, and `MenuItem` list.
We need 3 components for this:

```
1- SidebarComponent
    2- LogoComponent
    3- MenuItemComponent (list)
```

<img src="https://i.postimg.cc/qvppNWGb/screenshot2.png" height="500">

**We will start defining the Logo and Menu Items**

#### LogoComponent.js

First we need to download the Logo (double click on the logo, go to the `Design` tab and click on export button bellow). I downloaded it in `svg` format and imported it as a React Component, you can see it and copy it [clicking here](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-0-0/src/assets/icon-logo.js).

`LogoComponent.js` is a `Row` centered vertically and horizontally, with the `Logo` and the `title`.

```
<Row className={css(styles.container)} horizontal="center" vertical="center">
    <Logo />
    <span className={css(styles.title)}>Dashboard Kit</span>
</Row>
```

For styles, we need to import `Muli` font family, the easy way is include this line in [App.css](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-0-0/src/App.css) (we can remove the rest of the content, we don't need it):

```
@import url('https://fonts.googleapis.com/css?family=Muli');
```

These are the styles for `container` and `title`

```javascript
container: {
    marginLeft: 32,
    marginRight: 32
},
title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    color: '#A4A6B3',
    opacity: 0.7,
    marginLeft: 12 // <--- necessary to separate title and logo
}
```

[View full file: LogoComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-0-0/src/components/sidebar/LogoComponent.js)

#### MenuItemComponent.js

It represents an item of the menu, it's composed by an `icon`, a `title` and has different styles depending of its own state (`active`, `unactive`, `hover`). If it's active, has a white bar at the left.

```
<Row className={css(styles.container, active && styles.activeContainer)} vertical="center">
    {active && <div className={css(styles.activeBar)}></div>}
    <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
    <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
</Row>
```

As you can see, there are some special styles depending on `active` property, for example the `title` has a different color when `active` is `true`. For the icons, default fill is `#9FA2B4` and default opacity is `1`, these values change depending on the state of the above mentioned property.
A special element that appears when the item is `active`, is that white bar on the left (`activeBar`).

These are the styles:

```javascript
activeBar: {
    height: 56,
    width: 3,
    backgroundColor: '#DDE2FF',
    position: 'absolute',
    left: 0
},
activeContainer: {
    backgroundColor: 'rgba(221,226,255, 0.08)'
},
activeTitle: {
    color: '#DDE2FF'
},
container: {
    height: 56,
    cursor: 'pointer',
    ':hover': {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    paddingLeft: 32,
    paddingRight: 32
},
title: {
    fontFamily: 'Muli',
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: '#A4A6B3',
    marginLeft: 24
}
```

[View full file: MenuItemComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-0-0/src/components/sidebar/MenuItemComponent.js)

#### SidebarComponent.js

As we did with the Logo, we need to download the icons that we will use in this component, it's possible do it from the design or you can copy them from the folder `assets` of the repository [clicking here](https://github.com/llorentegerman/react-admin-dashboard/tree/v1-0-0/src/assets).

```
...
import IconOverview from '../../assets/icon-overview.js';
...
<Column className={css(styles.container)}>
    <LogoComponent />
    <Column className={css(styles.menuItemList)}>
        <MenuItemComponent title="Overview" icon={IconOverview} />
        <MenuItemComponent title="Tickets" icon={IconTickets} active />
        <MenuItemComponent title="Ideas" icon={IconIdeas} />
        <MenuItemComponent title="Contacts" icon={IconContacts} />
        <MenuItemComponent title="Agents" icon={IconAgents} />
        <MenuItemComponent title="Articles" icon={IconArticles} />
        <div className={css(styles.separator)}></div>
        <MenuItemComponent title="Settings" icon={IconSettings} />
        <MenuItemComponent title="Subscription" icon={IconSubscription} />
    </Column>
</Column>
```

Based on `css` extracted from the design, we can define the styles with these 3 classes:

```javascript
container: {
    backgroundColor: '#363740',
    width: 255,
    paddingTop: 32
},
menuItemList: {
    marginTop: 52
},
separator: {
    borderTop: '1px solid #DFE0EB',
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06
}
```

[View full file: SidebarComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-0-0/src/components/sidebar/SidebarComponent.js)

`SidebarComponent` is ready, in the repository I have added some `onClick` events and a `state` to do it interactive, so you can select the differents menu items.

### MainComponent (App.js)

Now we only need to work in `App.js`, as we said, has the following structure:

```
1- Sidebar
2- Main Block
    3- Header
    4- Content
```

It can be defined as follows:

```
<Row className={css(styles.container)}>
    <SidebarComponent />
    <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Title" />
        <div className={css(styles.content)}>
            <span>Content</span>
        </div>
    </Column>
</Row>
```

Styles:

```javascript
container: {
    height: '100vh' // menu has to take all the height of the screen
},
content: {
    marginTop: 54
},
mainBlock: {
    backgroundColor: '#F7F8FC',
    padding: 30
}
```

[View full file: App.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-0-0/src/App.js)

#### HeaderComponent.js

To finish, we will define the Header, with the following structure.

```
1- Row ({ vertical: center, horizontal: space-between })
    2- Title
    3- Row ({ vertical: center })
        4- Icons
        5- Separator
        6- Row ({ vertical: center })
            7- Name
            8- Avatar
```

![screenshot4](https://i.postimg.cc/zGkw4J1F/screenshot41.png)

```
<Row className={css(styles.container)} vertical="center" horizontal="space-between">
    <span className={css(styles.title)}>{title}</span>
    <Row vertical="center">
        <div className={css(styles.cursorPointer)}>
            <IconSearch />
        </div>
        <div style={{ marginLeft: 25 }} className={css(styles.cursorPointer)}>
            <IconBellNew />
        </div>
        <div className={css(styles.separator)}></div>
        <Row vertical="center">
            <span className={css(styles.name, styles.cursorPointer)}>Germán Llorente</span>
            <img src="https://avatars3.githubusercontent.com/u/21162888?s=460&v=4" alt="avatar" className={css(styles.avatar, styles.cursorPointer)} />
        </Row>
    </Row>
</Row>
```

Header styles:

```javascript
avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 14,
    border: '1px solid #DFE0EB',
},
container: {
    height: 40
},
cursorPointer: {
    cursor: 'pointer'
},
name: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'right',
    letterSpacing: 0.2
},
separator: {
    borderLeft: '1px solid #DFE0EB',
    marginLeft: 32,
    marginRight: 32,
    height: 32,
    width: 2
},
title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: '30px',
    letterSpacing: 0.3
}
```

[View full file: HeaderComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-0-0/src/components/header/HeaderComponent.js)

## Responsive design

At the moment, our UI is not responsive, and we want it to look like this:
![](http://g.recordit.co/QzcP9sRsKH.gif)

As we don't have a responsive design to follow, we will keep it simple, only one breakpoint at **768px**. So any screen less than `768px` will be considered `mobile`.
The `Sidebar` will be isolated, on this component will be included: `Burger button`, `Desktop Sidebar` and `Mobile Sidebar`.
`SidebarComponent` for `Desktop` is already explained. In this article we will see how to convert it in a responsive sidebar.
In mobile screen (width <= 768px) `SidebarComponent` could have 2 different states: `collapsed` (default) or `expanded`.

### Collapsed:

In this state the whole sidebar will be hidden, then the `mainBlock` ([see App.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-1-0/src/App.js)) will fill the whole width of the screen.
We need a button to `expand` the `Sidebar` and we will use a `BurgerIcon` for that (to copy the burger icon [click here](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-1-0/src/assets/icon-burger.js)). That button will be in a absolute position, over the `header`:
![](https://i.postimg.cc/9Xg1mzv2/screenshotmobile1.png)

### Expanded

In this state we will show the `Sidebar` and an `outsideLayer` that will fill the rest of the screen with a semitransparent background, and if you click it the `Sidebar` will be closed:
![](https://i.postimg.cc/sgQfVfDN/screenshotmobile3.png)

#### HeaderComponent.js

Since the `Burger button` will be over the `header` we need to add some `left-margin` to the `Header Title` to avoid this situation:
![](https://i.postimg.cc/D0NcBYq0/screenshotmobile2.png)

These are the most important parts of the new styles of `HeaderComponent.js`, as you can see I have included media queries to apply some special styles for mobile screens:

```
name: {
    ...,
    '@media (max-width: 768px)': {
        display: 'none' // <--- don't show the name on mobile
    }
},
separator: {
    ...,
    '@media (max-width: 768px)': {
        marginLeft: 12, // <--- less separation on mobile
        marginRight: 12
    }
},
title: {
    ...,
    '@media (max-width: 768px)': {
        marginLeft: 36 <--- to avoid overlapping with Burger button
    },
    '@media (max-width: 468px)': {
        fontSize: 20 <--- new fontSize for small devices.
    }
}
```

I have also added a new style for the icons wrappers.

[View the changes: HeaderComponent.js](https://github.com/llorentegerman/react-admin-dashboard/compare/v1-0-0...v1-1-0#diff-9e795f3f52ccd33b20abf31c022ec55f)

[View full file: HeaderComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-1-0/src/components/header/HeaderComponent.js)

#### SidebarComponent.js

This component contains all the logic and it will change depending on these two variables:

-   `expanded`: stored in the `state`
-   `isMobile`: `true` when `window.innerWidth <= 768`

When the `Sidebar` is expanded, there are two differents ways to collapse it, clicking in some `MenuItem` or clicking on the `outsideLayer`. To manage this behaviour there are 2 methods:

```
onItemClicked = (item) => {
    this.setState({ expanded: false });
    return this.props.onChange(item);
}

toggleMenu = () => this.setState(prevState => ({ expanded: !prevState.expanded }));
```

`toggleMenu` will be fired when you click on the `Burger button` (if sidebar is collapsed) or when you click on the `outsideLayer` (if sidebar is expanded).

Here is the new version of `SidebarComponent`:

```
<div style={{ position: 'relative'}}>
    <Row className={css(styles.mainContainer)} breakpoints={{ 768: css(styles.mainContainerMobile) }}>
        {(isMobile && !expanded) && this.renderBurger()}
        <Column className={css(styles.container)}
            breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
            <LogoComponent />
            <Column className={css(styles.menuItemList)}>
                ...
                <MenuItemComponent
                    title="Tickets" icon={IconTickets}
                    onClick={() => this.onItemClicked('Tickets')}
                    active={this.props.selectedItem === 'Tickets'}
                />
                ...
            </Column>
        </Column>
        {isMobile && expanded && <div className={css(styles.outsideLayer)} onClick={this.toggleMenu}></div>}
    </Row>
</div>
```

and here is the `renderBurger` method:

```
renderBurger = () => {
    return <div onClick={this.toggleMenu} className={css(styles.burgerIcon)}>
        <IconBurger />
    </div>
}
```

We are wrapping the component inside a `div` with `position: relative`, and that is to allow to the `Sidebar` fill all the screen, otherwise it will looks like this:

![](http://g.recordit.co/cxsvbwxmEE.gif)

As you can see, we are using the `breakpoints` property of [simple-flexbox](https://www.npmjs.com/package/simple-flexbox), for example:

```

```

<Row
className={css(styles.mainContainer)}
breakpoints={{ 768: css(styles.mainContainerMobile) }} >

```

```

it means that if `window.innerWidth <= 768` `mainContainerMobile` styles will be applied.

Reading the follow part of the code, you will se that if we are on `mobile` screen, and `expanded = false`, just the `Burger button` will be rendered, and if `expanded = true` the `Sidebar` and `outsideLayer` will be shown.

```
{(isMobile && !expanded) && this.renderBurger()}
<Column className={css(styles.container)}
    breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
    ...
</Column>
{isMobile && expanded && <div className={css(styles.outsideLayer)} onClick={this.toggleMenu}></div>}
```

These are the new styles applied to `SidebarComponent.js`, check that on `mobile` the position of the `container` will be `absolute` to `overlay` the `mainBlock` and fill the whole screen. When `expanded = false` it will be shifted to the left, out of the screen (`left: -255px`), and when `expanded = true` it will be shown, shifted to the original position (`left: 0px`). You can also see the `transition` property to make a smooth display of the element. `outsideLayer` will fill the entire screen but will be placed behind the `Sidebar` (see `zIndex`):

```
burgerIcon: {
    cursor: 'pointer',
    position: 'absolute',
    left: 24,
    top: 34
},
container: {
    backgroundColor: '#363740',
    width: 255,
    paddingTop: 32,
    height: 'calc(100% - 32px)'
},
containerMobile: {
    transition: 'left 0.5s, right 0.5s',
    position: 'absolute',
    width: 255,
    height: 'calc(100% - 32px)',
    zIndex: 901
},
mainContainer: {
    height: '100%',
    minHeight: '100vh'
},
mainContainerMobile: {
    position: 'absolute',
    width: '100vw',
    minWidth: '100%',
    top: 0,
    left: 0
},
outsideLayer: {
    position: 'absolute',
    width: '100vw',
    minWidth: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.50)',
    zIndex: 900
},
hide: {
    left: -255
},
show: {
    left: 0
}
```

[View the changes: SidebarComponent.js](https://github.com/llorentegerman/react-admin-dashboard/compare/v1-0-0...v1-1-0#diff-c83e6c47084049d5b258f003efdd1b8e)

[View full file: SidebarComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-1-0/src/components/sidebar/SidebarComponent.js)

#### App.js

I have changed the `container` styles so that it fills all the full height of the screen:

```
container: {
    height: '100%',
    minHeight: '100vh'
}
```

and I've included an event to re-render the full application at each `resize`:

```
componentDidMount() {
    window.addEventListener('resize', this.resize);
}

componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
}

resize = () => this.forceUpdate();
```

[View the changes: App.js](https://github.com/llorentegerman/react-admin-dashboard/compare/v1-0-0...v1-1-0#diff-14b1e33d5bf5649597cdc0e4f684dadd)

[View full file: App.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-1-0/src/App.js)

## Responsive Content

Now we will see how to make the content that appears in the design.
We want to make it responsive, and we want it to look like this:
![](http://g.recordit.co/cWkPDhuw0P.gif)

As I said before, we don't have a responsive design to follow, so we will keep it simple, a main breakpoint at **768px**.
We can identify 3 main sections in the content:

```
1- Row of MiniCards
2- Today's trends (graph + stats)
3- Row with 2 cards:
    4- Unresolved tickets
    5- Tasks
```

![](https://i.postimg.cc/9fTPpZLv/content1.png)

#### MiniCardComponent.js

This is a simple Component, just a Column with a `title` and `value`. The content of the column has to be centered.

```
function MiniCardComponent({ className = '', title, value }) {
    const composedClassName = `${css(styles.container)} ${className}`; // we could receive some styles from props
    return (
        <Column flexGrow={1} className={composedClassName} horizontal="center" vertical="center">
            <span className={css(styles.title)}>{title}</span>
            <span className={css(styles.value)}>{value}</span>
        </Column>
    );
}
```

styles:

```javascript
container: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #DFE0EB',
    borderRadius: 4,
    cursor: 'pointer',
    height: 70,
    maxWidth: 350,
    marginRight: 30,
    padding: '24px 32px 24px 32px',
    ':hover': {
        borderColor: '#3751FF',
        ':nth-child(n) > span': {
            color: '#3751FF'
        }
    }
},
title: {
    color: '#9FA2B4',
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    marginBottom: 12,
    minWidth: 102,
    textAlign: 'center'
},
value: {
    color: '#252733',
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    letterSpacing: '1px',
    lineHeight: '50px',
    textAlign: 'center'
}
```

Pay attention to the `container` styles, on `:hover` we want to change the `borderColor` and `fontColor` of `title` and `value`, but, by default `aphrodite` sets the styles as `!important` so, we cannot change the styles of the children (`title`, `value`) from their parent (`container`). To be able to do that we have to import `aphrodite` in a differnet way than we normally do.

```
import { StyleSheet, css } from 'aphrodite/no-important';
```

Now we can overwrite the styles of the `children` from their `parents`.

[View full file: MiniCardComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/content/MiniCardComponent.js)

#### TodayTrendsComponent.js

This component is a `Row` with the following structure:

```
1- Column
    3- Row ({ horizontal: space-between })
        5- Column with title and subtitle
        6- legend
    4- Chart
2- Column: list of stats
```

![](https://i.postimg.cc/qqFndxQB/todaystrends.png)

It can be defined as follows:

```
<Row flexGrow={1} className={css(styles.container)}
    horizontal="center" breakpoints={{ 1024: 'column' }}>
    <Column wrap flexGrow={7} flexBasis="735px" className={css(styles.graphSection)}
        breakpoints={{ 1024: { width: 'calc(100% - 48px)', flexBasis: 'auto' } }}>
        <Row wrap horizontal="space-between">
            <Column>
                <span className={css(styles.graphTitle)}>Today’s trends</span>
                <span className={css(styles.graphSubtitle)}>as of 25 May 2019, 09:41 PM</span>
            </Column>
            {this.renderLegend('#3751FF', 'Today')}
        </Row>
        <div className={css(styles.graphContainer)}>
            <LineChart
                data={data}
                viewBoxWidth={500}
                pointsStrokeColor="#3751FF"
                areaColor="#3751FF"
                areaVisible={true}
            />
        </div>
    </Column>
    <Column className={css(styles.separator)} breakpoints={{ 1024: { display: 'none' } }}><div /></Column>
    <Column flexGrow={3} flexBasis="342px" breakpoints={{ 1024: css(styles.stats) }}>
        {this.renderStat('Resolved', '449')}
        {this.renderStat('Received', '426')}
        {this.renderStat('Average first response time', '33m')}
        {this.renderStat('Average response time', '3h 8m')}
        {this.renderStat('Resolution within SLA', '94%')}
    </Column>
</Row>
```

where `renderLegend` and `renderStat` are defined as follows:

```
renderLegend(color, title) {
    return (<Row vertical="center">
        <div style={{ width: 16, border: '2px solid', borderColor: color }}></div>
        <span className={css(styles.legendTitle)}>{title}</span>
    </Row>);
}

renderStat(title, value) {
    return (<Column flexGrow={1} className={css(styles.statContainer)} vertical="center" horizontal="center">
        <span className={css(styles.statTitle)}>{title}</span>
        <span className={css(styles.statValue)}>{value}</span>
    </Column>);
}
```

for the `chart` I have used `react-svg-line-chart`, to install it, just type:

```javascript
yarn add react-svg-line-chart
```

and these are the styles:

```javascript
container: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #DFE0EB',
    borderRadius: 4,
    cursor: 'pointer'
},
graphContainer: {
    marginTop: 24,
    marginLeft: 0,
    marginRight: 0,
    width: '100%'
},
graphSection: {
    padding: 24
},
graphSubtitle: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.1px',
    color: '#9FA2B4',
    marginTop: 4,
    marginRight: 8
},
graphTitle: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    color: '#252733'
},
legendTitle: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: '15px',
    letterSpacing: '0.1px',
    color: '#9FA2B4',
    marginLeft: 8
},
separator: {
    backgroundColor: '#DFE0EB',
    width: 1,
    minWidth: 1,
},
statContainer: {
    borderBottom: '1px solid #DFE0EB',
    padding: '24px 32px 24px 32px',
    height: 'calc(114px - 48px)',
    ':last-child': {
        border: 'none'
    }
},
stats: {
    borderTop: '1px solid #DFE0EB',
    width: '100%'
},
statTitle: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: '22px',
    letterSpacing: '0.3px',
    textAlign: 'center',
    color: '#9FA2B4',
    whiteSpace: 'nowrap',
    marginBottom: 6
},
statValue: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: '30px',
    letterSpacing: '0.3px',
    textAlign: 'center',
    color: '#252733'
}
```

Notice that `container` will become a `column` when `window.innerWidth <= 1024`, so the `stats` column will be stacked under the `graph`. At same size the `separator` will disappear, and `graph` and `stats` will fill the whole width.
Pay attention to `statContainer` style, where we are setting borders for every `child` except for the last.

[View full file: TodayTrendsComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/content/TodayTrendsComponent.js)

#### CardComponent.js

As I said before, the 3rd section of the `content` page is a `Row` with 2 component. These components have many similar characteristics, so we can abstract the design like this:

```
1- Container (column)
    2- Row:
        3- Column: title and subtitle (received by props)
        4- Link (view details or view all)
    5- List of items (received by props)
```

Code:

```
<Column flexGrow={1} className={css(styles.container, containerStyles)} breakpoints={{ 426: css(styles.containerMobile) }}>
    <Row horizontal="space-between">
        <Column>
            <span className={css(styles.title)}>{title}</span>
            <Row style={{ marginTop: 8, marginBottom: 16 }}>
                <span className={css(styles.subtitle)}>{subtitle}</span>
                {subtitleTwo && <span className={css(styles.subtitle, styles.subtitle2)}>{subtitleTwo}</span>}
            </Row>
        </Column>
        <span className={css(styles.link)}>{link}</span>
    </Row>
    {items.map(this.renderItem)}
</Column>
```

`renderItem`:

```
renderItem(item, index) {
    return (<Column flexGrow={1} className={css(styles.itemContainer)} key={`item-${index}`}
        breakpoints={{ 426: css(styles.itemContainerMobile) }}>
        {item}
    </Column>);
}
```

styles:

```javascript
container: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #DFE0EB',
    borderRadius: 4,
    padding: '24px 32px 12px 32px'
},
containerMobile: {
    padding: '12px 16px 6px 16px !important'
},
itemContainer: {
    marginLeft: -32,
    marginRight: -32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 18,
    paddingTop: 18,
    maxHeight: 22,
    borderBottom: '1px solid #DFE0EB',
    ':last-child': {
        borderBottom: 'none'
    }
},
itemContainerMobile: {
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: 16,
    paddingRight: 16
},
link: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: '#3751FF',
    textAlign: 'right',
    cursor: 'pointer'
},
subtitle: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.1px',
    color: '#9FA2B4'
},
subtitle2: {
    color: '#252733',
    marginLeft: 2
},
title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    color: '#252733'
}
```

See in `itemContainer` that all items will have `border` except the last one.

[View full file: CardComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/content/CardComponent.js)

#### UnresolvedTicketsComponent.js

This component will be done based on `CardComponent`, it will look like this:

```
<CardComponent containerStyles={this.props.containerStyles} title="Unresolved tickets"
    link="View details" subtitle="Group:" subtitleTwo="Support"
    items={[
        this.renderStat('Waiting on Feature Request', 4238),
        this.renderStat('Awaiting Customer Response', 1005),
        this.renderStat('Awaiting Developer Fix', 914),
        this.renderStat('Pending', 281)
    ]}
/>
```

where `renderStat` is:

```
renderStat(title, value) {
    return (<Row flexGrow={1} horizontal="space-between" vertical="center">
        <span className={css(styles.itemTitle)}>{title}</span>
        <span className={css(styles.itemTitle, styles.itemValue)}>{value}</span>
    </Row>);
}
```

We need styles only for the `title` and `value`, all the others are set in `CardComponent`:

```javascript
itemTitle: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: '#252733'
},
itemValue: {
    color: '#9FA2B4'
}
```

[View full file: UnresolvedTicketsComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/content/UnresolvedTicketsComponent.js)

#### TasksComponent.js

As `UnresolvedTicketsComponent`, this component will be done based on `CardComponent`, it will look like this:

```
<CardComponent containerStyles={this.props.containerStyles} title="Tasks" link="View all" subtitle="Today"
    items={[
        <Row horizontal="space-between" vertical="center">
            <span className={css(styles.itemTitle, styles.greyTitle)}>Create new task</span>
            {this.renderAddButton()}
        </Row>,
        ...this.state.items.map(this.renderTask)
    ]}
/>
```

As you can see, the first item looks different from the others, it has a `gray title` and the `add button`. The rest of the items are stored in the state:

```javascript
state = {
    items: [
        { title: 'Finish ticket update', checked: false, tag: TAGS.URGENT },
        { title: 'Create new ticket example', checked: false, tag: TAGS.NEW },
        { title: 'Update ticket report', checked: true, tag: TAGS.DEFAULT }
    ]
};
```

These are the possible TAGS:

```javascript
const TAGS = {
    URGENT: { text: 'URGENT', backgroundColor: '#FEC400', color: '#FFFFFF' },
    NEW: { text: 'NEW', backgroundColor: '#29CC97', color: '#FFFFFF' },
    DEFAULT: { text: 'DEFAULT', backgroundColor: '#F0F1F7', color: '#9FA2B4' }
};
```

and this is the `renderTask` function that will use other 2 functions: `renderTag` and `renderCheckbox`:

```
renderTask = ({title, tag = {} }, index) => (
    <Row horizontal="space-between" vertical="center">
        <Row>
            {this.renderCheckbox(index)}
            <span className={css(styles.itemTitle)}>{title}</span>
        </Row>
        {this.renderTag(tag, index)}
    </Row>
);

renderTag = ({ text, backgroundColor, color }, index) => (
    <Row horizontal="center" vertical="center" style={{ backgroundColor, color }}
        className={css(styles.tagStyles)}>
        {text}
    </Row>
);

renderCheckbox = (index) => <div className={css(styles.checkboxWrapper)}>
    {this.state.items[index].checked ? <CheckboxOn /> : <CheckboxOff />}
</div>;
```

For the `checkbox` we are using two new icons that you can copy from here: [checkbox-on](https://github.com/llorentegerman/react-admin-dashboard/tree/v1-2-0/src/assets/checkbox-on.js) and [checkbox-off](https://github.com/llorentegerman/react-admin-dashboard/tree/v1-2-0/src/assets/checkbox-off.js),

These are the styles:

```javascript
addButton: {
    backgroundColor: '#F0F1F7',
    color: '#9FA2B4',
    fontSize: 20,
    padding: 7
},
itemTitle: {
    color: '#252733',
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: '0.2px',
    lineHeight: '20px'
},
itemValue: {
    color: '#9FA2B4'
},
greyTitle: {
    color: '#C5C7CD'
},
tagStyles: {
    borderRadius: 5,
    cursor: 'pointer',
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: '0.5px',
    lineHeight: '14px',
    padding: '5px 12px 5px 12px'
},
checkboxWrapper: {
    cursor: 'pointer',
    marginRight: 16
}
```

You can see in the repository code that I added some events to do this component interactive.

[View full file: TasksComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/content/TasksComponent.js)

#### ContentComponent.js

Now we have to combine these components into one. As I said before is a `Column` with 3 sections:

```
1- Row of MiniCardComponent
2- TodayTrendsComponent
3- Row with 2 components:
    4- UnresolvedTicketsComponent
    5- TasksComponent
```

The first section is probably the most complex, because we have to combine some styles. We have 4 `cards`, and we always want the same number of cards in each row regardless of the width of the screen. That is:

-   4 cards in a row, or
-   2 cards in each row, in two different rows, or
-   1 card in each row, in four different rows
    ![](http://g.recordit.co/5zjnfmBsgN.gif)

but we don't want something like this:
![](http://g.recordit.co/Lf6xgHPzEO.gif)

I think it's a good idea if we group them into pairs in this way:

```
<Row className={css(styles.cardsContainer)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 768: 'column' }}>
    <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
        <MiniCardComponent className={css(styles.miniCardContainer)} title="Unresolved" value="60" />
        <MiniCardComponent className={css(styles.miniCardContainer)} title="Overdue" value="16" />
    </Row>
    <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
        <MiniCardComponent className={css(styles.miniCardContainer)} title="Open" value="43" />
        <MiniCardComponent className={css(styles.miniCardContainer)} title="On hold" value="64" />
    </Row>
</Row>
```

so, when the main `row` is wider than the container, it will be divided into two new `rows`, and so on.

For `TodayTrendsComponent` is easy, we just need to wrap it in a `div` to apply some margins.

```
<div className={css(styles.todayTrends)}>
    <TodayTrendsComponent />
</div>
```

and the last section is a `row` with `UnresolvedTicketsComponent` and `TasksComponent` that will become a `column` when `window.innerWidth <= 1024`,

```
<Row horizontal="space-between" className={css(styles.lastRow)} breakpoints={{ 1024: 'column' }}>
    <UnresolvedTicketsComponent containerStyles={styles.unresolvedTickets} />
    <TasksComponent containerStyles={styles.tasks} />
</Row>
```

here is the full code:

```
<Column>
    <Row className={css(styles.cardsContainer)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 768: 'column' }}>
        <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
            <MiniCardComponent className={css(styles.miniCardContainer)} title="Unresolved" value="60" />
            <MiniCardComponent className={css(styles.miniCardContainer)} title="Overdue" value="16" />
        </Row>
        <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
            <MiniCardComponent className={css(styles.miniCardContainer)} title="Open" value="43" />
            <MiniCardComponent className={css(styles.miniCardContainer)} title="On hold" value="64" />
        </Row>
    </Row>
    <div className={css(styles.todayTrends)}>
        <TodayTrendsComponent />
    </div>
    <Row horizontal="space-between" className={css(styles.lastRow)} breakpoints={{ 1024: 'column' }}>
        <UnresolvedTicketsComponent containerStyles={styles.unresolvedTickets} />
        <TasksComponent containerStyles={styles.tasks} />
    </Row>
</Column>
```

styles:

```javascript
cardsContainer: {
    marginRight: -30,
    marginTop: -30
},
cardRow: {
    marginTop: 30,
    '@media (max-width: 768px)': {
        marginTop: 0
    }
},
miniCardContainer: {
    flexGrow: 1,
    marginRight: 30,
    '@media (max-width: 768px)': {
        marginTop: 30,
        maxWidth: 'none'
    }
},
todayTrends: {
    marginTop: 30
},
lastRow: {
    marginTop: 30
},
unresolvedTickets: {
    marginRight: 30,
    '@media (max-width: 1024px)': {
        marginRight: 0
    }
},
tasks: {
    marginTop: 0,
    '@media (max-width: 1024px)': {
        marginTop: 30,
    }
}
```

pay attention to the negative margins of `cardsContainer` as they will absorb the excess margins of the elements that are located on the edges, to avoid this kind of things:
![](https://i.postimg.cc/VNmVvp3V/content2.png)

[View full file: ContentComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/content/ContentComponent.js)

#### MainComponent (App.js)

To finish we have to include the `ContentComponent` in our `MainComponent`

```
<Row className={css(styles.container)}>
    <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
    <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title={selectedItem} />
        <div className={css(styles.content)}>
            <ContentComponent />
        </div>
    </Column>
</Row>
```

[View the changes: App.js](https://github.com/llorentegerman/react-admin-dashboard/compare/v1-1-0...v1-2-0#diff-14b1e33d5bf5649597cdc0e4f684dadd)

[View full file: App.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/content/App.js)

#### SidebarComponent,js (important fix)

We have to include a change to our `Sidebar`, because at the moment, a transparent layer is filling all the screen on mobile so we cannot click any element.
We are applying these styles to the `mainContainerMobile`:

```javascript
 mainContainerMobile: {
    ...
    width: '100%',
    minWidth: '100vh',
}
```

but we want those styles only when the `Sidebar` is `expanded`, so we will apply these changes to our component:

```
<div style={{ position: 'relative' }}>
    <Row className={css(styles.mainContainer)}
        breakpoints={{ 768: css(styles.mainContainerMobile, expanded && styles.mainContainerExpanded) }}>
        ...
    </Row>
</div>
```

styles:

```javascript
...
mainContainerMobile: {
    position: 'absolute',
    top: 0,
    left: 0
},
mainContainerExpanded: {
    width: '100%',
    minWidth: '100vh',
}
...
```

[View the changes: SidebarComponent.js](https://github.com/llorentegerman/react-admin-dashboard/compare/v1-1-0...v1-2-0#diff-c83e6c47084049d5b258f003efdd1b8e)

[View full file: SidebarComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/v1-2-0/src/components/sidebar/SidebarComponent.js)

## License

This software is released under the [MIT License](https://github.com/llorentegerman/react-admin-dashboard/blob/master/LICENSE).

## Author

![me](https://avatars3.githubusercontent.com/u/21162888?s=100&v=4)

[Germán Llorente](https://github.com/llorentegerman)
