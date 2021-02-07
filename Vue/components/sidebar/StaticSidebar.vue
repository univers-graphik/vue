<template>
  <aside class="floatingCol--small floatingCol--spacerRight is-noMobile">
    <!-- Info CMS -->
    <div class="sidebar__item">
      <!-- Img -->
      <img src="/medias/interface/cms-info.jpg"
           alt="CMS"/>
      <!-- Icon -->
      <i class="icon-maintenance sidebar__iconInfo"></i>

      <div class="sidebar__content">
        <!-- Title -->
        <h2 class="sidebar__title">CMS 2.0</h2>
        <!-- Content -->
        <i18n path="staticSidebar.content-1"
              tag="p"
              class="is-margin-0">
          <template v-slot:line-break>
            <br/>
          </template>
        </i18n>
      </div>
    </div>
    <!-- / Info CMS -->

    <!-- Gallery extract -->
    <div v-if="$enums.config.GALLERY && $store.state.gallery.itemsExtract.length"
         class="sidebar__item">
      <div class="sidebar__content">
        <!-- Title -->
        <h2 class="sidebar__title">{{ $t('common.galleries') }}</h2>
        <!-- Gallery -->
        <GalleriesExtract :items="$store.state.gallery.itemsExtract"
                          theme="sidebar"/>
      </div>
    </div>
    <!-- / Gallery extract -->
  </aside>
</template>

<script>
import GalleriesExtract from '@Components/gallery/GalleriesExtract'

export default {
  name: 'StaticSidebar',
  components: {
    GalleriesExtract
  }
}
</script>
