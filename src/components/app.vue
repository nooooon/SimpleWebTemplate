<template>
<div>
  <div>App</div>
  <div>{{ text }}{{ count }}</div>
  <input type="button" v-bind:value="label" v-on:click="click()" value="ボタン">

  <div id="example">
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
</div>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props   : ['label'],
  computed: {
    reversedMessage: function () {
      console.log(this);
      return this.text.split('').reverse().join('')
    }
  },
  watch: {

  },
  beforeCreate: function () {
    console.log("E:beforeCreate");
  },
  created: function () {
    console.log("E:created");
  },
  beforeMount: function () {
    console.log("E:beforeMount");
  },
  mounted: function () {
    console.log("E:mounted");
  },
  beforeUpdate: function () {
    console.log("E:beforeUpdate");
  },
  updated: function () {
    console.log("E:updated");
  },
  beforeDestroy: function () {
    console.log("E:beforeDestroy");
  },
  destroyed: function () {
    console.log("E:destroyed");
  },
  methods: {

  }
})
export default class App2 extends Vue {
  count:number = 0;
  text:string = "Hello";

  click() {
    this.count++;
  }
}

</script>

<style lang="scss" scoped>
  
  div {
    color: #8595e0;
  }
</style>