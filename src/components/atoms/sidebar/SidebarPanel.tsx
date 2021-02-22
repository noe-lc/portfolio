import React from 'react';

import { ISideBarValue } from './Sidebar';

interface ISidebarContent {
  value?: ISideBarValue;
}

const SidebarPanel: React.FC<ISidebarContent> = props => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default SidebarPanel;
