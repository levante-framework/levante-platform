import{g as r}from"./lodash-DAY8-RAI.js";import{c6 as s,bB as c,bC as g,J as h,a$ as u,O as p}from"./index-kdKfEdeI.js";import{_ as b}from"./_baseEach-Ab1i50PF.js";import{R as w,O as f,S as l,H as d,L as k}from"./tanstack-CsBZeLmk.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new t.Error().stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="b5167ffe-bed5-43d4-9f83-74f580c45542",t._sentryDebugIdIdentifier="sentry-dbid-b5167ffe-bed5-43d4-9f83-74f580c45542")}catch{}})();var y=b;function v(t,e){var i=[];return y(t,function(o,a,n){e(o,a,n)&&i.push(o)}),i}var m=v,S=s,B=m,F=c,P=g;function T(t,e){var i=P(t)?S:B;return i(t,F(e))}var I=T;const q=r(I);var O=`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`,C={root:{position:"relative"}},x={root:function(e){var i=e.instance,o=e.props;return["p-toggleswitch p-component",{"p-toggleswitch-checked":i.checked,"p-disabled":o.disabled,"p-invalid":i.$invalid}]},input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},V=h.extend({name:"toggleswitch",style:O,classes:x,inlineStyles:C}),z={name:"BaseToggleSwitch",extends:u,props:{trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:V,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},D={name:"ToggleSwitch",extends:z,inheritAttrs:!1,emits:["change","focus","blur"],methods:{getPTOptions:function(e){var i=e==="root"?this.ptmi:this.ptm;return i(e,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(e){if(!this.disabled&&!this.readonly){var i=this.checked?this.falseValue:this.trueValue;this.writeValue(i,e),this.$emit("change",e)}},onFocus:function(e){this.$emit("focus",e)},onBlur:function(e){var i,o;this.$emit("blur",e),(i=(o=this.formField).onBlur)===null||i===void 0||i.call(o,e)}},computed:{checked:function(){return this.d_value===this.trueValue},dataP:function(){return p({checked:this.checked,disabled:this.disabled,invalid:this.$invalid})}}},E=["data-p-checked","data-p-disabled","data-p"],L=["id","checked","tabindex","disabled","readonly","aria-checked","aria-labelledby","aria-label","aria-invalid"],j=["data-p"],_=["data-p"];function A(t,e,i,o,a,n){return f(),w("div",d({class:t.cx("root"),style:t.sx("root")},n.getPTOptions("root"),{"data-p-checked":n.checked,"data-p-disabled":t.disabled,"data-p":n.dataP}),[l("input",d({id:t.inputId,type:"checkbox",role:"switch",class:[t.cx("input"),t.inputClass],style:t.inputStyle,checked:n.checked,tabindex:t.tabindex,disabled:t.disabled,readonly:t.readonly,"aria-checked":n.checked,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-invalid":t.invalid||void 0,onFocus:e[0]||(e[0]=function(){return n.onFocus&&n.onFocus.apply(n,arguments)}),onBlur:e[1]||(e[1]=function(){return n.onBlur&&n.onBlur.apply(n,arguments)}),onChange:e[2]||(e[2]=function(){return n.onChange&&n.onChange.apply(n,arguments)})},n.getPTOptions("input")),null,16,L),l("div",d({class:t.cx("slider")},n.getPTOptions("slider"),{"data-p":n.dataP}),[l("div",d({class:t.cx("handle")},n.getPTOptions("handle"),{"data-p":n.dataP}),[k(t.$slots,"handle",{checked:n.checked})],16,_)],16,j)],16,E)}D.render=A;export{q as _,D as s};
//# sourceMappingURL=index-CNfLgq8b.js.map
