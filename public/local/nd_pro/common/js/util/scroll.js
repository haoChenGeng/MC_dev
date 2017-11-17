var scroll = {
  scrollTop: () => {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  },
  clientHeight: () => {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
      clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
  },
  scrollHeight: () => {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  },
  top: (obj) => {
    return obj.getBoundingClientRect().top //元素顶端到可见区域顶端的距离 
  },
  se: () => { document.documentElement.clientHeight }
}

export default scroll;