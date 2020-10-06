import React, { useState } from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { IconCheckboxOn, IconCheckboxOff } from 'assets/icons';
import CardComponent from './CardComponent';

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: 20,
        padding: 7
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    itemValue: {
        color: theme.color.grayishBlue2
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    tagStyles: {
        borderRadius: 5,
        cursor: 'pointer',
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
}));

const TAGS = {
    URGENT: { text: 'URGENT', backgroundColor: '#FEC400', color: '#FFFFFF' },
    NEW: { text: 'NEW', backgroundColor: '#29CC97', color: '#FFFFFF' },
    DEFAULT: { text: 'DEFAULT', backgroundColor: '#F0F1F7', color: '#9FA2B4' }
};

function TasksComponent(props) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [items, setItems] = useState([
        { title: 'Finish ticket update', checked: false, tag: TAGS.URGENT },
        {
            title: 'Create new ticket example',
            checked: false,
            tag: TAGS.NEW
        },
        { title: 'Update ticket report', checked: true, tag: TAGS.DEFAULT }
    ]);

    function renderTask({ title, tag = {} }, index) {
        return (
            <Row horizontal='space-between' vertical='center'>
                <Row>
                    {renderCheckbox(index)}
                    <span className={classes.itemTitle}>{title}</span>
                </Row>
                {renderTag(tag, index)}
            </Row>
        );
    }

    function renderTag({ text, backgroundColor, color }, index) {
        return (
            <Row
                horizontal='center'
                vertical='center'
                style={{ backgroundColor, color }}
                className={classes.tagStyles}
                onClick={() => onTagClick(index)}
            >
                {text}
            </Row>
        );
    }

    function renderCheckbox(index) {
        return (
            <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                {items[index].checked ? <IconCheckboxOn /> : <IconCheckboxOff />}
            </div>
        );
    }

    function onCheckboxClick(index) {
        setItems((prev) => {
            const items = [...prev];
            items[index].checked = !items[index].checked;
            return { items };
        });
    }
    function getNextTag(except = 'URGENT') {
        const tagLabels = ['URGENT', 'NEW', 'DEFAULT'];
        const tagIndex = (tagLabels.indexOf(except) + 1) % 3;
        return TAGS[tagLabels[tagIndex]];
    }

    function onTagClick(index) {
        setItems((prev) => {
            const items = [...prev];
            items[index].tag = getNextTag(items[index].tag.text);
            return { items };
        });
    }

    function onAddButtonClick() {
        setItems((prev) => {
            const items = [...prev];
            items.push({
                title: `Task ${items.length + 1}`,
                checked: false,
                tag: getNextTag()
            });
            return { items };
        });
    }

    function renderAddButton() {
        return (
            <Row
                horizontal='center'
                vertical='center'
                className={[classes.tagStyles, classes.addButton].join(' ')}
                onClick={onAddButtonClick}
            >
                +
            </Row>
        );
    }

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            title='Tasks'
            link='View all'
            subtitle='Today'
            items={[
                <Row horizontal='space-between' vertical='center'>
                    <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                        Create new task
                    </span>
                    {renderAddButton()}
                </Row>,
                ...items.map(renderTask)
            ]}
        />
    );
}

export default TasksComponent;
