import { useJsApiLoader } from '@react-google-maps/api';

export type LoadScriptOptions = Parameters<typeof useJsApiLoader>[0];
export type LoadScriptReturn = ReturnType<typeof useJsApiLoader>;

const withGoogleMaps = (config: LoadScriptOptions) => <
  P extends Partial<LoadScriptReturn>
>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WrappedComponent = props => {
    const loader = useJsApiLoader(config);
    return <Component {...(props as P)} {...loader} />;
  };

  return WrappedComponent;
};

export default withGoogleMaps;
