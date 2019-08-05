import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import CardComponent from './CardComponent';
import CheckboxOn from '../../assets/checkbox-on';
import CheckboxOff from '../../assets/checkbox-off';

const styles = StyleSheet.create({
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
});

const TAGS = {
    URGENT: { text: 'URGENT', backgroundColor: '#FEC400', color: '#FFFFFF' },
    NEW: { text: 'NEW', backgroundColor: '#29CC97', color: '#FFFFFF' },
    DEFAULT: { text: 'DEFAULT', backgroundColor: '#F0F1F7', color: '#9FA2B4' },
}

class TasksComponent extends React.Component {

    state = { items: [
        {title: 'Finish ticket update', checked: false, tag: TAGS.URGENT },
        {title: 'Create new ticket example', checked: false, tag: TAGS.NEW },
        {title: 'Update ticket report', checked: true, tag: TAGS.DEFAULT }
    ]};

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
        <Row horizontal="center" vertical="center"
            style={{ backgroundColor, color }} className={css(styles.tagStyles)}
            onClick={() => this.onTagClick(index)}>
            {text}
        </Row>
    );

    renderCheckbox = (index) => <div className={css(styles.checkboxWrapper)} onClick={() => this.onCheckboxClick(index)}>
        {this.state.items[index].checked ? <CheckboxOn /> : <CheckboxOff />}
    </div>;

    onCheckboxClick = (index) => this.setState(prevState => {
        const items = prevState.items;
        items[index].checked = !items[index].checked;
        return { items };
    });

    getNextTag = (except = 'URGENT') => {
        const tagLabels = ['URGENT', 'NEW', 'DEFAULT'];
        const tagIndex = (tagLabels.indexOf(except) + 1) % 3;
        return TAGS[tagLabels[tagIndex]];
    }

    onTagClick = (index) => this.setState(prevState => {
        const items = prevState.items;
        items[index].tag = this.getNextTag(items[index].tag.text);
        return { items };
    })

    onAddButtonClick = () => this.setState(prevState => {
        const items = prevState.items;
        items.push({ title: `Task ${items.length + 1}`, checked: false, tag: this.getNextTag() });
        return { items };
    });

    renderAddButton = () => (
        <Row horizontal="center" vertical="center" className={css(styles.tagStyles, styles.addButton)} onClick={this.onAddButtonClick}>
            +
        </Row>
    )

    render() {
        return (
            <CardComponent containerStyles={this.props.containerStyles} title="Tasks" link="View all" subtitle="Today"
                items={[
                    <Row horizontal="space-between" vertical="center">
                        <span className={css(styles.itemTitle, styles.greyTitle)}>Create new task</span>
                        {this.renderAddButton()}
                    </Row>,
                    ...this.state.items.map(this.renderTask)
                ]}
            />
        );
    }
}

export default TasksComponent;
