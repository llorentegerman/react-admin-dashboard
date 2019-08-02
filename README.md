# Building a UI from scratch, based on a design with ReactJS

In this article we will build a UI following a design. We will use `Figma` to visualize the design, but is also possible to use any other tool that allows you to extract the CSS code from the elements, such as `invisionapp`, `zeplin`, etc.

*Read this in [Spanish](README.es.md)*

**Live demo**: [https://llorentegerman.github.io/react-admin-dashboard/](https://llorentegerman.github.io/react-admin-dashboard/)

**Repository**: [https://github.com/llorentegerman/react-admin-dashboard](https://github.com/llorentegerman/react-admin-dashboard)

### Uploading a design to Figma
I will not enter in details about the tool, we only need a design.
1. Create an account in [https://www.figma.com](https://www.figma.com) (free).
2. I have selected a random *Figma file* from [https://www.figmafreebies.com](https://www.figmafreebies.com) (free). The selected file is: [Figma Admin Dashboard UI Kit](https://www.figmafreebies.com/download/figma-admin-dashboard-ui-kit/).
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
- `expanded`: stored in the `state`
- `isMobile`: `true` when `window.innerWidth <= 768`

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

License
-------
This software is released under the [MIT License](https://github.com/llorentegerman/react-admin-dashboard/blob/master/LICENSE).

Author
-------
![me](https://avatars3.githubusercontent.com/u/21162888?s=100&v=4)

[Germán Llorente](https://github.com/llorentegerman)