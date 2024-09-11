import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, withModifiers, withDirectives, vModelText, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1, c as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4 } from "./AppLayout-wXEz5-tl.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Admin",
  __ssrInlineRender: true,
  props: { projects: Object },
  setup(__props) {
    const props = __props;
    const searchQuery = ref("");
    const hapus = (id) => {
      if (confirm("delete this Project")) {
        form.get(route("delete_project", id));
      }
    };
    const filteredProjects = computed(() => {
      return props.projects.filter((projects) => {
        return projects.project_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || projects.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "List Projects" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Projects </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Projects ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen bg-repeat" style="${ssrRenderStyle({ "background-image": "url('/img/bg-dashboard.png')" })}"${_scopeId}><div class="flex"${_scopeId}><div class="w-1/6 min-h-screen pt-10 bg-gray-200"${_scopeId}>`);
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
            _push2(`</div><div class="w-full"${_scopeId}><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-5"${_scopeId}><div class="w-1/2 sm:w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("create_projects"),
              class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Add Projects `);
                } else {
                  return [
                    createTextVNode(" Add Projects ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form${_scopeId}><div class="flex items-center px-4 py-2 text-sm w-60"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary" placeholder="Search"${_scopeId}></div></form></div><div class="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 content-stretch"${_scopeId}><!--[-->`);
            ssrRenderList(filteredProjects.value, (project) => {
              _push2(`<div class="grid grid-cols-1 gap-2 content-between rounded-md shadow-lg outline outline-2 outline-gray-300 h-auto bg-white mx-5 sm:mx-0"${_scopeId}><div class=""${_scopeId}><img${ssrRenderAttr("src", "../img/" + project.image)} alt="" class="h-40 w-full object-contain object-center"${_scopeId}><div class="px-4 mt-3"${_scopeId}><h1 class="text-xl mb-1 font-medium truncate"${_scopeId}>${ssrInterpolate(project.project_name)}</h1><p class="text-base text-justify line-clamp-3 leading-5 tracking-wide"${_scopeId}>${ssrInterpolate(project.desc)}</p></div></div><div class="pb-3 px-3 mx-5 sm:mx-0"${_scopeId}><div class="flex justify-center mt-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition",
                href: _ctx.route("listsurvey", project.slug)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Check Project `);
                  } else {
                    return [
                      createTextVNode(" Check Project ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (_ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin") {
                _push2(`<div class="relative inline-block text-left w-full"${_scopeId}><div class="flex justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, null, {
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
                      _push3(`<div class="py-1"${_scopeId2}><a class="${ssrRenderClass([_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"])}"${ssrRenderAttr("href", _ctx.route("edit_projects", project.id))}${_scopeId2}>Edit Project</a><a class="${ssrRenderClass([[_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"], "cursor-pointer"])}"${_scopeId2}>Hapus Project</a></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "py-1" }, [
                          createVNode("a", {
                            class: [_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"],
                            href: _ctx.route("edit_projects", project.id)
                          }, "Edit Project", 10, ["href"]),
                          createVNode("a", {
                            class: [[_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"], "cursor-pointer"],
                            onClick: ($event) => hapus(project.id)
                          }, "Hapus Project", 10, ["onClick"])
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
            _push2(`<!--]--></div></div></div></div></main>`);
          } else {
            return [
              createVNode("main", {
                class: "min-h-screen bg-repeat",
                style: { "background-image": "url('/img/bg-dashboard.png')" }
              }, [
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "w-1/6 min-h-screen pt-10 bg-gray-200" }, [
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
                    createVNode("div", { class: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-5" }, [
                        createVNode("div", { class: "w-1/2 sm:w-full" }, [
                          createVNode(_sfc_main$3, {
                            href: _ctx.route("create_projects"),
                            class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Add Projects ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(_ctx.submit, ["prevent"])
                        }, [
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
                        ], 40, ["onSubmit"])
                      ]),
                      createVNode("div", { class: "container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 content-stretch" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredProjects.value, (project) => {
                          return openBlock(), createBlock("div", {
                            key: project.id,
                            class: "grid grid-cols-1 gap-2 content-between rounded-md shadow-lg outline outline-2 outline-gray-300 h-auto bg-white mx-5 sm:mx-0"
                          }, [
                            createVNode("div", { class: "" }, [
                              createVNode("img", {
                                src: "../img/" + project.image,
                                alt: "",
                                class: "h-40 w-full object-contain object-center"
                              }, null, 8, ["src"]),
                              createVNode("div", { class: "px-4 mt-3" }, [
                                createVNode("h1", { class: "text-xl mb-1 font-medium truncate" }, toDisplayString(project.project_name), 1),
                                createVNode("p", { class: "text-base text-justify line-clamp-3 leading-5 tracking-wide" }, toDisplayString(project.desc), 1)
                              ])
                            ]),
                            createVNode("div", { class: "pb-3 px-3 mx-5 sm:mx-0" }, [
                              createVNode("div", { class: "flex justify-center mt-3" }, [
                                createVNode(_sfc_main$3, {
                                  class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition",
                                  href: _ctx.route("listsurvey", project.slug)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Check Project ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "relative inline-block text-left w-full"
                              }, [
                                createVNode("div", { class: "flex justify-end" }, [
                                  createVNode(_sfc_main$4, null, {
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
                                          href: _ctx.route("edit_projects", project.id)
                                        }, "Edit Project", 10, ["href"]),
                                        createVNode("a", {
                                          class: [[_ctx.active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"], "cursor-pointer"],
                                          onClick: ($event) => hapus(project.id)
                                        }, "Hapus Project", 10, ["onClick"])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ])) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
