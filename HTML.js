// add multi element support e.g. HTML.render(["div","centers","bluebox"],{},this)
// add nested object assignment for properties
// add support for condition specific property assignment e.g. {conditions:[{variable:elm.style.color,value:"orange"}],properties:{}}
// add onloaded event for when an element becomes attached to dom not just its parent element

window.HTML = class{
    static createElement(type,props,name){
        // console.log("creating:",type,"with:",props)
        const _props = {}
        const _created = []
        const _style = {}
        for(let i=0;i<=props.length;i++){
            if(i==props.length){
                // console.log(_props)
                // console.log(_created)
                // console.log(_style)
                _props._created = _created
                _props.style = _style
                // console.log(_props)
                const elm = document.createElement(type)
                Object.assign(elm,_props)
                // console.log('styles:',elm.style,_props.style)
                Object.assign(elm.style,_props.style)
                for(let k=0;k<=_props._created.length;k++){
                    if(k==_props._created.length){
                        // if(name){this.saves[name] = elm};
                        return elm
                    }
                    elm._created[k].bind(elm)()
                }
            }
            const prop = props[i]
            prop.created && _created.push(prop.created)
            Object.assign(_props,prop)
            Object.assign(_style,prop.style)
        }

        // const elm = this.saves[type] ? Object.assign(props,this.saves[type].props) && document.createElement(this.saves[type].type) : document.createElement(type);
        // Object.assign(elm,props);
        // Object.assign(elm.style,props.style);
        // elm.created && elm.created(type);
        // if(name){this.saves[name] = elm};
        // return elm;
    }
    static render(type,props,parent=props){
        parent.innerHTML = "";
        return this.append(type,props,parent);
    }
    static append(type,props,parent=props){
        // console.log("appending:",type,props)
        const elm = this.saves[type] ? this.createElement(this.saves[type].type,this._mergeProps(type,parent == props ? {} : props)) : this.createElement(type,[props]);
        // console.log('elm:',elm.insertionIndex);
        // const elm = this.saves[type] ? this.createElement(type,(parent !== props ? props : {})) : this.createElement(type,props);
        (elm.insertionIndex == undefined) ? parent.appendChild(elm) : parent.insertBefore(elm,parent.children[elm.insertionIndex]);
        elm.attached && elm.attached();
        return elm;
    }
    static template(type,props,name){
        // console.log(`${name} templated`)
        if(this.saves[type]){
            const mergedProps = this._mergeProps(type,props)
            this.saves[name] = {type:this.saves[type].type,props:mergedProps}            
        }else{
            this.saves[name] = {type:type,props:[props]}
        }
    }
    static _mergeProps(type,props){
        return this.saves[type].props.concat(props)
    }
    static save(type,props,name){
        this.template(type,props,name);
    }
    static delete(name){
        delete this.saves[name];
    }
    static templates = {}
    static saves = this.templates
}