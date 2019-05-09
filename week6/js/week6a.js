const wsix = {
    g: {
        draggableShape: [],
        'square-container': []
    },
    v: {
        inPlace: 0,
        dragTemp: null,
        filled: {
            square: false,
            triangle: false,
            circle: false
        }
    },
    init: () => {
        document.addEventListener('DOMContentLoaded', wsix.proceed, false);
    },
    proceed: () => {
        wsix.setElements();
        wsix.setAttributes();
        wsix.setListeners();
    },
    setElements: () => {
        Object.keys(wsix.g).forEach((k, i) => {
            wsix.g[k] = Array.from(document.getElementsByClassName(k));
        });
    },
    setAttributes: () => {
        wsix.g.draggableShape.forEach((v) => {
            try {
                v.setAttribute('draggable', true);
            } catch (exc) { }
        });
    },
    getShapeSetEl(el) {
        if(el.hasAttribute('shapeset')) {
            return el;
        } else {
            return wsix.getShapeSetEl(el.parentElement);
        }
    },
    setListeners() {
        wsix.g.draggableShape.forEach((v) => {
            try {
                v.ontouchstart = ($e) => {
                    wsix.v.dragTemp = $e.target;
                };
                v.ondragstart = ($e) => {
                    wsix.v.dragTemp = $e.target;
                };
            } catch (exc) { }
        });
        wsix.g['square-container'].forEach((v) => {
            try {
                ///////////// DROP EVENT HANDLER CODE ///////////////////////////////////////////////////////////////////
                v.ondrop = ($e) => {
                    if (wsix.v.dragTemp == null) return;
                    let receivingElement = wsix.getShapeSetEl(event.target);
                    let rAttr = receivingElement.getAttribute('shapeset');
                    let dtAttr = wsix.v.dragTemp.getAttribute('shapeset');
                    if(wsix.v.filled[rAttr]) {
                        return false;
                    } else {
                        wsix.v.filled[rAttr] = true;
                    }
                    if(rAttr == dtAttr) {
                        const useClass = receivingElement.children[0].className;
                        receivingElement.children[0].className += ' d-none';
                        wsix.v.dragTemp.className += ' d-none';
                        document.querySelector('.final-container.'.concat(rAttr)).className = rAttr.concat(' final-container');
                        wsix.v.inPlace += 1;
                    } else {
                        const useClass = receivingElement.children[0].className;
                        receivingElement.children[0].className = useClass.replace(/(d-none)/g,'');
                    }
                    if(wsix.v.inPlace > 2) {
                        setTimeout(() => {
                            Array.from(document.querySelectorAll('*')).forEach(el => {
                                el.className += ' fade-to-green';
                            });
                            const then = new Date().getTime();
                            const remBorderInterval = setInterval(() => {
                                const now = new Date().getTime();
                                if(now - then > 2700) {
                                    Array.from(document.getElementsByClassName('square-container')).forEach(el => {
                                        el.className = '';
                                    });
                                    clearInterval(remBorderInterval);
                                }
                            }, 16);
                        }, 300);
                    }
                    event.preventDefault();
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                v.touchend = ($e) => {
                    if (wsix.v.dragTemp == null) return;
                    let receivingElement = wsix.getShapeSetEl(event.target);
                    let rAttr = receivingElement.getAttribute('shapeset');
                    let dtAttr = wsix.v.dragTemp.getAttribute('shapeset');            
                    if(wsix.v.filled[rAttr]) {
                        return false;
                    } else {
                        wsix.v.filled[rAttr] = true;
                    }
                    if(rAttr == dtAttr) {
                        const useClass = receivingElement.children[0].className;
                        receivingElement.children[0].className += ' d-none';
                        wsix.v.dragTemp.className += ' d-none';
                        document.querySelector('.final-container.'.concat(rAttr)).className = rAttr.concat(' final-container');
                        wsix.v.inPlace += 1;
                    } else {
                        const useClass = receivingElement.children[0].className;
                        receivingElement.children[0].className = useClass.replace(/(d-none)/g,'');
                    }
                    if(wsix.v.inPlace > 2) {
                        setTimeout(() => {
                            Array.from(document.querySelectorAll('*')).forEach(el => {
                                el.className += ' fade-to-green';
                            });
                            const then = new Date().getTime();
                            const remBorderInterval = setInterval(() => {
                                const now = new Date().getTime();
                                if(now - then > 2700) {
                                    Array.from(document.getElementsByClassName('square-container')).forEach(el => {
                                        el.className = '';
                                    });
                                    clearInterval(remBorderInterval);
                                }
                            }, 16);
                        }, 300);
                    }
                    event.preventDefault();
                }
                v.ondragover = ($e) => {
                    $e.preventDefault();
                    // window.event.preventDefault();
                };
                v.touchmove = ($e) => {
                    $e.preventDefault();
                    // window.event.preventDefault();
                };
            } catch (exc) { }
        });
    }
}

wsix.init();