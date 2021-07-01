import React, { useState, ReactNode } from 'react';

import useClasses from '~/hooks/useModuleClasses';

import classes from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface ITabs {
  items: Array<TabItem>;
  initialActive?: TabItem['id'];
  className?: string;
}

const Tabs: React.FC<ITabs> = ({ items, initialActive, className = '' }) => {
  const [activeItem, setActiveItem] = useState(() => {
    if (initialActive) {
      return items.find(item => item.id === initialActive) || items[0];
    }

    return items[0];
  });

  const joinClasses = useClasses(classes);

  function handleTabClick(item: TabItem, event: React.MouseEvent) {
    setActiveItem(item);
  }

  return (
    <div className={joinClasses(`container ${className}`)}>
      <ul className={joinClasses('c-tabs tabs')}>
        {items.map(item => (
          <li
            key={item.id}
            onClick={event => handleTabClick(item, event)}
            className={joinClasses(
              `c-tab tab ${item === activeItem && 'tab--active'}`,
              true
            )}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
