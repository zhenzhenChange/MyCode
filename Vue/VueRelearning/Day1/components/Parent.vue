<template>
  <div>
    Parent {{ money }} --- {{ son }}
    <Son :money="money" @changeValue="change" @brodcast="say"></Son>
    <br />
    <Son :value="value" name="xiao" @son="onSon" ref="zhenzhenSon"></Son>
    <Son2></Son2>
  </div>
</template>

<script>
import Son from "./Son";
import Son2 from "./Son2";
export default {
  components: { Son, Son2 },
  provide() {
    return {
      parentValue: this,
      provideValue: "云控",
    };
  },
  data: () => ({
    money: 1000,
    value: 555,
    son: "zhenzhen",
    isSmoke: "true",
  }),
  mounted() {
    this.$refs.zhenzhenSon.refSon();
  },
  methods: {
    change(value) {
      this.money = value;
    },
    say() {
      console.log("Hello");
    },
    onSon() {
      console.log("listeners");
    },
  },
};
</script>
