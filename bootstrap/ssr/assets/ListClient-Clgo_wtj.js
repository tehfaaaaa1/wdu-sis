import { ref, computed, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./AppLayout-wXEz5-tl.js";
import "./PrimaryButton-CZ4pYQi_.js";
import { D as DeleteConfirmation } from "./DeleteConfirmation-CF7YIQrQ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ListClient",
  __ssrInlineRender: true,
  props: { clients: Object },
  setup(__props) {
    const props = __props;
    const showDeleteModal = ref(false);
    const selectedClientId = ref(null);
    const searchQuery = ref("");
    const form = useForm({
      search: ""
    });
    const hapus = (id) => {
      selectedClientId.value = id;
      showDeleteModal.value = true;
    };
    const confirmDeletion = () => {
      form.get(route("delete_client", selectedClientId.value), {
        onFinish: () => {
          showDeleteModal.value = false;
        }
      });
    };
    const cancelDeletion = () => {
      showDeleteModal.value = false;
    };
    const filteredClients = computed(() => {
      return props.clients.filter((clients) => {
        return clients.client_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || clients.alamat.toLowerCase().includes(searchQuery.value.toLowerCase()) || clients.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "List Clients" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen bg-repeat bg-[(&#39;/img/bg-dashboard.png&#39;)]"${_scopeId}><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-5"${_scopeId}><div class="w-1/2 sm:w-full"${_scopeId}>`);
            if (_ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin") {
              _push2(ssrRenderComponent(_sfc_main$2, {
                href: _ctx.route("create_client_page"),
                class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Add Clients `);
                  } else {
                    return [
                      createTextVNode(" Add Clients ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center px-4 py-2 text-sm w-60"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary" placeholder="Search"${_scopeId}></div></div><div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center content-stretch"${_scopeId}><!--[-->`);
            ssrRenderList(filteredClients.value, (client) => {
              _push2(`<div class="${ssrRenderClass(client.id == _ctx.$page.props.auth.user.client_id || _ctx.$page.props.auth.user.usertype === "superadmin" ? "grid grid-cols-1 gap-2 content-between rounded-md shadow-lg outline outline-2 outline-gray-300 h-auto bg-white mx-5 sm:mx-0" : "hidden")}"${_scopeId}><div class=""${_scopeId}><img${ssrRenderAttr("src", "../img/" + client.image)} alt="" class="h-40 w-full object-scale-down border-b-1 border-gray-400"${_scopeId}><div class="px-4 mt-3"${_scopeId}><h1 class="text-xl mb-1 font-medium truncate"${_scopeId}>${ssrInterpolate(client.client_name)}</h1><div class="flex items-center mb-1.5 gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-gray-500"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"${_scopeId}></path></svg><h1 class="text-base font-medium truncate text-gray-500"${_scopeId}>${ssrInterpolate(client.alamat)}</h1></div><p class="text-lg md:text-base text-justify line-clamp-3 leading-5 tracking-wide text-gray-600"${_scopeId}>${ssrInterpolate(client.desc)}</p></div></div><div class="pb-3 px-3 mx-5 sm:mx-0"${_scopeId}><div class="flex justify-center mt-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition mr-4",
                href: _ctx.route("profile_client", client.id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Profile `);
                  } else {
                    return [
                      createTextVNode(" Profile ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition",
                href: _ctx.route("projects", client.slug)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` See Projects `);
                  } else {
                    return [
                      createTextVNode(" See Projects ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (_ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin") {
                _push2(`<div class="relative inline-block text-left w-full"${_scopeId}><div class="flex justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$3, null, {
                  trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-pointer"${_scopeId2}><div class="flex"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 right-0"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"${_scopeId2}></path></svg></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-pointer" }, [
                          createVNode("div", { class: "flex" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "size-6 right-0"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              })
                            ]))
                          ])
                        ])
                      ];
                    }
                  }),
                  content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="py-1"${_scopeId2}><a class="${ssrRenderClass([_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"])}"${ssrRenderAttr("href", _ctx.route("edit_client", client.id))}${_scopeId2}>Edit Client</a><a class="${ssrRenderClass([[_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"], "cursor-pointer"])}"${_scopeId2}>Delete Client</a></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "py-1" }, [
                          createVNode("a", {
                            class: [_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"],
                            href: _ctx.route("edit_client", client.id)
                          }, "Edit Client", 10, ["href"]),
                          createVNode("a", {
                            class: [[_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"], "cursor-pointer"],
                            onClick: ($event) => hapus(client.id)
                          }, "Delete Client", 10, ["onClick"])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div></main>`);
            _push2(ssrRenderComponent(DeleteConfirmation, {
              show: showDeleteModal.value,
              onConfirm: confirmDeletion,
              onCancel: cancelDeletion
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("main", { class: "min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-5" }, [
                    createVNode("div", { class: "w-1/2 sm:w-full" }, [
                      _ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin" ? (openBlock(), createBlock(_sfc_main$2, {
                        key: 0,
                        href: _ctx.route("create_client_page"),
                        class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Add Clients ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex items-center px-4 py-2 text-sm w-60" }, [
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        class: "w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary",
                        placeholder: "Search"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center content-stretch" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredClients.value, (client) => {
                      return openBlock(), createBlock("div", {
                        key: client.id,
                        class: client.id == _ctx.$page.props.auth.user.client_id || _ctx.$page.props.auth.user.usertype === "superadmin" ? "grid grid-cols-1 gap-2 content-between rounded-md shadow-lg outline outline-2 outline-gray-300 h-auto bg-white mx-5 sm:mx-0" : "hidden"
                      }, [
                        createVNode("div", { class: "" }, [
                          createVNode("img", {
                            src: "../img/" + client.image,
                            alt: "",
                            class: "h-40 w-full object-scale-down border-b-1 border-gray-400"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "px-4 mt-3" }, [
                            createVNode("h1", { class: "text-xl mb-1 font-medium truncate" }, toDisplayString(client.client_name), 1),
                            createVNode("div", { class: "flex items-center mb-1.5 gap-1" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "1.5",
                                stroke: "currentColor",
                                class: "size-5 text-gray-500"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                }),
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                })
                              ])),
                              createVNode("h1", { class: "text-base font-medium truncate text-gray-500" }, toDisplayString(client.alamat), 1)
                            ]),
                            createVNode("p", { class: "text-lg md:text-base text-justify line-clamp-3 leading-5 tracking-wide text-gray-600" }, toDisplayString(client.desc), 1)
                          ])
                        ]),
                        createVNode("div", { class: "pb-3 px-3 mx-5 sm:mx-0" }, [
                          createVNode("div", { class: "flex justify-center mt-3" }, [
                            createVNode(_sfc_main$2, {
                              class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition mr-4",
                              href: _ctx.route("profile_client", client.id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Profile ")
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode(_sfc_main$2, {
                              class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition",
                              href: _ctx.route("projects", client.slug)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" See Projects ")
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          _ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative inline-block text-left w-full"
                          }, [
                            createVNode("div", { class: "flex justify-end" }, [
                              createVNode(_sfc_main$3, null, {
                                trigger: withCtx(() => [
                                  createVNode("div", { class: "inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-pointer" }, [
                                    createVNode("div", { class: "flex" }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        "stroke-width": "1.5",
                                        stroke: "currentColor",
                                        class: "size-6 right-0"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        })
                                      ]))
                                    ])
                                  ])
                                ]),
                                content: withCtx(() => [
                                  createVNode("div", { class: "py-1" }, [
                                    createVNode("a", {
                                      class: [_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"],
                                      href: _ctx.route("edit_client", client.id)
                                    }, "Edit Client", 10, ["href"]),
                                    createVNode("a", {
                                      class: [[_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"], "cursor-pointer"],
                                      onClick: ($event) => hapus(client.id)
                                    }, "Delete Client", 10, ["onClick"])
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ], 2);
                    }), 128))
                  ])
                ])
              ]),
              createVNode(DeleteConfirmation, {
                show: showDeleteModal.value,
                onConfirm: confirmDeletion,
                onCancel: cancelDeletion
              }, null, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/ListClient.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
