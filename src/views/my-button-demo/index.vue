<template>
  <section>
    <my-button @click="handleClick"></my-button>
    <bb-test/>
    <bb-input :maxlength="3"/>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MyButtonDemo extends Vue {
  handleClick() {
    console.log(1);
  }
}
</script>
