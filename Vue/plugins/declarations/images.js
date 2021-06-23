const mediasPath = '/medias/interface/'
const defaultFolder = 'default/'
const errorFolder = 'error/'
const loaderFolder = 'loader/'

export default Object.freeze({
  NEWS_DEFAULT: `${mediasPath}${defaultFolder}news-default-400-400.jpg`,
  NEWS_PAGINATION_DEFAULT: `${mediasPath}${defaultFolder}news-default-100-60.jpg`,
  PRODUCT_DEFAULT: `${mediasPath}${defaultFolder}product-default-400-500.jpg`,
  ERROR_200x200: `${mediasPath}${errorFolder}image-error-200-200.gif`,
  ERROR_400x400: `${mediasPath}${errorFolder}image-error-400-400.gif`,
  ERROR_400x500: `${mediasPath}${errorFolder}image-error-400-500.gif`,
  ERROR_600x240: `${mediasPath}${errorFolder}image-error-600-240.gif`,
  ERROR_2000x500: `${mediasPath}${errorFolder}image-error-2000-500.gif`,
  LOADER: `${mediasPath}${loaderFolder}image-loader.svg`,
  LOADER_XS: `${mediasPath}${loaderFolder}image-loader-xs.svg`,
  LOADER_BLUE: `${mediasPath}${loaderFolder}image-loader-blue.svg`
})
