import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from 'hooks/useSidebar';

function SidebarContext({ children }) {
    const { pathname } = useLocation();
    let defaultPath;
    switch (pathname) {
        case '/overview':
            defaultPath = '/overview/one';
            break;
        case '/ideas':
            defaultPath = '/ideas/one';
            break;
        default:
            defaultPath = pathname;
    }
    return <SidebarProvider defaultPath={defaultPath}>{children}</SidebarProvider>;
}
export default SidebarContext;
