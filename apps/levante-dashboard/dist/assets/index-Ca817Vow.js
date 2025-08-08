import{g as p}from"./lodash-DAY8-RAI.js";import{bz as y,bB as f,bL as v,cC as m,J as k,a2 as h,O as w}from"./index-kdKfEdeI.js";import{t as I}from"./toInteger-CM0MbwkG.js";import{R as g,O as c,M as $,N as l,L as S,H as i,V as P,S as B,W as z}from"./tanstack-CsBZeLmk.js";(function(){try{var n=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new n.Error().stack;e&&(n._sentryDebugIds=n._sentryDebugIds||{},n._sentryDebugIds[e]="baf2148c-4864-4a57-9651-1da0c6d468c6",n._sentryDebugIdIdentifier="sentry-dbid-baf2148c-4864-4a57-9651-1da0c6d468c6")}catch{}})();var D=f,T=y,_=v;function j(n){return function(e,t,a){var r=Object(e);if(!T(e)){var s=D(t);e=_(e),t=function(u){return s(r[u],u,r)}}var d=n(e,t,a);return d>-1?r[s?e[d]:d]:void 0}}var F=j,x=m,C=f,E=I,L=Math.max;function N(n,e,t){var a=n==null?0:n.length;if(!a)return-1;var r=t==null?0:E(t);return r<0&&(r=L(a+r,0)),x(n,C(e),r)}var b=N;const tn=p(b);var O=F,A=b,M=O(A),V=M;const rn=p(V);var H=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`,J={root:function(e){var t=e.props;return["p-tag p-component",{"p-tag-info":t.severity==="info","p-tag-success":t.severity==="success","p-tag-warn":t.severity==="warn","p-tag-danger":t.severity==="danger","p-tag-secondary":t.severity==="secondary","p-tag-contrast":t.severity==="contrast","p-tag-rounded":t.rounded}]},icon:"p-tag-icon",label:"p-tag-label"},K=k.extend({name:"tag",style:H,classes:J}),R={name:"BaseTag",extends:h,props:{value:null,severity:null,rounded:Boolean,icon:String},style:K,provide:function(){return{$pcTag:this,$parentInstance:this}}};function o(n){"@babel/helpers - typeof";return o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(n)}function W(n,e,t){return(e=q(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function q(n){var e=G(n,"string");return o(e)=="symbol"?e:e+""}function G(n,e){if(o(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var a=t.call(n,e);if(o(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var Q={name:"Tag",extends:R,inheritAttrs:!1,computed:{dataP:function(){return w(W({rounded:this.rounded},this.severity,this.severity))}}},U=["data-p"];function X(n,e,t,a,r,s){return c(),g("span",i({class:n.cx("root"),"data-p":s.dataP},n.ptmi("root")),[n.$slots.icon?(c(),$(P(n.$slots.icon),i({key:0,class:n.cx("icon")},n.ptm("icon")),null,16,["class"])):n.icon?(c(),g("span",i({key:1,class:[n.cx("icon"),n.icon]},n.ptm("icon")),null,16)):l("",!0),n.value!=null||n.$slots.default?S(n.$slots,"default",{key:2},function(){return[B("span",i({class:n.cx("label")},n.ptm("label")),z(n.value),17)]}):l("",!0)],16,U)}Q.render=X;export{tn as _,rn as a,Q as s};
//# sourceMappingURL=index-Ca817Vow.js.map
