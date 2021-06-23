<template>
  <div>
    <!-- Twitter -->
    <a v-if="$store.state.contactInformation.twitterUrl"
       :href="$store.state.contactInformation.twitterUrl"
       :title="$t('common.followTwitter')"
       :class="{ [additionalClass]: additionalClass }"
       class="followUs followUs--twitter"
       target="_blank">
      <slot name="icon-twitter">
        <i class="icon-twitter-disc"></i>
      </slot>
    </a>
    <!-- / Twitter -->

    <!-- Facebook -->
    <a v-if="$store.state.contactInformation.facebookUrl"
       :href="$store.state.contactInformation.facebookUrl"
       :title="$t('common.followFacebook')"
       :class="{ [additionalClass]: additionalClass }"
       class="followUs followUs--facebook"
       target="_blank">
      <slot name="icon-facebook">
        <i class="icon-facebook-disc"></i>
      </slot>
    </a>
    <!-- / Facebook -->

    <!-- Pinterest -->
    <a v-if="$store.state.contactInformation.pinterestUrl"
       :href="$store.state.contactInformation.pinterestUrl"
       :title="$t('common.followPinterest')"
       :class="{ [additionalClass]: additionalClass }"
       class="followUs followUs--pinterest"
       target="_blank">
      <slot name="icon-pinterest">
        <i class="icon-pinterest-disc"></i>
      </slot>
    </a>
    <!-- / Pinterest -->

    <!-- Linkedin -->
    <a v-if="$store.state.contactInformation.linkedinUrl"
       :href="$store.state.contactInformation.linkedinUrl"
       :title="$t('common.followLinkedin')"
       :class="{ [additionalClass]: additionalClass }"
       class="followUs followUs--linkedin"
       target="_blank">
      <slot name="icon-linkedin">
        <i class="icon-linkedin-disc"></i>
      </slot>
    </a>
    <!-- / Linkedin -->
  </div>
</template>

<script>
export default {
  name: 'FollowUs',
  props: {
    additionalClass: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
$followUs: '.followUs';

#{$followUs} {
  margin-top: 10px;
  text: {
    decoration: none;
    align: center;
  }
  color: currentColor;

  &:not([class*="buttonType"]) {
    transition: color .5s ease;

    [class*="icon-"] {
      display: inline-block;
      font-size: rem(40);
    }

    &#{$followUs}--twitter {
      &:hover,
      &:focus {
        color: $twitterColor;
      }
    }

    &#{$followUs}--facebook {
      &:hover,
      &:focus {
        color: $facebookColor;
      }
    }

    &#{$followUs}--pinterest {
      &:hover,
      &:focus {
        color: $pinterestColor;
      }
    }

    &#{$followUs}--linkedin {
      &:hover,
      &:focus {
        color: $linkedinColor;
      }
    }

    &:hover {
      @media #{$isHoverNone} {
        color: currentColor;
      }
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
