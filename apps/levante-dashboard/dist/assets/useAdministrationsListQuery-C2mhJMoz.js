import{J as I,a2 as $,h as f,i as m,j as h,o as w,aE as d}from"./index-kdKfEdeI.js";import{R as A,O as E,L as Q,H as S,c as e,a6 as y,a7 as v}from"./tanstack-CsBZeLmk.js";import{b as x}from"./administrations-BtjuibWP.js";(function(){try{var n=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new n.Error().stack;r&&(n._sentryDebugIds=n._sentryDebugIds||{},n._sentryDebugIds[r]="b703ddad-8771-4b6a-886f-08408ebc842c",n._sentryDebugIdIdentifier="sentry-dbid-b703ddad-8771-4b6a-886f-08408ebc842c")}catch{}})();var k=`
    .p-inputgroup,
    .p-inputgroup .p-iconfield,
    .p-inputgroup .p-floatlabel,
    .p-inputgroup .p-iftalabel {
        display: flex;
        align-items: stretch;
        width: 100%;
    }

    .p-inputgroup .p-inputtext,
    .p-inputgroup .p-inputwrapper {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-inputgroupaddon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: dt('inputgroup.addon.padding');
        background: dt('inputgroup.addon.background');
        color: dt('inputgroup.addon.color');
        border-block-start: 1px solid dt('inputgroup.addon.border.color');
        border-block-end: 1px solid dt('inputgroup.addon.border.color');
        min-width: dt('inputgroup.addon.min.width');
    }

    .p-inputgroupaddon:first-child,
    .p-inputgroupaddon + .p-inputgroupaddon {
        border-inline-start: 1px solid dt('inputgroup.addon.border.color');
    }

    .p-inputgroupaddon:last-child {
        border-inline-end: 1px solid dt('inputgroup.addon.border.color');
    }

    .p-inputgroupaddon:has(.p-button) {
        padding: 0;
        overflow: hidden;
    }

    .p-inputgroupaddon .p-button {
        border-radius: 0;
    }

    .p-inputgroup > .p-component,
    .p-inputgroup > .p-inputwrapper > .p-component,
    .p-inputgroup > .p-iconfield > .p-component,
    .p-inputgroup > .p-floatlabel > .p-component,
    .p-inputgroup > .p-floatlabel > .p-inputwrapper > .p-component,
    .p-inputgroup > .p-iftalabel > .p-component,
    .p-inputgroup > .p-iftalabel > .p-inputwrapper > .p-component {
        border-radius: 0;
        margin: 0;
    }

    .p-inputgroupaddon:first-child,
    .p-inputgroup > .p-component:first-child,
    .p-inputgroup > .p-inputwrapper:first-child > .p-component,
    .p-inputgroup > .p-iconfield:first-child > .p-component,
    .p-inputgroup > .p-floatlabel:first-child > .p-component,
    .p-inputgroup > .p-floatlabel:first-child > .p-inputwrapper > .p-component,
    .p-inputgroup > .p-iftalabel:first-child > .p-component,
    .p-inputgroup > .p-iftalabel:first-child > .p-inputwrapper > .p-component {
        border-start-start-radius: dt('inputgroup.addon.border.radius');
        border-end-start-radius: dt('inputgroup.addon.border.radius');
    }

    .p-inputgroupaddon:last-child,
    .p-inputgroup > .p-component:last-child,
    .p-inputgroup > .p-inputwrapper:last-child > .p-component,
    .p-inputgroup > .p-iconfield:last-child > .p-component,
    .p-inputgroup > .p-floatlabel:last-child > .p-component,
    .p-inputgroup > .p-floatlabel:last-child > .p-inputwrapper > .p-component,
    .p-inputgroup > .p-iftalabel:last-child > .p-component,
    .p-inputgroup > .p-iftalabel:last-child > .p-inputwrapper > .p-component {
        border-start-end-radius: dt('inputgroup.addon.border.radius');
        border-end-end-radius: dt('inputgroup.addon.border.radius');
    }

    .p-inputgroup .p-component:focus,
    .p-inputgroup .p-component.p-focus,
    .p-inputgroup .p-inputwrapper-focus,
    .p-inputgroup .p-component:focus ~ label,
    .p-inputgroup .p-component.p-focus ~ label,
    .p-inputgroup .p-inputwrapper-focus ~ label {
        z-index: 1;
    }

    .p-inputgroup > .p-button:not(.p-button-icon-only) {
        width: auto;
    }

    .p-inputgroup .p-iconfield + .p-iconfield .p-inputtext {
        border-inline-start: 0;
    }
`,_={root:"p-inputgroup"},L=I.extend({name:"inputgroup",style:k,classes:_}),T={name:"BaseInputGroup",extends:$,style:L,provide:function(){return{$pcInputGroup:this,$parentInstance:this}}},D={name:"InputGroup",extends:T,inheritAttrs:!1};function F(n,r,o,p,u,a){return E(),A("div",S({class:n.cx("root")},n.ptmi("root")),[Q(n.$slots,"default")],16)}D.render=F;const U=(n,r=!1,o)=>{const{data:p}=f({enabled:(o==null?void 0:o.enabled)??!0}),{isSuperAdmin:u}=m(p),a=e(()=>{var t,i;return(i=(t=p.value)==null?void 0:t.claims)==null?void 0:i.adminOrgs}),s=e(()=>{var t;return!h((t=p==null?void 0:p.value)==null?void 0:t.claims)}),l=[()=>s.value],{isQueryEnabled:c,options:g}=w(l,o),b=e(()=>y(r)?[d,"test-data",n]:[d,n]);return v({queryKey:b,queryFn:async()=>(await x(u,a,r,n)).sortedAdministrations,enabled:c,...g})},j=(n,r=!1,o)=>{const{data:p}=f({enabled:(o==null?void 0:o.enabled)??!0}),{isSuperAdmin:u}=m(p),a=e(()=>{var t,i;return(i=(t=p.value)==null?void 0:t.claims)==null?void 0:i.adminOrgs}),s=e(()=>{var t;return!h((t=p==null?void 0:p.value)==null?void 0:t.claims)}),l=[()=>s.value],{isQueryEnabled:c,options:g}=w(l,o),b=e(()=>y(r)?[d,"full","test-data",n]:[d,"full",n]);return v({queryKey:b,queryFn:()=>x(u,a,r,n),enabled:c,...g})};export{j as a,D as s,U as u};
//# sourceMappingURL=useAdministrationsListQuery-C2mhJMoz.js.map
