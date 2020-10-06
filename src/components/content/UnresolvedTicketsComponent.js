import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import CardComponent from './CardComponent';

const useStyles = createUseStyles({
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
});

function UnresolvedTicketsComponent({ containerStyles }) {
    const classes = useStyles();

    function renderStat(title, value) {
        return (
            <Row flexGrow={1} horizontal='space-between' vertical='center'>
                <span className={classes.itemTitle}>{title}</span>
                <span className={[classes.itemTitle, classes.itemValue].join(' ')}>{value}</span>
            </Row>
        );
    }

    return (
        <CardComponent
            containerStyles={containerStyles}
            title='Unresolved tickets'
            link='View details'
            subtitle='Group:'
            subtitleTwo='Support'
            items={[
                renderStat('Waiting on Feature Request', 4238),
                renderStat('Awaiting Customer Response', 1005),
                renderStat('Awaiting Developer Fix', 914),
                renderStat('Pending', 281)
            ]}
        />
    );
}

export default UnresolvedTicketsComponent;
