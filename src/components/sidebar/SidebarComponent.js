import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import {
    IconAgents,
    IconArticles,
    IconContacts,
    IconIdeas,
    IconOverview,
    IconSettings,
    IconSubscription,
    IconTickets
} from 'assets/icons';
import { convertSlugToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;

    async function logout() {
        push(SLUGS.login);
    }

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='Dashboard'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.dashboard)}
            />
            <MenuItem
                id={SLUGS.website}
                items={[SLUGS.websiteTwo, SLUGS.websiteThree]}
                title='Website'
                icon={IconOverview}
            >
                <MenuItem
                    id={SLUGS.website}
                    title='Sub Item 1'
                    level={2}
                    icon={IconAgents}
                    onClick={() => onClick(SLUGS.website)}
                />
                <MenuItem
                    id={SLUGS.websiteTwo}
                    title='Sub Item 2'
                    level={2}
                    icon={IconContacts}
                    onClick={() => onClick(SLUGS.websiteTwo)}
                />
                <MenuItem
                    id={SLUGS.websiteThree}
                    title='Sub Item 3'
                    level={2}
                    icon={IconArticles}
                    onClick={() => onClick(SLUGS.websiteThree)}
                />
            </MenuItem>
            <MenuItem
                id={SLUGS.visitors}
                title='Visitors'
                icon={IconTickets}
                onClick={() => onClick(SLUGS.visitors)}
            />
            <MenuItem
                id={SLUGS.reviews}
                items={[SLUGS.ideasTwo, SLUGS.reviewsThree]}
                title='Reviews'
                icon={IconIdeas}
            >
                <MenuItem
                    id={SLUGS.reviews}
                    title='Sub Item 1'
                    level={2}
                    icon={IconAgents}
                    onClick={() => onClick(SLUGS.reviews)}
                />
                <MenuItem
                    id={SLUGS.reviewsTwo}
                    title='Sub Item 2'
                    level={2}
                    icon={IconContacts}
                    onClick={() => onClick(SLUGS.reviewsTwo)}
                />
                <MenuItem
                    id={SLUGS.reviewsThree}
                    title='Sub Item 3'
                    level={2}
                    icon={IconArticles}
                    onClick={() => onClick(SLUGS.reviewsThree)}
                />
            </MenuItem>
            <MenuItem
                id={SLUGS.listings}
                title='Listings'
                icon={IconContacts}
                onClick={() => onClick(SLUGS.listings)}
            />
            <MenuItem
                id={SLUGS.appointments}
                title='Appointments'
                icon={IconAgents}
                onClick={() => onClick(SLUGS.appointments)}
            />
            <MenuItem
                id={SLUGS.settings}
                title='Settings'
                icon={IconSettings}
                onClick={() => onClick(SLUGS.settings)}
            />
        </Menu>
    );
}

export default SidebarComponent;
