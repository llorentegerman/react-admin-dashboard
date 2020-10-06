import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Column, Row } from 'simple-flexbox';
import SidebarContext from 'components/sidebar';
import PrivateRoutes from './PrivateRoutes';

const useStyles = createUseStyles({
    container: {
        height: '100%',
        minHeight: 850
    },
    mainBlock: {
        paddingLeft: 255
    }
});

function PrivateSection() {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <Column className={classes.container}>
            <Row>
                <SidebarContext />
                <Column flexGrow={1} className={classes.mainBlock}>
                    <PrivateRoutes />
                </Column>
            </Row>
        </Column>
    );
}

export default PrivateSection;
