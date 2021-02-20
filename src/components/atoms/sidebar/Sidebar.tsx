import React, { ReactElement, ReactNode, useState } from 'react';
import { AiOutlinePushpin } from 'react-icons/ai';

import joinClasses from '~/utils/joinClasses';
import SidebarTabs from './SidebarTabs';
import SidebarContent from './SidebarContent';
import classes from './Sidebar.module.css';

export type ISideBarValue = string | number;

interface ISidebar {
  value: ISideBarValue;
}

const Sidebar: React.FC<ISidebar> = props => {
  const { tabs, content } = getTabsAndContent(props.children as ReactNode);

  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarCls = isExpanded ? 'sidebar sidebar--expanded' : 'sidebar';

  function toggle() {
    setIsExpanded(!isExpanded);
  }

  function getTabsAndContent(children: ReactNode) {
    const noOfChildren = React.Children.count(children);

    if (noOfChildren === 1 || noOfChildren > 2) {
      return { tabs: null, content: children };
    }

    let tabs: ReactElement = null;
    let content: ReactElement = null;
    React.Children.forEach(children as ReactElement, child => {
      const { type } = child;
      tabs = tabs || (type === SidebarTabs && injectValue(child));
      content = content || (type === SidebarContent && injectValue(child));
    });

    return { tabs, content };
  }

  function injectValue(child: ReactElement) {
    return React.cloneElement(child, { ...child.props, value: props.value });
  }

  return (
    <div className={classes.container}>
      <button style={{ marginLeft: '-500px' }} onClick={toggle}>
        Hello world
      </button>
      <aside className={joinClasses(classes, sidebarCls)}>
        {tabs}
        <div className={classes.topbar}>
          <AiOutlinePushpin className={classes['topbar-icon']} />
        </div>
        <div className={classes.content}>
          {injectValue(content as ReactElement)}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
