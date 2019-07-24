# Construyendo una UI desde cero, en base a un diseño con ReactJS

En este articulo construiremos una UI siguiendo un diseño. Como herramienta para visualizar el diseño utilizaremos `Figma`, pero se puede utilizar cualquier otra herramienta que te permita extraer el codigo CSS de los elementos, como por ejemplo `invisionapp`, `zeplin`, etc.

*Leer en [Inglés](README.md)*

**Live demo**: [https://llorentegerman.github.io/react-admin-dashboard/](https://llorentegerman.github.io/react-admin-dashboard/)

**Repositorio**: [https://github.com/llorentegerman/react-admin-dashboard](https://github.com/llorentegerman/react-admin-dashboard)

### Cargando un diseño en Figma
No entrare en detalles sobre esta herramienta, solo necesitamos un diseño.
1. Crear una cuenta en [https://www.figma.com](https://www.figma.com) (es gratis).
2. He seleccionado al azar un *Figma file* desde [https://www.figmafreebies.com](https://www.figmafreebies.com) (es gratis). El archivo seleccionado es: [Figma Admin Dashboard UI Kit](https://www.figmafreebies.com/download/figma-admin-dashboard-ui-kit/).
Estoy usando la version web, solo es necesario hacer click en el boton `DOWNLOAD FREEBIES` y el diseño se adjuntara a tu cuenta automaticamente.
3. Puedes hacer doble click sobre los diferentes elementos y ver el codigo css de cada uno en la pestaña `code` que esta en la columna de la derecha.

![screenshot3](https://i.postimg.cc/76vy3ckT/screenshot3.png)

### Creando la app
Para este paso utilizaremos [Create React App](https://facebook.github.io/create-react-app/):
```
npx create-react-app react-admin-dashboard
```

Utilizaremos [aphrodite](https://www.npmjs.com/package/aphrodite) para los estilos y [simple-flexbox](https://www.npmjs.com/package/simple-flexbox) para hacer el layout.

`yarn add aphrodite simple-flexbox` o `npm install aphrodite simple-flexbox`

### Estructura de carpetas
Para este caso mantendremos una estructura simple:
```
/src
    /assets
    /components
    App.js
```

## Manos a la obra
Ya tenemos todo listo para comenzar, lo primero que debemos hacer es identificar los bloques principales del diseño. Yo he decidido separarlo en 4 bloques principales de la siguiente manera:
```
1- Sidebar
2- Main Block
    3- Header
    4- Content
```

Como pueden ver en la imagen, los bloques 3 y 4 estan dentro del 2.

![Screenshot1](https://i.postimg.cc/bNxzNq1S/screenshot1.png)

### Sidebar
Podemos separar el Sidebar en 2 partes, el bloque del `Logo` y el bloque de la lista de `MenuItem`.
Para esto necesitaremos 3 componentes:
```
1- SidebarComponent
    2- LogoComponent
    3- MenuItemComponent (lista)
```

<img src="https://i.postimg.cc/qvppNWGb/screenshot2.png" height="500">

**Comenzaremos por definir el Logo y los Items del Menu**

#### LogoComponent.js
Primero necesitamos descargar el Logo (doble click sobre el logo, ir a la pestaña `Design` y hacer click en el boton exportar que esta abajo del todo). Yo lo he descargado en formato `svg` y lo he importado como un componente de React, puedes verlo y copiarlo haciendo [click aqui](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/assets/icon-logo.js).

`LogoComponent.js` es una `Row` centrada vertical y horizontalmente, con el `Logo` y el `title`.

```
<Row className={css(styles.container)} horizontal="center" vertical="center">
    <Logo />
    <span className={css(styles.title)}>Dashboard Kit</span>
</Row>
```

Para los estilos, primero necesitamos importar la `font family` `Muli`, la manera facil de hacerlo es incluir esta linea en el archivo [App.css](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/App.css) (y podemos borrar todo el resto del archivo ya que no lo vamos a usar):

```
@import url('https://fonts.googleapis.com/css?family=Muli');
```

Estos son los estilos que utilizaremos para el container y el titulo.

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
    marginLeft: 12 // <--- necesario para separar el titulo y el logo.
}
```

[Ver archivo completo: LogoComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/components/sidebar/LogoComponent.js)

#### MenuItemComponent.js
Este componente representa un item del menu, esta compuesto por un `icon`, un `title` y tiene diferentes estilos dependiendo de su estado (`activo`, `inactivo`, `hover`).

```
<Row className={css(styles.container, active && styles.activeContainer)} vertical="center">
    {active && <div className={css(styles.activeBar)}></div>}
    <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
    <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
</Row>
```

Como puedes ver, hay algunos estilos especiales dependiendo de la propiedad `active`, por ejemplo el `title` tiene un color diferente cuando `active` es `true`. Para los iconos, `fill` por defecto es `#9FA2B4` y la opacity por defecto es `1`, estos valores cambian dependiendo el estado de la propiedad antes mencionada.
Un elemento especial que aparece cuando el item esta activo, es esa barra blanca a la izquierda (`activeBar`).

Estos son los estilos:
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
[Ver archivo completo: MenuItemComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/components/sidebar/MenuItemComponent.js)

#### SidebarComponent.js
Al igual que hicimos con el Logo, necesitamos descargar los iconos que utilizaremos en este componente, es posible hacerlo desde el diseño o puedes copiarlos desde la carepta `assets` del repositorio haciendo [click aqui](https://github.com/llorentegerman/react-admin-dashboard/tree/master/src/assets).
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

Basandonos en css extraido del diseño, podemos definir los estilos con estas 3 clases:
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
[Ver archivo completo: SidebarComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/components/sidebar/SidebarComponent.js)


Ya tenemos listo el `SidebarComponent`, en el repositorio he agregado unos eventos `onClick` y un `state` para hacerlo interactivo y poder ir seleccionado los diferentes items.

### MainComponent (App.js)
Ahora solo hace falta trabajar en nuestro `App.js`, que como habiamos dicho antes tiene la siguiente estructura:
```
1- Sidebar
2- Main Block
    3- Header
    4- Content
```

Y podemos definirlo de la siguiente manera:
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

Aqui los estilos:

```javascript
container: {
    height: '100vh' // para que el menu ocupe todo el alto de la pantalla
},
content: {
    marginTop: 54
},
mainBlock: {
    backgroundColor: '#F7F8FC',
    padding: 30
}
```
[Ver archivo completo: App.js](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/App.js)

#### HeaderComponent.js
Por ultimo, definiremos el Header, con la siguiente estructura.
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

y estos estilos:

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
[Ver archivo completo: HeaderComponent.js](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/components/header/HeaderComponent.js)

License
-------
This software is released under the [MIT License](https://github.com/llorentegerman/react-admin-dashboard/blob/master/LICENSE).

Author
-------
![me](https://avatars3.githubusercontent.com/u/21162888?s=100&v=4)

[Germán Llorente](https://github.com/llorentegerman)