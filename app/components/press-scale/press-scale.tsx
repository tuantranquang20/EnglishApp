import React from "react";
import PropTypes from "prop-types";
import {
  TouchableWithoutFeedback,
  Animated,
  ViewPropTypes,
} from "react-native";

export class PressScale extends React.Component {
  constructor(...args) {
    super(...args);
    const props = this.props;

    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.scaleAnimation = new Animated.Value(props.defaultScale);
  }

  render() {
    const props = this.props;

    return (
      <TouchableWithoutFeedback
        {...props}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View
          style={[
            props.style,
            {
              transform: [{ scale: this.scaleAnimation }],
            },
          ]}
        >
          {props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  onPressIn(...args) {
    const props = this.props;
    const tension =
      typeof props.pressInTension !== "undefined"
        ? props.pressInTension
        : props.tension;
    const friction =
      typeof props.pressInFriction !== "undefined"
        ? props.pressInFriction
        : props.friction;

    Animated.spring(this.scaleAnimation, {
      toValue: props.activeScale,
      tension: tension,
      friction: friction,
      useNativeDriver: props.useNativeDriver,
    }).start();

    if (props.onPressIn) {
      props.onPressIn(...args);
    }
  }

  onPressOut(...args) {
    const props = this.props;
    const tension =
      typeof props.pressOutTension !== "undefined"
        ? props.pressOutTension
        : props.tension;
    const friction =
      typeof props.pressOutFriction !== "undefined"
        ? props.pressOutFriction
        : props.friction;

    Animated.spring(this.scaleAnimation, {
      toValue: props.defaultScale,
      tension: tension,
      friction: friction,
      useNativeDriver: props.useNativeDriver,
    }).start();

    if (props.onPressOut) {
      props.onPressOut(...args);
    }
  }
}

PressScale.propTypes = {
  ...TouchableWithoutFeedback.propTypes,
  style: ViewPropTypes.style,
  defaultScale: PropTypes.number.isRequired,
  activeScale: PropTypes.number.isRequired,
  tension: PropTypes.number.isRequired,
  friction: PropTypes.number.isRequired,
  pressInTension: PropTypes.number,
  pressInFriction: PropTypes.number,
  pressOutTension: PropTypes.number,
  pressOutFriction: PropTypes.number,
  useNativeDriver: PropTypes.bool,
};

PressScale.defaultProps = {
  defaultScale: 1,
  activeScale: 0.9,
  tension: 150,
  friction: 3,
  useNativeDriver: true,
};
