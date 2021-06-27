import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AiOutlineClose } from 'react-icons/ai';
import { GrDown } from 'react-icons/gr';

import MapLayerStore from '~/stores/mapLayer';
import Modal from '../modal';
import LayerSymbol from '../layer-symbol';
import SymbologyMenu from '~/components/organisms/symbology-menu';
import useClasses from '~/hooks/useModuleClasses';
import { SymbolTypes } from '~/types/symbol';

import classes from './MapLayer.module.css';

interface IMapLayer {
  mapLayerStore: MapLayerStore;
}

const MapLayer: React.FC<IMapLayer> = ({ mapLayerStore }) => {
  const joinClasses = useClasses(classes);

  const [expandSymbol, setExpandSymbol] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSingleSymbol = mapLayerStore.symbol.definition.type === SymbolTypes.single;

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
            checked={mapLayerStore.visible}
            type="checkbox"
            onChange={mapLayerStore.toggleVisibility}
          />
        </div>
        <div className={classes['control--single']}>
          <div
            className={classes['symbol-container']}
            onDoubleClick={openModal}
          >
            <LayerSymbol layerSymbolStore={mapLayerStore.symbol} />
          </div>
          <span>{mapLayerStore.name || mapLayerStore.id}</span>
        </div>
        <Modal open={isModalOpen}>
          <div className="w-full px-2 py-1 flex justify-between items-center bg-gray-800 text-gray-100">
            <span className="inline-block font-bold text-sm">
              Symbology {`${mapLayerStore.name ? `- ${mapLayerStore.name}` : ''}`}
            </span>
            <div>
              <AiOutlineClose
                className="text-xl cursor-pointer"
                onClick={closeModal}
              />
            </div>
          </div>
          <div className="px-1 py-2 ">
            <SymbologyMenu mapLayerStore={mapLayerStore}/>
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
          checked={mapLayerStore.visible}
          type="checkbox"
          onChange={mapLayerStore.toggleVisibility}
        />
      </div>
      <div className={classes.control}>
        <span className={classes['layer-name']}>{mapLayerStore.name || mapLayerStore.id}</span>
        {expandSymbol && (
          <div className={classes.symbol}>
            <LayerSymbol layerSymbolStore={mapLayerStore.symbol} />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(MapLayer);
