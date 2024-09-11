import { resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-wXEz5-tl.js";
import { _ as _sfc_main$3 } from "./PrimaryButton-CZ4pYQi_.js";
import { _ as _sfc_main$2 } from "./TextInput-CTvmmegX.js";
import "./biodata-D12r2scr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EditBio",
  __ssrInlineRender: true,
  props: {
    surveys: Object,
    projects: Object,
    clients: Object,
    user: Object,
    biodata: Object
  },
  setup(__props) {
    const props = __props;
    const project = props.projects[0];
    const client = props.clients[0];
    const bio = props.biodata[0];
    const form = useForm({
      nama: bio["nama_responden"],
      alamat: bio["alamat"],
      no_hp: bio["no_hp"],
      instansi: bio["instansi"],
      project_slug: project["slug"],
      client_slug: client["slug"]
    });
    const submit = () => {
      form.put(route("update_bio", [form.client_slug, form.project_slug, props.surveys.id, props.user.id]));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputError = resolveComponent("InputError");
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Edit BIodata" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen" data-v-b0ca869c${_scopeId}><div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8" data-v-b0ca869c${_scopeId}><div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md" data-v-b0ca869c${_scopeId}><h2 data-v-b0ca869c${_scopeId}>a</h2></div><div class="bg-white rounded-b-md" data-v-b0ca869c${_scopeId}><div class="border-b-2 p-5 border-gray-500" data-v-b0ca869c${_scopeId}><p class="text-base text-justify line-clamp-3" data-v-b0ca869c${_scopeId}></p><div class="p-5 my-2 border-2 border-gray-400" data-v-b0ca869c${_scopeId}><h2 class="font-semibold text-lg" data-v-b0ca869c${_scopeId}>Biodata</h2></div></div><form enctype="multipart/form-data" data-v-b0ca869c${_scopeId}><div class="relative px-5 mt-3" data-v-b0ca869c${_scopeId}><label for="" data-v-b0ca869c${_scopeId}>Nama</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).nama,
              "onUpdate:modelValue": ($event) => unref(form).nama = $event,
              type: "text",
              placeholder: "Nama",
              class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputError, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 relative px-5" data-v-b0ca869c${_scopeId}><label for="" data-v-b0ca869c${_scopeId}>Alamat</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).alamat,
              "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
              type: "text",
              placeholder: "Alamat",
              class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputError, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 relative px-5" data-v-b0ca869c${_scopeId}><label for="" data-v-b0ca869c${_scopeId}>Nomor Handphone</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).no_hp,
              "onUpdate:modelValue": ($event) => unref(form).no_hp = $event,
              type: "number",
              placeholder: "No Hp",
              class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputError, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 relative px-5" data-v-b0ca869c${_scopeId}><label for="" data-v-b0ca869c${_scopeId}>Nama Instansi</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).instansi,
              "onUpdate:modelValue": ($event) => unref(form).instansi = $event,
              type: "text",
              placeholder: "Instansi",
              class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputError, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="pt-5 flex justify-center" data-v-b0ca869c${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: ["w-1/2 my-5 p-5 justify-center", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Konfirmasi Biodata `);
                } else {
                  return [
                    createTextVNode(" Konfirmasi Biodata ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></main>`);
          } else {
            return [
              createVNode("main", { class: "min-h-screen" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md" }, [
                    createVNode("h2", null, "a")
                  ]),
                  createVNode("div", { class: "bg-white rounded-b-md" }, [
                    createVNode("div", { class: "border-b-2 p-5 border-gray-500" }, [
                      createVNode("p", { class: "text-base text-justify line-clamp-3" }),
                      createVNode("div", { class: "p-5 my-2 border-2 border-gray-400" }, [
                        createVNode("h2", { class: "font-semibold text-lg" }, "Biodata")
                      ])
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      enctype: "multipart/form-data"
                    }, [
                      createVNode("div", { class: "relative px-5 mt-3" }, [
                        createVNode("label", { for: "" }, "Nama"),
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).nama,
                          "onUpdate:modelValue": ($event) => unref(form).nama = $event,
                          type: "text",
                          placeholder: "Nama",
                          class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_InputError, {
                          class: "mt-2",
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative px-5" }, [
                        createVNode("label", { for: "" }, "Alamat"),
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).alamat,
                          "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                          type: "text",
                          placeholder: "Alamat",
                          class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_InputError, {
                          class: "mt-2",
                          message: unref(form).errors.email
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative px-5" }, [
                        createVNode("label", { for: "" }, "Nomor Handphone"),
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).no_hp,
                          "onUpdate:modelValue": ($event) => unref(form).no_hp = $event,
                          type: "number",
                          placeholder: "No Hp",
                          class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_InputError, {
                          class: "mt-2",
                          message: unref(form).errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative px-5" }, [
                        createVNode("label", { for: "" }, "Nama Instansi"),
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).instansi,
                          "onUpdate:modelValue": ($event) => unref(form).instansi = $event,
                          type: "text",
                          placeholder: "Instansi",
                          class: "block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_InputError, {
                          class: "mt-2",
                          message: unref(form).errors.password_confirmation
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "pt-5 flex justify-center" }, [
                        createVNode(_sfc_main$3, {
                          class: ["w-1/2 my-5 p-5 justify-center", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Konfirmasi Biodata ")
                          ]),
                          _: 1
                        }, 8, ["class", "disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/Surveys/EditBio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EditBio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b0ca869c"]]);
export {
  EditBio as default
};
