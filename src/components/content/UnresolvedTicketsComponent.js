import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import CardComponent from './CardComponent';

const styles = StyleSheet.create({
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

class UnresolvedTicketsComponent extends React.Component {

    renderStat(title, value) {
        return (<Row flexGrow={1} horizontal="space-between" vertical="center">
            <span className={css(styles.itemTitle)}>{title}</span>
            <span className={css(styles.itemTitle, styles.itemValue)}>{value}</span>
        </Row>);
    }

    render() {
        return (
            <CardComponent containerStyles={this.props.containerStyles} title="Unresolved tickets"
                link="View details" subtitle="Group:" subtitleTwo="Support"
                items={[
                    this.renderStat('Waiting on Feature Request', 4238),
                    this.renderStat('Awaiting Customer Response', 1005),
                    this.renderStat('Awaiting Developer Fix', 914),
                    this.renderStat('Pending', 281)
                ]}
            />
        );
    }
}

export default UnresolvedTicketsComponent;
