import { ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AppLayout-wXEz5-tl.js";
import "./PrimaryButton-CZ4pYQi_.js";
import { D as DeleteConfirmation } from "./DeleteConfirmation-CF7YIQrQ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ListProjects",
  __ssrInlineRender: true,
  props: { projects: Object, clients: Object },
  setup(__props) {
    const props = __props;
    const showDeleteModal = ref(false);
    const selectedProjectId = ref(null);
    const searchQuery = ref("");
    const form = useForm({
      search: ""
    });
    const client = props.clients[0];
    const clientSlug = client.slug;
    client.image;
    const hapus = (slug, id) => {
      selectedProjectId.value = id;
      showDeleteModal.value = true;
    };
    const confirmDeletion = () => {
      form.get(route("delete_project", [clientSlug, selectedProjectId.value]), {
        onFinish: () => {
          showDeleteModal.value = false;
        }
      });
    };
    const cancelDeletion = () => {
      showDeleteModal.value = false;
    };
    const filteredProjects = computed(() => {
      return props.projects.filter((projects) => {
        return projects.project_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || projects.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "List Project" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("listclient"),
              class: "!p-0 focus:!border-0 !m-0 !font-semibold !text-lg text-ijo-terang"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-black"${_scopeId2}>Client </span> ${ssrInterpolate(unref(client).client_name)}`);
                } else {
                  return [
                    createVNode("span", { class: "text-black" }, "Client "),
                    createTextVNode(" " + toDisplayString(unref(client).client_name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                href: _ctx.route("listclient"),
                class: "!p-0 focus:!border-0 !m-0 !font-semibold !text-lg text-ijo-terang"
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "text-black" }, "Client "),
                  createTextVNode(" " + toDisplayString(unref(client).client_name), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen bg-repeat bg-[(&#39;/img/bg-dashboard.png&#39;)]"${_scopeId}><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-5"${_scopeId}><div class="w-1/2 sm:w-full"${_scopeId}>`);
            if (_ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin") {
              _push2(ssrRenderComponent(_sfc_main$2, {
                href: _ctx.route("create_projects", unref(clientSlug)),
                class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Add Project `);
                  } else {
                    return [
                      createTextVNode(" Add Project ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center px-4 py-2 text-sm w-60"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary" placeholder="Search"${_scopeId}></div></div><div class="relative overflow-x-auto shadow-md sm:rounded-lg"${_scopeId}><table class="w-full text-sm text-left rtl:text-right text-gray-500"${_scopeId}><caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white"${_scopeId}>${ssrInterpolate(unref(client)["client_name"])} <p class="mt-1 mb-4 text-sm font-normal text-gray-500"${_scopeId}>${ssrInterpolate(unref(client)["desc"])}</p><div class="border-b-2 border-gray-300"${_scopeId}></div></caption><thead class="text-xs text-white uppercase bg-primary"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 w-1/4"${_scopeId}>Project Title</th><th scope="col" class="px-6 py-3"${_scopeId}>Description</th><th scope="col" class="px-6 py-3 md:w-1/5 text-center"${_scopeId}>Action</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredProjects.value, (project) => {
              _push2(`<tr class="bg-white border-b hover:bg-gray-50"${_scopeId}><td scope="row" class="px-6 py-4 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(project.project_name)}</td><td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500"${_scopeId}>${ssrInterpolate(project.desc)}</td><td class="px-6 py-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                href: _ctx.route("listsurvey", [unref(clientSlug), project.slug]),
                class: "w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition hover:duration-200"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` See Surveys `);
                  } else {
                    return [
                      createTextVNode(" See Surveys ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (_ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin") {
                _push2(`<div class="mt-5 text-center"${_scopeId}><a class="font-medium text-blue-600 hover:underline mr-4"${ssrRenderAttr("href", _ctx.route("edit_projects", [unref(clientSlug), project.id]))}${_scopeId}>Edit</a><a class="font-medium text-red-600 hover:underline cursor-pointer"${_scopeId}>Hapus </a></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></main>`);
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
                        href: _ctx.route("create_projects", unref(clientSlug)),
                        class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Add Project ")
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
                  createVNode("div", { class: "relative overflow-x-auto shadow-md sm:rounded-lg" }, [
                    createVNode("table", { class: "w-full text-sm text-left rtl:text-right text-gray-500" }, [
                      createVNode("caption", { class: "p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white" }, [
                        createTextVNode(toDisplayString(unref(client)["client_name"]) + " ", 1),
                        createVNode("p", { class: "mt-1 mb-4 text-sm font-normal text-gray-500" }, toDisplayString(unref(client)["desc"]), 1),
                        createVNode("div", { class: "border-b-2 border-gray-300" })
                      ]),
                      createVNode("thead", { class: "text-xs text-white uppercase bg-primary" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 w-1/4"
                          }, "Project Title"),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3"
                          }, "Description"),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 md:w-1/5 text-center"
                          }, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredProjects.value, (project) => {
                          return openBlock(), createBlock("tr", {
                            key: project.id,
                            class: "bg-white border-b hover:bg-gray-50"
                          }, [
                            createVNode("td", {
                              scope: "row",
                              class: "px-6 py-4 font-medium text-gray-900"
                            }, toDisplayString(project.project_name), 1),
                            createVNode("td", { class: "px-6 py-4 font-medium text-gray-900 sm:text-gray-500" }, toDisplayString(project.desc), 1),
                            createVNode("td", { class: "px-6 py-6" }, [
                              createVNode(_sfc_main$2, {
                                href: _ctx.route("listsurvey", [unref(clientSlug), project.slug]),
                                class: "w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition hover:duration-200"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" See Surveys ")
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              _ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-5 text-center"
                              }, [
                                createVNode("a", {
                                  class: "font-medium text-blue-600 hover:underline mr-4",
                                  href: _ctx.route("edit_projects", [unref(clientSlug), project.id])
                                }, "Edit", 8, ["href"]),
                                createVNode("a", {
                                  class: "font-medium text-red-600 hover:underline cursor-pointer",
                                  onClick: ($event) => hapus(unref(clientSlug), project.id)
                                }, "Hapus ", 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/ListProjects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
