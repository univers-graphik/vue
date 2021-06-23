export default Object.freeze({
  // Pages
  PAGE_CONTENT: '/{{lang}}/pages/{{id}}', // GET
  // Panoramics
  PANORAMICS: '/panoramics/{{id}}/image', // GET (with params [type])
  // Contact form
  CONTACT_FORM: '/contact-form', // POST
  // Meta description
  META_DESCRIPTION: '/{{lang}}/meta-description', // GET
  // Society description
  SOCIETY_DESCRIPTION: '/{{lang}}/society-description', // GET
  // Contact information
  CONTACT_INFORMATION: '/contact-information', // GET
  // Customization
  CUSTOMIZATION: '/customization', // GET
  // Navmain
  NAVMAIN: '/{{lang}}/navmain', // GET
  // Gallery page
  GALLERY_PAGE: '/gallery-page/{{id}}', // GET
  // Slideshow homepage
  GALLERY_HOMEPAGE: '/gallery-homepage', // GET
  // Galleries
  GALLERIES: '/{{lang}}/galleries/page={{page}}', // GET
  // Gallery
  GALLERY: '/{{lang}}/galleries/{{id}}', // GET
  // Galleries extract
  GALLERIES_EXTRACT: '/{{lang}}/galleries-extract', // GET
  // News list
  NEWS_LIST: '/{{lang}}/news-list/page={{page}}', // GET
  // News
  NEWS: '/{{lang}}/news/{{id}}', // GET
  // News pagination
  NEWS_PAGINATION: '/{{lang}}/news-pagination/{{id}}', // GET
  // Lead News
  LEAD_NEWS: '/{{lang}}/lead-news', // GET
  // Last News
  LAST_NEWS: '/{{lang}}/last-news', // GET
  // Sidebar
  SIDEBAR: '/{{lang}}/sidebar/{{target}}', // GET
  // Search engine
  SEARCH: '/{{lang}}/content/search' // GET (with params [term])
})
