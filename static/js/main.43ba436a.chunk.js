(this.webpackJsonpdinner=this.webpackJsonpdinner||[]).push([[0],{70:function(e,t,n){e.exports=n(80)},75:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),l=n.n(o),i=(n(75),n(127)),c=n(14),s=n(12),m=n(18),u=n(19),p=n(7),d=n(21),h=function(){return E(Date.now()/1e3)+" ".repeat(5).replace(/./g,(function(){return E(16*Math.random())}))},E=function(e){return Math.floor(e).toString(16)},b=n(123),v=n(130),f=n(108),g=n(110),P=n(111),k=n(132),O=n(112),j=n(113),C=n(114),y=n(128),I=n(46),T=n.n(I),A=n(43),x=n.n(A),F=n(58),S=n.n(F),N=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).onAddPerson=function(e){e.preventDefault(),n.state.personName&&(n.props.addPerson(n.state.personName.trim()),n.setState({personName:""}))},n.onChangePerson=function(e){n.setState({personName:e.target.value})},n.onRemovePerson=function(e,t){e.preventDefault(),n.props.removePerson(t)},n.state={personName:""},n.onAddPerson=n.onAddPerson.bind(Object(p.a)(n)),n.onChangePerson=n.onChangePerson.bind(Object(p.a)(n)),n.onRemovePerson=n.onRemovePerson.bind(Object(p.a)(n)),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(v.a,null,r.a.createElement(f.a,{dense:!1,component:"nav"},this.props.people.map((function(t,n){var a=t.name;return r.a.createElement(g.a,{button:!0,key:"person-"+n},r.a.createElement(P.a,null,r.a.createElement(k.a,null,r.a.createElement(T.a,null))),r.a.createElement(O.a,{primary:a}),r.a.createElement(j.a,null,r.a.createElement(C.a,{edge:"start",onClick:function(t){return e.onRemovePerson(t,n)}},r.a.createElement(x.a,null))))})),r.a.createElement(g.a,{key:"person-add"},r.a.createElement(P.a,null,r.a.createElement(k.a,null,r.a.createElement(T.a,null))),r.a.createElement(y.a,{label:"Person Name",value:this.state.personName,required:!0,onChange:this.onChangePerson}),r.a.createElement(j.a,null,r.a.createElement(C.a,{edge:"start",onClick:this.onAddPerson},r.a.createElement(S.a,null))))))}}]),t}(r.a.Component),L=n(116),$=n(47),w=n.n($),R=n(59),z=n.n(R),D=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).onAddItem=function(e){if(e.preventDefault(),n.state.itemPriceToAdd){var t=n.state.itemNameToAdd.trim(),a=parseFloat(n.state.itemPriceToAdd);n.props.addItem(t,a),n.setState({itemNameToAdd:"",itemPriceToAdd:""})}},n.onChangeItemName=function(e){n.setState({itemNameToAdd:e.target.value})},n.onChangeItemPrice=function(e){n.setState({itemPriceToAdd:e.target.value})},n.onRemoveItem=function(e,t){e.preventDefault(),n.props.removeItem(t)},n.state={itemNameToAdd:"",itemPriceToAdd:""},n.onAddItem=n.onAddItem.bind(Object(p.a)(n)),n.onChangeItemName=n.onChangeItemName.bind(Object(p.a)(n)),n.onRemoveItem=n.onRemoveItem.bind(Object(p.a)(n)),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(v.a,null,r.a.createElement(f.a,{dense:!1,component:"nav"},this.props.items.map((function(t,n){var a=t.name,o=t.price;return r.a.createElement(g.a,{button:!0,key:"person-"+n},r.a.createElement(P.a,null,r.a.createElement(k.a,null,r.a.createElement(w.a,null))),r.a.createElement(O.a,{primary:"$"+o.toFixed(2)+(a?" "+a:"")}),r.a.createElement(j.a,null,r.a.createElement(C.a,{edge:"start",onClick:function(t){return e.onRemoveItem(t,n)}},r.a.createElement(x.a,null))))})),r.a.createElement(g.a,{key:"person-add"},r.a.createElement(P.a,null,r.a.createElement(k.a,null,r.a.createElement(w.a,null))),r.a.createElement(y.a,{label:"Item Price",type:"number",value:this.state.itemPriceToAdd,required:!0,onChange:this.onChangeItemPrice,InputProps:{startAdornment:r.a.createElement(L.a,{position:"start"},"$")}}),"\xa0\xa0\xa0",r.a.createElement(y.a,{label:"Item Name",value:this.state.itemNameToAdd,required:!1,onChange:this.onChangeItemName}),r.a.createElement(j.a,null,r.a.createElement(C.a,{edge:"start",onClick:this.onAddItem},r.a.createElement(z.a,null))))))}}]),t}(r.a.Component),_=n(27),q=n(117),B=n(118),J=n(119),W=n(115),M=n(120),G=n(121),H=n(122),K=n(131),Q=n(4),U=n(133),V=Object(Q.a)((function(e){return Object(U.a)({head:{backgroundColor:e.palette.grey.A400,color:e.palette.common.white},body:{fontSize:14}})}))(q.a),X=Object(Q.a)((function(e){return Object(U.a)({root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.background.default}}})}))(B.a),Y=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).onTaxChange=function(e){n.setState({tax:parseFloat(e.target.value)||0})},n.onTipChange=function(e){n.setState({tip:parseFloat(e.target.value)||0})},n.onLinkChange=function(e){var t=e.target.value.split("\t"),a=Object(_.a)(t,2),r=a[0],o=a[1];n.props.handleLinkChange(r,o)},n.getLinkStatus=function(e,t){return void 0!==n.props.links[t]&&n.props.links[t].includes(e)},n.getAllFoodPrice=function(){return n.props.items.map((function(e){return e.price})).reduce((function(e,t){return e+t}),0)},n.getPersonFoodPrice=function(e){for(var t=[],a=function(){var a=Object(_.a)(o[r],2),l=a[0],i=a[1];if(i.includes(e)){var c=n.props.items.filter((function(e){return e.id===l}))[0].price,s=i.length;t.push({itemPrice:c,peopleCount:s})}},r=0,o=Object.entries(n.props.links);r<o.length;r++)a();return t.map((function(e){return e.itemPrice/e.peopleCount})).reduce((function(e,t){return e+t}),0)},n.getPersonTax=function(e){var t=n.getAllFoodPrice();if(0===t)return 0;var a=n.state.tax;return n.getPersonFoodPrice(e)*a/t},n.getPersonTip=function(e){var t=n.getAllFoodPrice();if(0===t)return 0;var a=n.state.tip;return n.getPersonFoodPrice(e)*a/t},n.getTotalPrice=function(){return n.getAllFoodPrice()+n.state.tax+n.state.tip},n.getPersonTotal=function(e){return n.getPersonFoodPrice(e)+n.getPersonTax(e)+n.getPersonTip(e)},n.state={tax:0,tip:0},n.onTaxChange=n.onTaxChange.bind(Object(p.a)(n)),n.onTipChange=n.onTipChange.bind(Object(p.a)(n)),n.onLinkChange=n.onLinkChange.bind(Object(p.a)(n)),n.getLinkStatus=n.getLinkStatus.bind(Object(p.a)(n)),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(J.a,{component:W.a},r.a.createElement(M.a,null,r.a.createElement(G.a,null,r.a.createElement(X,null,r.a.createElement(V,{key:"item"},"Item"),r.a.createElement(V,{key:"price"},"Price"),this.props.people.map((function(e,t){var n=e.name;return r.a.createElement(V,{key:"person-"+t},n)})))),r.a.createElement(H.a,null,this.props.items.map((function(t,n){var a=t.id,o=t.name,l=t.price;return r.a.createElement(X,{hover:!0,key:"item-"+n},r.a.createElement(V,null,o),r.a.createElement(V,null,"$",l.toFixed(2)),e.props.people.map((function(t,n){var o=t.id;t.name;return r.a.createElement(V,{key:"item-person-"+n},r.a.createElement(K.a,{checked:e.getLinkStatus(o,a),value:o+"\t"+a,color:"primary",onChange:e.onLinkChange}))})))})),r.a.createElement(X,{hover:!0,key:"dinner-total"},r.a.createElement(V,null,"All Food"),r.a.createElement(V,null,"$",this.getAllFoodPrice().toFixed(2)),this.props.people.map((function(t,n){var a=t.id;return r.a.createElement(V,{key:"person-"+n},"$",e.getPersonFoodPrice(a).toFixed(2))}))),r.a.createElement(X,{hover:!0,key:"dinner-tax"},r.a.createElement(V,null,"Tax"),r.a.createElement(V,null,r.a.createElement(y.a,{type:"number",value:this.state.tax||"",required:!1,onChange:this.onTaxChange,InputProps:{startAdornment:r.a.createElement(L.a,{position:"start"},"$")}})),this.props.people.map((function(t,n){var a=t.id;return r.a.createElement(V,{key:"tax-person-"+n},"$",e.getPersonTax(a).toFixed(2))}))),r.a.createElement(X,{hover:!0,key:"dinner-tip"},r.a.createElement(V,null,"Tip"),r.a.createElement(V,null,r.a.createElement(y.a,{type:"number",value:this.state.tip||"",required:!1,onChange:this.onTipChange,InputProps:{startAdornment:r.a.createElement(L.a,{position:"start"},"$")}})),this.props.people.map((function(t,n){var a=t.id;return r.a.createElement(V,{key:"tip-person-"+n},"$",e.getPersonTip(a).toFixed(2))}))),r.a.createElement(X,{hover:!0,key:"dinner-person-tip"},r.a.createElement(V,null,"Total"),r.a.createElement(V,null,"$",this.getTotalPrice().toFixed(2)),this.props.people.map((function(t,n){var a=t.id;return r.a.createElement(V,{key:"tip-person-"+n},"$",e.getPersonTotal(a).toFixed(2))}))))))}}]),t}(r.a.Component),Z=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleLinkChange=function(e,t){var a=n.state.links;if(void 0===a[t])a[t]=[e];else{var r=a[t].indexOf(e);-1===r?a[t].push(e):a[t].splice(r,1)}n.setState({links:a})},n.addPerson=function(e){var t=n.state.people;t.push({id:h(),name:e}),n.setState({people:t})},n.removePerson=function(e){for(var t=n.state.links,a=n.state.people,r=a[e].id,o=0,l=Object.keys(t);o<l.length;o++){var i=l[o],c=t[i].indexOf(r);-1!==c&&t[i].splice(c,1)}a.splice(e,1),n.setState({links:t,people:a})},n.addItem=function(e,t){var a=n.state.items;a.push({id:h(),name:e,price:t}),n.setState({items:a})},n.removeItem=function(e){var t=n.state.links,a=n.state.items;delete t[a[e].id],a.splice(e,1),n.setState({links:t,items:a})},n.state={items:[{id:"drink",name:"Drink",price:12},{id:"fish",name:"Fish",price:12}],people:[{id:"jared",name:"Jared"},{id:"liren",name:"Liren"},{id:"roshan",name:"Roshan"},{id:"sherif",name:"Sherif"}],links:{},tax:0,tip:0},n.handleLinkChange=n.handleLinkChange.bind(Object(p.a)(n)),n.addPerson=n.addPerson.bind(Object(p.a)(n)),n.removePerson=n.removePerson.bind(Object(p.a)(n)),n.addItem=n.addItem.bind(Object(p.a)(n)),n.removeItem=n.removeItem.bind(Object(p.a)(n)),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,null),r.a.createElement("h2",null,"People"),r.a.createElement(N,{people:this.state.people,addPerson:this.addPerson,removePerson:this.removePerson}),r.a.createElement("br",null),r.a.createElement(b.a,null),r.a.createElement("br",null),r.a.createElement("h2",null,"Food"),r.a.createElement(D,{items:this.state.items,addItem:this.addItem,removeItem:this.removeItem}),r.a.createElement("br",null),r.a.createElement(b.a,null),r.a.createElement("br",null),r.a.createElement("h2",null,"Bill"),r.a.createElement(Y,{people:this.state.people,items:this.state.items,links:this.state.links,handleLinkChange:this.handleLinkChange}),r.a.createElement("br",null),r.a.createElement("br",null))}}]),t}(r.a.Component),ee=n(124),te=n(125),ne=n(126),ae=n(62),re=n.n(ae),oe=n(61),le=n.n(oe),ie=n(60),ce=n.n(ie),se=n(63),me=n.n(se),ue=function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(ee.a,{showLabels:!0},r.a.createElement(te.a,{label:r.a.createElement("span",{className:"site-uv"},r.a.createElement("span",{className:"busuanzi-value",id:"busuanzi_value_site_uv"})),icon:r.a.createElement(ce.a,{fontSize:"small"})}),r.a.createElement(te.a,{label:r.a.createElement("span",{className:"site-pv"},r.a.createElement("span",{className:"busuanzi-value",id:"busuanzi_value_page_pv"})),icon:r.a.createElement(le.a,{fontSize:"small"})}),r.a.createElement(te.a,{component:ne.a,href:"https://github.com/tuliren/dinner",target:"_blank",rel:"noreferrer",label:"Source",icon:r.a.createElement(re.a,{fontSize:"small"})}),r.a.createElement(te.a,{component:ne.a,href:"https://github.com/tuliren",target:"_blank",rel:"noreferrer",label:"(c) 2020 LiRen",icon:r.a.createElement(me.a,{fontSize:"small"})})))}}]),t}(r.a.Component),pe=function(){return r.a.createElement(i.a,{className:"Dinner",maxWidth:"md"},r.a.createElement("h1",null,"Dinner Bill"),r.a.createElement(Z,null),r.a.createElement(ue,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[70,1,2]]]);
//# sourceMappingURL=main.43ba436a.chunk.js.map