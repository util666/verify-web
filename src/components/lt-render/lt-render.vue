<script>
import {h} from "vue";

export default {
  name: "lt-render",
  props: {
    data:Object,
    render: Function,
  },
  setup(props, context) {
    return () => {
      return h(props.render(props.data))
    }
  }

}
</script>

<style lang="scss" scoped>

</style>