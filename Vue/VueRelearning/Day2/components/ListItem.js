export default {
  props: ["render", "item"],
  render(h) {
    return this.render(h, this.item);
  },
};
