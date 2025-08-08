import{J as h,bF as m,a2 as u,O as f}from"./index-kdKfEdeI.js";import{R as c,N as r,O as i,L as t,M as s,H as o,V as l,W as g}from"./tanstack-CsBZeLmk.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},n=new e.Error().stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2fe883cb-bc21-455d-84f2-3209799e3f43",e._sentryDebugIdIdentifier="sentry-dbid-2fe883cb-bc21-455d-84f2-3209799e3f43")}catch{}})();var b=`
    .p-chip {
        display: inline-flex;
        align-items: center;
        background: dt('chip.background');
        color: dt('chip.color');
        border-radius: dt('chip.border.radius');
        padding-block: dt('chip.padding.y');
        padding-inline: dt('chip.padding.x');
        gap: dt('chip.gap');
    }

    .p-chip-icon {
        color: dt('chip.icon.color');
        font-size: dt('chip.icon.font.size');
        width: dt('chip.icon.size');
        height: dt('chip.icon.size');
    }

    .p-chip-image {
        border-radius: 50%;
        width: dt('chip.image.width');
        height: dt('chip.image.height');
        margin-inline-start: calc(-1 * dt('chip.padding.y'));
    }

    .p-chip:has(.p-chip-remove-icon) {
        padding-inline-end: dt('chip.padding.y');
    }

    .p-chip:has(.p-chip-image) {
        padding-block-start: calc(dt('chip.padding.y') / 2);
        padding-block-end: calc(dt('chip.padding.y') / 2);
    }

    .p-chip-remove-icon {
        cursor: pointer;
        font-size: dt('chip.remove.icon.size');
        width: dt('chip.remove.icon.size');
        height: dt('chip.remove.icon.size');
        color: dt('chip.remove.icon.color');
        border-radius: 50%;
        transition:
            outline-color dt('chip.transition.duration'),
            box-shadow dt('chip.transition.duration');
        outline-color: transparent;
    }

    .p-chip-remove-icon:focus-visible {
        box-shadow: dt('chip.remove.icon.focus.ring.shadow');
        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');
        outline-offset: dt('chip.remove.icon.focus.ring.offset');
    }
`,y={root:"p-chip p-component",image:"p-chip-image",icon:"p-chip-icon",label:"p-chip-label",removeIcon:"p-chip-remove-icon"},v=h.extend({name:"chip",style:b,classes:y}),k={name:"BaseChip",extends:u,props:{label:{type:[String,Number],default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:void 0}},style:v,provide:function(){return{$pcChip:this,$parentInstance:this}}},w={name:"Chip",extends:k,inheritAttrs:!1,emits:["remove"],data:function(){return{visible:!0}},methods:{onKeydown:function(n){(n.key==="Enter"||n.key==="Backspace")&&this.close(n)},close:function(n){this.visible=!1,this.$emit("remove",n)}},computed:{dataP:function(){return f({removable:this.removable})}},components:{TimesCircleIcon:m}},I=["aria-label","data-p"],C=["src"];function z(e,n,d,S,p,a){return p.visible?(i(),c("div",o({key:0,class:e.cx("root"),"aria-label":e.label},e.ptmi("root"),{"data-p":a.dataP}),[t(e.$slots,"default",{},function(){return[e.image?(i(),c("img",o({key:0,src:e.image},e.ptm("image"),{class:e.cx("image")}),null,16,C)):e.$slots.icon?(i(),s(l(e.$slots.icon),o({key:1,class:e.cx("icon")},e.ptm("icon")),null,16,["class"])):e.icon?(i(),c("span",o({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):r("",!0),e.label!==null?(i(),c("div",o({key:3,class:e.cx("label")},e.ptm("label")),g(e.label),17)):r("",!0)]}),e.removable?t(e.$slots,"removeicon",{key:0,removeCallback:a.close,keydownCallback:a.onKeydown},function(){return[(i(),s(l(e.removeIcon?"span":"TimesCircleIcon"),o({class:[e.cx("removeIcon"),e.removeIcon],onClick:a.close,onKeydown:a.onKeydown},e.ptm("removeIcon")),null,16,["class","onClick","onKeydown"]))]}):r("",!0)],16,I)):r("",!0)}w.render=z;export{w as s};
//# sourceMappingURL=index-D4pzgRTJ.js.map
