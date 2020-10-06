import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import SidebarComponent from './components/sidebar/SidebarComponent';
import HeaderComponent from './components/header/HeaderComponent';
import ContentComponent from './components/content/ContentComponent';
import './App.css';

const useStyles = createUseStyles({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 30,
        marginLeft: 255,
        '@media (max-width: 1080px)': {
            marginLeft: 0,
            padding: 10
        }
    }
});

function App() {
    const classes = useStyles();

    return (
        <Row className={classes.container}>
            <SidebarComponent />
            <Column flexGrow={1} className={classes.mainBlock}>
                <HeaderComponent title={''} />
                <div className={classes.content}>
                    <ContentComponent />
                </div>
            </Column>
        </Row>
    );
}

export default App;
