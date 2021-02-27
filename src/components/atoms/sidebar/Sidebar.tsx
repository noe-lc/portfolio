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
  const listenerCallbacks = useRef({
    mouseOver: () => clearTimeout(expandTimeout.current),
    mouseOut: () => {
      expandTimeout.current = window.setTimeout(() => setExpand(false), 7500);
    },
  });

  const [expand, setExpand] = useState(!!props.expand);
  const [pinned, setPinned] = useState(false);

  const { tabs, content } = getTabsAndContent(props.children as ReactElement);
  const sidebarCls = expand ? 'sidebar sidebar--expanded' : 'sidebar';

  const setSidebarElement = useCallback(function (e: HTMLElement) {
    sidebarEl.current = e;
  }, []);

  function onPin() {
    const shouldPin = !pinned;

    if (shouldPin) {
      setPinned(true);
      setListeners(false);
      clearTimeout(expandTimeout.current);
      return;
    }
    setListeners(true);
  }

  function onTabSelect(value) {
    props.onTabSelect(value);
    setExpand(true);
  }

  function setListeners(set: boolean) {
    const { current: sidebar } = sidebarEl;
    const { current: callbacks } = listenerCallbacks;

    if (set) {
      sidebar.addEventListener('mouseout', callbacks.mouseOut);
      sidebar.addEventListener('mouseover', callbacks.mouseOver);
      return;
    }

    sidebar.removeEventListener('mouseout', callbacks.mouseOut);
    sidebar.removeEventListener('mouseover', callbacks.mouseOver);
  }

  function handleExpand(value) {
    if (!value) {
      setListeners(false);
      setExpand(false);
      return;
    }
    setExpand(true);
    setListeners(true);
    clearTimeout(expandTimeout.current);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <AiOutlinePushpin
            className={joinClasses(
              classes,
              pinned ? 'topbar-icon topbar-icon--pinned' : 'topbar-icon'
            )}
            onClick={onPin}
          />
        </div>
        {content}
      </aside>
    </div>
  );
};

export default Sidebar;
