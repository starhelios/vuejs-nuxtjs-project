<template>
  <label
    :class="[
      'Checkbox',
      'v-label',
      'theme--light',
      'w-100',
      {
        'hasError': errorMessage
      }
    ]"
  >
    <div class="d-flex">
      <div class="d-flex align-center w-100">
        <input
          v-model="scopedValue"
          class="Checkbox-input"
          type="checkbox"
        >
        <div
          class="Checkbox-rectange"
        />
        <!-- eslint-disable vue/no-v-html -->
        <span
          class="Checkbox-text"
          :class="[
            {
              'error--text': errorMessage,
            }
          ]"
          v-html="text"
        />
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="errorMessage"
        class="Checkbox-errorMessage"
        v-html="errorMessage"
      />
    </div>
  </label>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: ''
    },
    errorMessage: {
      type: String,
      required: false,
      default: ''
    }
  },

  data() {
    return {
      scopedValue: false
    }
  },

  watch: {
    scopedValue(newVal) {
      const toggleCheckboxName = (item) => {
        if (item === this.$attrs.name) {
          return this.scopedValue
        } else {
          return true
        }
      }

      const value = [
        ...this.$attrs.value,
        this.$attrs.name
      ].filter(toggleCheckboxName)

      this.$emit('input', value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.Checkbox
  position relative
  display flex
  cursor pointer
  &-rectange
    width 13px
    height 13px
    padding 3px
    box-sizing border-box
    display flex
    align-items center
    justify-content center
    border 2px solid #edb248
    transition border .3s ease
    background-position center center
  &.hasError
    .Checkbox-rectange
      outline 2px solid red
      outline-offset 0.5px
  &-input
    -webkit-appearance none
    -moz-appearance none
    &:checked + .Checkbox-rectange
      border-color transparent
      //background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAAEhcmxxAAAAAXNSR0IArs4c6QAAAN5JREFUKBVj/A8EDEDABCLAACTC9PVcFwMjTO7dFl8EB6QGqhisEcL59XgPWDNcD5iHRIC1/H5+hOHD3niGDzvDGf59fYZfB36jkIyGMxF+AAp9Pd/N8O1iP0QS5JP3O8L//3y44//7PfEgLhgwwBhvN3nAmGAap+U4JeCuQGOgOApNjuH/n68Mf16dYfj/+wtcCq7hz9tLDO82ezL8eX8dLPn91hKGD7vjGb7dWADkQwIfJIHipB93VjF8v7kUGEcsDIzM7Aw8JlUMLEI6IHVwgKIBLoqHAXcSHjUoUgAETIw3GApcxQAAAABJRU5ErkJggg==') no-repeat center center
      background url('/img/checked.png') no-repeat center center
  &-text
    font-family Georgia, serif !important
    font-size 14px !important
    font-weight normal
    color black
    margin-left 10px
    line-height 20px
    width fit-content
  &-errorMessage
    margin-top 5px
    font-size 12px
    font-weight normal
    color #dd2c00
    margin-left -2px
</style>
