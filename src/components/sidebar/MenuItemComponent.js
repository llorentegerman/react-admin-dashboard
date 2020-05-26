import React from 'react';
import { arrayOf, bool, func, object, string } from 'prop-types';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import CollapsibleComponent from 'react-collapsible-content';
import SubItemComponent from './SubItemComponent';

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
    container: {
        display: 'flex',
        height: 56,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        paddingLeft: 32,
        paddingRight: 32,
        transition: 'background-color 0.425s ease-in-out'
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

function MenuItemComponent(props) {
    const { active, expanded, icon, subItems = [], title, onClick } = props;
    const Icon = icon;

    return (
        <Column>
            <Row
                vertical="center"
                onClick={onClick}
                className={`${css(
                    styles.container,
                    active && styles.activeContainer,
                    active && styles.activeBar
                )}`}
            >
                <Icon
                    fill={active ? '#DDE2FF' : '#9FA2B4'}
                    opacity={!active && '0.4'}
                />
                <span
                    className={css(styles.title, active && styles.activeTitle)}
                >
                    {title}
                </span>
            </Row>
            {subItems && subItems.length ? (
                <CollapsibleComponent title={title} expanded={expanded}>
                    {subItems.map((s, i) => SubItemComponent({ ...s }, i))}
                </CollapsibleComponent>
            ) : (
                <div></div>
            )}
        </Column>
    );
}

MenuItemComponent.propTypes = {
    active: bool,
    expanded: bool,
    icon: func,
    onClick: func,
    subItems: arrayOf(object),
    title: string
};

export default MenuItemComponent;
