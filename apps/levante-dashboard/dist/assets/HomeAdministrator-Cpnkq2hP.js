import{R as f,O as s,L as y,H as p,Z as D,N as b,M as v,S as m,aa as ae,_ as g,a2 as T,F as z,a1 as q,W as A,U as Ee,k as I,a4 as $t,Y as ue,V as M,a0 as _,X as wt,a7 as Bt,a6 as Ht,a8 as Ut,a9 as Vt,d as _t,c as ce,r as x,o as St,w as Fe,z as C,ac as Wt,ap as Gt}from"./tanstack-CsBZeLmk.js";import{J as Te,a2 as X,W as ge,a3 as Qt,a4 as Ct,a5 as Yt,a6 as qe,a7 as qt,a8 as $e,a9 as U,aa as Be,ab as Xt,M as Zt,k as ie,ac as me,ad as W,P as Jt,Y as en,Q as tn,V as nn,ae as Me,af as Y,ag as rn,ah as Pt,ai as ne,aj as je,ak as $,al as Ot,am as on,an,ao as ln,ap as sn,aq as H,ar as Tt,S as le,as as dn,X as cn,at as Xe,au as Ze,av as Ie,aw as un,ax as We,ay as Ge,az as pn,aA as Je,o as fn,aB as mn,d as It,aC as hn,aD as bn,aE as gn,aF as yn,e as vn,u as kn,z as wn,aG as Sn,aH as et,a0 as Cn,aI as Pn,aJ as tt,aK as On,F as Tn,j as In,s as zn,h as Kn,i as xn,w as Mn,L as En,aL as Ln}from"./index-kdKfEdeI.js";import{s as jn}from"./index-tWo9sWbs.js";import{s as zt,a as nt,b as rt,c as ot,d as Rn,e as he}from"./index-SnZVGOaT.js";import{u as An,s as Dn}from"./useAdministrationsListQuery-C2mhJMoz.js";import{g as Nn}from"./administrations-BtjuibWP.js";import{f as Fn,S as it,_ as $n}from"./orgs-C8TAQ0-m.js";import{s as Bn}from"./index-BrLDugnL.js";import{s as Hn}from"./index-BbFXSlD1.js";import{s as Un}from"./index-CmbHKKL9.js";import{s as Vn}from"./index-DBlP99Qc.js";import{a as _n,s as Wn}from"./index-d6wokVQG.js";import{t as at}from"./reports-DZCyTjfn.js";import{u as Gn,s as Qn,a as Yn}from"./useTasksDictionaryQuery-DDq5c2TB.js";import{T as lt,a as st}from"./toasts-BqURhU4z.js";import"./phoneme-MNW3QAs-.js";import"./sentry-CX5z418I.js";import"./lodash-DAY8-RAI.js";import"./index-D4pzgRTJ.js";import"./index-DXN1oPWm.js";import"./chunk-C6jcZpD8.js";import"./toInteger-CM0MbwkG.js";import"./toNumber-iH9M7_fM.js";import"./utils-DSob1QZ1.js";import"./useTasksQuery-DLa8TwAo.js";import"./tasks-DtSsBL6W.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new t.Error().stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="bf44bed5-a612-4374-87c4-961503916d2c",t._sentryDebugIdIdentifier="sentry-dbid-bf44bed5-a612-4374-87c4-961503916d2c")}catch{}})();var qn=`
    .p-blockui {
        position: relative;
    }

    .p-blockui-mask {
        border-radius: dt('blockui.border.radius');
    }

    .p-blockui-mask.p-overlay-mask {
        position: absolute;
    }

    .p-blockui-mask-document.p-overlay-mask {
        position: fixed;
    }
`,Xn={root:"p-blockui"},Zn=Te.extend({name:"blockui",style:qn,classes:Xn}),Jn={name:"BaseBlockUI",extends:X,props:{blocked:{type:Boolean,default:!1},fullScreen:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0}},style:Zn,provide:function(){return{$pcBlockUI:this,$parentInstance:this}}},Kt={name:"BlockUI",extends:Jn,inheritAttrs:!1,emits:["block","unblock"],mask:null,data:function(){return{isBlocked:!1}},watch:{blocked:function(e){e===!0?this.block():this.unblock()}},mounted:function(){this.blocked&&this.block()},methods:{block:function(){var e="p-blockui-mask p-overlay-mask p-overlay-mask-enter";this.fullScreen?(e+=" p-blockui-mask-document",this.mask=qe("div",{style:{position:"fixed",top:"0",left:"0",width:"100%",height:"100%"},class:!this.isUnstyled&&e,"p-bind":this.ptm("mask")}),document.body.appendChild(this.mask),qt(),document.activeElement.blur()):(this.mask=qe("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"},class:!this.isUnstyled&&e,"p-bind":this.ptm("mask")}),this.$refs.container.appendChild(this.mask)),this.autoZIndex&&ge.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal),this.isBlocked=!0,this.$emit("block")},unblock:function(){var e=this;if(this.mask){!this.isUnstyled&&Ct(this.mask,"p-overlay-mask-leave");var n=function(){clearTimeout(r),e.mask.removeEventListener("animationend",n),e.mask.removeEventListener("webkitAnimationEnd",n)},r=setTimeout(function(){e.removeMask()},10);Yt(this.mask)>0&&(this.mask.addEventListener("animationend",n),this.mask.addEventListener("webkitAnimationEnd",n))}else this.removeMask()},removeMask:function(){if(ge.clear(this.mask),this.fullScreen)document.body.removeChild(this.mask),Qt();else{var e;(e=this.$refs.container)===null||e===void 0||e.removeChild(this.mask)}this.isBlocked=!1,this.$emit("unblock")}}},er=["aria-busy"];function tr(t,e,n,r,i,o){return s(),f("div",p({ref:"container",class:t.cx("root"),"aria-busy":i.isBlocked},t.ptmi("root")),[y(t.$slots,"default")],16,er)}Kt.render=tr;var nr=`
    .p-dataview {
        position: relative;
        border-color: dt('dataview.border.color');
        border-width: dt('dataview.border.width');
        border-style: solid;
        border-radius: dt('dataview.border.radius');
        padding: dt('dataview.padding');
    }

    .p-dataview-header {
        background: dt('dataview.header.background');
        color: dt('dataview.header.color');
        border-color: dt('dataview.header.border.color');
        border-width: dt('dataview.header.border.width');
        border-style: solid;
        padding: dt('dataview.header.padding');
        border-radius: dt('dataview.header.border.radius');
    }

    .p-dataview-content {
        background: dt('dataview.content.background');
        border-color: dt('dataview.content.border.color');
        border-width: dt('dataview.content.border.width');
        border-style: solid;
        color: dt('dataview.content.color');
        padding: dt('dataview.content.padding');
        border-radius: dt('dataview.content.border.radius');
    }

    .p-dataview-footer {
        background: dt('dataview.footer.background');
        color: dt('dataview.footer.color');
        border-color: dt('dataview.footer.border.color');
        border-width: dt('dataview.footer.border.width');
        border-style: solid;
        padding: dt('dataview.footer.padding');
        border-radius: dt('dataview.footer.border.radius');
    }

    .p-dataview-paginator-top {
        border-width: dt('dataview.paginator.top.border.width');
        border-color: dt('dataview.paginator.top.border.color');
        border-style: solid;
    }

    .p-dataview-paginator-bottom {
        border-width: dt('dataview.paginator.bottom.border.width');
        border-color: dt('dataview.paginator.bottom.border.color');
        border-style: solid;
    }

    .p-dataview-loading-overlay {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }
`,rr={root:function(e){var n=e.props;return["p-dataview p-component",{"p-dataview-list":n.layout==="list","p-dataview-grid":n.layout==="grid"}]},header:"p-dataview-header",pcPaginator:function(e){var n=e.position;return"p-dataview-paginator-"+n},content:"p-dataview-content",emptyMessage:"p-dataview-empty-message",footer:"p-dataview-footer"},or=Te.extend({name:"dataview",style:nr,classes:rr}),ir={name:"BaseDataView",extends:X,props:{value:{type:Array,default:null},layout:{type:String,default:"list"},rows:{type:Number,default:0},first:{type:Number,default:0},totalRecords:{type:Number,default:0},paginator:{type:Boolean,default:!1},paginatorPosition:{type:String,default:"bottom"},alwaysShowPaginator:{type:Boolean,default:!0},paginatorTemplate:{type:String,default:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},currentPageReportTemplate:{type:String,default:"({currentPage} of {totalPages})"},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},lazy:{type:Boolean,default:!1},dataKey:{type:String,default:null}},style:or,provide:function(){return{$pcDataView:this,$parentInstance:this}}};function ar(t){return cr(t)||dr(t)||sr(t)||lr()}function lr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sr(t,e){if(t){if(typeof t=="string")return He(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?He(t,e):void 0}}function dr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function cr(t){if(Array.isArray(t))return He(t)}function He(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var xt={name:"DataView",extends:ir,inheritAttrs:!1,emits:["update:first","update:rows","page"],data:function(){return{d_first:this.first,d_rows:this.rows}},watch:{first:function(e){this.d_first=e},rows:function(e){this.d_rows=e},sortField:function(){this.resetPage()},sortOrder:function(){this.resetPage()}},methods:{getKey:function(e,n){return this.dataKey?U(e,this.dataKey):n},onPage:function(e){this.d_first=e.first,this.d_rows=e.rows,this.$emit("update:first",this.d_first),this.$emit("update:rows",this.d_rows),this.$emit("page",e)},sort:function(){var e=this;if(this.value){var n=ar(this.value),r=$e();return n.sort(function(i,o){var c=U(i,e.sortField),l=U(o,e.sortField);return Be(c,l,e.sortOrder,r)}),n}else return null},resetPage:function(){this.d_first=0,this.$emit("update:first",this.d_first)}},computed:{getTotalRecords:function(){return this.totalRecords?this.totalRecords:this.value?this.value.length:0},empty:function(){return!this.value||this.value.length===0},emptyMessageText:function(){var e;return((e=this.$primevue.config)===null||e===void 0||(e=e.locale)===null||e===void 0?void 0:e.emptyMessage)||""},paginatorTop:function(){return this.paginator&&(this.paginatorPosition!=="bottom"||this.paginatorPosition==="both")},paginatorBottom:function(){return this.paginator&&(this.paginatorPosition!=="top"||this.paginatorPosition==="both")},items:function(){if(this.value&&this.value.length){var e=this.value;if(e&&e.length&&this.sortField&&(e=this.sort()),this.paginator){var n=this.lazy?0:this.d_first;return e.slice(n,n+this.d_rows)}else return e}else return null}},components:{DVPaginator:zt}};function ur(t,e,n,r,i,o){var c=D("DVPaginator");return s(),f("div",p({class:t.cx("root")},t.ptmi("root")),[t.$slots.header?(s(),f("div",p({key:0,class:t.cx("header")},t.ptm("header")),[y(t.$slots,"header")],16)):b("",!0),o.paginatorTop?(s(),v(c,{key:1,rows:i.d_rows,first:i.d_first,totalRecords:o.getTotalRecords,pageLinkSize:t.pageLinkSize,template:t.paginatorTemplate,rowsPerPageOptions:t.rowsPerPageOptions,currentPageReportTemplate:t.currentPageReportTemplate,class:T(t.cx("pcPaginator",{position:"top"})),alwaysShow:t.alwaysShowPaginator,onPage:e[0]||(e[0]=function(l){return o.onPage(l)}),unstyled:t.unstyled,pt:t.ptm("pcPaginator")},ae({_:2},[t.$slots.paginatorcontainer?{name:"container",fn:g(function(l){return[y(t.$slots,"paginatorcontainer",{first:l.first,last:l.last,rows:l.rows,page:l.page,pageCount:l.pageCount,pageLinks:l.pageLinks,totalRecords:l.totalRecords,firstPageCallback:l.firstPageCallback,lastPageCallback:l.lastPageCallback,prevPageCallback:l.prevPageCallback,nextPageCallback:l.nextPageCallback,rowChangeCallback:l.rowChangeCallback,changePageCallback:l.changePageCallback})]}),key:"0"}:void 0,t.$slots.paginatorstart?{name:"start",fn:g(function(){return[y(t.$slots,"paginatorstart")]}),key:"1"}:void 0,t.$slots.paginatorend?{name:"end",fn:g(function(){return[y(t.$slots,"paginatorend")]}),key:"2"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):b("",!0),m("div",p({class:t.cx("content")},t.ptm("content")),[o.empty?(s(),f("div",p({key:1,class:t.cx("emptyMessage")},t.ptm("emptyMessage")),[y(t.$slots,"empty",{layout:t.layout},function(){return[q(A(o.emptyMessageText),1)]})],16)):(s(),f(z,{key:0},[t.$slots.list&&t.layout==="list"?y(t.$slots,"list",{key:0,items:o.items}):b("",!0),t.$slots.grid&&t.layout==="grid"?y(t.$slots,"grid",{key:1,items:o.items}):b("",!0)],64))],16),o.paginatorBottom?(s(),v(c,{key:2,rows:i.d_rows,first:i.d_first,totalRecords:o.getTotalRecords,pageLinkSize:t.pageLinkSize,template:t.paginatorTemplate,rowsPerPageOptions:t.rowsPerPageOptions,currentPageReportTemplate:t.currentPageReportTemplate,class:T(t.cx("pcPaginator",{position:"bottom"})),alwaysShow:t.alwaysShowPaginator,onPage:e[1]||(e[1]=function(l){return o.onPage(l)}),unstyled:t.unstyled,pt:t.ptm("pcPaginator")},ae({_:2},[t.$slots.paginatorcontainer?{name:"container",fn:g(function(l){return[y(t.$slots,"paginatorcontainer",{first:l.first,last:l.last,rows:l.rows,page:l.page,pageCount:l.pageCount,pageLinks:l.pageLinks,totalRecords:l.totalRecords,firstPageCallback:l.firstPageCallback,lastPageCallback:l.lastPageCallback,prevPageCallback:l.prevPageCallback,nextPageCallback:l.nextPageCallback,rowChangeCallback:l.rowChangeCallback,changePageCallback:l.changePageCallback})]}),key:"0"}:void 0,t.$slots.paginatorstart?{name:"start",fn:g(function(){return[y(t.$slots,"paginatorstart")]}),key:"1"}:void 0,t.$slots.paginatorend?{name:"end",fn:g(function(){return[y(t.$slots,"paginatorend")]}),key:"2"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):b("",!0),t.$slots.footer?(s(),f("div",p({key:3,class:t.cx("footer")},t.ptm("footer")),[y(t.$slots,"footer")],16)):b("",!0)],16)}xt.render=ur;var pr=`
    .p-confirmpopup {
        position: absolute;
        margin-top: dt('confirmpopup.gutter');
        top: 0;
        left: 0;
        background: dt('confirmpopup.background');
        color: dt('confirmpopup.color');
        border: 1px solid dt('confirmpopup.border.color');
        border-radius: dt('confirmpopup.border.radius');
        box-shadow: dt('confirmpopup.shadow');
    }

    .p-confirmpopup-content {
        display: flex;
        align-items: center;
        padding: dt('confirmpopup.content.padding');
        gap: dt('confirmpopup.content.gap');
    }

    .p-confirmpopup-icon {
        font-size: dt('confirmpopup.icon.size');
        width: dt('confirmpopup.icon.size');
        height: dt('confirmpopup.icon.size');
        color: dt('confirmpopup.icon.color');
    }

    .p-confirmpopup-footer {
        display: flex;
        justify-content: flex-end;
        gap: dt('confirmpopup.footer.gap');
        padding: dt('confirmpopup.footer.padding');
    }

    .p-confirmpopup-footer button {
        width: auto;
    }

    .p-confirmpopup-footer button:last-child {
        margin: 0;
    }

    .p-confirmpopup-flipped {
        margin-block-start: calc(dt('confirmpopup.gutter') * -1);
        margin-block-end: dt('confirmpopup.gutter');
    }

    .p-confirmpopup-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-confirmpopup-leave-to {
        opacity: 0;
    }

    .p-confirmpopup-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-confirmpopup-leave-active {
        transition: opacity 0.1s linear;
    }

    .p-confirmpopup:after,
    .p-confirmpopup:before {
        bottom: 100%;
        left: calc(dt('confirmpopup.arrow.offset') + dt('confirmpopup.arrow.left'));
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-confirmpopup:after {
        border-width: calc(dt('confirmpopup.gutter') - 2px);
        margin-left: calc(-1 * (dt('confirmpopup.gutter') - 2px));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('confirmpopup.background');
    }

    .p-confirmpopup:before {
        border-width: dt('confirmpopup.gutter');
        margin-left: calc(-1 * dt('confirmpopup.gutter'));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('confirmpopup.border.color');
    }

    .p-confirmpopup-flipped:after,
    .p-confirmpopup-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-confirmpopup-flipped:after {
        border-bottom-color: transparent;
        border-top-color: dt('confirmpopup.background');
    }

    .p-confirmpopup-flipped:before {
        border-bottom-color: transparent;
        border-top-color: dt('confirmpopup.border.color');
    }
`,fr={root:"p-confirmpopup p-component",content:"p-confirmpopup-content",icon:"p-confirmpopup-icon",message:"p-confirmpopup-message",footer:"p-confirmpopup-footer",pcRejectButton:"p-confirmpopup-reject-button",pcAcceptButton:"p-confirmpopup-accept-button"},mr=Te.extend({name:"confirmpopup",style:pr,classes:fr}),hr={name:"BaseConfirmPopup",extends:X,props:{group:String},style:mr,provide:function(){return{$pcConfirmPopup:this,$parentInstance:this}}},Mt={name:"ConfirmPopup",extends:hr,inheritAttrs:!1,data:function(){return{visible:!1,confirmation:null,autoFocusAccept:null,autoFocusReject:null,target:null}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,confirmListener:null,closeListener:null,mounted:function(){var e=this;this.confirmListener=function(n){n&&n.group===e.group&&(e.confirmation=n,e.target=n.target,e.confirmation.onShow&&e.confirmation.onShow(),e.visible=!0)},this.closeListener=function(){e.visible=!1,e.confirmation=null},me.on("confirm",this.confirmListener),me.on("close",this.closeListener)},beforeUnmount:function(){me.off("confirm",this.confirmListener),me.off("close",this.closeListener),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindResizeListener(),this.container&&(ge.clear(this.container),this.container=null),this.target=null,this.confirmation=null},methods:{accept:function(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject:function(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide:function(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1},onAcceptKeydown:function(e){(e.code==="Space"||e.code==="Enter"||e.code==="NumpadEnter")&&(this.accept(),W(this.target),e.preventDefault())},onRejectKeydown:function(e){(e.code==="Space"||e.code==="Enter"||e.code==="NumpadEnter")&&(this.reject(),W(this.target),e.preventDefault())},onEnter:function(e){this.autoFocusAccept=this.confirmation.defaultFocus===void 0||this.confirmation.defaultFocus==="accept",this.autoFocusReject=this.confirmation.defaultFocus==="reject",this.target=this.target||document.activeElement,this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),ge.set("overlay",e,this.$primevue.config.zIndex.overlay)},onAfterEnter:function(){this.focus()},onLeave:function(){this.autoFocusAccept=null,this.autoFocusReject=null,W(this.target),this.target=null,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener()},onAfterLeave:function(e){ge.clear(e)},alignOverlay:function(){nn(this.container,this.target,!1);var e=Me(this.container),n=Me(this.target),r=0;e.left<n.left&&(r=n.left-e.left),this.container.style.setProperty(Y("confirmpopup.arrow.left").name,"".concat(r,"px")),e.top<n.top&&(this.container.setAttribute("data-p-confirmpopup-flipped","true"),!this.isUnstyled&&Ct(this.container,"p-confirmpopup-flipped"))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(n){e.visible&&e.container&&!e.container.contains(n.target)&&!e.isTargetClicked(n)?(e.confirmation.onHide&&e.confirmation.onHide(),e.visible=!1):e.alignOverlay()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new tn(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!en()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus({preventScroll:!0})},isTargetClicked:function(e){return this.target&&(this.target===e.target||this.target.contains(e.target))},containerRef:function(e){this.container=e},onOverlayClick:function(e){Jt.emit("overlay-click",{originalEvent:e,target:this.target})},onOverlayKeydown:function(e){e.code==="Escape"&&(me.emit("close",this.closeListener),W(this.target))}},computed:{message:function(){return this.confirmation?this.confirmation.message:null},acceptLabel:function(){if(this.confirmation){var e,n=this.confirmation;return n.acceptLabel||((e=n.acceptProps)===null||e===void 0?void 0:e.label)||this.$primevue.config.locale.accept}return this.$primevue.config.locale.accept},rejectLabel:function(){if(this.confirmation){var e,n=this.confirmation;return n.rejectLabel||((e=n.rejectProps)===null||e===void 0?void 0:e.label)||this.$primevue.config.locale.reject}return this.$primevue.config.locale.reject},acceptIcon:function(){var e;return this.confirmation?this.confirmation.acceptIcon:(e=this.confirmation)!==null&&e!==void 0&&e.acceptProps?this.confirmation.acceptProps.icon:null},rejectIcon:function(){var e;return this.confirmation?this.confirmation.rejectIcon:(e=this.confirmation)!==null&&e!==void 0&&e.rejectProps?this.confirmation.rejectProps.icon:null}},components:{Button:ie,Portal:Zt},directives:{focustrap:Xt}},br=["aria-modal"];function gr(t,e,n,r,i,o){var c=D("Button"),l=D("Portal"),d=Ee("focustrap");return s(),v(l,null,{default:g(function(){return[I($t,p({name:"p-confirmpopup",onEnter:o.onEnter,onAfterEnter:o.onAfterEnter,onLeave:o.onLeave,onAfterLeave:o.onAfterLeave},t.ptm("transition")),{default:g(function(){var u,a,k;return[i.visible?ue((s(),f("div",p({key:0,ref:o.containerRef,role:"alertdialog",class:t.cx("root"),"aria-modal":i.visible,onClick:e[2]||(e[2]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),onKeydown:e[3]||(e[3]=function(){return o.onOverlayKeydown&&o.onOverlayKeydown.apply(o,arguments)})},t.ptmi("root")),[t.$slots.container?y(t.$slots,"container",{key:0,message:i.confirmation,acceptCallback:o.accept,rejectCallback:o.reject}):(s(),f(z,{key:1},[t.$slots.message?(s(),v(M(t.$slots.message),{key:1,message:i.confirmation},null,8,["message"])):(s(),f("div",p({key:0,class:t.cx("content")},t.ptm("content")),[y(t.$slots,"icon",{},function(){return[t.$slots.icon?(s(),v(M(t.$slots.icon),{key:0,class:T(t.cx("icon"))},null,8,["class"])):i.confirmation.icon?(s(),f("span",p({key:1,class:[i.confirmation.icon,t.cx("icon")]},t.ptm("icon")),null,16)):b("",!0)]}),m("span",p({class:t.cx("message")},t.ptm("message")),A(i.confirmation.message),17)],16)),m("div",p({class:t.cx("footer")},t.ptm("footer")),[I(c,p({class:[t.cx("pcRejectButton"),i.confirmation.rejectClass],autofocus:i.autoFocusReject,unstyled:t.unstyled,size:((u=i.confirmation.rejectProps)===null||u===void 0?void 0:u.size)||"small",text:((a=i.confirmation.rejectProps)===null||a===void 0?void 0:a.text)||!1,onClick:e[0]||(e[0]=function(O){return o.reject()}),onKeydown:o.onRejectKeydown},i.confirmation.rejectProps,{label:o.rejectLabel,pt:t.ptm("pcRejectButton")}),ae({_:2},[o.rejectIcon||t.$slots.rejecticon?{name:"icon",fn:g(function(O){return[y(t.$slots,"rejecticon",{},function(){return[m("span",p({class:[o.rejectIcon,O.class]},t.ptm("pcRejectButton").icon,{"data-pc-section":"rejectbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","autofocus","unstyled","size","text","onKeydown","label","pt"]),I(c,p({class:[t.cx("pcAcceptButton"),i.confirmation.acceptClass],autofocus:i.autoFocusAccept,unstyled:t.unstyled,size:((k=i.confirmation.acceptProps)===null||k===void 0?void 0:k.size)||"small",onClick:e[1]||(e[1]=function(O){return o.accept()}),onKeydown:o.onAcceptKeydown},i.confirmation.acceptProps,{label:o.acceptLabel,pt:t.ptm("pcAcceptButton")}),ae({_:2},[o.acceptIcon||t.$slots.accepticon?{name:"icon",fn:g(function(O){return[y(t.$slots,"accepticon",{},function(){return[m("span",p({class:[o.acceptIcon,O.class]},t.ptm("pcAcceptButton").icon,{"data-pc-section":"acceptbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","autofocus","unstyled","size","onKeydown","label","pt"])],16)],64))],16,br)),[[d]]):b("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3})}Mt.render=gr;var yr=`
    .p-speeddial {
        position: static;
        display: flex;
        gap: dt('speeddial.gap');
    }

    .p-speeddial-button {
        z-index: 1;
    }

    .p-speeddial-button.p-speeddial-rotate {
        transition:
            transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            background dt('speeddial.transition.duration'),
            color dt('speeddial.transition.duration'),
            border-color dt('speeddial.transition.duration'),
            box-shadow dt('speeddial.transition.duration'),
            outline-color dt('speeddial.transition.duration');
        will-change: transform;
    }

    .p-speeddial-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: inset-block-start 0s linear dt('speeddial.transition.duration');
        pointer-events: none;
        outline: 0 none;
        z-index: 2;
        gap: dt('speeddial.gap');
    }

    .p-speeddial-item {
        transform: scale(0);
        opacity: 0;
        transition:
            transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            opacity 0.8s;
        will-change: transform;
    }

    .p-speeddial-circle .p-speeddial-item,
    .p-speeddial-semi-circle .p-speeddial-item,
    .p-speeddial-quarter-circle .p-speeddial-item {
        position: absolute;
    }

    .p-speeddial-mask {
        position: absolute;
        inset-inline-start: 0;
        inset-block-start: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: dt('mask.background');
        border-radius: 6px;
        transition: opacity 150ms;
    }

    .p-speeddial-mask-visible {
        pointer-events: none;
        opacity: 1;
        transition: opacity 150ms;
    }

    .p-speeddial-open .p-speeddial-list {
        pointer-events: auto;
    }

    .p-speeddial-open .p-speeddial-item {
        transform: scale(1);
        opacity: 1;
    }

    .p-speeddial-open .p-speeddial-rotate {
        transform: rotate(45deg);
    }
`;function ye(t){"@babel/helpers - typeof";return ye=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ye(t)}function Re(t,e,n){return(e=vr(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function vr(t){var e=kr(t,"string");return ye(e)=="symbol"?e:e+""}function kr(t,e){if(ye(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(ye(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var wr={root:function(e){var n=e.props;return{alignItems:(n.direction==="up"||n.direction==="down")&&"center",justifyContent:(n.direction==="left"||n.direction==="right")&&"center",flexDirection:n.direction==="up"?"column-reverse":n.direction==="down"?"column":n.direction==="left"?"row-reverse":n.direction==="right"?"row":null}},list:function(e){var n=e.props;return{flexDirection:n.direction==="up"?"column-reverse":n.direction==="down"?"column":n.direction==="left"?"row-reverse":n.direction==="right"?"row":null}}},Sr={root:function(e){var n=e.instance,r=e.props;return["p-speeddial p-component p-speeddial-".concat(r.type),Re(Re(Re({},"p-speeddial-direction-".concat(r.direction),r.type!=="circle"),"p-speeddial-open",n.d_visible),"p-disabled",r.disabled)]},pcButton:function(e){var n=e.props;return["p-speeddial-button",{"p-speeddial-rotate":n.rotateAnimation&&!n.hideIcon}]},list:"p-speeddial-list",item:"p-speeddial-item",action:"p-speeddial-action",actionIcon:"p-speeddial-action-icon",mask:function(e){var n=e.instance;return["p-speeddial-mask",{"p-speeddial-mask-visible":n.d_visible}]}},Cr=Te.extend({name:"speeddial",style:yr,classes:Sr,inlineStyles:wr}),Pr={name:"BaseSpeedDial",extends:X,props:{model:null,visible:{type:Boolean,default:!1},direction:{type:String,default:"up"},transitionDelay:{type:Number,default:30},type:{type:String,default:"linear"},radius:{type:Number,default:0},mask:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},hideOnClickOutside:{type:Boolean,default:!0},buttonClass:null,maskStyle:null,maskClass:null,showIcon:{type:String,default:void 0},hideIcon:{type:String,default:void 0},rotateAnimation:{type:Boolean,default:!0},tooltipOptions:null,style:null,class:null,buttonProps:{type:Object,default:function(){return{rounded:!0}}},actionButtonProps:{type:Object,default:function(){return{severity:"secondary",rounded:!0,size:"small"}}},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Cr,provide:function(){return{$pcSpeedDial:this,$parentInstance:this}}};function ve(t){"@babel/helpers - typeof";return ve=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ve(t)}function dt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function Or(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?dt(Object(n),!0).forEach(function(r){Tr(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):dt(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Tr(t,e,n){return(e=Ir(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Ir(t){var e=zr(t,"string");return ve(e)=="symbol"?e:e+""}function zr(t,e){if(ve(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(ve(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Ke(t){return Er(t)||Mr(t)||xr(t)||Kr()}function Kr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xr(t,e){if(t){if(typeof t=="string")return Ue(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ue(t,e):void 0}}function Mr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Er(t){if(Array.isArray(t))return Ue(t)}function Ue(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var Ae=3.14159265358979,Et={name:"SpeedDial",extends:Pr,inheritAttrs:!1,emits:["click","show","hide","focus","blur"],documentClickListener:null,container:null,list:null,data:function(){return{d_visible:this.visible,isItemClicked:!1,focused:!1,focusedOptionIndex:-1}},watch:{visible:function(e){this.d_visible=e}},mounted:function(){if(this.type!=="linear"){var e=$(this.container,'[data-pc-name="pcbutton"]'),n=$(this.list,'[data-pc-section="item"]');if(e&&n){var r=Math.abs(e.offsetWidth-n.offsetWidth),i=Math.abs(e.offsetHeight-n.offsetHeight);this.list.style.setProperty(Y("item.diff.x").name,"".concat(r/2,"px")),this.list.style.setProperty(Y("item.diff.y").name,"".concat(i/2,"px"))}}this.hideOnClickOutside&&this.bindDocumentClickListener()},beforeUnmount:function(){this.unbindDocumentClickListener()},methods:{getPTOptions:function(e,n){return this.ptm(n,{context:{active:this.isItemActive(e),hidden:!this.d_visible}})},onFocus:function(e){this.$emit("focus",e)},onBlur:function(e){this.focusedOptionIndex=-1,this.$emit("blur",e)},onItemClick:function(e,n){n.command&&n.command({originalEvent:e,item:n}),this.hide(),this.isItemClicked=!0,e.preventDefault()},onClick:function(e){this.d_visible?this.hide():this.show(),this.isItemClicked=!0,this.$emit("click",e)},show:function(){this.d_visible=!0,this.$emit("show")},hide:function(){this.d_visible=!1,this.$emit("hide")},calculateTransitionDelay:function(e){var n=this.model.length,r=this.d_visible;return(r?e:n-e-1)*this.transitionDelay},onTogglerKeydown:function(e){switch(e.code){case"ArrowDown":case"ArrowLeft":this.onTogglerArrowDown(e);break;case"ArrowUp":case"ArrowRight":this.onTogglerArrowUp(e);break;case"Escape":this.onEscapeKey();break}},onKeyDown:function(e){switch(e.code){case"ArrowDown":this.onArrowDown(e);break;case"ArrowUp":this.onArrowUp(e);break;case"ArrowLeft":this.onArrowLeft(e);break;case"ArrowRight":this.onArrowRight(e);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break}},onTogglerArrowUp:function(e){this.show(),this.navigatePrevItem(e),e.preventDefault()},onTogglerArrowDown:function(e){this.show(),this.navigateNextItem(e),e.preventDefault()},onEnterKey:function(e){var n=this,r=ne(this.container,'[data-pc-section="item"]'),i=Ke(r).findIndex(function(c){return c.id===n.focusedOptionIndex}),o=$(this.container,"button");this.onItemClick(e,this.model[i]),this.onBlur(e),o&&W(o)},onEscapeKey:function(){this.hide();var e=$(this.container,"button");e&&W(e)},onArrowUp:function(e){this.direction==="down"?this.navigatePrevItem(e):this.navigateNextItem(e)},onArrowDown:function(e){this.direction==="down"?this.navigateNextItem(e):this.navigatePrevItem(e)},onArrowLeft:function(e){var n=["left","up-right","down-left"],r=["right","up-left","down-right"];n.includes(this.direction)?this.navigateNextItem(e):r.includes(this.direction)?this.navigatePrevItem(e):this.navigatePrevItem(e)},onArrowRight:function(e){var n=["left","up-right","down-left"],r=["right","up-left","down-right"];n.includes(this.direction)?this.navigatePrevItem(e):r.includes(this.direction)?this.navigateNextItem(e):this.navigateNextItem(e)},onEndKey:function(e){e.preventDefault(),this.focusedOptionIndex=-1,this.navigatePrevItem(e)},onHomeKey:function(e){e.preventDefault(),this.focusedOptionIndex=-1,this.navigateNextItem(e)},navigateNextItem:function(e){var n=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),e.preventDefault()},navigatePrevItem:function(e){var n=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),e.preventDefault()},changeFocusedOptionIndex:function(e){var n=ne(this.container,'[data-pc-section="item"]'),r=Ke(n).filter(function(o){return!je($(o,"a"),"p-disabled")});if(r[e]){this.focusedOptionIndex=r[e].getAttribute("id");var i=$(r[e],'[type="button"]');i&&W(i)}},findPrevOptionIndex:function(e){var n=ne(this.container,'[data-pc-section="item"]'),r=Ke(n).filter(function(c){return!je($(c,"a"),"p-disabled")}),i=e===-1?r[r.length-1].id:e,o=r.findIndex(function(c){return c.getAttribute("id")===i});return o=e===-1?r.length-1:o-1,o},findNextOptionIndex:function(e){var n=ne(this.container,'[data-pc-section="item"]'),r=Ke(n).filter(function(c){return!je($(c,"a"),"p-disabled")}),i=e===-1?r[0].id:e,o=r.findIndex(function(c){return c.getAttribute("id")===i});return o=e===-1?0:o+1,o},calculatePointStyle:function(e){var n=this.type;if(n!=="linear"){var r=this.model.length,i=this.radius||r*20;if(n==="circle"){var o=2*Ae/r;return{left:"calc(".concat(i*Math.cos(o*e),"px + ").concat(Y("item.diff.x").variable,")"),top:"calc(".concat(i*Math.sin(o*e),"px + ").concat(Y("item.diff.y").variable,")")}}else if(n==="semi-circle"){var c=this.direction,l=Ae/(r-1),d="calc(".concat(i*Math.cos(l*e),"px + ").concat(Y("item.diff.x").variable,")"),u="calc(".concat(i*Math.sin(l*e),"px + ").concat(Y("item.diff.y").variable,")");if(c==="up")return{left:d,bottom:u};if(c==="down")return{left:d,top:u};if(c==="left")return{right:u,top:d};if(c==="right")return{left:u,top:d}}else if(n==="quarter-circle"){var a=this.direction,k=Ae/(2*(r-1)),O="calc(".concat(i*Math.cos(k*e),"px + ").concat(Y("item.diff.x").variable,")"),B="calc(".concat(i*Math.sin(k*e),"px + ").concat(Y("item.diff.y").variable,")");if(a==="up-left")return{right:O,bottom:B};if(a==="up-right")return{left:O,bottom:B};if(a==="down-left")return{right:B,top:O};if(a==="down-right")return{left:B,top:O}}}return{}},getItemStyle:function(e){var n=this.calculateTransitionDelay(e),r=this.calculatePointStyle(e);return Or({transitionDelay:"".concat(n,"ms")},r)},bindDocumentClickListener:function(){var e=this;this.documentClickListener||(this.documentClickListener=function(n){e.d_visible&&e.isOutsideClicked(n)&&e.hide(),e.isItemClicked=!1},document.addEventListener("click",this.documentClickListener))},unbindDocumentClickListener:function(){this.documentClickListener&&(document.removeEventListener("click",this.documentClickListener),this.documentClickListener=null)},isOutsideClicked:function(e){return this.container&&!(this.container.isSameNode(e.target)||this.container.contains(e.target)||this.isItemClicked)},isItemVisible:function(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},isItemActive:function(e){return e===this.focusedOptionId},containerRef:function(e){this.container=e},listRef:function(e){this.list=e}},computed:{containerClass:function(){return[this.cx("root"),this.class]},focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null}},components:{Button:ie,PlusIcon:Un},directives:{ripple:Pt,tooltip:rn}},Lr=["id"],jr=["id","data-p-active"];function Rr(t,e,n,r,i,o){var c=D("Button"),l=Ee("tooltip");return s(),f(z,null,[m("div",p({ref:o.containerRef,class:o.containerClass,style:[t.style,t.sx("root")]},t.ptmi("root")),[y(t.$slots,"button",{visible:i.d_visible,toggleCallback:o.onClick},function(){return[I(c,p({class:[t.cx("pcButton"),t.buttonClass],disabled:t.disabled,"aria-expanded":i.d_visible,"aria-haspopup":!0,"aria-controls":t.$id+"_list","aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,unstyled:t.unstyled,onClick:e[0]||(e[0]=function(d){return o.onClick(d)}),onKeydown:o.onTogglerKeydown},t.buttonProps,{pt:t.ptm("pcButton")}),{icon:g(function(d){return[y(t.$slots,"icon",{visible:i.d_visible},function(){return[i.d_visible&&t.hideIcon?(s(),v(M(t.hideIcon?"span":"PlusIcon"),p({key:0,class:[t.hideIcon,d.class]},t.ptm("pcButton").icon,{"data-pc-section":"icon"}),null,16,["class"])):(s(),v(M(t.showIcon?"span":"PlusIcon"),p({key:1,class:[i.d_visible&&t.hideIcon?t.hideIcon:t.showIcon,d.class]},t.ptm("pcButton").icon,{"data-pc-section":"icon"}),null,16,["class"]))]})]}),_:3},16,["class","disabled","aria-expanded","aria-controls","aria-label","aria-labelledby","unstyled","onKeydown","pt"])]}),m("ul",p({ref:o.listRef,id:t.$id+"_list",class:t.cx("list"),style:t.sx("list"),role:"menu",tabindex:"-1",onFocus:e[1]||(e[1]=function(){return o.onFocus&&o.onFocus.apply(o,arguments)}),onBlur:e[2]||(e[2]=function(){return o.onBlur&&o.onBlur.apply(o,arguments)}),onKeydown:e[3]||(e[3]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)})},t.ptm("list")),[(s(!0),f(z,null,_(t.model,function(d,u){return s(),f(z,{key:u},[o.isItemVisible(d)?(s(),f("li",p({key:0,id:"".concat(t.$id,"_").concat(u),class:t.cx("item",{id:"".concat(t.$id,"_").concat(u)}),style:o.getItemStyle(u),role:"none","data-p-active":o.isItemActive("".concat(t.$id,"_").concat(u))},{ref_for:!0},o.getPTOptions("".concat(t.$id,"_").concat(u),"item")),[t.$slots.item?(s(),v(M(t.$slots.item),{key:1,item:d,onClick:function(k){return o.onItemClick(k,d)},toggleCallback:function(k){return o.onItemClick(k,d)}},null,8,["item","onClick","toggleCallback"])):ue((s(),v(c,p({key:0,tabindex:-1,role:"menuitem",class:t.cx("pcAction",{item:d}),"aria-label":d.label,disabled:t.disabled,unstyled:t.unstyled,onClick:function(k){return o.onItemClick(k,d)}},{ref_for:!0},t.actionButtonProps,{pt:o.getPTOptions("".concat(t.$id,"_").concat(u),"pcAction")}),ae({_:2},[d.icon?{name:"icon",fn:g(function(a){return[y(t.$slots,"itemicon",{item:d,class:T(a.class)},function(){return[m("span",p({class:[d.icon,a.class]},{ref_for:!0},o.getPTOptions("".concat(t.$id,"_").concat(u),"actionIcon")),null,16)]})]}),key:"0"}:void 0]),1040,["class","aria-label","disabled","unstyled","onClick","pt"])),[[l,{value:d.label,disabled:!t.tooltipOptions},t.tooltipOptions]])],16,jr)):b("",!0)],64)}),128))],16,Lr)],16),t.mask?(s(),f("div",p({key:0,class:[t.cx("mask"),t.maskClass],style:t.maskStyle},t.ptm("mask")),null,16)):b("",!0)],64)}Et.render=Rr;var Ar=`
    .p-treetable {
        position: relative;
    }

    .p-treetable-table {
        border-spacing: 0;
        border-collapse: separate;
        width: 100%;
    }

    .p-treetable-scrollable > .p-treetable-table-container {
        position: relative;
    }

    .p-treetable-scrollable-table > .p-treetable-thead {
        inset-block-start: 0;
        z-index: 1;
    }

    .p-treetable-scrollable-table > .p-treetable-frozen-tbody {
        position: sticky;
        z-index: 1;
    }

    .p-treetable-scrollable-table > .p-treetable-tfoot {
        inset-block-end: 0;
        z-index: 1;
    }

    .p-treetable-scrollable .p-treetable-frozen-column {
        position: sticky;
        background: dt('treetable.header.cell.background');
    }

    .p-treetable-scrollable th.p-treetable-frozen-column {
        z-index: 1;
    }

    .p-treetable-scrollable > .p-treetable-table-container > .p-treetable-table > .p-treetable-thead {
        background: dt('treetable.header.cell.background');
    }

    .p-treetable-scrollable > .p-treetable-table-container > .p-treetable-table > .p-treetable-tfoot {
        background: dt('treetable.footer.cell.background');
    }

    .p-treetable-flex-scrollable {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .p-treetable-flex-scrollable > .p-treetable-table-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .p-treetable-scrollable-table > .p-treetable-tbody > .p-treetable-row-group-header {
        position: sticky;
        z-index: 1;
    }

    .p-treetable-resizable-table > .p-treetable-thead > tr > th,
    .p-treetable-resizable-table > .p-treetable-tfoot > tr > td,
    .p-treetable-resizable-table > .p-treetable-tbody > tr > td {
        overflow: hidden;
        white-space: nowrap;
    }

    .p-treetable-resizable-table > .p-treetable-thead > tr > th.p-treetable-resizable-column:not(.p-treetable-frozen-column) {
        background-clip: padding-box;
        position: relative;
    }

    .p-treetable-resizable-table-fit > .p-treetable-thead > tr > th.p-treetable-resizable-column:last-child .p-treetable-column-resizer {
        display: none;
    }

    .p-treetable-column-resizer {
        display: block;
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        margin: 0;
        width: dt('treetable.column.resizer.width');
        height: 100%;
        padding: 0;
        cursor: col-resize;
        border: 1px solid transparent;
    }

    .p-treetable-column-header-content {
        display: flex;
        align-items: center;
        gap: dt('treetable.header.cell.gap');
    }

    .p-treetable-column-resize-indicator {
        width: dt('treetable.resize.indicator.width');
        position: absolute;
        z-index: 10;
        display: none;
        background: dt('treetable.resize.indicator.color');
    }

    .p-treetable-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .p-treetable-paginator-top {
        border-color: dt('treetable.paginator.top.border.color');
        border-style: solid;
        border-width: dt('treetable.paginator.top.border.width');
    }

    .p-treetable-paginator-bottom {
        border-color: dt('treetable.paginator.bottom.border.color');
        border-style: solid;
        border-width: dt('treetable.paginator.bottom.border.width');
    }

    .p-treetable-header {
        background: dt('treetable.header.background');
        color: dt('treetable.header.color');
        border-color: dt('treetable.header.border.color');
        border-style: solid;
        border-width: dt('treetable.header.border.width');
        padding: dt('treetable.header.padding');
    }

    .p-treetable-footer {
        background: dt('treetable.footer.background');
        color: dt('treetable.footer.color');
        border-color: dt('treetable.footer.border.color');
        border-style: solid;
        border-width: dt('treetable.footer.border.width');
        padding: dt('treetable.footer.padding');
    }

    .p-treetable-header-cell {
        padding: dt('treetable.header.cell.padding');
        background: dt('treetable.header.cell.background');
        border-color: dt('treetable.header.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('treetable.header.cell.color');
        font-weight: normal;
        text-align: start;
        transition:
            background dt('treetable.transition.duration'),
            color dt('treetable.transition.duration'),
            border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'),
            box-shadow dt('treetable.transition.duration');
    }

    .p-treetable-column-title {
        font-weight: dt('treetable.column.title.font.weight');
    }

    .p-treetable-tbody > tr {
        outline-color: transparent;
        background: dt('treetable.row.background');
        color: dt('treetable.row.color');
        transition:
            background dt('treetable.transition.duration'),
            color dt('treetable.transition.duration'),
            border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'),
            box-shadow dt('treetable.transition.duration');
    }

    .p-treetable-tbody > tr > td {
        text-align: start;
        border-color: dt('treetable.body.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        padding: dt('treetable.body.cell.padding');
    }

    .p-treetable-hoverable .p-treetable-tbody > tr:not(.p-treetable-row-selected):hover {
        background: dt('treetable.row.hover.background');
        color: dt('treetable.row.hover.color');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected {
        background: dt('treetable.row.selected.background');
        color: dt('treetable.row.selected.color');
    }

    .p-treetable-tbody > tr:has(+ .p-treetable-row-selected) > td {
        border-block-end-color: dt('treetable.body.cell.selected.border.color');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected > td {
        border-block-end-color: dt('treetable.body.cell.selected.border.color');
    }

    .p-treetable-tbody > tr:focus-visible,
    .p-treetable-tbody > tr.p-treetable-contextmenu-row-selected {
        box-shadow: dt('treetable.row.focus.ring.shadow');
        outline: dt('treetable.row.focus.ring.width') dt('treetable.row.focus.ring.style') dt('treetable.row.focus.ring.color');
        outline-offset: dt('treetable.row.focus.ring.offset');
    }

    .p-treetable-tfoot > tr > td {
        text-align: start;
        padding: dt('treetable.footer.cell.padding');
        border-color: dt('treetable.footer.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('treetable.footer.cell.color');
        background: dt('treetable.footer.cell.background');
    }

    .p-treetable-column-footer {
        font-weight: dt('treetable.column.footer.font.weight');
    }

    .p-treetable-sortable-column {
        cursor: pointer;
        user-select: none;
        outline-color: transparent;
    }

    .p-treetable-column-title,
    .p-treetable-sort-icon,
    .p-treetable-sort-badge {
        vertical-align: middle;
    }

    .p-treetable-sort-icon {
        color: dt('treetable.sort.icon.color');
        font-size: dt('treetable.sort.icon.size');
        width: dt('treetable.sort.icon.size');
        height: dt('treetable.sort.icon.size');
        transition: color dt('treetable.transition.duration');
    }

    .p-treetable-sortable-column:not(.p-treetable-column-sorted):hover {
        background: dt('treetable.header.cell.hover.background');
        color: dt('treetable.header.cell.hover.color');
    }

    .p-treetable-sortable-column:not(.p-treetable-column-sorted):hover .p-treetable-sort-icon {
        color: dt('treetable.sort.icon.hover.color');
    }

    .p-treetable-column-sorted {
        background: dt('treetable.header.cell.selected.background');
        color: dt('treetable.header.cell.selected.color');
    }

    .p-treetable-column-sorted .p-treetable-sort-icon {
        color: dt('treetable.header.cell.selected.color');
    }

    .p-treetable-sortable-column:focus-visible {
        box-shadow: dt('treetable.header.cell.focus.ring.shadow');
        outline: dt('treetable.header.cell.focus.ring.width') dt('treetable.header.cell.focus.ring.style') dt('treetable.header.cell.focus.ring.color');
        outline-offset: dt('treetable.header.cell.focus.ring.offset');
    }

    .p-treetable-hoverable .p-treetable-selectable-row {
        cursor: pointer;
    }

    .p-treetable-loading-icon {
        font-size: dt('treetable.loading.icon.size');
        width: dt('treetable.loading.icon.size');
        height: dt('treetable.loading.icon.size');
    }

    .p-treetable-gridlines .p-treetable-header {
        border-width: 1px 1px 0 1px;
    }

    .p-treetable-gridlines .p-treetable-footer {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-paginator-top {
        border-width: 1px 1px 0 1px;
    }

    .p-treetable-gridlines .p-treetable-paginator-bottom {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-thead > tr > th {
        border-width: 1px 0 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-thead > tr > th:last-child {
        border-width: 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr > td {
        border-width: 1px 0 0 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr > td:last-child {
        border-width: 1px 1px 0 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr:last-child > td {
        border-width: 1px 0 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr:last-child > td:last-child {
        border-width: 1px;
    }

    .p-treetable-gridlines .p-treetable-tfoot > tr > td {
        border-width: 1px 0 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-tfoot > tr > td:last-child {
        border-width: 1px 1px 1px 1px;
    }

    .p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td {
        border-width: 0 0 0 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td:last-child {
        border-width: 0 1px 0 1px;
    }

    .p-treetable.p-treetable-sm .p-treetable-header {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-thead > tr > th {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-tbody > tr > td {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-tfoot > tr > td {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-footer {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-header {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-thead > tr > th {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-tbody > tr > td {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-tfoot > tr > td {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-footer {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable-body-cell-content {
        display: flex;
        align-items: center;
        gap: dt('treetable.body.cell.gap');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected .p-treetable-node-toggle-button {
        color: inherit;
    }

    .p-treetable-node-toggle-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('treetable.node.toggle.button.size');
        height: dt('treetable.node.toggle.button.size');
        color: dt('treetable.node.toggle.button.color');
        border: 0 none;
        background: transparent;
        cursor: pointer;
        border-radius: dt('treetable.node.toggle.button.border.radius');
        transition:
            background dt('treetable.transition.duration'),
            color dt('treetable.transition.duration'),
            border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'),
            box-shadow dt('treetable.transition.duration');
        outline-color: transparent;
        user-select: none;
    }

    .p-treetable-node-toggle-button:enabled:hover {
        color: dt('treetable.node.toggle.button.hover.color');
        background: dt('treetable.node.toggle.button.hover.background');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected .p-treetable-node-toggle-button:hover {
        background: dt('treetable.node.toggle.button.selected.hover.background');
        color: dt('treetable.node.toggle.button.selected.hover.color');
    }

    .p-treetable-node-toggle-button:focus-visible {
        box-shadow: dt('treetable.node.toggle.button.focus.ring.shadow');
        outline: dt('treetable.node.toggle.button.focus.ring.width') dt('treetable.node.toggle.button.focus.ring.style') dt('treetable.node.toggle.button.focus.ring.color');
        outline-offset: dt('treetable.node.toggle.button.focus.ring.offset');
    }

    .p-treetable-node-toggle-icon:dir(rtl) {
        transform: rotate(180deg);
    }
`,Dr={root:function(e){var n=e.instance,r=e.props;return["p-treetable p-component",{"p-treetable-hoverable":r.rowHover||n.rowSelectionMode,"p-treetable-resizable":r.resizableColumns,"p-treetable-resizable-fit":r.resizableColumns&&r.columnResizeMode==="fit","p-treetable-scrollable":r.scrollable,"p-treetable-flex-scrollable":r.scrollable&&r.scrollHeight==="flex","p-treetable-gridlines":r.showGridlines,"p-treetable-sm":r.size==="small","p-treetable-lg":r.size==="large"}]},loading:"p-treetable-loading",mask:"p-treetable-mask p-overlay-mask",loadingIcon:"p-treetable-loading-icon",header:"p-treetable-header",paginator:function(e){var n=e.position;return"p-treetable-paginator-"+n},tableContainer:"p-treetable-table-container",table:function(e){var n=e.props;return["p-treetable-table",{"p-treetable-scrollable-table":n.scrollable,"p-treetable-resizable-table":n.resizableColumns,"p-treetable-resizable-table-fit":n.resizableColumns&&n.columnResizeMode==="fit"}]},thead:"p-treetable-thead",headerCell:function(e){var n=e.instance,r=e.props;return["p-treetable-header-cell",{"p-treetable-sortable-column":n.columnProp("sortable"),"p-treetable-resizable-column":r.resizableColumns,"p-treetable-column-sorted":n.columnProp("sortable")?n.isColumnSorted():!1,"p-treetable-frozen-column":n.columnProp("frozen")}]},columnResizer:"p-treetable-column-resizer",columnHeaderContent:"p-treetable-column-header-content",columnTitle:"p-treetable-column-title",sortIcon:"p-treetable-sort-icon",pcSortBadge:"p-treetable-sort-badge",tbody:"p-treetable-tbody",row:function(e){var n=e.props,r=e.instance;return[{"p-treetable-row-selected":r.selected,"p-treetable-contextmenu-row-selected":n.contextMenuSelection&&r.isSelectedWithContextMenu}]},bodyCell:function(e){var n=e.instance;return[{"p-treetable-frozen-column":n.columnProp("frozen")}]},bodyCellContent:function(e){var n=e.instance;return["p-treetable-body-cell-content",{"p-treetable-body-cell-content-expander":n.columnProp("expander")}]},nodeToggleButton:"p-treetable-node-toggle-button",nodeToggleIcon:"p-treetable-node-toggle-icon",pcNodeCheckbox:"p-treetable-node-checkbox",emptyMessage:"p-treetable-empty-message",tfoot:"p-treetable-tfoot",footerCell:function(e){var n=e.instance;return[{"p-treetable-frozen-column":n.columnProp("frozen")}]},footer:"p-treetable-footer",columnResizeIndicator:"p-treetable-column-resize-indicator"},Nr={tableContainer:{overflow:"auto"},thead:{position:"sticky"},tfoot:{position:"sticky"}},Fr=Te.extend({name:"treetable",style:Ar,classes:Dr,inlineStyles:Nr}),$r={name:"BaseTreeTable",extends:X,props:{value:{type:null,default:null},dataKey:{type:[String,Function],default:"key"},expandedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},metaKeySelection:{type:Boolean,default:!1},contextMenu:{type:Boolean,default:!1},contextMenuSelection:{type:Object,default:null},rows:{type:Number,default:0},first:{type:Number,default:0},totalRecords:{type:Number,default:0},paginator:{type:Boolean,default:!1},paginatorPosition:{type:String,default:"bottom"},alwaysShowPaginator:{type:Boolean,default:!0},paginatorTemplate:{type:String,default:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},currentPageReportTemplate:{type:String,default:"({currentPage} of {totalPages})"},lazy:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},loadingMode:{type:String,default:"mask"},rowHover:{type:Boolean,default:!1},autoLayout:{type:Boolean,default:!1},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},defaultSortOrder:{type:Number,default:1},multiSortMeta:{type:Array,default:null},sortMode:{type:String,default:"single"},removableSort:{type:Boolean,default:!1},filters:{type:Object,default:null},filterMode:{type:String,default:"lenient"},filterLocale:{type:String,default:void 0},resizableColumns:{type:Boolean,default:!1},columnResizeMode:{type:String,default:"fit"},indentation:{type:Number,default:1},showGridlines:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},scrollHeight:{type:String,default:null},size:{type:String,default:null},tableStyle:{type:null,default:null},tableClass:{type:[String,Object],default:null},tableProps:{type:Object,default:null}},style:Fr,provide:function(){return{$pcTreeTable:this,$parentInstance:this}}},Lt={name:"FooterCell",hostName:"TreeTable",extends:X,props:{column:{type:Object,default:null},index:{type:Number,default:null}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp("frozen")&&this.updateStickyPosition()},updated:function(){this.columnProp("frozen")&&this.updateStickyPosition()},methods:{columnProp:function(e){return Ie(this.column,e)},getColumnPT:function(e){var n,r={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,frozen:this.columnProp("frozen"),size:(n=this.$parentInstance)===null||n===void 0?void 0:n.size}};return p(this.ptm("column.".concat(e),{column:r}),this.ptm("column.".concat(e),r),this.ptmo(this.getColumnProp(),e,r))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},updateStickyPosition:function(){if(this.columnProp("frozen")){var e=this.columnProp("alignFrozen");if(e==="right"){var n=0,r=We(this.$el,'[data-p-frozen-column="true"]');r&&(n=le(r)+parseFloat(r.style["inset-inline-end"]||0)),this.styleObject.insetInlineEnd=n+"px"}else{var i=0,o=Ge(this.$el,'[data-p-frozen-column="true"]');o&&(i=le(o)+parseFloat(o.style["inset-inline-start"]||0)),this.styleObject.insetInlineStart=i+"px"}}}},computed:{containerClass:function(){return[this.columnProp("footerClass"),this.columnProp("class"),this.cx("footerCell")]},containerStyle:function(){var e=this.columnProp("footerStyle"),n=this.columnProp("style");return this.columnProp("frozen")?[n,e,this.styleObject]:[n,e]}}};function ke(t){"@babel/helpers - typeof";return ke=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ke(t)}function ct(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function ut(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ct(Object(n),!0).forEach(function(r){Br(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ct(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Br(t,e,n){return(e=Hr(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Hr(t){var e=Ur(t,"string");return ke(e)=="symbol"?e:e+""}function Ur(t,e){if(ke(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(ke(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var Vr=["data-p-frozen-column"];function _r(t,e,n,r,i,o){return s(),f("td",p({style:o.containerStyle,class:o.containerClass,role:"cell"},ut(ut({},o.getColumnPT("root")),o.getColumnPT("footerCell")),{"data-p-frozen-column":o.columnProp("frozen")}),[n.column.children&&n.column.children.footer?(s(),v(M(n.column.children.footer),{key:0,column:n.column},null,8,["column"])):b("",!0),o.columnProp("footer")?(s(),f("span",p({key:1,class:t.cx("columnFooter")},o.getColumnPT("columnFooter")),A(o.columnProp("footer")),17)):b("",!0)],16,Vr)}Lt.render=_r;var jt={name:"HeaderCell",hostName:"TreeTable",extends:X,emits:["column-click","column-resizestart"],props:{column:{type:Object,default:null},resizableColumns:{type:Boolean,default:!1},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},multiSortMeta:{type:Array,default:null},sortMode:{type:String,default:"single"},index:{type:Number,default:null}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp("frozen")&&this.updateStickyPosition()},updated:function(){this.columnProp("frozen")&&this.updateStickyPosition()},methods:{columnProp:function(e){return Ie(this.column,e)},getColumnPT:function(e){var n,r={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,sorted:this.isColumnSorted(),frozen:this.$parentInstance.scrollable&&this.columnProp("frozen"),resizable:this.resizableColumns,scrollable:this.$parentInstance.scrollable,showGridlines:this.$parentInstance.showGridlines,size:(n=this.$parentInstance)===null||n===void 0?void 0:n.size}};return p(this.ptm("column.".concat(e),{column:r}),this.ptm("column.".concat(e),r),this.ptmo(this.getColumnProp(),e,r))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},updateStickyPosition:function(){if(this.columnProp("frozen")){var e=this.columnProp("alignFrozen");if(e==="right"){var n=0,r=We(this.$el,'[data-p-frozen-column="true"]');r&&(n=le(r)+parseFloat(r.style["inset-inline-end"]||0)),this.styleObject.insetInlineEnd=n+"px"}else{var i=0,o=Ge(this.$el,'[data-p-frozen-column="true"]');o&&(i=le(o)+parseFloat(o.style["inset-inline-start"]||0)),this.styleObject.insetInlineStart=i+"px"}var c=this.$el.parentElement.nextElementSibling;if(c){var l=Tt(this.$el);c.children[l].style["inset-inline-start"]=this.styleObject["inset-inline-start"],c.children[l].style["inset-inline-end"]=this.styleObject["inset-inline-end"]}}},onClick:function(e){this.$emit("column-click",{originalEvent:e,column:this.column})},onKeyDown:function(e){(e.code==="Enter"||e.code==="NumpadEnter"||e.code==="Space")&&e.currentTarget.nodeName==="TH"&&H(e.currentTarget,"data-p-sortable-column")&&(this.$emit("column-click",{originalEvent:e,column:this.column}),e.preventDefault())},onResizeStart:function(e){this.$emit("column-resizestart",e)},getMultiSortMetaIndex:function(){for(var e=-1,n=0;n<this.multiSortMeta.length;n++){var r=this.multiSortMeta[n];if(r.field===this.columnProp("field")||r.field===this.columnProp("sortField")){e=n;break}}return e},isMultiSorted:function(){return this.columnProp("sortable")&&this.getMultiSortMetaIndex()>-1},isColumnSorted:function(){return this.sortMode==="single"?this.sortField&&(this.sortField===this.columnProp("field")||this.sortField===this.columnProp("sortField")):this.isMultiSorted()}},computed:{containerClass:function(){return[this.columnProp("headerClass"),this.columnProp("class"),this.cx("headerCell")]},containerStyle:function(){var e=this.columnProp("headerStyle"),n=this.columnProp("style");return this.columnProp("frozen")?[n,e,this.styleObject]:[n,e]},sortState:function(){var e=!1,n=null;if(this.sortMode==="single")e=this.sortField&&(this.sortField===this.columnProp("field")||this.sortField===this.columnProp("sortField")),n=e?this.sortOrder:0;else if(this.sortMode==="multiple"){var r=this.getMultiSortMetaIndex();r>-1&&(e=!0,n=this.multiSortMeta[r].order)}return{sorted:e,sortOrder:n}},sortableColumnIcon:function(){var e=this.sortState,n=e.sorted,r=e.sortOrder;if(n){if(n&&r>0)return rt;if(n&&r<0)return nt}else return ot;return null},ariaSort:function(){if(this.columnProp("sortable")){var e=this.sortState,n=e.sorted,r=e.sortOrder;return n&&r<0?"descending":n&&r>0?"ascending":"none"}else return null}},components:{Badge:on,SortAltIcon:ot,SortAmountUpAltIcon:rt,SortAmountDownIcon:nt}};function we(t){"@babel/helpers - typeof";return we=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},we(t)}function pt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function ft(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?pt(Object(n),!0).forEach(function(r){Wr(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):pt(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Wr(t,e,n){return(e=Gr(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Gr(t){var e=Qr(t,"string");return we(e)=="symbol"?e:e+""}function Qr(t,e){if(we(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(we(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var Yr=["tabindex","aria-sort","data-p-sortable-column","data-p-resizable-column","data-p-sorted","data-p-frozen-column"];function qr(t,e,n,r,i,o){var c=D("Badge");return s(),f("th",p({class:o.containerClass,style:[o.containerStyle],onClick:e[1]||(e[1]=function(){return o.onClick&&o.onClick.apply(o,arguments)}),onKeydown:e[2]||(e[2]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)}),tabindex:o.columnProp("sortable")?"0":null,"aria-sort":o.ariaSort,role:"columnheader"},ft(ft({},o.getColumnPT("root")),o.getColumnPT("headerCell")),{"data-p-sortable-column":o.columnProp("sortable"),"data-p-resizable-column":n.resizableColumns,"data-p-sorted":o.isColumnSorted(),"data-p-frozen-column":o.columnProp("frozen")}),[n.resizableColumns&&!o.columnProp("frozen")?(s(),f("span",p({key:0,class:t.cx("columnResizer"),onMousedown:e[0]||(e[0]=function(){return o.onResizeStart&&o.onResizeStart.apply(o,arguments)})},o.getColumnPT("columnResizer")),null,16)):b("",!0),m("div",p({class:t.cx("columnHeaderContent")},o.getColumnPT("columnHeaderContent")),[n.column.children&&n.column.children.header?(s(),v(M(n.column.children.header),{key:0,column:n.column},null,8,["column"])):b("",!0),o.columnProp("header")?(s(),f("span",p({key:1,class:t.cx("columnTitle")},o.getColumnPT("columnTitle")),A(o.columnProp("header")),17)):b("",!0),o.columnProp("sortable")?(s(),f("span",wt(p({key:2},o.getColumnPT("sort"))),[(s(),v(M(n.column.children&&n.column.children.sorticon||o.sortableColumnIcon),p({sorted:o.sortState.sorted,sortOrder:o.sortState.sortOrder,class:t.cx("sortIcon")},o.getColumnPT("sortIcon")),null,16,["sorted","sortOrder","class"]))],16)):b("",!0),o.isMultiSorted()?(s(),v(c,p({key:3,class:t.cx("pcSortBadge")},o.getColumnPT("pcSortBadge"),{value:o.getMultiSortMetaIndex()+1,size:"small"}),null,16,["class","value"])):b("",!0)],16)],16,Yr)}jt.render=qr;var Rt={name:"BodyCell",hostName:"TreeTable",extends:X,emits:["node-toggle","checkbox-toggle"],props:{node:{type:Object,default:null},column:{type:Object,default:null},level:{type:Number,default:0},indentation:{type:Number,default:1},leaf:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},selectionMode:{type:String,default:null},checked:{type:Boolean,default:!1},partialChecked:{type:Boolean,default:!1},templates:{type:Object,default:null},index:{type:Number,default:null},loadingMode:{type:String,default:"mask"}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp("frozen")&&this.updateStickyPosition()},updated:function(){this.columnProp("frozen")&&this.updateStickyPosition()},methods:{toggle:function(){this.$emit("node-toggle",this.node)},columnProp:function(e){return Ie(this.column,e)},getColumnPT:function(e){var n,r={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,selectable:this.$parentInstance.rowHover||this.$parentInstance.rowSelectionMode,selected:this.$parent.selected,frozen:this.columnProp("frozen"),scrollable:this.$parentInstance.scrollable,showGridlines:this.$parentInstance.showGridlines,size:(n=this.$parentInstance)===null||n===void 0?void 0:n.size,node:this.node}};return p(this.ptm("column.".concat(e),{column:r}),this.ptm("column.".concat(e),r),this.ptmo(this.getColumnProp(),e,r))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},getColumnCheckboxPT:function(e){var n={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{checked:this.checked,partialChecked:this.partialChecked,node:this.node}};return p(this.ptm("column.".concat(e),{column:n}),this.ptm("column.".concat(e),n),this.ptmo(this.getColumnProp(),e,n))},updateStickyPosition:function(){if(this.columnProp("frozen")){var e=this.columnProp("alignFrozen");if(e==="right"){var n=0,r=We(this.$el,'[data-p-frozen-column="true"]');r&&(n=le(r)+parseFloat(r.style["inset-inline-end"]||0)),this.styleObject.insetInlineEnd=n+"px"}else{var i=0,o=Ge(this.$el,'[data-p-frozen-column="true"]');o&&(i=le(o)+parseFloat(o.style["inset-inline-start"]||0)),this.styleObject.insetInlineStart=i+"px"}}},resolveFieldData:function(e,n){return U(e,n)},toggleCheckbox:function(){this.$emit("checkbox-toggle")}},computed:{containerClass:function(){return[this.columnProp("bodyClass"),this.columnProp("class"),this.cx("bodyCell")]},containerStyle:function(){var e=this.columnProp("bodyStyle"),n=this.columnProp("style");return this.columnProp("frozen")?[n,e,this.styleObject]:[n,e]},togglerStyle:function(){return{marginLeft:this.level*this.indentation+"rem",visibility:this.leaf?"hidden":"visible"}},checkboxSelectionMode:function(){return this.selectionMode==="checkbox"}},components:{Checkbox:Wn,ChevronRightIcon:Vn,ChevronDownIcon:ln,CheckIcon:an,MinusIcon:_n,SpinnerIcon:Ot},directives:{ripple:Pt}};function Se(t){"@babel/helpers - typeof";return Se=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Se(t)}function mt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function ht(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?mt(Object(n),!0).forEach(function(r){Xr(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):mt(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Xr(t,e,n){return(e=Zr(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Zr(t){var e=Jr(t,"string");return Se(e)=="symbol"?e:e+""}function Jr(t,e){if(Se(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(Se(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var eo=["data-p-frozen-column"];function to(t,e,n,r,i,o){var c=D("SpinnerIcon"),l=D("Checkbox"),d=Ee("ripple");return s(),f("td",p({style:o.containerStyle,class:o.containerClass,role:"cell"},ht(ht({},o.getColumnPT("root")),o.getColumnPT("bodyCell")),{"data-p-frozen-column":o.columnProp("frozen")}),[m("div",p({class:t.cx("bodyCellContent")},o.getColumnPT("bodyCellContent")),[o.columnProp("expander")?ue((s(),f("button",p({key:0,type:"button",class:t.cx("nodeToggleButton"),onClick:e[0]||(e[0]=function(){return o.toggle&&o.toggle.apply(o,arguments)}),style:o.togglerStyle,tabindex:"-1"},o.getColumnPT("nodeToggleButton"),{"data-pc-group-section":"rowactionbutton"}),[n.node.loading&&n.loadingMode==="icon"?(s(),f(z,{key:0},[n.templates.nodetoggleicon?(s(),v(M(n.templates.nodetoggleicon),{key:0})):b("",!0),n.templates.nodetogglericon?(s(),v(M(n.templates.nodetogglericon),{key:1})):(s(),v(c,p({key:2,spin:""},t.ptm("nodetoggleicon")),null,16))],64)):(s(),f(z,{key:1},[n.column.children&&n.column.children.rowtoggleicon?(s(),v(M(n.column.children.rowtoggleicon),{key:0,node:n.node,expanded:n.expanded,class:T(t.cx("nodeToggleIcon"))},null,8,["node","expanded","class"])):n.templates.nodetoggleicon?(s(),v(M(n.templates.nodetoggleicon),{key:1,node:n.node,expanded:n.expanded,class:T(t.cx("nodeToggleIcon"))},null,8,["node","expanded","class"])):n.column.children&&n.column.children.rowtogglericon?(s(),v(M(n.column.children.rowtogglericon),{key:2,node:n.node,expanded:n.expanded,class:T(t.cx("nodeToggleIcon"))},null,8,["node","expanded","class"])):n.expanded?(s(),v(M(n.node.expandedIcon?"span":"ChevronDownIcon"),p({key:3,class:t.cx("nodeToggleIcon")},o.getColumnPT("nodeToggleIcon")),null,16,["class"])):(s(),v(M(n.node.collapsedIcon?"span":"ChevronRightIcon"),p({key:4,class:t.cx("nodeToggleIcon")},o.getColumnPT("nodeToggleIcon")),null,16,["class"]))],64))],16)),[[d]]):b("",!0),o.checkboxSelectionMode&&o.columnProp("expander")?(s(),v(l,{key:1,modelValue:n.checked,binary:!0,class:T(t.cx("pcNodeCheckbox")),disabled:n.node.selectable===!1,onChange:o.toggleCheckbox,tabindex:-1,indeterminate:n.partialChecked,unstyled:t.unstyled,pt:o.getColumnCheckboxPT("pcNodeCheckbox"),"data-p-partialchecked":n.partialChecked},{icon:g(function(u){return[n.templates.checkboxicon?(s(),v(M(n.templates.checkboxicon),{key:0,checked:u.checked,partialChecked:n.partialChecked,class:T(u.class)},null,8,["checked","partialChecked","class"])):b("",!0)]}),_:1},8,["modelValue","class","disabled","onChange","indeterminate","unstyled","pt","data-p-partialchecked"])):b("",!0),n.column.children&&n.column.children.body?(s(),v(M(n.column.children.body),{key:2,node:n.node,column:n.column},null,8,["node","column"])):(s(),f(z,{key:3},[q(A(o.resolveFieldData(n.node.data,o.columnProp("field"))),1)],64))],16)],16,eo)}Rt.render=to;function Ce(t){"@babel/helpers - typeof";return Ce=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ce(t)}function De(t,e){var n=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=At(t))||e){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(u){throw u},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var u=n.next();return c=u.done,u},e:function(u){l=!0,o=u},f:function(){try{c||n.return==null||n.return()}finally{if(l)throw o}}}}function bt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function Ne(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?bt(Object(n),!0).forEach(function(r){no(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):bt(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function no(t,e,n){return(e=ro(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ro(t){var e=oo(t,"string");return Ce(e)=="symbol"?e:e+""}function oo(t,e){if(Ce(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(Ce(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function gt(t){return lo(t)||ao(t)||At(t)||io()}function io(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function At(t,e){if(t){if(typeof t=="string")return Ve(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ve(t,e):void 0}}function ao(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function lo(t){if(Array.isArray(t))return Ve(t)}function Ve(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var Dt={name:"TreeTableRow",hostName:"TreeTable",extends:X,emits:["node-click","node-toggle","checkbox-change","nodeClick","nodeToggle","checkboxChange","row-rightclick","rowRightclick"],props:{node:{type:null,default:null},dataKey:{type:[String,Function],default:"key"},parentNode:{type:null,default:null},columns:{type:null,default:null},expandedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},level:{type:Number,default:0},indentation:{type:Number,default:1},tabindex:{type:Number,default:-1},ariaSetSize:{type:Number,default:null},ariaPosInset:{type:Number,default:null},loadingMode:{type:String,default:"mask"},templates:{type:Object,default:null},contextMenu:{type:Boolean,default:!1},contextMenuSelection:{type:Object,default:null}},nodeTouched:!1,methods:{columnProp:function(e,n){return Ie(e,n)},toggle:function(){this.$emit("node-toggle",this.node)},onClick:function(e){Je(e.target)||H(e.target,"data-pc-section")==="nodetogglebutton"||H(e.target,"data-pc-section")==="nodetoggleicon"||e.target.tagName==="path"||(this.setTabIndexForSelectionMode(e,this.nodeTouched),this.$emit("node-click",{originalEvent:e,nodeTouched:this.nodeTouched,node:this.node}),this.nodeTouched=!1)},onRowRightClick:function(e){this.$emit("row-rightclick",{originalEvent:e,node:this.node})},onTouchEnd:function(){this.nodeTouched=!0},nodeKey:function(e){return U(e,this.dataKey)},onKeyDown:function(e,n){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":case"NumpadEnter":case"Space":Je(e.target)||this.onEnterKey(e,n);break;case"Tab":this.onTabKey(e);break}},onArrowDownKey:function(e){var n=e.currentTarget.nextElementSibling;n&&this.focusRowChange(e.currentTarget,n),e.preventDefault()},onArrowUpKey:function(e){var n=e.currentTarget.previousElementSibling;n&&this.focusRowChange(e.currentTarget,n),e.preventDefault()},onArrowRightKey:function(e){var n=this,r=$(e.currentTarget,"button").style.visibility==="hidden",i=$(this.$refs.node,'[data-pc-section="nodetogglebutton"]');r||(!this.expanded&&i.click(),this.$nextTick(function(){n.onArrowDownKey(e)}),e.preventDefault())},onArrowLeftKey:function(e){if(!(this.level===0&&!this.expanded)){var n=e.currentTarget,r=$(n,"button").style.visibility==="hidden",i=$(n,'[data-pc-section="nodetogglebutton"]');if(this.expanded&&!r){i.click();return}var o=this.findBeforeClickableNode(n);o&&this.focusRowChange(n,o)}},onHomeKey:function(e){var n=$(e.currentTarget.parentElement,'tr[aria-level="'.concat(this.level+1,'"]'));n&&W(n),e.preventDefault()},onEndKey:function(e){var n=ne(e.currentTarget.parentElement,'tr[aria-level="'.concat(this.level+1,'"]')),r=n[n.length-1];W(r),e.preventDefault()},onEnterKey:function(e){if(e.preventDefault(),this.setTabIndexForSelectionMode(e,this.nodeTouched),this.selectionMode==="checkbox"){this.toggleCheckbox();return}this.$emit("node-click",{originalEvent:e,nodeTouched:this.nodeTouched,node:this.node}),this.nodeTouched=!1},onTabKey:function(){var e=gt(ne(this.$refs.node.parentElement,"tr")),n=e.some(function(i){return H(i,"data-p-selected")||i.getAttribute("aria-checked")==="true"});if(e.forEach(function(i){i.tabIndex=-1}),n){var r=e.filter(function(i){return H(i,"data-p-selected")||i.getAttribute("aria-checked")==="true"});r[0].tabIndex=0;return}e[0].tabIndex=0},focusRowChange:function(e,n){e.tabIndex="-1",n.tabIndex="0",W(n)},findBeforeClickableNode:function(e){var n=e.previousElementSibling;if(n){var r=n.querySelector("button");return r&&r.style.visibility!=="hidden"?n:this.findBeforeClickableNode(n)}return null},toggleCheckbox:function(){var e=this.selectionKeys?Ne({},this.selectionKeys):{},n=!this.checked;this.propagateDown(this.node,n,e),this.$emit("checkbox-change",{node:this.node,check:n,selectionKeys:e})},propagateDown:function(e,n,r){if(n?r[this.nodeKey(e)]={checked:!0,partialChecked:!1}:delete r[this.nodeKey(e)],e.children&&e.children.length){var i=De(e.children),o;try{for(i.s();!(o=i.n()).done;){var c=o.value;this.propagateDown(c,n,r)}}catch(l){i.e(l)}finally{i.f()}}},propagateUp:function(e){var n=e.check,r=Ne({},e.selectionKeys),i=0,o=!1,c=De(this.node.children),l;try{for(c.s();!(l=c.n()).done;){var d=l.value;r[this.nodeKey(d)]&&r[this.nodeKey(d)].checked?i++:r[this.nodeKey(d)]&&r[this.nodeKey(d)].partialChecked&&(o=!0)}}catch(u){c.e(u)}finally{c.f()}n&&i===this.node.children.length?r[this.nodeKey(this.node)]={checked:!0,partialChecked:!1}:(n||delete r[this.nodeKey(this.node)],o||i>0&&i!==this.node.children.length?r[this.nodeKey(this.node)]={checked:!1,partialChecked:!0}:r[this.nodeKey(this.node)]={checked:!1,partialChecked:!1}),this.$emit("checkbox-change",{node:e.node,check:e.check,selectionKeys:r})},onCheckboxChange:function(e){var n=e.check,r=Ne({},e.selectionKeys),i=0,o=!1,c=De(this.node.children),l;try{for(c.s();!(l=c.n()).done;){var d=l.value;r[this.nodeKey(d)]&&r[this.nodeKey(d)].checked?i++:r[this.nodeKey(d)]&&r[this.nodeKey(d)].partialChecked&&(o=!0)}}catch(u){c.e(u)}finally{c.f()}n&&i===this.node.children.length?r[this.nodeKey(this.node)]={checked:!0,partialChecked:!1}:(n||delete r[this.nodeKey(this.node)],o||i>0&&i!==this.node.children.length?r[this.nodeKey(this.node)]={checked:!1,partialChecked:!0}:r[this.nodeKey(this.node)]={checked:!1,partialChecked:!1}),this.$emit("checkbox-change",{node:e.node,check:e.check,selectionKeys:r})},setTabIndexForSelectionMode:function(e,n){if(this.selectionMode!==null){var r=gt(ne(this.$refs.node.parentElement,"tr"));e.currentTarget.tabIndex=n===!1?-1:0,r.every(function(i){return i.tabIndex===-1})&&(r[0].tabIndex=0)}}},computed:{containerClass:function(){return[this.node.styleClass,this.cx("row")]},expanded:function(){return this.expandedKeys&&this.expandedKeys[this.nodeKey(this.node)]===!0},leaf:function(){return this.node.leaf===!1?!1:!(this.node.children&&this.node.children.length)},selected:function(){return this.selectionMode&&this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]===!0:!1},isSelectedWithContextMenu:function(){return this.node&&this.contextMenuSelection?pn(this.node,this.contextMenuSelection,this.dataKey):!1},checked:function(){return this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]&&this.selectionKeys[this.nodeKey(this.node)].checked:!1},partialChecked:function(){return this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]&&this.selectionKeys[this.nodeKey(this.node)].partialChecked:!1},getAriaSelected:function(){return this.selectionMode==="single"||this.selectionMode==="multiple"?this.selected:null},ptmOptions:function(){return{context:{selectable:this.$parentInstance.rowHover||this.$parentInstance.rowSelectionMode,selected:this.selected,scrollable:this.$parentInstance.scrollable}}}},components:{TTBodyCell:Rt}},so=["tabindex","aria-expanded","aria-level","aria-setsize","aria-posinset","aria-selected","aria-checked","data-p-selected","data-p-selected-contextmenu"];function co(t,e,n,r,i,o){var c=D("TTBodyCell"),l=D("TreeTableRow",!0);return s(),f(z,null,[m("tr",p({ref:"node",class:o.containerClass,style:n.node.style,tabindex:n.tabindex,role:"row","aria-expanded":n.node.children&&n.node.children.length?o.expanded:void 0,"aria-level":n.level+1,"aria-setsize":n.ariaSetSize,"aria-posinset":n.ariaPosInset,"aria-selected":o.getAriaSelected,"aria-checked":o.checked||void 0,onClick:e[1]||(e[1]=function(){return o.onClick&&o.onClick.apply(o,arguments)}),onKeydown:e[2]||(e[2]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)}),onTouchend:e[3]||(e[3]=function(){return o.onTouchEnd&&o.onTouchEnd.apply(o,arguments)}),onContextmenu:e[4]||(e[4]=function(){return o.onRowRightClick&&o.onRowRightClick.apply(o,arguments)})},t.ptm("row",o.ptmOptions),{"data-p-selected":o.selected,"data-p-selected-contextmenu":n.contextMenuSelection&&o.isSelectedWithContextMenu}),[(s(!0),f(z,null,_(n.columns,function(d,u){return s(),f(z,{key:o.columnProp(d,"columnKey")||o.columnProp(d,"field")||u},[o.columnProp(d,"hidden")?b("",!0):(s(),v(c,{key:0,column:d,node:n.node,level:n.level,leaf:o.leaf,indentation:n.indentation,expanded:o.expanded,selectionMode:n.selectionMode,checked:o.checked,partialChecked:o.partialChecked,templates:n.templates,onNodeToggle:e[0]||(e[0]=function(a){return t.$emit("node-toggle",a)}),onCheckboxToggle:o.toggleCheckbox,index:u,loadingMode:n.loadingMode,unstyled:t.unstyled,pt:t.pt},null,8,["column","node","level","leaf","indentation","expanded","selectionMode","checked","partialChecked","templates","onCheckboxToggle","index","loadingMode","unstyled","pt"]))],64)}),128))],16,so),o.expanded&&n.node.children&&n.node.children.length?(s(!0),f(z,{key:0},_(n.node.children,function(d){return s(),v(l,{key:o.nodeKey(d),dataKey:n.dataKey,columns:n.columns,node:d,parentNode:n.node,level:n.level+1,expandedKeys:n.expandedKeys,selectionMode:n.selectionMode,selectionKeys:n.selectionKeys,contextMenu:n.contextMenu,contextMenuSelection:n.contextMenuSelection,indentation:n.indentation,ariaPosInset:n.node.children.indexOf(d)+1,ariaSetSize:n.node.children.length,templates:n.templates,onNodeToggle:e[5]||(e[5]=function(u){return t.$emit("node-toggle",u)}),onNodeClick:e[6]||(e[6]=function(u){return t.$emit("node-click",u)}),onRowRightclick:e[7]||(e[7]=function(u){return t.$emit("row-rightclick",u)}),onCheckboxChange:o.onCheckboxChange,unstyled:t.unstyled,pt:t.pt},null,8,["dataKey","columns","node","parentNode","level","expandedKeys","selectionMode","selectionKeys","contextMenu","contextMenuSelection","indentation","ariaPosInset","ariaSetSize","templates","onCheckboxChange","unstyled","pt"])}),128)):b("",!0)],64)}Dt.render=co;function Pe(t){"@babel/helpers - typeof";return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Pe(t)}function xe(t,e){var n=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=Nt(t))||e){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(u){throw u},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var u=n.next();return c=u.done,u},e:function(u){l=!0,o=u},f:function(){try{c||n.return==null||n.return()}finally{if(l)throw o}}}}function yt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function te(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?yt(Object(n),!0).forEach(function(r){uo(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):yt(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function uo(t,e,n){return(e=po(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function po(t){var e=fo(t,"string");return Pe(e)=="symbol"?e:e+""}function fo(t,e){if(Pe(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(Pe(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function be(t){return bo(t)||ho(t)||Nt(t)||mo()}function mo(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Nt(t,e){if(t){if(typeof t=="string")return _e(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_e(t,e):void 0}}function ho(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function bo(t){if(Array.isArray(t))return _e(t)}function _e(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var Ft={name:"TreeTable",extends:$r,inheritAttrs:!1,emits:["node-expand","node-collapse","update:expandedKeys","update:selectionKeys","node-select","node-unselect","update:first","update:rows","page","update:sortField","update:sortOrder","update:multiSortMeta","sort","filter","column-resize-end","update:contextMenuSelection","row-contextmenu"],provide:function(){return{$columns:this.d_columns}},data:function(){return{d_expandedKeys:this.expandedKeys||{},d_first:this.first,d_rows:this.rows,d_sortField:this.sortField,d_sortOrder:this.sortOrder,d_multiSortMeta:this.multiSortMeta?be(this.multiSortMeta):[],hasASelectedNode:!1,d_columns:new un({type:"Column"})}},documentColumnResizeListener:null,documentColumnResizeEndListener:null,lastResizeHelperX:null,resizeColumnElement:null,watch:{expandedKeys:function(e){this.d_expandedKeys=e},first:function(e){this.d_first=e},rows:function(e){this.d_rows=e},sortField:function(e){this.d_sortField=e},sortOrder:function(e){this.d_sortOrder=e},multiSortMeta:function(e){this.d_multiSortMeta=e}},beforeUnmount:function(){this.destroyStyleElement(),this.d_columns.clear()},methods:{columnProp:function(e,n){return Ie(e,n)},ptHeaderCellOptions:function(e){return{context:{frozen:this.columnProp(e,"frozen")}}},onNodeToggle:function(e){var n=this.nodeKey(e);this.d_expandedKeys[n]?(delete this.d_expandedKeys[n],this.$emit("node-collapse",e)):(this.d_expandedKeys[n]=!0,this.$emit("node-expand",e)),this.d_expandedKeys=te({},this.d_expandedKeys),this.$emit("update:expandedKeys",this.d_expandedKeys)},onNodeClick:function(e){if(this.rowSelectionMode&&e.node.selectable!==!1){var n=e.nodeTouched?!1:this.metaKeySelection,r=n?this.handleSelectionWithMetaKey(e):this.handleSelectionWithoutMetaKey(e);this.$emit("update:selectionKeys",r)}},nodeKey:function(e){return U(e,this.dataKey)},handleSelectionWithMetaKey:function(e){var n=e.originalEvent,r=e.node,i=this.nodeKey(r),o=n.metaKey||n.ctrlKey,c=this.isNodeSelected(r),l;return c&&o?(this.isSingleSelectionMode()?l={}:(l=te({},this.selectionKeys),delete l[i]),this.$emit("node-unselect",r)):(this.isSingleSelectionMode()?l={}:this.isMultipleSelectionMode()&&(l=o?this.selectionKeys?te({},this.selectionKeys):{}:{}),l[i]=!0,this.$emit("node-select",r)),l},handleSelectionWithoutMetaKey:function(e){var n=e.node,r=this.nodeKey(n),i=this.isNodeSelected(n),o;return this.isSingleSelectionMode()?i?(o={},this.$emit("node-unselect",n)):(o={},o[r]=!0,this.$emit("node-select",n)):i?(o=te({},this.selectionKeys),delete o[r],this.$emit("node-unselect",n)):(o=this.selectionKeys?te({},this.selectionKeys):{},o[r]=!0,this.$emit("node-select",n)),o},onCheckboxChange:function(e){this.$emit("update:selectionKeys",e.selectionKeys),e.check?this.$emit("node-select",e.node):this.$emit("node-unselect",e.node)},onRowRightClick:function(e){this.contextMenu&&(Ze(),e.originalEvent.target.focus()),this.$emit("update:contextMenuSelection",e.node),this.$emit("row-contextmenu",e)},isSingleSelectionMode:function(){return this.selectionMode==="single"},isMultipleSelectionMode:function(){return this.selectionMode==="multiple"},onPage:function(e){this.d_first=e.first,this.d_rows=e.rows;var n=this.createLazyLoadEvent(e);n.pageCount=e.pageCount,n.page=e.page,this.d_expandedKeys={},this.$emit("update:expandedKeys",this.d_expandedKeys),this.$emit("update:first",this.d_first),this.$emit("update:rows",this.d_rows),this.$emit("page",n)},resetPage:function(){this.d_first=0,this.$emit("update:first",this.d_first)},getFilterColumnHeaderClass:function(e){return[this.cx("headerCell",{column:e}),this.columnProp(e,"filterHeaderClass")]},onColumnHeaderClick:function(e){var n=e.originalEvent,r=e.column;if(this.columnProp(r,"sortable")){var i=n.target,o=this.columnProp(r,"sortField")||this.columnProp(r,"field");if(H(i,"data-p-sortable-column")===!0||H(i,"data-pc-section")==="columntitle"||H(i,"data-pc-section")==="columnheadercontent"||H(i,"data-pc-section")==="sorticon"||H(i.parentElement,"data-pc-section")==="sorticon"||H(i.parentElement.parentElement,"data-pc-section")==="sorticon"||i.closest('[data-p-sortable-column="true"]')){if(Ze(),this.sortMode==="single")this.d_sortField===o?this.removableSort&&this.d_sortOrder*-1===this.defaultSortOrder?(this.d_sortOrder=null,this.d_sortField=null):this.d_sortOrder=this.d_sortOrder*-1:(this.d_sortOrder=this.defaultSortOrder,this.d_sortField=o),this.$emit("update:sortField",this.d_sortField),this.$emit("update:sortOrder",this.d_sortOrder),this.resetPage();else if(this.sortMode==="multiple"){var c=n.metaKey||n.ctrlKey;c||(this.d_multiSortMeta=this.d_multiSortMeta.filter(function(l){return l.field===o})),this.addMultiSortField(o),this.$emit("update:multiSortMeta",this.d_multiSortMeta)}this.$emit("sort",this.createLazyLoadEvent(n))}}},addMultiSortField:function(e){var n=this.d_multiSortMeta.findIndex(function(r){return r.field===e});n>=0?this.removableSort&&this.d_multiSortMeta[n].order*-1===this.defaultSortOrder?this.d_multiSortMeta.splice(n,1):this.d_multiSortMeta[n]={field:e,order:this.d_multiSortMeta[n].order*-1}:this.d_multiSortMeta.push({field:e,order:this.defaultSortOrder}),this.d_multiSortMeta=be(this.d_multiSortMeta)},sortSingle:function(e){return this.sortNodesSingle(e)},sortNodesSingle:function(e){var n=this,r=be(e),i=$e();return r.sort(function(o,c){var l=U(o.data,n.d_sortField),d=U(c.data,n.d_sortField);return Be(l,d,n.d_sortOrder,i)}),r},sortMultiple:function(e){return this.sortNodesMultiple(e)},sortNodesMultiple:function(e){var n=this,r=be(e);return r.sort(function(i,o){return n.multisortField(i,o,0)}),r},multisortField:function(e,n,r){var i=U(e.data,this.d_multiSortMeta[r].field),o=U(n.data,this.d_multiSortMeta[r].field),c=$e();return i===o?this.d_multiSortMeta.length-1>r?this.multisortField(e,n,r+1):0:Be(i,o,this.d_multiSortMeta[r].order,c)},filter:function(e){var n=[],r=this.filterMode==="strict",i=xe(e),o;try{for(i.s();!(o=i.n()).done;){for(var c=o.value,l=te({},c),d=!0,u=!1,a=0;a<this.columns.length;a++){var k=this.columns[a],O=this.columnProp(k,"filterField")||this.columnProp(k,"field");if(Object.prototype.hasOwnProperty.call(this.filters,O)){var B=this.columnProp(k,"filterMatchMode")||"startsWith",se=this.filters[O],Z=Xe.filters[B],N={filterField:O,filterValue:se,filterConstraint:Z,strict:r};if((r&&!(this.findFilteredNodes(l,N)||this.isFilterMatched(l,N))||!r&&!(this.isFilterMatched(l,N)||this.findFilteredNodes(l,N)))&&(d=!1),!d)break}if(this.hasGlobalFilter()&&!u){var V=te({},l),pe=this.filters.global,ze=Xe.filters.contains,F={filterField:O,filterValue:pe,filterConstraint:ze,strict:r};(r&&(this.findFilteredNodes(V,F)||this.isFilterMatched(V,F))||!r&&(this.isFilterMatched(V,F)||this.findFilteredNodes(V,F)))&&(u=!0,l=V)}}var J=d;this.hasGlobalFilter()&&(J=d&&u),J&&n.push(l)}}catch(re){i.e(re)}finally{i.f()}var ee=this.createLazyLoadEvent(event);return ee.filteredValue=n,this.$emit("filter",ee),n},findFilteredNodes:function(e,n){if(e){var r=!1;if(e.children){var i=be(e.children);e.children=[];var o=xe(i),c;try{for(o.s();!(c=o.n()).done;){var l=c.value,d=te({},l);this.isFilterMatched(d,n)&&(r=!0,e.children.push(d))}}catch(u){o.e(u)}finally{o.f()}}if(r)return!0}},isFilterMatched:function(e,n){var r=n.filterField,i=n.filterValue,o=n.filterConstraint,c=n.strict,l=!1,d=U(e.data,r);return o(d,i,this.filterLocale)&&(l=!0),(!l||c&&!this.isNodeLeaf(e))&&(l=this.findFilteredNodes(e,{filterField:r,filterValue:i,filterConstraint:o,strict:c})||l),l},isNodeSelected:function(e){return this.selectionMode&&this.selectionKeys?this.selectionKeys[this.nodeKey(e)]===!0:!1},isNodeLeaf:function(e){return e.leaf===!1?!1:!(e.children&&e.children.length)},createLazyLoadEvent:function(e){var n=this,r;return this.hasFilters()&&(r={},this.columns.forEach(function(i){n.columnProp(i,"field")&&(r[i.props.field]=n.columnProp(i,"filterMatchMode"))})),{originalEvent:e,first:this.d_first,rows:this.d_rows,sortField:this.d_sortField,sortOrder:this.d_sortOrder,multiSortMeta:this.d_multiSortMeta,filters:this.filters,filterMatchModes:r}},onColumnResizeStart:function(e){var n=Me(this.$el).left;this.resizeColumnElement=e.target.parentElement,this.columnResizing=!0,this.lastResizeHelperX=e.pageX-n+this.$el.scrollLeft,this.bindColumnResizeEvents()},onColumnResize:function(e){var n=Me(this.$el).left;this.$el.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&cn(this.$el,{"user-select":"none"}),this.$refs.resizeHelper.style.height=this.$el.offsetHeight+"px",this.$refs.resizeHelper.style.top="0px",this.$refs.resizeHelper.style.left=e.pageX-n+this.$el.scrollLeft+"px",this.$refs.resizeHelper.style.display="block"},onColumnResizeEnd:function(){var e=dn(this.$el)?this.lastResizeHelperX-this.$refs.resizeHelper.offsetLeft:this.$refs.resizeHelper.offsetLeft-this.lastResizeHelperX,n=this.resizeColumnElement.offsetWidth,r=n+e,i=this.resizeColumnElement.style.minWidth||15;if(n+e>parseInt(i,10)){if(this.columnResizeMode==="fit"){var o=this.resizeColumnElement.nextElementSibling,c=o.offsetWidth-e;r>15&&c>15&&this.resizeTableCells(r,c)}else if(this.columnResizeMode==="expand"){var l=this.$refs.table.offsetWidth+e+"px",d=function(a){a&&(a.style.width=a.style.minWidth=l)};this.resizeTableCells(r),d(this.$refs.table)}this.$emit("column-resize-end",{element:this.resizeColumnElement,delta:e})}this.$refs.resizeHelper.style.display="none",this.resizeColumn=null,this.$el.removeAttribute("data-p-unselectable-text"),!this.isUnstyled&&(this.$el.style["user-select"]=""),this.unbindColumnResizeEvents()},resizeTableCells:function(e,n){var r=Tt(this.resizeColumnElement),i=[],o=ne(this.$refs.table,'thead[data-pc-section="thead"] > tr > th');o.forEach(function(d){return i.push(le(d))}),this.destroyStyleElement(),this.createStyleElement();var c="",l='[data-pc-name="treetable"]['.concat(this.$attrSelector,'] > [data-pc-section="tablecontainer"] > table[data-pc-section="table"]');i.forEach(function(d,u){var a=u===r?e:n&&u===r+1?n:d,k="width: ".concat(a,"px !important; max-width: ").concat(a,"px !important");c+=`
                    `.concat(l,' > thead[data-pc-section="thead"] > tr > th:nth-child(').concat(u+1,`),
                    `).concat(l,' > tbody[data-pc-section="tbody"] > tr > td:nth-child(').concat(u+1,`),
                    `).concat(l,' > tfoot[data-pc-section="tfoot"] > tr > td:nth-child(').concat(u+1,`) {
                        `).concat(k,`
                    }
                `)}),this.styleElement.innerHTML=c},bindColumnResizeEvents:function(){var e=this;this.documentColumnResizeListener||(this.documentColumnResizeListener=document.addEventListener("mousemove",function(n){e.columnResizing&&e.onColumnResize(n)})),this.documentColumnResizeEndListener||(this.documentColumnResizeEndListener=document.addEventListener("mouseup",function(){e.columnResizing&&(e.columnResizing=!1,e.onColumnResizeEnd())}))},unbindColumnResizeEvents:function(){this.documentColumnResizeListener&&(document.removeEventListener("document",this.documentColumnResizeListener),this.documentColumnResizeListener=null),this.documentColumnResizeEndListener&&(document.removeEventListener("document",this.documentColumnResizeEndListener),this.documentColumnResizeEndListener=null)},onColumnKeyDown:function(e,n){(e.code==="Enter"||e.code==="NumpadEnter")&&e.currentTarget.nodeName==="TH"&&H(e.currentTarget,"data-p-sortable-column")&&this.onColumnHeaderClick(e,n)},hasColumnFilter:function(){if(this.columns){var e=xe(this.columns),n;try{for(e.s();!(n=e.n()).done;){var r=n.value;if(r.children&&r.children.filter)return!0}}catch(i){e.e(i)}finally{e.f()}}return!1},hasFilters:function(){return this.filters&&Object.keys(this.filters).length>0&&this.filters.constructor===Object},hasGlobalFilter:function(){return this.filters&&Object.prototype.hasOwnProperty.call(this.filters,"global")},getItemLabel:function(e){return e.data.name},createStyleElement:function(){var e;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",sn(this.styleElement,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.head.appendChild(this.styleElement)},destroyStyleElement:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},setTabindex:function(e,n){if(this.isNodeSelected(e))return this.hasASelectedNode=!0,0;if(this.selectionMode){if(!this.isNodeSelected(e)&&n===0&&!this.hasASelectedNode)return 0}else if(!this.selectionMode&&n===0)return 0;return-1}},computed:{columns:function(){return this.d_columns.get(this)},processedData:function(){if(this.lazy)return this.value;if(this.value&&this.value.length){var e=this.value;return this.sorted&&(this.sortMode==="single"?e=this.sortSingle(e):this.sortMode==="multiple"&&(e=this.sortMultiple(e))),this.hasFilters()&&(e=this.filter(e)),e}else return null},dataToRender:function(){var e=this.processedData;if(this.paginator){var n=this.lazy?0:this.d_first;return e.slice(n,n+this.d_rows)}else return e},empty:function(){var e=this.processedData;return!e||e.length===0},sorted:function(){return this.d_sortField||this.d_multiSortMeta&&this.d_multiSortMeta.length>0},hasFooter:function(){var e=!1,n=xe(this.columns),r;try{for(n.s();!(r=n.n()).done;){var i=r.value;if(this.columnProp(i,"footer")||i.children&&i.children.footer){e=!0;break}}}catch(o){n.e(o)}finally{n.f()}return e},paginatorTop:function(){return this.paginator&&(this.paginatorPosition!=="bottom"||this.paginatorPosition==="both")},paginatorBottom:function(){return this.paginator&&(this.paginatorPosition!=="top"||this.paginatorPosition==="both")},singleSelectionMode:function(){return this.selectionMode&&this.selectionMode==="single"},multipleSelectionMode:function(){return this.selectionMode&&this.selectionMode==="multiple"},rowSelectionMode:function(){return this.singleSelectionMode||this.multipleSelectionMode},totalRecordsLength:function(){if(this.lazy)return this.totalRecords;var e=this.processedData;return e?e.length:0}},components:{TTRow:Dt,TTPaginator:zt,TTHeaderCell:jt,TTFooterCell:Lt,SpinnerIcon:Ot}};function Oe(t){"@babel/helpers - typeof";return Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Oe(t)}function vt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function kt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?vt(Object(n),!0).forEach(function(r){go(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):vt(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function go(t,e,n){return(e=yo(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function yo(t){var e=vo(t,"string");return Oe(e)=="symbol"?e:e+""}function vo(t,e){if(Oe(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(Oe(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var ko=["colspan"];function wo(t,e,n,r,i,o){var c=D("TTPaginator"),l=D("TTHeaderCell"),d=D("TTRow"),u=D("TTFooterCell");return s(),f("div",p({class:t.cx("root"),"data-scrollselectors":".p-treetable-scrollable-body"},t.ptmi("root")),[y(t.$slots,"default"),t.loading&&t.loadingMode==="mask"?(s(),f("div",p({key:0,class:t.cx("loading")},t.ptm("loading")),[m("div",p({class:t.cx("mask")},t.ptm("mask")),[y(t.$slots,"loadingicon",{class:T(t.cx("loadingIcon"))},function(){return[(s(),v(M(t.loadingIcon?"span":"SpinnerIcon"),p({spin:"",class:[t.cx("loadingIcon"),t.loadingIcon]},t.ptm("loadingIcon")),null,16,["class"]))]})],16)],16)):b("",!0),t.$slots.header?(s(),f("div",p({key:1,class:t.cx("header")},t.ptm("header")),[y(t.$slots,"header")],16)):b("",!0),o.paginatorTop?(s(),v(c,{key:2,rows:i.d_rows,first:i.d_first,totalRecords:o.totalRecordsLength,pageLinkSize:t.pageLinkSize,template:t.paginatorTemplate,rowsPerPageOptions:t.rowsPerPageOptions,currentPageReportTemplate:t.currentPageReportTemplate,class:T(t.cx("pcPaginator",{position:"top"})),onPage:e[0]||(e[0]=function(a){return o.onPage(a)}),alwaysShow:t.alwaysShowPaginator,unstyled:t.unstyled,pt:t.ptm("pcPaginator")},ae({_:2},[t.$slots.paginatorcontainer?{name:"container",fn:g(function(a){return[y(t.$slots,"paginatorcontainer",{first:a.first,last:a.last,rows:a.rows,page:a.page,pageCount:a.pageCount,totalRecords:a.totalRecords,firstPageCallback:a.firstPageCallback,lastPageCallback:a.lastPageCallback,prevPageCallback:a.prevPageCallback,nextPageCallback:a.nextPageCallback,rowChangeCallback:a.rowChangeCallback})]}),key:"0"}:void 0,t.$slots.paginatorstart?{name:"start",fn:g(function(){return[y(t.$slots,"paginatorstart")]}),key:"1"}:void 0,t.$slots.paginatorend?{name:"end",fn:g(function(){return[y(t.$slots,"paginatorend")]}),key:"2"}:void 0,t.$slots.paginatorfirstpagelinkicon?{name:"firstpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatorfirstpagelinkicon",{class:T(a.class)})]}),key:"3"}:void 0,t.$slots.paginatorprevpagelinkicon?{name:"prevpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatorprevpagelinkicon",{class:T(a.class)})]}),key:"4"}:void 0,t.$slots.paginatornextpagelinkicon?{name:"nextpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatornextpagelinkicon",{class:T(a.class)})]}),key:"5"}:void 0,t.$slots.paginatorlastpagelinkicon?{name:"lastpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatorlastpagelinkicon",{class:T(a.class)})]}),key:"6"}:void 0,t.$slots.paginatorjumptopagedropdownicon?{name:"jumptopagedropdownicon",fn:g(function(a){return[y(t.$slots,"paginatorjumptopagedropdownicon",{class:T(a.class)})]}),key:"7"}:void 0,t.$slots.paginatorrowsperpagedropdownicon?{name:"rowsperpagedropdownicon",fn:g(function(a){return[y(t.$slots,"paginatorrowsperpagedropdownicon",{class:T(a.class)})]}),key:"8"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):b("",!0),m("div",p({class:t.cx("tableContainer"),style:[t.sx("tableContainer"),{maxHeight:t.scrollHeight}]},t.ptm("tableContainer")),[m("table",p({ref:"table",role:"treegrid",class:[t.cx("table"),t.tableClass],style:t.tableStyle},kt(kt({},t.tableProps),t.ptm("table"))),[m("thead",p({class:t.cx("thead"),style:t.sx("thead"),role:"rowgroup"},t.ptm("thead")),[m("tr",p({role:"row"},t.ptm("headerRow")),[(s(!0),f(z,null,_(o.columns,function(a,k){return s(),f(z,{key:o.columnProp(a,"columnKey")||o.columnProp(a,"field")||k},[o.columnProp(a,"hidden")?b("",!0):(s(),v(l,{key:0,column:a,resizableColumns:t.resizableColumns,sortField:i.d_sortField,sortOrder:i.d_sortOrder,multiSortMeta:i.d_multiSortMeta,sortMode:t.sortMode,onColumnClick:e[1]||(e[1]=function(O){return o.onColumnHeaderClick(O)}),onColumnResizestart:e[2]||(e[2]=function(O){return o.onColumnResizeStart(O)}),index:k,unstyled:t.unstyled,pt:t.pt},null,8,["column","resizableColumns","sortField","sortOrder","multiSortMeta","sortMode","index","unstyled","pt"]))],64)}),128))],16),o.hasColumnFilter()?(s(),f("tr",wt(p({key:0},t.ptm("headerRow"))),[(s(!0),f(z,null,_(o.columns,function(a,k){return s(),f(z,{key:o.columnProp(a,"columnKey")||o.columnProp(a,"field")||k},[o.columnProp(a,"hidden")?b("",!0):(s(),f("th",p({key:0,class:o.getFilterColumnHeaderClass(a),style:[o.columnProp(a,"style"),o.columnProp(a,"filterHeaderStyle")]},{ref_for:!0},t.ptm("headerCell",o.ptHeaderCellOptions(a))),[a.children&&a.children.filter?(s(),v(M(a.children.filter),{key:0,column:a,index:k},null,8,["column","index"])):b("",!0)],16))],64)}),128))],16)):b("",!0)],16),m("tbody",p({class:t.cx("tbody"),role:"rowgroup"},t.ptm("tbody")),[o.empty?(s(),f("tr",p({key:1,class:t.cx("emptyMessage")},t.ptm("emptyMessage")),[m("td",p({colspan:o.columns.length},t.ptm("emptyMessageCell")),[y(t.$slots,"empty")],16,ko)],16)):(s(!0),f(z,{key:0},_(o.dataToRender,function(a,k){return s(),v(d,{key:o.nodeKey(a),dataKey:t.dataKey,columns:o.columns,node:a,level:0,expandedKeys:i.d_expandedKeys,indentation:t.indentation,selectionMode:t.selectionMode,selectionKeys:t.selectionKeys,ariaSetSize:o.dataToRender.length,ariaPosInset:k+1,tabindex:o.setTabindex(a,k),loadingMode:t.loadingMode,contextMenu:t.contextMenu,contextMenuSelection:t.contextMenuSelection,templates:t.$slots,onNodeToggle:o.onNodeToggle,onNodeClick:o.onNodeClick,onCheckboxChange:o.onCheckboxChange,onRowRightclick:e[3]||(e[3]=function(O){return o.onRowRightClick(O)}),unstyled:t.unstyled,pt:t.pt},null,8,["dataKey","columns","node","expandedKeys","indentation","selectionMode","selectionKeys","ariaSetSize","ariaPosInset","tabindex","loadingMode","contextMenu","contextMenuSelection","templates","onNodeToggle","onNodeClick","onCheckboxChange","unstyled","pt"])}),128))],16),o.hasFooter?(s(),f("tfoot",p({key:0,class:t.cx("tfoot"),style:t.sx("tfoot"),role:"rowgroup"},t.ptm("tfoot")),[m("tr",p({role:"row"},t.ptm("footerRow")),[(s(!0),f(z,null,_(o.columns,function(a,k){return s(),f(z,{key:o.columnProp(a,"columnKey")||o.columnProp(a,"field")||k},[o.columnProp(a,"hidden")?b("",!0):(s(),v(u,{key:0,column:a,index:k,unstyled:t.unstyled,pt:t.pt},null,8,["column","index","unstyled","pt"]))],64)}),128))],16)],16)):b("",!0)],16)],16),o.paginatorBottom?(s(),v(c,{key:3,rows:i.d_rows,first:i.d_first,totalRecords:o.totalRecordsLength,pageLinkSize:t.pageLinkSize,template:t.paginatorTemplate,rowsPerPageOptions:t.rowsPerPageOptions,currentPageReportTemplate:t.currentPageReportTemplate,class:T(t.cx("pcPaginator",{position:"bottom"})),onPage:e[4]||(e[4]=function(a){return o.onPage(a)}),alwaysShow:t.alwaysShowPaginator,unstyled:t.unstyled,pt:t.ptm("pcPaginator")},ae({_:2},[t.$slots.paginatorcontainer?{name:"container",fn:g(function(a){return[y(t.$slots,"paginatorcontainer",{first:a.first,last:a.last,rows:a.rows,page:a.page,pageCount:a.pageCount,totalRecords:a.totalRecords,firstPageCallback:a.firstPageCallback,lastPageCallback:a.lastPageCallback,prevPageCallback:a.prevPageCallback,nextPageCallback:a.nextPageCallback,rowChangeCallback:a.rowChangeCallback})]}),key:"0"}:void 0,t.$slots.paginatorstart?{name:"start",fn:g(function(){return[y(t.$slots,"paginatorstart")]}),key:"1"}:void 0,t.$slots.paginatorend?{name:"end",fn:g(function(){return[y(t.$slots,"paginatorend")]}),key:"2"}:void 0,t.$slots.paginatorfirstpagelinkicon?{name:"firstpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatorfirstpagelinkicon",{class:T(a.class)})]}),key:"3"}:void 0,t.$slots.paginatorprevpagelinkicon?{name:"prevpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatorprevpagelinkicon",{class:T(a.class)})]}),key:"4"}:void 0,t.$slots.paginatornextpagelinkicon?{name:"nextpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatornextpagelinkicon",{class:T(a.class)})]}),key:"5"}:void 0,t.$slots.paginatorlastpagelinkicon?{name:"lastpagelinkicon",fn:g(function(a){return[y(t.$slots,"paginatorlastpagelinkicon",{class:T(a.class)})]}),key:"6"}:void 0,t.$slots.paginatorjumptopagedropdownicon?{name:"jumptopagedropdownicon",fn:g(function(a){return[y(t.$slots,"paginatorjumptopagedropdownicon",{class:T(a.class)})]}),key:"7"}:void 0,t.$slots.paginatorrowsperpagedropdownicon?{name:"rowsperpagedropdownicon",fn:g(function(a){return[y(t.$slots,"paginatorrowsperpagedropdownicon",{class:T(a.class)})]}),key:"8"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):b("",!0),t.$slots.footer?(s(),f("div",p({key:4,class:t.cx("footer")},t.ptm("footer")),[y(t.$slots,"footer")],16)):b("",!0),m("div",p({ref:"resizeHelper",class:t.cx("columnResizeIndicator"),style:{display:"none"}},t.ptm("columnResizeIndicator")),null,16)],16)}Ft.render=wo;const So=(t,e,n)=>{const r=[()=>!!Ht(t)],{isQueryEnabled:i,options:o}=fn(r,n);return Bt({queryKey:[mn,t],queryFn:()=>Fn(t,e),enabled:i,...o})},Co=()=>{const t=It(),e=Ut();return Vt({mutationKey:hn,mutationFn:async n=>{await t.roarfirekit.deleteAdministration(n)},onSuccess:()=>{e.invalidateQueries({queryKey:[bn]}),e.invalidateQueries({queryKey:[gn]}),e.invalidateQueries({queryKey:[yn]})}})},Po={class:"p-card card-administration mb-4 w-full"},Oo={class:"card-admin-body w-full"},To={class:"flex flex-row w-full md:h-2rem sm:h-3rem"},Io={class:"flex-grow-1 pr-3 mr-2 p-0 m-0"},zo={"data-cy":"h2-card-admin-title",class:"sm:text-lg lg:text-lx m-0 h2-card-admin-title"},Ko={key:0,class:"m-0 ml-1"},xo={class:"font-bold"},Mo={class:"flex justify-content-end w-3"},Eo={class:"card-admin-details"},Lo={class:"card-admin-assessments"},jo=["onClick"],Ro={key:1},Ao={key:0},Do={key:1},No={key:0,class:"flex m-0"},Fo=_t({__name:"CardAdministration",props:{id:{},title:{},publicName:{},stats:{default:()=>({})},dates:{},assignees:{},assessments:{},showParams:{type:Boolean},isSuperAdmin:{type:Boolean},creator:{default:{}}},setup(t){const e=vn(),n=t,r=kn(),i=wn(),{mutateAsync:o}=Co(),c=ce(()=>{const h=new Date,K=new Date(n.dates.end);let R="OPEN";return h>K&&(R="CLOSED"),R}),l=ce(()=>c.value.toLowerCase()),d=ce(()=>{const h=[];return n.isSuperAdmin&&h.push({label:"Delete",icon:"pi pi-trash",command:K=>{r.require({target:K.originalEvent.currentTarget,message:"Are you sure you want to delete this administration?",icon:"pi pi-exclamation-triangle",accept:async()=>{await o(n.id),i.add({severity:st.INFO,summary:"Confirmed",detail:`Deleted administration ${n.title}`,life:lt})},reject:()=>{i.add({severity:st.ERROR,summary:"Rejected",detail:`Failed to delete administration ${n.title}`,life:lt})}})}}),h.push({label:"Edit",icon:"pi pi-pencil",command:()=>{e.push({name:"EditAssignment",params:{adminId:n.id}})}}),h}),u=ce(()=>Sn(n.dates,h=>new Date(h))),a=n.assessments.map(h=>h.taskId.toLowerCase()).sort((h,K)=>{var R,P;return(((R=at[h])==null?void 0:R.order)??0)-(((P=at[K])==null?void 0:P.order)??0)}),k=et(n.assessments.map(h=>[h.taskId.toLowerCase(),x()])),O=et(n.assessments.map(h=>[h.taskId.toLowerCase(),h.params])),B=h=>Pn(h).map(([K,R])=>({key:K,value:R})),se=(h,K)=>{k[K].value[0].toggle(h)};function Z(h){return n.assessments.find(K=>K.taskId.toLowerCase()===h)}const N=x(!1),V=x(!1);St(()=>{V.value=!0,N.value=!N.value});const pe=ce(()=>window.innerWidth>768),{data:ze,isLoading:F}=Gn(),{data:J,isLoading:ee}=So(n.id,n.assignees,{enabled:V}),re=ce(()=>ee.value||de.value),G=x([]);Fe(J,h=>{G.value=h||[]}),Fe(N,h=>{h&&(G.value=J.value||[])});const de=x(!1),Le=async h=>{if(h.data.orgType===it.SCHOOLS&&h.children&&h.children.length>0&&!h.data.expanded){de.value=!0;const K=h.children.map(({data:E})=>`classes/${E.id}`),R=h.children.map(({data:E})=>`administrations/${n.id}/stats/${E.id}`),P=[tt(K,["name","schoolId"]),tt(R)],[w,S]=await Promise.all(P),j={key:h.key,data:{...h.data,expanded:!0}},L=On($n(w,S).map(([E,Q],fe)=>{if(!E)return;const{collection:oe=Tn.CLASSES,...Ye}=E;if(!In(Ye))return{key:`${h.key}-${fe}`,data:{orgType:it[oe.toUpperCase()],...Q&&{stats:Q},...Ye}}}),void 0).filter(E=>E!==void 0);j.children=L;const Qe=G.value.map(E=>{var Q;return E.data.id===h.data.districtId?{...E,children:(Q=E.children)==null?void 0:Q.map(oe=>oe.data.id===h.data.id?j:oe)}:E.data.id===h.data.id?j:E});for(const E of Qe??[])for(const Q of(E==null?void 0:E.children)??[])Q.children&&(Q.children=Q.children.toSorted((fe,oe)=>fe.data.stats?oe.data.stats?(fe.data.name||"").localeCompare(oe.data.name||""):-1:1));G.value=Qe,de.value=!1}};return(h,K)=>{var w;const R=D("router-link"),P=Ee("tooltip");return s(),f("div",Po,[m("div",Oo,[m("div",To,[m("div",Io,[m("h2",zo,A(h.title),1),Object.keys(n.creator).length?(s(),f("small",Ko,[K[0]||(K[0]=q(" — Created by ",-1)),m("span",xo,A((w=n.creator)==null?void 0:w.displayName),1)])):b("",!0)]),m("div",Mo,[I(C(Et),{"action-button-props":{rounded:!0,severity:"danger",variant:"outlined"},"button-props":{rounded:!0,severity:"danger",variant:"outlined"},model:d.value,"tooltip-options":{event:"hover",position:"top"},"transition-delay":80,class:"administration-action",direction:"left","hide-icon":"pi pi-times","show-icon":"pi pi-cog"},null,8,["model"]),I(C(Mt))])]),m("div",Eo,[K[1]||(K[1]=m("span",{class:"mr-1"},[m("strong",null,"Availability"),q(":")],-1)),m("span",null,A(u.value.start.toLocaleDateString())+" — "+A(u.value.end.toLocaleDateString()),1),m("span",{class:T(["status-badge",l.value])},A(c.value),3)]),m("div",Lo,[K[2]||(K[2]=m("span",{class:"mr-1"},[m("strong",null,"Tasks"),q(":")],-1)),C(F)?b("",!0):(s(!0),f(z,{key:0},_(C(a),S=>{var j;return s(),f("span",{key:S,class:"card-inline-list-item"},[m("span",null,A(((j=C(ze)[S])==null?void 0:j.name)??S),1),h.showParams?ue((s(),f("span",{key:0,class:"pi pi-info-circle cursor-pointer ml-1",style:{"font-size":"0.8rem"},onClick:L=>se(L,S)},null,8,jo)),[[P,"View parameters",void 0,{top:!0}]]):b("",!0)])}),128)),h.showParams?(s(),f("div",Ro,[(s(!0),f(z,null,_(C(a),S=>(s(),v(C(Hn),{key:S,ref_for:!0,ref:C(k)[S]},{default:g(()=>[Z(S).variantId?(s(),f("div",Ao," Variant ID: "+A(Z(S).variantId),1)):b("",!0),Z(S).variantName?(s(),f("div",Do," Variant Name: "+A(Z(S).variantName),1)):b("",!0),I(C(Rn),{"striped-rows":"",class:"p-datatable-small","table-style":"min-width: 30rem",value:B(C(O)[S])},{default:g(()=>[I(C(he),{field:"key",header:"Parameter",style:{width:"50%"}}),I(C(he),{field:"value",header:"Value",style:{width:"50%"}})]),_:2},1032,["value"])]),_:2},1024))),128))])):b("",!0)]),I(C(Ft),{class:"mt-3",lazy:"","row-hover":"",loading:re.value,value:G.value,onNodeExpand:Le},{default:g(()=>[I(C(he),{field:"name",expander:"",style:{width:"20rem"}}),n.stats&&pe.value?(s(),v(C(he),{key:0,field:"id"},{body:g(({node:S})=>{var j,L;return[I(C(Bn),{type:"bar",data:C(Yn)((j=S.data.stats)==null?void 0:j.assignment),options:C(Qn)((L=S.data.stats)==null?void 0:L.assignment),class:"h-2rem w-full m-0 mt-2 p-0"},null,8,["data","options"])]}),_:1})):b("",!0),I(C(he),{field:"id",header:"",style:{width:"14rem"}},{body:g(({node:S})=>[S.data.id?(s(),f("div",No,[I(R,{to:{name:"ProgressReport",params:{administrationId:n.id,orgId:S.data.id,orgType:S.data.orgType}},class:"no-underline text-black"},{default:g(()=>[ue(I(C(ie),{class:"m-0 bg-transparent text-bluegray-500 shadow-none border-none p-0 border-round",style:{color:"var(--primary-color) !important"},severity:"secondary",text:"",raised:"",label:"See Details","aria-label":"Completion details",size:"small","data-cy":"button-progress"},null,512),[[P,"See completion details",void 0,{top:!0}]])]),_:2},1032,["to"]),C(Cn)?b("",!0):(s(),v(R,{key:0,to:{name:"ScoreReport",params:{administrationId:n.id,orgId:S.data.id,orgType:S.data.orgType}},class:"no-underline"},{default:g(()=>[ue(I(C(ie),{class:"m-0 mr-1 surface-0 text-bluegray-500 shadow-1 border-none p-2 border-round hover:surface-100",style:{height:"2.5rem",color:"var(--primary-color) !important"},severity:"secondary",text:"",raised:"",label:"Scores","aria-label":"Scores",size:"small","data-cy":"button-scores"},null,512),[[P,"See Scores",void 0,{top:!0}]])]),_:2},1032,["to"]))])):b("",!0)]),_:1})]),_:1},8,["loading","value"])])])}}}),$o={class:"container main"},Bo={class:"main-body"},Ho={class:"flex flex-column"},Uo={class:"flex flex-row flex-wrap align-items-center justify-content-between mb-3 gap-3"},Vo={class:"flex align-items-center gap-2 mt-2"},_o={class:"flex gap-3 align-items-stretch justify-content-start"},Wo={class:"flex flex-column gap-1"},Go={class:"flex align-items-center"},Qo={class:"flex flex-column gap-1"},Yo={key:0,class:"flex align-items-center gap-3 text-gray-700 px-4 py-3 my-1 bg-gray-100 rounded"},qo={key:0,class:"loading-container"},Xo={style:{width:"100%",display:"flex","justify-content":"center","align-items":"center","margin-top":"100px","margin-bottom":"50px"}},Zo={class:"uppercase font-light text-sm text-gray-600"},Jo={key:1},ei={class:"mb-2 w-full"},ti={class:"flex flex-column align-items-center justify-content-center py-8"},zi={__name:"HomeAdministrator",setup(t){const e=x(!1),n=x(10),r=x(0),i=x(Ln),o=x([]),c=x([]),l=x(""),d=x(""),u=x([]),a=x(!1),k=It(),{roarfirekit:O}=zn(k);let B;const se=()=>{B&&B(),e.value=!0};B=k.$subscribe(async(P,w)=>{w.roarfirekit.restConfig&&se()}),St(()=>{O.value.restConfig&&se()});const{data:Z}=Kn({enabled:e}),{isSuperAdmin:N}=xn(Z),V=()=>{var P;if((P=F.value)!=null&&P.length){for(const w of F.value)c.value.push(...w.name.toLowerCase().split(" "));c.value=[...new Set(c.value)]}},{isLoading:pe,isFetching:ze,data:F}=An(i,a,{enabled:e});Fe(F,P=>{P&&(V(),d.value?u.value=P==null?void 0:P.filter(w=>w.name.toLowerCase().includes(d.value.toLowerCase())):u.value=P)},{immediate:!0});const J=x([{label:"Name (ascending)",value:[{field:{fieldPath:"name"},direction:"ASCENDING"}]},{label:"Name (descending)",value:[{field:{fieldPath:"name"},direction:"DESCENDING"}]},{label:"Start date (ascending)",value:[{field:{fieldPath:"dates.start"},direction:"ASCENDING"}]},{label:"Start date (descending)",value:[{field:{fieldPath:"dates.start"},direction:"DESCENDING"}]},{label:"End date (ascending)",value:[{field:{fieldPath:"dates.end"},direction:"ASCENDING"}]},{label:"End date (descending)",value:[{field:{fieldPath:"dates.end"},direction:"DESCENDING"}]},{label:"Creation date (ascending)",value:[{field:{fieldPath:"dates.created"},direction:"ASCENDING"}]},{label:"Creation date (descending)",value:[{field:{fieldPath:"dates.created"},direction:"DESCENDING"}]}]),ee=x(J.value[0]),re=x(),G=x(),de=x(0),Le=()=>{d.value="",l.value="",u.value=F.value},h=()=>{d.value=l.value,d.value?u.value=F.value.filter(P=>P.name.toLowerCase().includes(d.value.toLowerCase())):u.value=F.value},K=()=>{o.value=c.value.filter(P=>P.toLowerCase().includes(l.value.toLowerCase()))},R=P=>{var j;de.value+=1,r.value=0;const w=P.value.value,S=P.value;!N.value&&S[0].field.fieldPath==="name"?G.value="publicName":G.value=(j=w[0].field)==null?void 0:j.fieldPath,w[0].direction==="DESCENDING"?re.value=-1:re.value=1,ee.value=S};return(P,w)=>(s(),f("main",$o,[m("section",Bo,[m("div",null,[m("div",Ho,[m("div",Uo,[w[6]||(w[6]=Wt('<div class="flex flex-column gap-2"><div class="flex align-items-center flex-wrap gap-3 mb-2"><div class="admin-page-header">All Assignments</div></div><div class="text-md text-gray-500"> This page lists all the assignments that are administered to your users. </div><div class="text-md text-gray-500 mb-1"> You can view and monitor completion and create new bundles of tasks, surveys, and questionnaires to be administered as assignments. </div></div>',1)),m("div",Vo,[m("div",_o,[m("div",Wo,[w[4]||(w[4]=m("small",{id:"search-help",class:"text-gray-400"},"Search by name",-1)),m("div",Go,[I(C(Dn),null,{default:g(()=>[I(C(jn),{modelValue:l.value,"onUpdate:modelValue":w[0]||(w[0]=S=>l.value=S),placeholder:"Search Assignments",suggestions:o.value,"data-cy":"search-input",onComplete:K,onKeyup:Gt(h,["enter"])},null,8,["modelValue","suggestions"]),I(C(ie),{icon:"pi pi-search",class:"text-xs bg-primary border-none text-white pl-3 pr-3",onClick:h})]),_:1})])])]),m("div",Qo,[w[5]||(w[5]=m("small",{for:"dd-sort",class:"text-gray-400"},"Sort by",-1)),I(C(Mn),{modelValue:ee.value,"onUpdate:modelValue":w[1]||(w[1]=S=>ee.value=S),"input-id":"dd-sort",options:J.value,"option-label":"label","data-cy":"dropdown-sort-administrations",onChange:w[2]||(w[2]=S=>R(S))},null,8,["modelValue","options"])])])]),d.value.length>0?(s(),f("div",Yo,[m("div",null,[w[7]||(w[7]=q(" You searched for ",-1)),m("strong",null,A(d.value),1)]),I(C(ie),{text:"",class:"text-xs p-2 border-none border-round text-primary hover:surface-200",onClick:Le},{default:g(()=>w[8]||(w[8]=[q(" Clear Search ",-1)])),_:1,__:[8]})])):b("",!0)]),!e.value||C(pe)?(s(),f("div",qo,[m("div",Xo,[I(En,{size:200})]),m("span",Zo,[a.value?(s(),f(z,{key:0},[q("Fetching Test Assignments")],64)):(s(),f(z,{key:1},[q("Fetching Assignments")],64))])])):(s(),f("div",Jo,[I(C(Kt),null,{default:g(()=>{var S;return[(s(),v(C(xt),{key:de.value,value:u.value,paginator:"","paginator-position":"both","total-records":(S=u.value)==null?void 0:S.length,rows:n.value,"rows-per-page-options":[3,5,10,25],"data-key":"id","sort-order":re.value,"sort-field":G.value},{list:g(j=>[m("div",ei,[(s(!0),f(z,null,_(j.items,L=>(s(),v(Fo,{id:L.id,key:L.id,title:C(Nn)(L,C(N)),stats:L.stats,dates:L.dates,assignees:L.assignedOrgs,assessments:L.assessments,"public-name":L.publicName??L.name,"show-params":C(N),"is-super-admin":C(N),creator:L.creator,"data-cy":"h2-card-admin"},null,8,["id","title","stats","dates","assignees","assessments","public-name","show-params","is-super-admin","creator"]))),128))])]),empty:g(()=>[m("div",ti,[w[9]||(w[9]=m("h1",{class:"text-xl font-bold mb-4"},"No Assignments Yet",-1)),w[10]||(w[10]=m("p",{class:"text-center text-gray-500 mb-4"},"Go create your first assignment to get started.",-1)),I(C(ie),{label:"Create Assignment",class:"bg-primary border-none text-white",onClick:w[3]||(w[3]=j=>P.$router.push({name:"CreateAssignment"}))})])]),_:1},8,["value","total-records","rows","sort-order","sort-field"]))]}),_:1})]))])])]))}};export{zi as default};
//# sourceMappingURL=HomeAdministrator-Cpnkq2hP.js.map
