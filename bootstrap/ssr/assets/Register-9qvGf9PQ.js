import { unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import "./AuthenticationCard-C9mEk27i.js";
import "./AuthenticationCardLogo-BE7wXEGb.js";
import "./Checkbox-BBcrr1ex.js";
import "./TextInput-B0hF2b1y.js";
import "./InputLabel-Do1v5jZF.js";
import "./PrimaryButton-CvZeXs1Y.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent));
      _push(`<div class="container mx-auto sm:max-w-xl md:max-w-5xl lg:flex lg:max-w-full"><div class="lg:mx-32"><div class="sm:mx-auto sm:w-full sm:max-w-sm lg:mt-16"><img class="mx-auto w-auto" src="/img/wdu-ijo.png" alt="Your Company"><h2 class="mt-24 text-center text-3xl font-bold leading-9 tracking-tight text-primary"> Create Account </h2></div><div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"><form class="space-y-6"><div><div class="mt-2 relative"><input id="user" name="user" type="text" autocomplete="user" required${ssrRenderAttr("value", _ctx.user.name)} class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Full Name"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path></svg></div></div><div><div class="flex items-center justify-between"></div><div class="relative"><input id="email" name="email" type="email" autocomplete="email" required${ssrRenderAttr("value", _ctx.user.email)} class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Email Address"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path></svg></div></div><div><div class="flex items-center justify-between"></div><div class="relative"><input id="password" name="password" type="password" autocomplete="current-password" required${ssrRenderAttr("value", _ctx.user.password)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Password"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg></div></div><div><div class="flex items-center justify-between"></div><div class="relative"><input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required${ssrRenderAttr("value", _ctx.user.password_confirmation)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Password Confirmation"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg></div></div><div class="text-center cursor-pointer"><p class="hover:underline"> Already Have Account? <a class="text-primary">Sign in</a></p></div><div><button type="submit" class="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ijo-terang focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition"> Sign Up </button></div></form></div></div><div class="hidden lg:block w-1/2 h-full relative"><img src="/img/Rectangle 1471.png" alt="" class="absolute" style="${ssrRenderStyle({ "top": "-150px", "right": "-110px" })}"><img src="/img/hand-drawn-business-planning1.png" alt="" class="absolute"></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
