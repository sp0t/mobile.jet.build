import { Platform } from 'react-native';

import { ios } from '../styles/devices';

export default ios && Number(Platform.Version) >= 13;
