import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useScrollHeight } from 'react-collapsible-content';

const STATUS = {
    COLLAPSED: 'COLLAPSED',
    PRE_EXPANDED: 'PRE_EXPANDED',
    EXPANDED: 'EXPANDED',
    PRE_COLLAPSED: 'PRE_COLLAPSED'
};

function CollapsibleContent({
    children,
    expanded,
    style,
    transitionDuration,
    transitionTimingFunction,
    onTransitionStart,
    onTransitionEnd,
    ...others
}) {
    const contentContainerRef = useRef(null);
    const [status, setStatus] = useState(expanded ? STATUS.EXPANDED : STATUS.COLLAPSED);
    const { scrollHeight } = useScrollHeight(contentContainerRef, {
        onTransitionStart,
        onTransitionEnd
    });
    let transitionStyles;
    switch (status) {
        case STATUS.EXPANDED:
            transitionStyles = { maxHeight: '100vh', transitionDuration: '.001s' };
            break;
        case STATUS.PRE_COLLAPSED:
            transitionStyles = { maxHeight: scrollHeight, transitionDuration: '.001s' };
            break;
        case STATUS.PRE_EXPANDED:
            transitionStyles = { maxHeight: scrollHeight };
            break;
        case STATUS.COLLAPSED:
            transitionStyles = { maxHeight: 0 };
            break;
        default:
            transitionStyles = { maxHeight: scrollHeight, transitionDuration: '.001s' };
    }

    useEffect(() => {
        if (expanded) {
            if (status === STATUS.COLLAPSED) {
                setStatus(STATUS.PRE_EXPANDED);
            } else if (status === STATUS.PRE_EXPANDED) {
                setTimeout(() => setStatus(STATUS.EXPANDED), 800);
            }
        } else if (!expanded) {
            if (status === STATUS.EXPANDED) {
                setStatus(STATUS.PRE_COLLAPSED);
            } else if (status === STATUS.PRE_COLLAPSED) {
                setTimeout(() => setStatus(STATUS.COLLAPSED), 100);
            }
        }
    }, [expanded, status]);

    return (
        <div
            {...others}
            style={{
                overflow: 'hidden',
                transitionProperty: 'max-height',
                transitionTimingFunction,
                transitionDuration,
                ...transitionStyles,
                ...style
            }}
            ref={contentContainerRef}
        >
            {children}
        </div>
    );
}

CollapsibleContent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
        .isRequired,
    expanded: PropTypes.bool,
    onTransitionStart: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    style: PropTypes.object,
    transitionDuration: PropTypes.string,
    transitionTimingFunction: PropTypes.string
};

CollapsibleContent.defaultProps = {
    transitionDuration: '.425s',
    transitionTimingFunction: 'ease-in-out'
};

export default CollapsibleContent;
