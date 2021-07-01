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

  function toggleShowSymbol() {
    setExpandSymbol(!expandSymbol);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  if (mapLayerStore.symbol.definition.type === SymbolTypes.single) {
    return (
      <div className={classes.container}>
        <div className={joinClasses('control control-visibility')}>
          <input
            type="checkbox"
            checked={mapLayerStore.visible}
            onChange={mapLayerStore.toggleVisibility}
          />
        </div>
        <div className={classes['control--single']}>
          <div
            className={classes['symbol-container']}
            onDoubleClick={openModal}
          >
            <LayerSymbol
              symbolStyle={mapLayerStore.symbol.definition.style}
              className="cursor-pointer"
            />
          </div>
          <span>{mapLayerStore.name || mapLayerStore.id}</span>
        </div>
        <Modal open={isModalOpen}>
          <div className={classes['symbol-modal-titlebar']}>
            <span className={classes['symbol-modal-title']}>
              Symbology{' '}
              {`${mapLayerStore.name ? `- ${mapLayerStore.name}` : ''}`}
            </span>
            <div>
              <AiOutlineClose
                className={classes['symbol-modal-close']}
                onClick={closeModal}
              />
            </div>
          </div>
          <SymbologyMenu
            mapLayerStore={mapLayerStore}
            className={joinClasses(
              'symbol-modal-symbologymenu symbol-modal-symbologymenu--single'
            )}
          />
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
        <span className={classes['layer-name']}>
          {mapLayerStore.name || mapLayerStore.id}
        </span>
        {expandSymbol && (
          <div className={classes.symbol}>
            <LayerSymbol symbolStyle={mapLayerStore.symbol.definition.style} />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(MapLayer);
