import React from 'react';
import {
  CustomPicker,
  CustomPickerProps,
  ChromePicker,
  Color,
  ColorResult,
} from 'react-color';
import {
  Alpha,
  Saturation,
  EditableInput,
  Hue,
} from 'react-color/lib/components/common';

import useModuleClasses, { withModuleClasses } from '~/hooks/useModuleClasses';

import classes from './CustomColorPicker.module.css';

interface IPickerProps {
  joinClasses: ReturnType<typeof useModuleClasses>;
}

interface IPickerState {
  color: Color;
}

class Picker extends React.Component<IPickerProps, IPickerState> {
  constructor(props) {
    super(props);

    this.state = {
      color: '#000',
    };
  }

  handleChange = (color: ColorResult, event) => {
    console.log('event :>> ', color, event);
    this.setState({ color: color.rgb });
  };

  handleChangeComplete = (color: ColorResult, event) => {
    console.log('event :>> ', color, event);
    this.setState({ color: color.rgb });
  };

  render() {
    return (
      <div
        className={this.props.joinClasses('c-color-picker color-picker', true)}
      >
        <div style={{ position: 'relative', width: '100%', height: '40px' }}>
          <Alpha {...this.props} onChange={this.handleChange} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '40px' }}>
          <Hue {...this.props} onChange={this.handleChange} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '40px' }}>
          <Saturation {...this.props} onChange={this.handleChange} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '40px' }}>
          <EditableInput {...this.props} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

const ColorPicker = CustomPicker<IPickerProps>(Picker);
const CustomColorPicker = withModuleClasses(ColorPicker, classes);

export default CustomColorPicker;
