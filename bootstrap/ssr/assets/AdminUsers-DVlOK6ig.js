import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, withDirectives, vModelText, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, c as _sfc_main$2, b as _sfc_main$3 } from "./AppLayout-wXEz5-tl.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AdminUsers",
  __ssrInlineRender: true,
  props: {
    users: Array
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref("");
    const filteredUsers = computed(() => {
      return props.users.filter((user) => {
        return user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.usertype.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.team.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Admin Panel" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Admin Panel </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Admin Panel ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex"${_scopeId}><div class="w-1/6 min-h-screen pt-10 bg-gray-800"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("dashboard.admin"),
              active: _ctx.route().current("dashboard.admin")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Projects `);
                } else {
                  return [
                    createTextVNode(" Projects ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("dashboard.admin_users"),
              active: _ctx.route().current("dashboard.admin_users")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Users `);
                } else {
                  return [
                    createTextVNode(" Users ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-full"${_scopeId}><div class="max-w-7xl mx-auto py-9 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mx-3 mb-6"${_scopeId}><h2 class="font-semibold text-2xl border-b-4 border-gray-700"${_scopeId}> Users </h2><div class=""${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { align: "right" }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="inline-flex rounded-md"${_scopeId2}><button type="button" class="inline-flex items-center px-16 py-3 border border-primary text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"${_scopeId2}> Filter <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"${_scopeId2}></path></svg></button></span>`);
                } else {
                  return [
                    createVNode("span", { class: "inline-flex rounded-md" }, [
                      createVNode("button", {
                        type: "button",
                        class: "inline-flex items-center px-16 py-3 border border-primary text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
                      }, [
                        createTextVNode(" Filter "),
                        (openBlock(), createBlock("svg", {
                          class: "ms-2 -me-0.5 h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                          })
                        ]))
                      ])
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="block px-4 py-2 text-xs text-gray-400"${_scopeId2}> Filter Users </div><div class="flex items-center px-4 py-2 text-sm"${_scopeId2}><input type="text" class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "block px-4 py-2 text-xs text-gray-400" }, " Filter Users "),
                    createVNode("div", { class: "flex items-center px-4 py-2 text-sm" }, [
                      withDirectives(createVNode("input", {
                        type: "text",
                        class: "w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary",
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        placeholder: "Search"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full"${_scopeId}><table class="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed"${_scopeId}><thead class="text-xs text-white uppercase bg-primary"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 hidden sm:block"${_scopeId}>Name</th><th scope="col" class="px-6 py-3"${_scopeId}>Email</th><th scope="col" class="px-6 py-3"${_scopeId}>User Type</th><th scope="col" class="px-6 py-3"${_scopeId}>Team</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredUsers.value, (user) => {
              _push2(`<tr class="bg-white border-b hover:bg-gray-50"${_scopeId}><td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hidden sm:block"${_scopeId}>${ssrInterpolate(user.name)}</td><td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500 truncate"${_scopeId}>${ssrInterpolate(user.email)}</td><td class="px-6 py-4 truncate"${_scopeId}>${ssrInterpolate(user.usertype)}</td><td class="px-6 py-4 truncate"${_scopeId}>${ssrInterpolate(user.team)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex" }, [
                createVNode("div", { class: "w-1/6 min-h-screen pt-10 bg-gray-800" }, [
                  createVNode(_sfc_main$2, {
                    href: _ctx.route("dashboard.admin"),
                    active: _ctx.route().current("dashboard.admin")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Projects ")
                    ]),
                    _: 1
                  }, 8, ["href", "active"]),
                  createVNode(_sfc_main$2, {
                    href: _ctx.route("dashboard.admin_users"),
                    active: _ctx.route().current("dashboard.admin_users")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Users ")
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("div", { class: "w-full" }, [
                  createVNode("div", { class: "max-w-7xl mx-auto py-9 sm:px-6 lg:px-8" }, [
                    createVNode("div", { class: "flex justify-between items-center mx-3 mb-6" }, [
                      createVNode("h2", { class: "font-semibold text-2xl border-b-4 border-gray-700" }, " Users "),
                      createVNode("div", { class: "" }, [
                        createVNode(_sfc_main$3, { align: "right" }, {
                          trigger: withCtx(() => [
                            createVNode("span", { class: "inline-flex rounded-md" }, [
                              createVNode("button", {
                                type: "button",
                                class: "inline-flex items-center px-16 py-3 border border-primary text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
                              }, [
                                createTextVNode(" Filter "),
                                (openBlock(), createBlock("svg", {
                                  class: "ms-2 -me-0.5 h-4 w-4",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  })
                                ]))
                              ])
                            ])
                          ]),
                          content: withCtx(() => [
                            createVNode("div", { class: "block px-4 py-2 text-xs text-gray-400" }, " Filter Users "),
                            createVNode("div", { class: "flex items-center px-4 py-2 text-sm" }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                class: "w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary",
                                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                                placeholder: "Search"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, searchQuery.value]
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "relative overflow-x-auto shadow-md sm:rounded-lg w-full" }, [
                      createVNode("table", { class: "w-full text-sm text-left rtl:text-right text-gray-500 table-fixed" }, [
                        createVNode("thead", { class: "text-xs text-white uppercase bg-primary" }, [
                          createVNode("tr", null, [
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 hidden sm:block"
                            }, "Name"),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3"
                            }, "Email"),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3"
                            }, "User Type"),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3"
                            }, "Team")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredUsers.value, (user) => {
                            return openBlock(), createBlock("tr", {
                              key: user.id,
                              class: "bg-white border-b hover:bg-gray-50"
                            }, [
                              createVNode("td", {
                                scope: "row",
                                class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap hidden sm:block"
                              }, toDisplayString(user.name), 1),
                              createVNode("td", { class: "px-6 py-4 font-medium text-gray-900 sm:text-gray-500 truncate" }, toDisplayString(user.email), 1),
                              createVNode("td", { class: "px-6 py-4 truncate" }, toDisplayString(user.usertype), 1),
                              createVNode("td", { class: "px-6 py-4 truncate" }, toDisplayString(user.team), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/AdminUsers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
