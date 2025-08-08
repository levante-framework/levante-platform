import{a as f}from"./index-d6wokVQG.js";import{s as m}from"./index-CmbHKKL9.js";import{J as y,ah as v,k,a2 as w,O as B}from"./index-kdKfEdeI.js";import{Z as P,R as c,O as d,S as s,k as g,L as l,N as u,H as t,W as $,a2 as C,_ as h,M as D,V as I,Y as S,ae as A,a4 as T}from"./tanstack-CsBZeLmk.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},n=new e.Error().stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7ce88951-3c8e-4439-a862-9be4c948c146",e._sentryDebugIdIdentifier="sentry-dbid-7ce88951-3c8e-4439-a862-9be4c948c146")}catch{}})();var L=`
    .p-panel {
        display: block;
        border: 1px solid dt('panel.border.color');
        border-radius: dt('panel.border.radius');
        background: dt('panel.background');
        color: dt('panel.color');
    }

    .p-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('panel.header.padding');
        background: dt('panel.header.background');
        color: dt('panel.header.color');
        border-style: solid;
        border-width: dt('panel.header.border.width');
        border-color: dt('panel.header.border.color');
        border-radius: dt('panel.header.border.radius');
    }

    .p-panel-toggleable .p-panel-header {
        padding: dt('panel.toggleable.header.padding');
    }

    .p-panel-title {
        line-height: 1;
        font-weight: dt('panel.title.font.weight');
    }

    .p-panel-content {
        padding: dt('panel.content.padding');
    }

    .p-panel-footer {
        padding: dt('panel.footer.padding');
    }
`,E={root:function(n){var i=n.props;return["p-panel p-component",{"p-panel-toggleable":i.toggleable}]},header:"p-panel-header",title:"p-panel-title",headerActions:"p-panel-header-actions",pcToggleButton:"p-panel-toggle-button",contentContainer:"p-panel-content-container",content:"p-panel-content",footer:"p-panel-footer"},K=y.extend({name:"panel",style:L,classes:E}),N={name:"BasePanel",extends:w,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}}},style:K,provide:function(){return{$pcPanel:this,$parentInstance:this}}},V={name:"Panel",extends:N,inheritAttrs:!1,emits:["update:collapsed","toggle"],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(n){this.d_collapsed=n}},methods:{toggle:function(n){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:n,value:this.d_collapsed})},onKeyDown:function(n){(n.code==="Enter"||n.code==="NumpadEnter"||n.code==="Space")&&(this.toggle(n),n.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header},dataP:function(){return B({toggleable:this.toggleable})}},components:{PlusIcon:m,MinusIcon:f,Button:k},directives:{ripple:v}},M=["data-p"],O=["data-p"],j=["id"],R=["id","aria-labelledby"];function z(e,n,i,H,r,a){var b=P("Button");return d(),c("div",t({class:e.cx("root"),"data-p":a.dataP},e.ptmi("root")),[s("div",t({class:e.cx("header"),"data-p":a.dataP},e.ptm("header")),[l(e.$slots,"header",{id:e.$id+"_header",class:C(e.cx("title"))},function(){return[e.header?(d(),c("span",t({key:0,id:e.$id+"_header",class:e.cx("title")},e.ptm("title")),$(e.header),17,j)):u("",!0)]}),s("div",t({class:e.cx("headerActions")},e.ptm("headerActions")),[l(e.$slots,"icons"),e.toggleable?l(e.$slots,"togglebutton",{key:0,collapsed:r.d_collapsed,toggleCallback:function(p){return a.toggle(p)},keydownCallback:function(p){return a.onKeyDown(p)}},function(){return[g(b,t({id:e.$id+"_header",class:e.cx("pcToggleButton"),"aria-label":a.buttonAriaLabel,"aria-controls":e.$id+"_content","aria-expanded":!r.d_collapsed,unstyled:e.unstyled,onClick:n[0]||(n[0]=function(o){return a.toggle(o)}),onKeydown:n[1]||(n[1]=function(o){return a.onKeyDown(o)})},e.toggleButtonProps,{pt:e.ptm("pcToggleButton")}),{icon:h(function(o){return[l(e.$slots,e.$slots.toggleicon?"toggleicon":"togglericon",{collapsed:r.d_collapsed},function(){return[(d(),D(I(r.d_collapsed?"PlusIcon":"MinusIcon"),t({class:o.class},e.ptm("pcToggleButton").icon),null,16,["class"]))]})]}),_:3},16,["id","class","aria-label","aria-controls","aria-expanded","unstyled","pt"])]}):u("",!0)],16)],16,O),g(T,t({name:"p-toggleable-content"},e.ptm("transition")),{default:h(function(){return[S(s("div",t({id:e.$id+"_content",class:e.cx("contentContainer"),role:"region","aria-labelledby":e.$id+"_header"},e.ptm("contentContainer")),[s("div",t({class:e.cx("content")},e.ptm("content")),[l(e.$slots,"default")],16),e.$slots.footer?(d(),c("div",t({key:0,class:e.cx("footer")},e.ptm("footer")),[l(e.$slots,"footer")],16)):u("",!0)],16,R),[[A,!r.d_collapsed]])]}),_:3},16)],16,M)}V.render=z;export{V as s};
//# sourceMappingURL=index-DgqMGbNZ.js.map
