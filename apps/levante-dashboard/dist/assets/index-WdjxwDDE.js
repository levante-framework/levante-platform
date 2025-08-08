import{J as i,a2 as s,O as l}from"./index-kdKfEdeI.js";import{R as d,O as u,H as p}from"./tanstack-CsBZeLmk.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},n=new e.Error().stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="18da4385-920a-4cba-84e8-37e39a59f9ad",e._sentryDebugIdIdentifier="sentry-dbid-18da4385-920a-4cba-84e8-37e39a59f9ad")}catch{}})();var f=`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`,c={root:{position:"relative"}},y={root:function(n){var t=n.props;return["p-skeleton p-component",{"p-skeleton-circle":t.shape==="circle","p-skeleton-animation-none":t.animation==="none"}]}},m=i.extend({name:"skeleton",style:f,classes:y,inlineStyles:c}),b={name:"BaseSkeleton",extends:s,props:{shape:{type:String,default:"rectangle"},size:{type:String,default:null},width:{type:String,default:"100%"},height:{type:String,default:"1rem"},borderRadius:{type:String,default:null},animation:{type:String,default:"wave"}},style:m,provide:function(){return{$pcSkeleton:this,$parentInstance:this}}};function r(e){"@babel/helpers - typeof";return r=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},r(e)}function h(e,n,t){return(n=g(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function g(e){var n=k(e,"string");return r(n)=="symbol"?n:n+""}function k(e,n){if(r(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n);if(r(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var v={name:"Skeleton",extends:b,inheritAttrs:!1,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}},dataP:function(){return l(h({},this.shape,this.shape))}}},S=["data-p"];function w(e,n,t,o,P,a){return u(),d("div",p({class:e.cx("root"),style:[e.sx("root"),a.containerStyle],"aria-hidden":"true"},e.ptmi("root"),{"data-p":a.dataP}),null,16,S)}v.render=w;export{v as s};
//# sourceMappingURL=index-WdjxwDDE.js.map
