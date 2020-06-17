<template>
  <div class="admin-header">
    <nuxt-link
      :to="{
        name: 'admin'
      }"
      class="tag"
    >
      <h1>LATEST RECIPES</h1>
    </nuxt-link>
    <nuxt-link
      :to="{
        name: 'admin-edit'
      }"
      class="tag"
    >
      <h1>EDIT RECIPES</h1>
    </nuxt-link>
    <nuxt-link
      :to="{
        name: 'admin-edit-slug',
        params: { slug: 'addnew' }
      }"
      class="tag"
    >
      <h1>ADD NEW</h1>
    </nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.admin-header {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  .tag {
    font-size: $text-ss;
    font-weight: $bold-body-font-weight;
    line-height: 1;
    padding: 0.5rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    border-radius: 0.25rem;
    box-shadow: $small-shadow;
    &:hover {
      background: $hovered-surface-color;
    }
    &:active {
      background: transparent;
      box-shadow: $small-inner-shadow;
    }
  }
}
</style>
