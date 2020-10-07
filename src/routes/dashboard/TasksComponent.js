import React, { useState } from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { IconCheckboxOn, IconCheckboxOff } from 'assets/icons';
import CardComponent from 'components/cards/CardComponent';

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
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

    function onCheckboxClick(index) {
        setItems((prev) => {
            const newItems = [...prev];
            newItems[index].checked = newItems[index].checked ? false : true;
            return newItems;
        });
    }
    function getNextTag(current = 'URGENT') {
        const tagLabels = ['URGENT', 'NEW', 'DEFAULT'];
        const tagIndex = (tagLabels.indexOf(current) + 1) % 3;
        return TAGS[tagLabels[tagIndex]];
    }

    function onTagClick(index) {
        setItems((prev) => {
            const newItems = [...prev];
            newItems[index].tag = getNextTag(newItems[index].tag.text);
            return newItems;
        });
    }

    function onAddButtonClick() {
        setItems((prev) => {
            const newItems = [...prev];
            newItems.push({
                title: `Task ${newItems.length + 1}`,
                checked: false,
                tag: getNextTag()
            });
            return newItems;
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
                ...items.map((item, index) => (
                    <TaskComponent
                        classes={classes}
                        index={index}
                        item={item}
                        onCheckboxClick={onCheckboxClick}
                        onTagClick={onTagClick}
                    />
                ))
            ]}
        />
    );
}

function TaskComponent({ classes, index, item = {}, onCheckboxClick, onTagClick }) {
    const { tag = {} } = item;
    return (
        <Row horizontal='space-between' vertical='center'>
            <Row>
                <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    {item.checked ? <IconCheckboxOn /> : <IconCheckboxOff />}
                </div>
                <span className={classes.itemTitle}>{item.title}</span>
            </Row>
            <TagComponent
                backgroundColor={tag.backgroundColor}
                classes={classes}
                color={tag.color}
                index={index}
                onClick={onTagClick}
                text={tag.text}
            />
        </Row>
    );
}

function TagComponent({ backgroundColor, classes, color, index, onClick, text }) {
    return (
        <Row
            horizontal='center'
            vertical='center'
            style={{ backgroundColor, color }}
            className={classes.tagStyles}
            onClick={() => onClick(index)}
        >
            {text}
        </Row>
    );
}

export default TasksComponent;
