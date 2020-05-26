import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import LogoComponent from './LogoComponent';
import MenuItemComponent from './MenuItemComponent';
import IconOverview from '../../assets/icon-overview.js';
import IconTickets from '../../assets/icon-tickets.js';
import IconIdeas from '../../assets/icon-ideas.js';
import IconContacts from '../../assets/icon-contacts';
import IconAgents from '../../assets/icon-agents';
import IconArticles from '../../assets/icon-articles';
import IconSettings from '../../assets/icon-settings';
import IconSubscription from '../../assets/icon-subscription';
import { slide as Menu } from 'react-burger-menu';
import useSidebar from './useSidebar';

const stylesSeparator = StyleSheet.create({
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

const styles = {
    bmBurgerButton: {
        position: 'absolute',
        width: 26,
        height: 20,
        left: 24,
        top: 20
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        display: 'none'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
        width: 255
    },
    bmMenu: {
        background: '#373a47'
    },
    bmItem: {
        outline: 'none',
        ':focus': {
            outline: 'none'
        }
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};

function SidebarComponent() {
    const {
        isOpen,
        isExpanded,
        isActive,
        onMenuItemClicked,
        setIsOpen
    } = useSidebar({ defaultPath: '/ideas' });

    const isMobile = window.innerWidth <= 1080;

    return (
        <Menu
            isOpen={!isMobile || isOpen}
            noOverlay={!isMobile}
            disableCloseOnEsc
            styles={styles}
            onStateChange={state => setIsOpen(state.isOpen)}
            noTransition={!isMobile}
        >
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItemComponent
                title="Dashboard"
                icon={IconSubscription}
                onClick={() => onMenuItemClicked('/dashboard')}
                active={isActive('/dashboard')}
            />

            <MenuItemComponent
                title="Overview"
                icon={IconOverview}
                onClick={() =>
                    onMenuItemClicked('/overview', { isCollapsible: true })
                }
                active={isActive('/overview')}
                expanded={isExpanded('/overview')}
                subItems={[
                    {
                        title: 'Sub Item 1',
                        icon: <IconAgents width={20} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/overview/subitem1'),
                        active: isActive('/overview/subitem1')
                    },
                    {
                        title: 'Sub Item 2',
                        icon: <IconIdeas width={16} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/overview/subitem2'),
                        active: isActive('/overview/subitem2')
                    },
                    {
                        title: 'Sub Item 3',
                        icon: <IconContacts width={16} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/overview/subitem3'),
                        active: isActive('/overview/subitem3')
                    },
                    {
                        title: 'Sub Item 4',
                        icon: <IconSettings width={20} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/overview/subitem4'),
                        active: isActive('/overview/subitem4')
                    }
                ]}
            />
            <MenuItemComponent
                title="Tickets"
                icon={IconTickets}
                onClick={() => onMenuItemClicked('/tickets')}
                active={isActive('/tickets')}
            />
            <MenuItemComponent
                title="Ideas"
                icon={IconIdeas}
                onClick={() =>
                    onMenuItemClicked('/ideas', { isCollapsible: true })
                }
                active={isActive('/ideas')}
                expanded={isExpanded('/ideas')}
                subItems={[
                    {
                        title: 'Sub Item 1',
                        icon: <IconAgents width={20} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/ideas/subitem1'),
                        active: isActive('/ideas/subitem1')
                    },
                    {
                        title: 'Sub Item 2',
                        icon: <IconIdeas width={16} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/ideas/subitem2'),
                        active: isActive('/ideas/subitem2')
                    },
                    {
                        title: 'Sub Item 3',
                        icon: <IconContacts width={16} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/ideas/subitem3'),
                        active: isActive('/ideas/subitem3')
                    },
                    {
                        title: 'Sub Item 4',
                        icon: <IconSettings width={20} fill={'#DDE2FF'} />,
                        onClick: () => onMenuItemClicked('/ideas/subitem4'),
                        active: isActive('/ideas/subitem4')
                    }
                ]}
            />
            <MenuItemComponent
                title="Contacts"
                icon={IconContacts}
                onClick={() => onMenuItemClicked('/contacts')}
                active={isActive('/contacts')}
            />
            <MenuItemComponent
                title="Agents"
                icon={IconAgents}
                onClick={() => onMenuItemClicked('/agents')}
                active={isActive('/agents')}
            />
            <MenuItemComponent
                title="Articles"
                icon={IconArticles}
                onClick={() => onMenuItemClicked('/articles')}
                active={isActive('/articles')}
            />
            <div className={css(stylesSeparator.separator)}></div>
            <MenuItemComponent
                title="Settings"
                icon={IconSettings}
                onClick={() => onMenuItemClicked('/settings')}
                active={isActive('/settings')}
            />
            <MenuItemComponent
                title="Subscription"
                icon={IconSubscription}
                onClick={() => onMenuItemClicked('/subscription')}
                active={isActive('/subscription')}
            />
        </Menu>
    );
}

export default SidebarComponent;
