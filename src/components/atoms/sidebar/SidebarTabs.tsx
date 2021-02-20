import React, { ReactElement } from 'react';

import { ISideBarValue } from './Sidebar';

export type OnTabSelect = (value: ISideBarValue, e: MouseEvent) => void;

interface ISidebarTabs {
  value?: ISideBarValue;
  onTabSelect?: OnTabSelect;
}

const SidebarTabs: React.FC<ISidebarTabs> = props => {
  return (
    <div className="absolute right-full top-10">
      {React.Children.map(props.children as ReactElement, child => {
        return React.cloneElement(child, {
          ...child.props,
          isActive: props.value === child.props.value,
          onClick: props.onTabSelect,
        });
      })}
    </div>
  );
};

export default SidebarTabs;
