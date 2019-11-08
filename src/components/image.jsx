import React from 'react';

const imageMap = new Map();
const imageResource = {
  read: src => {
    if (imageMap.has(src)) {
      const [promise, status, error] = imageMap.get(src);
      if (status === 'success') {
        return;
      }
      if (error) {
        throw error;
      }
      throw promise;
    }
    const image = new Image();
    const data = [null, null, null];
    const promise = new Promise((fulfill, reject) => {
      image.onload = () => {
        data[1] = 'success';
        fulfill();
      };
      image.onerror = err => {
        data[1] = 'error';
        data[2] = err;
        reject(err);
      };
    });
    image.src = src;
    data[0] = promise;
    imageMap.set(src, data);
    throw promise;
  }
};

export const LazyImage = ({ src, alt, ...props }) => {
  imageResource.read(src);

  return <img src={src} alt={alt} {...props} />;
};
