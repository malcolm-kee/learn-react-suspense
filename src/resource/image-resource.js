import { createResource } from './create-resource';

/**
 *
 * @param {string} src
 */
const loadImage = src => {
  const image = new Image();
  return new Promise((fulfill, reject) => {
    image.onload = fulfill;
    image.onerror = reject;
    image.src = src;
  });
};

export const imageResource = createResource(loadImage);
