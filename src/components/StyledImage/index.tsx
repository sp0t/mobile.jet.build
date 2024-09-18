import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage, { FastImageProps, ResizeMode } from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';

import { images as Images } from '../../styles';

interface Props extends FastImageProps {
  resizeMode?: ResizeMode;
  images?: any[];
}

const StyledImage: React.FC<Props> = ({ style, resizeMode = 'contain', images = [], ...props }) => {
  const [visible, setIsVisible] = useState(false);

  images = images.map((img) => ({ uri: img }));

  const showImage = () => {
    if (images.length) {
      setIsVisible(true);
    }
  };

  const onRequestClose = () => {
    setIsVisible(false);
  };

  const imageComponent = () => <FastImage style={style} resizeMode={resizeMode} defaultSource={Images.Gallery} {...props} />;

  return (
    <>
      {images.length ? (
        <TouchableOpacity style={style} activeOpacity={0.8} onPress={showImage}>
          {imageComponent()}
        </TouchableOpacity>
      ) : (
        imageComponent()
      )}

      <ImageView images={images} imageIndex={0} visible={visible} onRequestClose={onRequestClose} />
    </>
  );
};

export default StyledImage;
