import LayerSymbol from './LayerSymbol';
import { Symbol, SymbolTypes } from '~/types/symbol';

interface ISymbolPreview {
  className?: string;
  symbolDefinition: Symbol;
}

const LayerSymbolRouter: React.FC<ISymbolPreview> = ({ symbolDefinition }) => {
  switch (symbolDefinition.type) {
    case SymbolTypes.single:
      return <LayerSymbol symbolStyle={symbolDefinition.style} />;
    case SymbolTypes.classified:
      return <span>Classified symbol</span>;
    default:
      return <div className="">No preview available</div>;
  }
};

export default LayerSymbolRouter;
