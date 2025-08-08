import{_ as g}from"./LanguageSelector.vue_vue_type_style_index_0_lang-D5OOIf6j.js";import{J as y,a2 as h,a as $}from"./index-kdKfEdeI.js";import{R as a,O as r,N as n,S as c,H as t,L as o,k as u,W as i,z as d,_ as l,a1 as f,F as v}from"./tanstack-CsBZeLmk.js";import"./surveyInitialization-566f37hA.js";import"./survey-CRadXOqO.js";import"./lodash-DAY8-RAI.js";import"./bucket-D8HfKr8u.js";import"./phoneme-MNW3QAs-.js";import"./sentry-CX5z418I.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},s=new e.Error().stack;s&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[s]="1d456e9a-a7d7-4c7c-8040-7c027f6f56e9",e._sentryDebugIdIdentifier="sentry-dbid-1d456e9a-a7d7-4c7c-8040-7c027f6f56e9")}catch{}})();var k=`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`,w={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},I=y.extend({name:"card",style:k,classes:w}),C={name:"BaseCard",extends:h,style:I,provide:function(){return{$pcCard:this,$parentInstance:this}}},m={name:"Card",extends:C,inheritAttrs:!1};function D(e,s,p,b,S,B){return r(),a("div",t({class:e.cx("root")},e.ptmi("root")),[e.$slots.header?(r(),a("div",t({key:0,class:e.cx("header")},e.ptm("header")),[o(e.$slots,"header")],16)):n("",!0),c("div",t({class:e.cx("body")},e.ptm("body")),[e.$slots.title||e.$slots.subtitle?(r(),a("div",t({key:0,class:e.cx("caption")},e.ptm("caption")),[e.$slots.title?(r(),a("div",t({key:0,class:e.cx("title")},e.ptm("title")),[o(e.$slots,"title")],16)):n("",!0),e.$slots.subtitle?(r(),a("div",t({key:1,class:e.cx("subtitle")},e.ptm("subtitle")),[o(e.$slots,"subtitle")],16)):n("",!0)],16)):n("",!0),c("div",t({class:e.cx("content")},e.ptm("content")),[o(e.$slots,"content")],16),e.$slots.footer?(r(),a("div",t({key:1,class:e.cx("footer")},e.ptm("footer")),[o(e.$slots,"footer")],16)):n("",!0)],16)],16)}m.render=D;const L={__name:"Settings",setup(e){const{t:s}=$();return(p,b)=>(r(),a(v,null,[c("h1",null,i(d(s)("profile.settings.settings")),1),u(d(m),{class:"bg-gray-100"},{title:l(()=>[f(i(d(s)("profile.settings.language")),1)]),subtitle:l(()=>[f(i(d(s)("profile.settings.languageDescription")),1)]),content:l(()=>[u(g)]),_:1})],64))}};export{L as default};
//# sourceMappingURL=Settings-Cl47D9Ik.js.map
