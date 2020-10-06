import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from 'hooks/useSidebar';
import SLUGS from 'resources/slugs';

function SidebarContext({ children }) {
    const { pathname } = useLocation();
    let defaultItem;
    switch (pathname) {
        case SLUGS.overview:
            defaultItem = SLUGS.overview;
            break;
        case SLUGS.ideas:
            defaultItem = SLUGS.ideas;
            break;
        default:
            defaultItem = pathname;
    }
    return <SidebarProvider defaultItem={defaultItem}>{children}</SidebarProvider>;
}
export default SidebarContext;
