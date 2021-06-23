<template>
  <ul :class="{ [theme]: theme }"
      class="galleriesExtract">
    <li v-for="(item, index) in items"
        :key="`${index}-image-extract`"
        class="galleriesExtract__item">
      <!-- Link -->
      <router-link
        :to="{ name: $enums.pages.GALLERY, params: { lang: cCurrentLanguage, seo: cSeo, slug: item.slug, id: item.id } }"
        class="galleriesExtract__link"
        @click.native="refreshNavmain">

        <!-- Image -->
        <img :src="item.file_name"
             :alt="item.slug"
             class="galleriesExtract__image"/>
      </router-link>
      <!-- / Link -->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GalleriesExtract',
  props: {
    items: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
$galleriesExtract: '.galleriesExtract';

#{$galleriesExtract} {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar {
  &#{$galleriesExtract} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    #{$galleriesExtract} {
      &__item {
        margin: 8px 0 0;
        width: calc(50% - 4px);
        display: inline-block;
        overflow: hidden;

        &:nth-child(1),
        &:nth-child(2) {
          margin-top: 0;
        }
      }

      &__image {
        vertical-align: middle;
        transform-origin: center;
        transition: transform .5s ease;
      }

      &__link {
        &:hover,
        &:focus {
          #{$galleriesExtract}__image {
            transform: scale(1.4);
          }
        }
      }
    }
  }
}
</style>
