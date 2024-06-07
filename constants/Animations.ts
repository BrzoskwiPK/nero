import { CustomAnimation } from 'react-native-animatable'

export const zoomIn: CustomAnimation = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
}

export const zoomOut = {
  0: {
    scaleX: 1,
    scaleY: 1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
}
