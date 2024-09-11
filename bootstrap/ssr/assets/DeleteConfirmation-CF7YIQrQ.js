import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  props: {
    show: Boolean
  },
  emits: ["confirm", "cancel"],
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.show) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 flex items-center justify-center z-50" }, _attrs))}><div class="absolute inset-0 bg-gray-600 opacity-75"></div><div class="bg-white p-6 rounded-lg shadow-lg z-10"><h2 class="text-lg font-semibold text-gray-800 mb-4">Confirm deletion</h2><p class="text-gray-600 mb-6">Are you sure want to delete? This action cannot be undone.</p><div class="flex justify-end space-x-4"><button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"> Cancel </button><button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"> Delete </button></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DeleteConfirmation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DeleteConfirmation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  DeleteConfirmation as D
};
