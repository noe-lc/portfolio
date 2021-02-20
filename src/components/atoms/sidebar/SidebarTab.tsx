import { ISideBarValue } from './Sidebar';
import { OnTabSelect } from './SidebarTabs';

interface ISidebarTab {
  value: ISideBarValue;
  isActive: boolean;
  label?: string;
  Icon: React.ReactNode;
  onClick?: OnTabSelect;
}

const SidebarTab: React.FC<ISidebarTab> = props => {
  const activeClasses = props.isActive
    ? 'bg-teal text-white'
    : 'bg-gray-500 text-white bg-opacity-90';

  function onClick(e) {
    props.onClick(props.value, e);
  }

  return (
    <div
      className={`text-4xl text-center p-1 cursor-pointer ${activeClasses}`}
      onClick={onClick}
    >
      {props.Icon}
    </div>
  );
};

export default SidebarTab;
