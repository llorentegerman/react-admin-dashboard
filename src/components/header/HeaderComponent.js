import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import { IconBell, IconSearch } from 'assets/icons';

const useStyles = createUseStyles({
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: '1px solid #DFE0EB'
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
        letterSpacing: 0.2,
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 12,
            marginRight: 12
        }
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3,
        '@media (max-width: 1080px)': {
            marginLeft: 50
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
});

function HeaderComponent(props) {
    const { icon, title, ...otherProps } = props;
    const classes = useStyles();
    return (
        <Row
            className={classes.container}
            vertical='center'
            horizontal='space-between'
            {...otherProps}
        >
            <span className={classes.title}>{title}</span>
            <Row vertical='center'>
                <div className={classes.iconStyles}>
                    <IconSearch />
                </div>
                <div className={classes.iconStyles}>
                    <IconBell />
                </div>
                <div className={classes.separator}></div>
                <Row vertical='center'>
                    <span className={[classes.name, classes.cursorPointer].join(' ')}>
                        Germán Llorente
                    </span>
                    <img
                        src='https://avatars3.githubusercontent.com/u/21162888?s=460&v=4'
                        alt='avatar'
                        className={[classes.avatar, classes.cursorPointer].join(' ')}
                    />
                </Row>
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
