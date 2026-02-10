import Vue from 'vue'

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
        const isHeader=event.target.closest('header')
        const parentNodeName=event.target.parentNode.nodeName.toLowerCase();
        // const multiParentNodeName=event.target.parentNode.parentNode.parentNode.nodeName.toLowerCase();

        if(parentNodeName !== 'header' && !isHeader){
            // if(multiParentNodeName === 'header'){
            //     return false;
            // }
            if(vnode.context.isReporterOpend){
                vnode.context.isReporterOpend=false;
            }
            if(vnode.context.isCategoryOpend){
                vnode.context.isCategoryOpend=false;
            }
            if(vnode.context.isSortOpend){
                vnode.context.isSortOpend=false;
            }
            if(vnode.context.isDateOpend){
                vnode.context.isDateOpend=false;
            }
            // vnode.context[binding.expression](event);
        }
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});