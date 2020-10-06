import React from 'react';
import { any, func, string } from 'prop-types';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import CollapsibleContent from 'components/collapsible/CollapsibleContent';
import { useSidebar } from 'hooks/useSidebar';

const useStyles = createUseStyles({
    activeContainer: {
        backgroundColor: ({ theme }) => theme.color.paleBlueTransparent
    },
    activeTitle: {
        color: ({ theme }) => theme.color.paleBlue
    },
    container: {
        display: 'flex',
        height: 56,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: ({ theme }) => theme.color.paleBlueTransparent
        },
        paddingLeft: ({ level }) => 24 * level,
        transition: 'all 0.2s ease-in-out'
    },
    leftBar: {
        borderLeft: ({ theme, level }) =>
            level > 1 ? 'none' : `3px solid ${theme.color.darkGrayishBlue}`
    },
    title: {
        fontFamily: 'Muli',
        fontSize: 16,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: ({ theme }) => theme.color.grayishBlue,
        marginLeft: 24
    }
});

function MenuItemComponent({ children, icon: Icon, id, onClick, parentPath, title }) {
    const theme = useTheme();
    const path = !parentPath ? `/${id}` : `${parentPath}/${id}`;
    const level = path.split('/').length - 1;
    const isCollapsible = children && children.length > 0;
    const classes = useStyles({ theme, level });

    const { isExpanded, isActive, onItemClick } = useSidebar({
        isCollapsible,
        path
    });
    const classNameColumn = isActive ? classes.leftBar : '';
    const classNameContainer = [classes.container, isActive && classes.activeContainer].join(' ');
    const classNameTitle = [classes.title, isActive && classes.activeTitle].join(' ');
    const iconColor = isActive ? theme.color.paleBlue : theme.color.grayishBlue2;

    function onItemClicked(e) {
        if (onClick) {
            onClick(e);
        }
        onItemClick();
    }

    return (
        <Column key={id} className={classNameColumn}>
            <Row vertical='center' onClick={onItemClicked} className={classNameContainer}>
                <Icon fill={iconColor} opacity={!isActive && '0.4'} />
                <span className={classNameTitle}>{title}</span>
            </Row>
            {isCollapsible && (
                <CollapsibleContent expanded={isExpanded}>
                    {children.map((child) => child.type({ ...child.props, parentPath: path }))}
                </CollapsibleContent>
            )}
        </Column>
    );
}

MenuItemComponent.defaultProps = {
    parentPath: ''
};

MenuItemComponent.propTypes = {
    children: any,
    icon: func,
    id: string,
    onClick: func,
    parentPath: string,
    title: string
};

export default MenuItemComponent;
