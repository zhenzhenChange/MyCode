export default {
  props: { level: "" },
  /* render() {
    const tag = `h${this.level}`;
    return <tag>{this.$slots.default}</tag>;
  }, */
  render(h) {
    const tag = `h${this.level}`;
    return h(tag, {}, this.$slots.default);
  },
};
