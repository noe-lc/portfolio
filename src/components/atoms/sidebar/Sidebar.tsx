import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlinePushpin } from 'react-icons/ai';

import joinClasses from '~/utils/joinClasses';
import SidebarTabs, { OnTabSelect } from './SidebarTabs';
import SidebarContent from './SidebarContent';
import classes from './Sidebar.module.css';

export type ISideBarValue = string | number;

interface ISidebar {
  value: ISideBarValue;
  expand?: boolean;
  onTabSelect: OnTabSelect;
}

const Sidebar: React.FC<ISidebar> = props => {
  const sidebarEl = useRef<HTMLElement>(null);
  const expandTimeout = useRef<number>(null);

  const [expand, setExpand] = useState(!!props.expand);
  const [pinned, setPinned] = useState(false);

  const { tabs, content } = getTabsAndContent(props.children as ReactElement);
  const sidebarCls = expand ? 'sidebar sidebar--expanded' : 'sidebar';

  const setSidebarElement = useCallback(function (e: HTMLElement) {
    sidebarEl.current = e;
  }, []);

  function onTabSelect(value) {
    props.onTabSelect(value);
    setExpand(true);
  }

  function handleExpand(value) {
    const { current: sidebar } = sidebarEl;

    const handleMouseOver = () => clearTimeout(expandTimeout.current);
    const handleMouseOut = () => {
      expandTimeout.current = window.setTimeout(() => setExpand(false), 7500);
    };

    if (!value) {
      sidebar.removeEventListener('mouseout', handleMouseOut);
      sidebar.removeEventListener('mouseover', handleMouseOver);
      setExpand(false);
      return;
    }

    setExpand(true);
    clearTimeout(expandTimeout.current);
    sidebar.onmouseout = handleMouseOut;
    sidebar.onmouseover = handleMouseOver;
  }

  function getTabsAndContent(children: ReactElement) {
    const noOfChildren = React.Children.count(children);

    if (noOfChildren === 1 || noOfChildren > 2) {
      return { tabs: null, content: children };
    }

    let tabs: ReactElement = null;
    let content: ReactElement = null;
    React.Children.forEach(children, child => {
      const { type } = child;
      tabs = tabs || (type === SidebarTabs && injectProps(child, 'tabs'));
      content =
        content || (type === SidebarContent && injectProps(child, 'content'));
    });

    return { tabs, content };
  }

  function injectProps(child: ReactElement, type: string) {
    return React.cloneElement(child, {
      ...child.props,
      value: props.value,
      onTabSelect: type === 'tabs' ? onTabSelect : undefined,
    });
  }

  useEffect(() => {
    handleExpand(props.value);
  }, [props.value]);

  useEffect(() => () => clearTimeout(expandTimeout.current));

  return (
    <div className={classes.container}>
      <aside
        ref={setSidebarElement}
        className={joinClasses(classes, sidebarCls)}
      >
        {tabs}
        <div className={classes.topbar}>
          <AiOutlinePushpin className={classes['topbar-icon']} />
        </div>
        {content}
      </aside>
    </div>
  );
};

export default Sidebar;
