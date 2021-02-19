const SidebarTabs: React.FC<P> = props => {
  return <div className="absolute right-full top-6">{props.children}</div>;
};

export default SidebarTabs;
