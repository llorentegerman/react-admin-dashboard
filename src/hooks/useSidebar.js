import React, { useState, useEffect, useContext, createContext } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children, defaultPath }) {
    const [currentPath, setCurrentPath] = useState(defaultPath);
    useEffect(() => {
        if (defaultPath !== currentPath) {
            return setCurrentPath(defaultPath);
        }
    }, [currentPath, defaultPath]);
    return (
        <SidebarContext.Provider value={{ currentPath, setCurrentPath }}>
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = ({ isCollapsible, path } = {}) => {
    const { currentPath, setCurrentPath } = useContext(SidebarContext);
    const isActive = path === currentPath || currentPath.indexOf(`${path}/`) === 0;
    const [isExpanded, setIsExpanded] = useState(isActive);

    useEffect(() => {
        if (!isActive && isExpanded) {
            return setIsExpanded(false);
        }
        if (isActive && !isExpanded) {
            return setIsExpanded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPath]);

    const onItemClick = () => {
        if (!isCollapsible) {
            setCurrentPath(path);
        }
        setIsExpanded((prev) => !prev);
    };

    return {
        isExpanded,
        isActive,
        onItemClick
    };
};
