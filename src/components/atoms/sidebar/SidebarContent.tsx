import React, { ReactElement } from 'react';

import { ISideBarValue } from './Sidebar';

interface ISidebarContent {
  value?: ISideBarValue;
}

const SidebarContent: React.FC<ISidebarContent> = props => {
  const children = React.Children.toArray(props.children);
  const child = children.find(child => {
    if (React.isValidElement(child)) {
      return child.props.value === props.value;
    }
  });

  return <React.Fragment>{child}</React.Fragment>;
};

export default SidebarContent;
