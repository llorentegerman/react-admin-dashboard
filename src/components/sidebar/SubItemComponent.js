import React from 'react';
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    activeContainer: {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    activeBar: {
        borderLeft: '3px solid #DDE2FF'
    },
    activeTitle: {
        color: '#DDE2FF'
    },
    containerSubItem: {
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        paddingLeft: 64,
        transition: 'background-color 0.425s ease-in-out'
    },
    inactiveBar: {
        borderLeft: '3px solid #8b8d94'
    },
    title: {
        fontFamily: 'Muli',
        fontSize: 16,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#A4A6B3',
        marginLeft: 24
    }
});

function SubItemComponent(props, index) {
    const { active, icon, onClick, title } = props;
    return (
        <Row
            key={`subitem-${index}`}
            className={css(
                styles.containerSubItem,
                active && styles.activeContainer,
                active ? styles.activeBar : styles.inactiveBar
            )}
            vertical="center"
            onClick={onClick}
            style={{ height: 56 }}
        >
            {icon}
            <span className={css(styles.title, styles.activeTitle)}>
                {title}
            </span>
        </Row>
    );
}

SubItemComponent.propTypes = {
    active: bool,
    icon: func,
    onClick: func,
    title: string
};

export default SubItemComponent;
