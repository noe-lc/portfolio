import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GrDown } from 'react-icons/gr';

import MapLayerStore from '~/stores/mapLayer';
import LayerSymbol from '../layer-symbol';
import { SymbolTypes } from '~/types/symbol';

import useClasses from '~/hooks/useModuleClasses';

import classes from './MapLayer.module.css';
import Modal from '../modal';
import SymbologyMenu from '~/components/organisms/symbology-menu';
import { AiOutlineClose } from 'react-icons/ai';

interface IMapLayer {
  store: MapLayerStore;
}

const MapLayer: React.FC<IMapLayer> = ({ store }) => {
  const joinClasses = useClasses(classes);

  const [expandSymbol, setExpandSymbol] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSingleSymbol = store.symbol.definition.type === SymbolTypes.single;

  function toggleShowSymbol() {
    setExpandSymbol(!expandSymbol);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  if (hasSingleSymbol) {
    return (
      <div className={classes.container}>
        <div className={joinClasses('control control-visibility')}>
          <input
            checked={store.visible}
            type="checkbox"
            onChange={store.toggleVisibility}
          />
        </div>
        <div className={classes['control--single']}>
          <div
            className={classes['symbol-container']}
            onDoubleClick={openModal}
          >
            <LayerSymbol store={store.symbol} />
          </div>
          <span>{store.name || store.id}</span>
        </div>
        <Modal open={isModalOpen}>
          <div className="w-full px-2 py-1 flex justify-between items-center bg-gray-800 text-gray-100">
            <span className="inline-block font-bold text-sm">
              Symbology {`${store.name ? `- ${store.name}` : ''}`}
            </span>
            <div>
              <AiOutlineClose
                className="text-xl cursor-pointer"
                onClick={closeModal}
              />
            </div>
          </div>
          <div className="px-1 py-2 ">
            <SymbologyMenu />
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={joinClasses('control control-visibility')}>
        <GrDown
          className={joinClasses(
            `collapse ${expandSymbol ? 'collapse--expanded' : ''}`
          )}
          onClick={toggleShowSymbol}
        />
        <input
          checked={store.visible}
          type="checkbox"
          onChange={store.toggleVisibility}
        />
      </div>
      <div className={classes.control}>
        <span className={classes['layer-name']}>{store.name || store.id}</span>
        {expandSymbol && (
          <div className={classes.symbol}>
            <LayerSymbol store={store.symbol} />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(MapLayer);
