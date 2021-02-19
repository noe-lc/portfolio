import React, { useState } from 'react';
import { AiOutlinePushpin } from 'react-icons/ai';

import SidebarTabs from './SidebarTabs';
import joinClasses from '../../../utils/joinClasses';
import classes from './Sidebar.module.css';

const Sidebar: React.FC<P> = props => {
  let tabs: React.ReactNode = null;
  let content: React.ReactNode = null;
  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarCls = isExpanded ? 'sidebar sidebar--expanded' : 'sidebar';

  React.Children.forEach(props.children, child => {
    tabs = child.type === SidebarTabs && child;
    content = child.type !== SidebarTabs && child;
  });

  function toggle() {
    setIsExpanded(!isExpanded);
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
        <div className={classes.content}></div>
      </aside>
    </div>
  );
};

export default Sidebar;
