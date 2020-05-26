import { useState } from 'react';

function useSidebar({ defaultPath = '' } = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        path: defaultPath,
        expanded: true
    });

    const isActive = (path, exact) =>
        selectedItem.path === path ||
        (!exact && selectedItem.path.indexOf(`${path}/`) === 0);

    const onMenuItemClicked = (path, { expanded, isCollapsible } = {}) => {
        const newItem = {
            path,
            expanded: expanded !== undefined ? expanded : true
        };
        if (!isCollapsible) {
            setIsOpen(false);
            return setSelectedItem(newItem);
        }

        if (isActive(path)) {
            newItem.path = selectedItem.path;
            newItem.expanded = !selectedItem.expanded;
            return setSelectedItem(prevValue => ({
                ...prevValue,
                expanded: !prevValue.expanded
            }));
        }

        return setSelectedItem(newItem);
    };

    const isExpanded = path => isActive(path) && selectedItem.expanded;

    return {
        isOpen,
        isExpanded,
        isActive,
        onMenuItemClicked,
        setIsOpen
    };
}

export default useSidebar;
