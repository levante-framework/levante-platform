import{J as p,a2 as c,O as v}from"./index-kdKfEdeI.js";import{R as a,O as l,N as u,H as s,L as y}from"./tanstack-CsBZeLmk.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},n=new t.Error().stack;n&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[n]="e57a96e8-6153-4cd1-912f-211eaeafda98",t._sentryDebugIdIdentifier="sentry-dbid-e57a96e8-6153-4cd1-912f-211eaeafda98")}catch{}})();var f=`
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        margin: dt('divider.horizontal.margin');
        padding: dt('divider.horizontal.padding');
    }

    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        inset-block-start: 50%;
        inset-inline-start: 0;
        width: 100%;
        content: '';
        border-block-start: 1px solid dt('divider.border.color');
    }

    .p-divider-horizontal .p-divider-content {
        padding: dt('divider.horizontal.content.padding');
    }

    .p-divider-vertical {
        min-height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        margin: dt('divider.vertical.margin');
        padding: dt('divider.vertical.padding');
    }

    .p-divider-vertical:before {
        position: absolute;
        display: block;
        inset-block-start: 0;
        inset-inline-start: 50%;
        height: 100%;
        content: '';
        border-inline-start: 1px solid dt('divider.border.color');
    }

    .p-divider.p-divider-vertical .p-divider-content {
        padding: dt('divider.vertical.content.padding');
    }

    .p-divider-content {
        z-index: 1;
        background: dt('divider.content.background');
        color: dt('divider.content.color');
    }

    .p-divider-solid.p-divider-horizontal:before {
        border-block-start-style: solid;
    }

    .p-divider-solid.p-divider-vertical:before {
        border-inline-start-style: solid;
    }

    .p-divider-dashed.p-divider-horizontal:before {
        border-block-start-style: dashed;
    }

    .p-divider-dashed.p-divider-vertical:before {
        border-inline-start-style: dashed;
    }

    .p-divider-dotted.p-divider-horizontal:before {
        border-block-start-style: dotted;
    }

    .p-divider-dotted.p-divider-vertical:before {
        border-inline-start-style: dotted;
    }

    .p-divider-left:dir(rtl),
    .p-divider-right:dir(rtl) {
        flex-direction: row-reverse;
    }
`,b={root:function(n){var e=n.props;return{justifyContent:e.layout==="horizontal"?e.align==="center"||e.align===null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align===null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null}}},g={root:function(n){var e=n.props;return["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}]},content:"p-divider-content"},h=p.extend({name:"divider",style:f,classes:g,inlineStyles:b}),m={name:"BaseDivider",extends:c,props:{align:{type:String,default:null},layout:{type:String,default:"horizontal"},type:{type:String,default:"solid"}},style:h,provide:function(){return{$pcDivider:this,$parentInstance:this}}};function i(t){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},i(t)}function o(t,n,e){return(n=z(n))in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function z(t){var n=S(t,"string");return i(n)=="symbol"?n:n+""}function S(t,n){if(i(t)!="object"||!t)return t;var e=t[Symbol.toPrimitive];if(e!==void 0){var r=e.call(t,n);if(i(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(t)}var k={name:"Divider",extends:m,inheritAttrs:!1,computed:{dataP:function(){return v(o(o(o({},this.align,this.align),this.layout,this.layout),this.type,this.type))}}},w=["aria-orientation","data-p"],P=["data-p"];function x(t,n,e,r,D,d){return l(),a("div",s({class:t.cx("root"),style:t.sx("root"),role:"separator","aria-orientation":t.layout,"data-p":d.dataP},t.ptmi("root")),[t.$slots.default?(l(),a("div",s({key:0,class:t.cx("content"),"data-p":d.dataP},t.ptm("content")),[y(t.$slots,"default")],16,P)):u("",!0)],16,w)}k.render=x;export{k as s};
//# sourceMappingURL=index-BEZzqj1Q.js.map
