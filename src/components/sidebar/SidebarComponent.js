import React from 'react';
import { Column } from 'simple-flexbox';
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363740',
        width: 255,
        paddingTop: 32
    },
    menuItemList: {
        marginTop: 52
    },
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent(props) {
    return (
        <Column className={css(styles.container)}>
            <LogoComponent />
            <Column className={css(styles.menuItemList)}>
                <MenuItemComponent
                    title="Overview" icon={IconOverview}
                    onClick={() => props.onChange('Overview')}
                    active={props.selectedItem === 'Overview'}
                />
                <MenuItemComponent
                    title="Tickets" icon={IconTickets}
                    onClick={() => props.onChange('Tickets')}
                    active={props.selectedItem === 'Tickets'}
                />
                <MenuItemComponent
                    title="Ideas" icon={IconIdeas}
                    onClick={() => props.onChange('Ideas')}
                    active={props.selectedItem === 'Ideas'} />
                <MenuItemComponent
                    title="Contacts" icon={IconContacts}
                    onClick={() => props.onChange('Contacts')}
                    active={props.selectedItem === 'Contacts'} />
                <MenuItemComponent
                    title="Agents" icon={IconAgents}
                    onClick={() => props.onChange('Agents')}
                    active={props.selectedItem === 'Agents'} />
                <MenuItemComponent
                    title="Articles" icon={IconArticles}
                    onClick={() => props.onChange('Articles')}
                    active={props.selectedItem === 'Articles'} />
                <div className={css(styles.separator)}></div>
                <MenuItemComponent
                    title="Settings" icon={IconSettings}
                    onClick={() => props.onChange('Settings')}
                    active={props.selectedItem === 'Settings'} />
                <MenuItemComponent
                    title="Subscription" icon={IconSubscription}
                    onClick={() => props.onChange('Subscription')}
                    active={props.selectedItem === 'Subscription'} />
            </Column>
        </Column>
    );
}

export default SidebarComponent;
