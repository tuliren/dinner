(this.webpackJsonpdinner=this.webpackJsonpdinner||[]).push([[0],{70:function(e,t,a){e.exports=a(81)},75:function(e,t,a){},76:function(e,t,a){},81:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),i=a.n(l),o=(a(75),a(76),a(128)),c=a(23),m=a(29),s=a(17),u=a(35),d=a(36),p=a(11),h=a(43),E=function(){return f(Date.now()/1e3)+" ".repeat(5).replace(/./g,(function(){return f(16*Math.random())}))},f=function(e){return Math.floor(e).toString(16)},g=a(4),v=a(133),b=a(110),P=a(111),k=a(131),C=a(112),y=a(113),T=a(114),O=a(134),j=a(115),A=a(116),F=a(117),x=a(129),I=a(119),S=a(120),N=a(118),$=a(121),w=a(122),L=a(123),z=a(132),D=a(124),_=a(44),B=a.n(_),q=a(59),J=a.n(q),W=a(45),M=a.n(W),R=a(46),G=a.n(R),H=a(58),K=a.n(H),Q=Object(g.a)((function(e){return Object(v.a)({head:{backgroundColor:e.palette.grey.A400,color:e.palette.common.white},body:{fontSize:14}})}))(b.a),U=Object(g.a)((function(e){return Object(v.a)({root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.background.default}}})}))(P.a),V=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).handlePersonChange=function(e){a.setState({personToAdd:e.target.value})},a.handleItemNameChange=function(e){a.setState({itemNameToAdd:e.target.value})},a.handleItemPriceChange=function(e){a.setState({itemPriceToAdd:e.target.value})},a.handleTaxChange=function(e){a.setState({tax:parseFloat(e.target.value)||0})},a.handleTipChange=function(e){a.setState({tip:parseFloat(e.target.value)||0})},a.handleLinkChange=function(e){var t=e.target.value.split("\t"),n=Object(c.a)(t,2),r=n[0],l=n[1],i=a.state.links;if(void 0===i[l])i[l]=[r];else{var o=i[l].indexOf(r);-1===o?i[l].push(r):i[l].splice(o,1)}a.setState({links:i})},a.addPerson=function(e){if(e.preventDefault(),a.state.personToAdd){var t=a.state.people;t.push({id:E(),name:a.state.personToAdd.trim()}),a.setState({people:t,personToAdd:""})}},a.removePerson=function(e,t){e.preventDefault();for(var n=a.state.links,r=a.state.people,l=r[t].id,i=0,o=Object.keys(n);i<o.length;i++){var c=o[i],m=n[c].indexOf(l);-1!==m&&n[c].splice(m,1)}r.splice(t,1),a.setState({links:n,people:r})},a.addItem=function(e){if(e.preventDefault(),a.state.itemPriceToAdd){var t=a.state.items;t.push({id:E(),name:a.state.itemNameToAdd.trim(),price:parseFloat(a.state.itemPriceToAdd)}),a.setState({items:t,itemNameToAdd:"",itemPriceToAdd:""})}},a.removeItem=function(e,t){e.preventDefault();var n=a.state.links,r=a.state.items;delete n[r[t].id],r.splice(t,1),a.setState({links:n,items:r})},a.getLinkStatus=function(e,t){return void 0!==a.state.links[t]&&a.state.links[t].includes(e)},a.getAllFoodPrice=function(){return a.state.items.map((function(e){return e.price})).reduce((function(e,t){return e+t}),0)},a.getPersonFoodPrice=function(e){for(var t=[],n=function(){var n=Object(c.a)(l[r],2),i=n[0],o=n[1];if(o.includes(e)){var m=a.state.items.filter((function(e){return e.id===i}))[0].price,s=o.length;t.push({itemPrice:m,peopleCount:s})}},r=0,l=Object.entries(a.state.links);r<l.length;r++)n();return t.map((function(e){return e.itemPrice/e.peopleCount})).reduce((function(e,t){return e+t}),0)},a.getPersonTax=function(e){var t=a.getAllFoodPrice();if(0===t)return 0;var n=a.state.tax;return a.getPersonFoodPrice(e)*n/t},a.getPersonTip=function(e){var t=a.getAllFoodPrice();if(0===t)return 0;var n=a.state.tip;return a.getPersonFoodPrice(e)*n/t},a.getTotalPrice=function(){return a.getAllFoodPrice()+a.state.tax+a.state.tip},a.getPersonTotal=function(e){return a.getPersonFoodPrice(e)+a.getPersonTax(e)+a.getPersonTip(e)},a.state={items:[{id:"drink",name:"Drink",price:12},{id:"fish",name:"Fish",price:12}],people:[{id:"jared",name:"Jared"},{id:"liren",name:"Liren"},{id:"roshan",name:"Roshan"},{id:"sherif",name:"Sherif"}],links:{},tax:0,tip:0,personToAdd:"",itemNameToAdd:"",itemPriceToAdd:""},a.handlePersonChange=a.handlePersonChange.bind(Object(p.a)(a)),a.handleItemNameChange=a.handleItemNameChange.bind(Object(p.a)(a)),a.handleItemPriceChange=a.handleItemPriceChange.bind(Object(p.a)(a)),a.handleLinkChange=a.handleLinkChange.bind(Object(p.a)(a)),a.addPerson=a.addPerson.bind(Object(p.a)(a)),a.removePerson=a.removePerson.bind(Object(p.a)(a)),a.addItem=a.addItem.bind(Object(p.a)(a)),a.removeItem=a.removeItem.bind(Object(p.a)(a)),a.getLinkStatus=a.getLinkStatus.bind(Object(p.a)(a)),a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"renderPeople",value:function(){var e=this;return r.a.createElement(k.a,null,r.a.createElement(C.a,{dense:!1},this.state.people.map((function(t,a){var n=t.name;return r.a.createElement(y.a,{key:"person-"+a},r.a.createElement(T.a,null,r.a.createElement(O.a,null,r.a.createElement(B.a,null))),r.a.createElement(j.a,{primary:n}),r.a.createElement(A.a,null,r.a.createElement(F.a,{edge:"start",onClick:function(t){return e.removePerson(t,a)}},r.a.createElement(M.a,null))))})),r.a.createElement(y.a,{key:"person-add"},r.a.createElement(T.a,null,r.a.createElement(O.a,null,r.a.createElement(B.a,null))),r.a.createElement(x.a,{label:"Person Name",value:this.state.personToAdd,required:!0,onChange:this.handlePersonChange}),r.a.createElement(A.a,null,r.a.createElement(F.a,{edge:"start",onClick:this.addPerson},r.a.createElement(K.a,null))))))}},{key:"renderItems",value:function(){var e=this;return r.a.createElement(k.a,null,r.a.createElement(C.a,{dense:!1},this.state.items.map((function(t,a){var n=t.name,l=t.price;return r.a.createElement(y.a,{key:"person-"+a},r.a.createElement(T.a,null,r.a.createElement(O.a,null,r.a.createElement(G.a,null))),r.a.createElement(j.a,{primary:"$"+l.toFixed(2)+(n?" "+n:"")}),r.a.createElement(A.a,null,r.a.createElement(F.a,{edge:"start",onClick:function(t){return e.removeItem(t,a)}},r.a.createElement(M.a,null))))})),r.a.createElement(y.a,{key:"person-add"},r.a.createElement(T.a,null,r.a.createElement(O.a,null,r.a.createElement(G.a,null))),r.a.createElement(x.a,{label:"Item Price",type:"number",value:this.state.itemPriceToAdd,required:!0,onChange:this.handleItemPriceChange,InputProps:{startAdornment:r.a.createElement(I.a,{position:"start"},"$")}}),"\xa0\xa0\xa0",r.a.createElement(x.a,{label:"Item Name",value:this.state.itemNameToAdd,required:!1,onChange:this.handleItemNameChange}),r.a.createElement(A.a,null,r.a.createElement(F.a,{edge:"start",onClick:this.addItem},r.a.createElement(J.a,null))))))}},{key:"renderBill",value:function(){var e=this;return r.a.createElement(S.a,{component:N.a},r.a.createElement($.a,null,r.a.createElement(w.a,null,r.a.createElement(U,null,r.a.createElement(Q,{key:"item"},"Item"),r.a.createElement(Q,{key:"price"},"Price"),this.state.people.map((function(e,t){var a=e.name;return r.a.createElement(Q,{key:"person-"+t},a)})))),r.a.createElement(L.a,null,this.state.items.map((function(t,a){var n=t.id,l=t.name,i=t.price;return r.a.createElement(U,{key:"item-"+a},r.a.createElement(Q,null,l),r.a.createElement(Q,null,"$",i.toFixed(2)),e.state.people.map((function(t,a){var l=t.id;t.name;return r.a.createElement(Q,{key:"item-person-"+a},r.a.createElement(z.a,{checked:e.getLinkStatus(l,n),value:l+"\t"+n,color:"primary",onChange:e.handleLinkChange}))})))})),r.a.createElement(U,{key:"dinner-total"},r.a.createElement(Q,null,"All Food"),r.a.createElement(Q,null,"$",this.getAllFoodPrice().toFixed(2)),this.state.people.map((function(t,a){var n=t.id;return r.a.createElement(Q,{key:"person-"+a},"$",e.getPersonFoodPrice(n).toFixed(2))}))),r.a.createElement(U,{key:"dinner-tax"},r.a.createElement(Q,null,"Tax"),r.a.createElement(Q,null,r.a.createElement(x.a,{type:"number",value:this.state.tax||"",required:!1,onChange:this.handleTaxChange,InputProps:{startAdornment:r.a.createElement(I.a,{position:"start"},"$")}})),this.state.people.map((function(t,a){var n=t.id;return r.a.createElement(Q,{key:"tax-person-"+a},"$",e.getPersonTax(n).toFixed(2))}))),r.a.createElement(U,{key:"dinner-tip"},r.a.createElement(Q,null,"Tip"),r.a.createElement(Q,null,r.a.createElement(x.a,{type:"number",value:this.state.tip||"",required:!1,onChange:this.handleTipChange,InputProps:{startAdornment:r.a.createElement(I.a,{position:"start"},"$")}})),this.state.people.map((function(t,a){var n=t.id;return r.a.createElement(Q,{key:"tip-person-"+a},"$",e.getPersonTip(n).toFixed(2))}))),r.a.createElement(U,{key:"dinner-tip"},r.a.createElement(Q,null,"Total"),r.a.createElement(Q,null,"$",this.getTotalPrice().toFixed(2)),this.state.people.map((function(t,a){var n=t.id;return r.a.createElement(Q,{key:"tip-person-"+a},"$",e.getPersonTotal(n).toFixed(2))}))))))}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(D.a,null),r.a.createElement("h2",null,"People"),this.renderPeople(),r.a.createElement("br",null),r.a.createElement(D.a,null),r.a.createElement("br",null),r.a.createElement("h2",null,"Food"),this.renderItems(),r.a.createElement("br",null),r.a.createElement(D.a,null),r.a.createElement("br",null),r.a.createElement("h2",null,"Bill"),this.renderBill(),r.a.createElement("br",null),r.a.createElement("br",null))}}]),t}(r.a.Component),X=a(125),Y=a(126),Z=a(127),ee=a(62),te=a.n(ee),ae=a(61),ne=a.n(ae),re=a(60),le=a.n(re),ie=a(63),oe=a.n(ie),ce=function(e){function t(){return Object(m.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(X.a,{showLabels:!0},r.a.createElement(Y.a,{label:r.a.createElement("span",{className:"site-uv"},r.a.createElement("span",{className:"busuanzi-value",id:"busuanzi_value_site_uv"})),icon:r.a.createElement(le.a,{fontSize:"small"})}),r.a.createElement(Y.a,{label:r.a.createElement("span",{className:"site-pv"},r.a.createElement("span",{className:"busuanzi-value",id:"busuanzi_value_page_pv"})),icon:r.a.createElement(ne.a,{fontSize:"small"})}),r.a.createElement(Y.a,{component:Z.a,href:"https://github.com/tuliren/dinner",target:"_blank",label:"Source",icon:r.a.createElement(te.a,{fontSize:"small"})}),r.a.createElement(Y.a,{component:Z.a,href:"https://github.com/tuliren",target:"_blank",label:"(c) 2020 LiRen",icon:r.a.createElement(oe.a,{fontSize:"small"})})))}}]),t}(r.a.Component),me=function(){return r.a.createElement(o.a,{className:"Dinner",maxWidth:"md"},r.a.createElement("h1",null,"Dinner Bill"),r.a.createElement(V,null),r.a.createElement(ce,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(me,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[70,1,2]]]);
//# sourceMappingURL=main.447fcc05.chunk.js.map