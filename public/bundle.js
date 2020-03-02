!function(t){var e={};function r(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class s{constructor(t=null){t&&0!==t.length?this._elem_in=t:this._elem_in=[],this._elem_out=[]}size(){return this._elem_in.length+this._elem_out.length}empty(){return 0===this.size()}push(t){this._elem_in.push(t)}unshift(t){this._elem_out.push(t)}pop(){return 0===this._elem_in.length&&(this._elem_in=this._elem_out,this._elem_in.reverse(),this._elem_out=[]),this._elem_in.pop()}shift(){return 0===this._elem_out.length&&(this._elem_out=this._elem_in,this._elem_out.reverse(),this._elem_in=[]),this._elem_out.pop()}}e.Deque=s,window.Deque=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=r(0),i=r(2);function n(t){return null===t?-1:t.height}class o{constructor(t=null){null===t?(this._size=0,this._root=null):(this._size=1,this._root=new i.BinNode(t))}update_height(t){t.height=1+Math.max(n(t.lc),n(t.rc)),t.npl=t.lc&&t.rc?1+Math.min(t.lc.npl,t.rc.npl):0}update_height_above(t){for(;t;)this.update_height(t),t=t.parent}size(){return this._size}empty(){return!this._root}root(){return this._root}removeBelow(t){let e=t.parent;return e?(t==e.lc?e.lc=null:e.rc=null,this.update_height_above(e)):this._root=null,this._size-=t.size(),t.size()}insertAsRoot(t){return this._root=new i.BinNode(t),this._size=1,this._root}insertAsLC(t,e){return this._size++,t.insertAsLC(e),this.update_height_above(t),t.lc}insertAsRC(t,e){return this._size++,t.insertAsRC(e),this.update_height_above(t),t.rc}reAttachAsLC(t,e){t.lc=t,e&&(e.parent=t)}reAttachAsRC(t,e){t.rc=t,e&&(e.parent=t)}calStructInfo(){let t=[],e=[[],[]],r=[],s=[[],[]],i={nodes:t,edges:e,extrNodes:r,extrEdges:s};if(!this._root)return r.push({x:0,y:0,isRoot:!0}),i;this._root.y=0;let n=[[this._root]];t.push(this._root);for(let e=0;e<=this._root.height;e++){n.push([]);for(let s=0;s<n[e].length;s++){let i=n[e][s],o=80*(e+1);if(void 0!==i.lc){if(i.lc)i.lc.y=o,n[e+1].push(i.lc),t.push(i.lc);else{let t={x:0,y:o,parent:i,isLC:!0};n[e+1].push(t),r.push(t)}if(i.rc)i.rc.y=o,n[e+1].push(i.rc),t.push(i.rc);else{let t={x:0,y:o,parent:i,isLC:!1};n[e+1].push(t),r.push(t)}}else n[e+1].push({x:0,y:o,parent:i})}}let o=n[n.length-1];for(let t=0;t<o.length;t++)o[t].x=80*t;for(let t=n.length-1;t>=1;t--){let e=n[t];for(let t=0;t<e.length;){let r=e[t].parent;t<e.length-1&&r==e[t+1].parent?(r.x=Math.floor((e[t].x+e[t+1].x)/2),t+=2):(e[t].parent.x=e[t].x,t++)}}let l=this._root.x;this._root.x=0;for(let t=n.length-1;t>=1;t--){let e=n[t];for(let t=0;t<e.length;t++)e[t].x-=l}for(let t=n.length-1;t>=1;t--){let r=n[t];for(let t=0;t<r.length;){let i=r[t].parent;if(t<r.length-1&&i==r[t+1].parent){let n=[r[t].x,i.y,i.x-r[t].x,51];void 0===r[t].lc?s[0].push(n):e[0].push(n);let o=[i.x,i.y,r[t+1].x-i.x,51];void 0===r[t+1].lc?s[1].push(o):e[1].push(o),t+=2}else t++}}return i}static buildFromTreeJsonObj(t){if(null===t._root)return new this;let e=t._root,r=new this(t._root.data),s=[e],i=[r.root()];for(;s.length>0;){e=s.pop();let t=i.pop();e.lc&&(r.insertAsLC(t,e.lc.data),s.push(e.lc),i.push(t.lc)),e.rc&&(r.insertAsRC(t,e.rc.data),s.push(e.rc),i.push(t.rc))}return r}static preorderTraversal(t){let e=[],r=[t];for(;r.length>0;)for(t=r.pop();t;)e.push(t),t.rc&&r.push(t.rc),t=t.lc;return e}static inorderTraversal(t){let e=[],r=[];for(;t||r.length>0;){for(;t;)r.push(t),t=t.lc;t=r.pop(),e.push(t),t=t.rc}return e}static postorderTraversal(t){let e=[],r=[t];for(;r.length>0;){if(t.parent!=r[r.length-1])for(t=r[r.length-1];t;)t.rc&&r.push(t.rc),t.lc&&r.push(t.lc),t=t.lc?t.lc:t.rc;t=r.pop(),e.push(t)}return e}static levelTraversal(t){let e=[],r=new s.Deque([t]);for(;!r.empty();)t=r.shift(),e.push(t),t.lc&&r.push(t.lc),t.rc&&r.push(t.rc);return e}static genSampleTree(){let t=new o(1),e=t.insertAsLC(t.root(),2);return t.insertAsLC(e,3),t.insertAsRC(e,4),e=t.insertAsRC(t.root(),5),t.insertAsLC(e,6),t.insertAsRC(e,7),t}}e.BinTree=o,window.BinTree=o},function(t,e,r){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.Red=0]="Red",t[t.Black=1]="Black"}(s=e.RBColor||(e.RBColor={}));class i{constructor(t=null,e=null,r=null,n=null,o=0,l=0,h=s.Red){this.x=0,this.y=0,this.active=!1,this.data=t,this.parent=e,this.lc=r,this.rc=n,this.height=o,this.npl=l,this.color=h,this.nid=++i.N}static isRoot(t){return!t.parent}static isLC(t){return t.parent&&t===t.parent.lc}static isRC(t){return t.parent&&t===t.parent.rc}size(){let t=1;return this.lc&&(t+=this.lc.size()),this.rc&&(t+=this.rc.size()),t}insertAsLC(t){return this.lc=new i(t,this)}insertAsRC(t){return this.rc=new i(t,this)}succ(){let t=this;if(t.rc)for(t=t.rc;t.lc;)t=t.lc;else{for(;i.isRC(t);)t=t.parent;t=t.parent}return t}pred(){let t=this;if(t.lc)for(t=t.lc;t.rc;)t=t.rc;else{for(;i.isLC(t);)t=t.parent;t=t.parent}return t}}e.BinNode=i,i.N=0,window.BinNode=i},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=r(0),i=r(4),n=r(1);s.Deque,n.BinTree,i.BST},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=r(1),i=r(2);class n extends s.BinTree{connect34(t,e,r,s,i,n,o){return this.reAttachAsLC(t,s),this.reAttachAsRC(t,i),this.update_height(t),this.reAttachAsLC(r,n),this.reAttachAsRC(r,o),this.update_height(r),this.reAttachAsLC(e,t),this.reAttachAsRC(e,r),this.update_height(e),e}rotateAt(t){let e=t.parent,r=e.parent,s=r.parent,n=i.BinNode.isLC(r);return(t=i.BinNode.isLC(e)?i.BinNode.isLC(t)?this.connect34(t,e,r,t.lc,t.rc,e.rc,r.rc):this.connect34(e,t,r,e.lc,t.lc,t.rc,r.rc):i.BinNode.isLC(t)?this.connect34(r,t,e,r.lc,t.lc,t.rc,e.rc):this.connect34(r,e,t,r.lc,e.lc,t.lc,t.rc)).parent=s,s&&(n?s.lc=t:s.rc=t),t}search(t){let e=this._root;for(this._hot=null;e&&e.data!=t;)this._hot=e,e=t<e.data?e.lc:e.rc;return e}insert(t){let e=this.search(t);return e||(e=new i.BinNode(t,this._hot),this._size++,this._root?t<this._hot.data?this._hot.lc=e:this._hot.rc=e:this._root=e,this.update_height_above(e),e)}removeAt(t){let e=t;return t.lc&&t.rc?(e=e.succ(),t.data=e.data,t=e.rc):t=t.lc,this._hot=e.parent,t&&(t.parent=this._hot),this._hot?i.BinNode.isLC(e)?this._hot.lc=t:this._hot.rc=t:this._root=t,t}remove(t){let e=this.search(t);return!!e&&(this.removeAt(e),this._size--,this.update_height_above(this._hot),!0)}static genSampleTree(){let t=new n(10),e=t.insertAsLC(t.root(),5);return t.insertAsLC(e,2),t.insertAsRC(e,7),e=t.insertAsRC(t.root(),16),t.insertAsLC(e,12),t.insertAsRC(e,20),t}}e.BST=n,window.BST=n}]);