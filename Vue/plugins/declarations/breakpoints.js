export default Object.freeze({
  MOBILE: (window.matchMedia('(max-device-width: 767px)').matches, window.matchMedia('(max-width: 767px)').matches),
  TABLET_PORTRAIT: window.matchMedia('(max-width: 768px)').matches
})
