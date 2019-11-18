import React from 'react';
import { imageResource } from '../resource/image-resource';

export const EagerImage = ({ src, alt, ...props }) => {
  imageResource.read(src);

  return <img src={src} alt={alt} {...props} />;
};
