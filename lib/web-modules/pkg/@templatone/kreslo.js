class Vector {
  constructor(...values) {
    this.x = 0;
    this.y = 0;
    this.set(...values);
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  set(...values) {
    const v = Vector._parseEntryType_VectorModifier(values);
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  add(...values) {
    const v = Vector._parseEntryType_VectorModifier(values);
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  subtract(...values) {
    const v = Vector._parseEntryType_VectorModifier(values);
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  multiple(...values) {
    const v = Vector._parseEntryType_VectorModifier(values);
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  divide(...values) {
    const v = Vector._parseEntryType_VectorModifier(values);
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  rotate(...values) {
    const value = values[0];
    let degrees;
    if (value instanceof Angle) {
      degrees = value.degrees;
    } else {
      degrees = value;
    }
    const length = this.length;
    const angle = this.getAngle().add(degrees);
    const vector = angle.getVector().multiple(length);
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }
  normalize() {
    const length = this.length;
    if (length !== 0) {
      this.x = this.x / length;
      this.y = this.y / length;
    }
    return this;
  }
  absolute() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }
  isEquals(vector) {
    return this.x == vector.x && this.y == vector.y;
  }
  getAngle() {
    return Angle.fromRadians(Math.atan2(this.y, this.x));
  }
  clone() {
    return new Vector(this.x, this.y);
  }
  static get Zero() {
    return new Vector(0, 0);
  }
  static get Half() {
    return new Vector(0.5, 0.5);
  }
  static get One() {
    return new Vector(1, 1);
  }
  static get Top() {
    return new Vector(0, -1);
  }
  static get Bottom() {
    return new Vector(0, 1);
  }
  static get Left() {
    return new Vector(-1, 0);
  }
  static get right() {
    return new Vector(1, 0);
  }
  static distance(vector1, vector2) {
    const a = vector1.x - vector2.x;
    const b = vector1.y - vector2.y;
    return Math.sqrt(a ** 2 + b ** 2);
  }
  static _parseEntryType_Vector(raw) {
    let x;
    let y;
    if (raw.length == 2) {
      x = raw[0];
      y = raw[1];
    } else {
      x = raw[0].x;
      y = raw[0].y;
    }
    return {x, y};
  }
  static _parseEntryType_VectorModifier(raw) {
    let x;
    let y;
    if (raw.length == 2) {
      x = raw[0];
      y = raw[1];
    } else if (typeof raw[0] == "number") {
      x = raw[0];
      y = raw[0];
    } else {
      x = raw[0].x;
      y = raw[0].y;
    }
    return {x, y};
  }
}

class Angle {
  constructor(...values) {
    this.degrees = 0;
    this.set(...values);
  }
  get revolutions() {
    return Angle.degreesToRevelutions(this.degrees);
  }
  set revolutions(revolutions) {
    this.degrees = Angle.revelutionsToDegress(revolutions);
  }
  get radians() {
    return Angle.degreesToRadians(this.degrees);
  }
  set radians(radians) {
    this.degrees = Angle.radiansToDegress(radians);
  }
  set(...values) {
    const value = values[0];
    if (value instanceof Angle) {
      this.degrees = value.degrees;
    } else {
      this.degrees = value;
    }
  }
  add(...values) {
    const value = values[0];
    if (value instanceof Angle) {
      this.degrees += value.degrees;
    } else {
      this.degrees += value;
    }
    return this;
  }
  subtract(...values) {
    const value = values[0];
    if (value instanceof Angle) {
      this.degrees -= value.degrees;
    } else {
      this.degrees -= value;
    }
    return this;
  }
  multiply(...values) {
    const value = values[0];
    if (value instanceof Angle) {
      this.degrees *= value.degrees;
    } else {
      this.degrees *= value;
    }
    return this;
  }
  divide(...values) {
    const value = values[0];
    if (value instanceof Angle) {
      this.degrees /= value.degrees;
    } else {
      this.degrees /= value;
    }
    return this;
  }
  normalize() {
    if (this.degrees > 0) {
      while (this.degrees > 360)
        this.degrees -= 360;
    } else if (this.degrees < 0) {
      while (this.degrees < 0)
        this.degrees += 360;
    }
    return this;
  }
  getVector() {
    const angle = this.clone();
    angle.normalize();
    const radians = angle.radians;
    return new Vector(Math.cos(radians), Math.sin(radians));
  }
  getCSSValue() {
    return `${this.degrees.toFixed(3)}deg`;
  }
  clone() {
    return new Angle(this.degrees);
  }
  static fromDegrees(degrees) {
    return new Angle(degrees);
  }
  static fromRadians(radians) {
    const angle = new Angle(0);
    angle.radians = radians;
    return angle;
  }
  static fromRevolutions(revolutions) {
    const angle = new Angle(0);
    angle.revolutions = revolutions;
    return angle;
  }
  static get Zero() {
    return new Angle(0);
  }
  static get Quarter() {
    return new Angle(90);
  }
  static get Third() {
    return new Angle(120);
  }
  static get Half() {
    return new Angle(180);
  }
  static get Full() {
    return new Angle(360);
  }
  static degreesToRadians(degrees) {
    return degrees / 180 * Math.PI;
  }
  static radiansToDegress(radians) {
    return radians / Math.PI * 180;
  }
  static degreesToRevelutions(degrees) {
    return degrees / 360;
  }
  static revelutionsToDegress(revolutions) {
    return revolutions * 360;
  }
  static radiansToRevelutions(radians) {
    return radians / (2 * Math.PI);
  }
  static revelutionsToRadians(revolutions) {
    return revolutions * (2 * Math.PI);
  }
}

class Transform {
  constructor(position = Vector.Zero, scale = Vector.One, rotation = Angle.Zero, origin = Vector.Zero) {
    this._parent = null;
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
    this.origin = origin;
  }
  getComputed() {
    const transforms = (() => {
      const fce = (arr, t) => {
        arr.unshift(t);
        if (t.hasParent())
          return fce(arr, t.getParent());
        else
          return arr;
      };
      return fce([], this);
    })();
    const computed = new Transform();
    for (let i = 0; i < transforms.length; i++) {
      const current = transforms[i];
      const position = current.position.clone().rotate(computed.rotation).multiple(computed.scale);
      computed.position.add(position);
      computed.rotation.add(current.rotation);
      computed.scale.multiple(current.scale);
    }
    return computed;
  }
  setParent(parent, updateLocals = false) {
    const before = this.getComputed();
    this._parent = parent;
    if (updateLocals === true) {
      const after = this.getComputed();
      after.position.subtract(before.position);
      after.rotation.subtract(before.rotation);
      after.scale.subtract(before.scale);
      this.position.subtract(after.position);
      this.rotation.subtract(after.rotation);
      this.scale.subtract(after.scale);
    }
  }
  clearParent(updateLocals = false) {
    if (this._parent === null)
      return;
    const before = this.getComputed();
    this._parent = null;
    if (updateLocals === true) {
      const after = this.getComputed();
      after.position.subtract(before.position);
      after.rotation.subtract(before.rotation);
      after.scale.subtract(before.scale);
      this.position.subtract(after.position);
      this.rotation.subtract(after.rotation);
      this.scale.subtract(after.scale);
    }
  }
  hasParent() {
    return this._parent !== null;
  }
  getParent() {
    if (this._parent == null) {
      throw new Error("Transform has no parent. You can test by method `.hasParent()`");
    }
    return this._parent;
  }
  clone() {
    const t = new Transform(this.position.clone(), this.scale.clone(), this.rotation.clone(), this.origin.clone());
    if (this.hasParent())
      t.setParent(t.getParent());
    return t;
  }
}

class Geometry {
  constructor(draw, getBoundingBox) {
    this.transform = new Transform();
    this._drawWithoutMatrixManipulation = draw;
    this._getBoundingBox = getBoundingBox;
  }
  contructMatrix(renderingLayer) {
    const t = this.transform;
    renderingLayer.setMatrixToTransform(t);
  }
  destructMatrix(renderingLayer) {
    renderingLayer.resetMatrix();
  }
  drawWithoutMatrixManipulation(renderingLayer) {
    const ctx = renderingLayer.getRenderingContext();
    const pxs = renderingLayer.pixelScale;
    const t = this.transform;
    this._drawWithoutMatrixManipulation(ctx, pxs, t);
  }
  draw(renderingLayer) {
    this.contructMatrix(renderingLayer);
    this.drawWithoutMatrixManipulation(renderingLayer);
    this.destructMatrix(renderingLayer);
  }
  getBoundingBox(renderingLayer) {
    return this._getBoundingBox(this.transform);
  }
}

class Numbers {
  static remap(value, min1, max1, min2 = 0, max2 = 1) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }
  static limit(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  static randomArbitrary(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }
  static randomInt(min = 0, max = 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static bezierCurve2(t, p1, p2) {
    const compute = (t2, v1, v2) => {
      return (1 - t2) * v1 + t2 * v2;
    };
    return {
      x: compute(t, p1.x, p2.x),
      y: compute(t, p1.y, p2.y)
    };
  }
  static bezierCurve3(t, p1, p2, p3) {
    const compute = (t2, v1, v2, v3) => {
      return (1 - t2) ** 2 * v1 + 2 * (1 - t2) * t2 * v2 + t2 ** 2 * v3;
    };
    return {
      x: compute(t, p1.x, p2.x, p3.x),
      y: compute(t, p1.y, p2.y, p3.y)
    };
  }
  static bezierCurve4(t, p1, p2, p3, p4) {
    const compute = (t2, v1, v2, v3, v4) => {
      return (1 - t2) ** 3 * v1 + 3 * (1 - t2) ** 2 * t2 * v2 + 3 * (1 - t2) * t2 ** 2 * v3 + t2 ** 3 * v4;
    };
    return {
      x: compute(t, p1.x, p2.x, p3.x, p4.x),
      y: compute(t, p1.y, p2.y, p3.y, p4.y)
    };
  }
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var webfontloader = createCommonjsModule(function (module) {
/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return +new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document;}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild);}function v(a){a.parentNode&&a.parentNode.removeChild(a);}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e]);}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e]);}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"");}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return !0;return !1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null);}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d();},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d();}):setTimeout(function(){e=!0;d();},0);u(a,"head",b);}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f));};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")));},d||5E3);return f}return null}function B(){this.a=0;this.c=null;}function C(a){a.a++;return function(){a.a--;D(a);}}function E(a,b){a.c=b;D(a);}function D(a){0==a.a&&a.c&&(a.c(),a.c=null);}function F(a){this.a=a||"-";}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10));}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d);}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b}function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes;}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading");}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d);}K(a,"inactive");}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]();}function ja(){this.c={};}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c));}return d}function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f);}function N(a){u(a.c,"body",a.a);}function O(a){return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")}function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0;}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25);},function(){e();});}f();}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f);});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a);},function(){b.j(b.a);});};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m);}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10));}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this);};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return !0;return !1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v);}function ma(a){setTimeout(p(function(){U(this);},a),50);}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a);},a),0);}function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c;}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this);};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e);}K(b,"fontinactive",a);na(this);};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a));}function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0;}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a);};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else {b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0;}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r);}for(h=0;h<l.length;h++)l[h].start();}},0);}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c);});}function ra(a,b){this.c=a;this.a=b;}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k));}a(e);}else setTimeout(function(){b();},50);}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b());}).id="__MonotypeAPIScript__"+d;}else a([]);};function sa(a,b){this.c=a;this.a=b;}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f);});};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||"";}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f));}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b}function ya(a){this.f=a;this.a=[];this.c={};}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else {k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("");}}else k="";k&&g.push(k);}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d));}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]));}}function Ea(a,b){this.c=a;this.a=b;}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa);});};function Ga(a,b){this.c=a;this.a=b;}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0});}catch(l){}a(e);}},2E3):a([]);};function Ha(a,b){this.c=a;this.f=b;this.a=[];}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)));}a(d.a);},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([]);})):a([]);};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)};module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());
});

const _Color = class {
  constructor(r = 0, g = 0, b = 0, alpha = 1) {
    this._red = 0;
    this._green = 0;
    this._blue = 0;
    this._alpha = 1;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = alpha;
  }
  get red() {
    return this._red;
  }
  set red(v) {
    this._red = Numbers.limit(v, 0, 255);
  }
  get green() {
    return this._green;
  }
  set green(v) {
    this._green = Numbers.limit(v, 0, 255);
  }
  get blue() {
    return this._blue;
  }
  set blue(v) {
    this._blue = Numbers.limit(v, 0, 255);
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(v) {
    this._alpha = Numbers.limit(v, 0, 1);
  }
  getRGBA() {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
      alpha: this.alpha
    };
  }
  getRGB() {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue
    };
  }
  getHSLA() {
    return _Color.convertRGBAtoHSLA(this.red, this.green, this.blue, this.alpha);
  }
  getHSL() {
    return _Color.convertRGBtoHSL(this.red, this.green, this.blue);
  }
  getHue() {
    const c = this.getHSL();
    return c.hue;
  }
  getSaturation() {
    const c = this.getHSL();
    return c.saturation;
  }
  getLightness() {
    const c = this.getHSL();
    return c.lightness;
  }
  setRGBA(...values) {
    const entry = _Color._parseEntryType_ColorRGBA(values);
    this.red = entry.red;
    this.green = entry.green;
    this.blue = entry.blue;
    this.alpha = entry.alpha;
    return this;
  }
  setRGB(...values) {
    const entry = _Color._parseEntryType_ColorRGB(values);
    this.red = entry.red;
    this.green = entry.green;
    this.blue = entry.blue;
    return this;
  }
  setHSLA(...values) {
    const entry = _Color._parseEntryType_ColorHSLA(values);
    const data = _Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);
    this.red = data.red;
    this.green = data.green;
    this.blue = data.blue;
    this.alpha = data.alpha;
    return this;
  }
  setHSL(...values) {
    const entry = _Color._parseEntryType_ColorHSL(values);
    const data = _Color.convertHSLtoRGB(entry.hue, entry.saturation, entry.lightness);
    this.red = data.red;
    this.green = data.green;
    this.blue = data.blue;
    return this;
  }
  setHue(hue) {
    const c = this.getHSLA();
    this.setHSLA(hue, c.saturation, c.lightness, c.alpha);
  }
  setSaturation(saturation) {
    const c = this.getHSLA();
    this.setHSLA(c.hue, saturation, c.lightness, c.alpha);
  }
  setLightness(lightness) {
    const c = this.getHSLA();
    this.setHSLA(c.hue, c.saturation, lightness, c.alpha);
  }
  getHex() {
    return _Color.convertRGBAtoHex(this.red, this.green, this.blue, this.alpha);
  }
  getCSSValue() {
    if (this.alpha < 1) {
      return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
    } else {
      return this.getHex();
    }
  }
  computeStyle() {
    return _Color.convertRGBAtoStyle(this);
  }
  clone() {
    return new _Color(this.red, this.green, this.blue, this.alpha);
  }
  static get Red() {
    return new _Color(255, 0, 0);
  }
  static get Yellow() {
    return new _Color(255, 255, 0);
  }
  static get Green() {
    return new _Color(0, 255, 0);
  }
  static get Blue() {
    return new _Color(0, 0, 255);
  }
  static get Magenta() {
    return new _Color(255, 0, 255);
  }
  static get Black() {
    return new _Color(0, 0, 0);
  }
  static get White() {
    return new _Color(255, 255, 255);
  }
  static get Grey() {
    return new _Color(127, 127, 127);
  }
  static get Transparent() {
    return new _Color(0, 0, 0, 0);
  }
  static fromHex(value) {
    value = value.trim();
    if (value.substr(0, 1) == "#") {
      value = value.substr(1);
    }
    let rr;
    let gg;
    let bb;
    let aa = null;
    if (value.length == 3) {
      rr = value.substring(0, 1) + value.substring(0, 1);
      gg = value.substring(1, 2) + value.substring(1, 2);
      bb = value.substring(2, 3) + value.substring(2, 3);
    } else if (value.length == 4) {
      rr = value.substring(0, 1) + value.substring(0, 1);
      gg = value.substring(1, 2) + value.substring(1, 2);
      bb = value.substring(2, 3) + value.substring(2, 3);
      aa = value.substring(3, 4) + value.substring(3, 4);
    } else if (value.length == 6) {
      rr = value.substring(0, 2);
      gg = value.substring(2, 4);
      bb = value.substring(4, 6);
    } else if (value.length == 8) {
      rr = value.substring(0, 2);
      gg = value.substring(2, 4);
      bb = value.substring(4, 6);
      aa = value.substring(6, 8);
    } else {
      throw new Error(`Color #${value} is not valid hex color value.`);
    }
    const r = parseInt(rr, 16);
    const g = parseInt(gg, 16);
    const b = parseInt(bb, 16);
    const a = aa ? parseInt(aa, 16) / 255 : 1;
    return _Color.fromRGBA(r, g, b, a);
  }
  static fromRGBA(...values) {
    const entry = _Color._parseEntryType_ColorRGBA(values);
    const color = new _Color(entry.red, entry.green, entry.blue, entry.alpha);
    return color;
  }
  static fromRGB(...values) {
    const entry = _Color._parseEntryType_ColorRGB(values);
    const color = this.fromRGBA(entry.red, entry.green, entry.blue, 1);
    return color;
  }
  static fromHSLA(...values) {
    const entry = _Color._parseEntryType_ColorHSLA(values);
    const data = _Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);
    const color = new _Color();
    color.red = data.red;
    color.green = data.green;
    color.blue = data.blue;
    color.alpha = data.alpha;
    return color;
  }
  static fromHSL(...values) {
    const entry = _Color._parseEntryType_ColorHSL(values);
    const color = this.fromHSLA(entry.hue, entry.saturation, entry.lightness, 1);
    return color;
  }
  static _parseEntryType_ColorRGBA(values) {
    if (values.length == 4) {
      return {
        red: values[0],
        green: values[1],
        blue: values[2],
        alpha: values[3]
      };
    } else {
      return values[0];
    }
  }
  static _parseEntryType_ColorRGB(values) {
    if (values.length == 3) {
      return {
        red: values[0],
        green: values[1],
        blue: values[2]
      };
    } else {
      return values[0];
    }
  }
  static _parseEntryType_ColorHSLA(values) {
    if (values.length == 4) {
      return {
        hue: values[0],
        saturation: values[1],
        lightness: values[2],
        alpha: values[3]
      };
    } else {
      return values[0];
    }
  }
  static _parseEntryType_ColorHSL(values) {
    if (values.length == 3) {
      return {
        hue: values[0],
        saturation: values[1],
        lightness: values[2]
      };
    } else {
      return values[0];
    }
  }
};
let Color = _Color;
Color.convertRGBAtoHSLA = (...values) => {
  const entry = _Color._parseEntryType_ColorRGBA(values);
  let r = Numbers.limit(entry.red, 0, 255);
  let g = Numbers.limit(entry.green, 0, 255);
  let b = Numbers.limit(entry.blue, 0, 255);
  let alpha = Numbers.limit(entry.alpha, 0, 1);
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = (g - b) / delta % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0)
    h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s *= 100;
  l *= 100;
  return {hue: h, saturation: s, lightness: l, alpha};
};
Color.convertRGBtoHSL = (...values) => {
  const entry = _Color._parseEntryType_ColorRGB(values);
  const c = _Color.convertRGBAtoHSLA(entry.red, entry.green, entry.blue, 1);
  return {
    hue: c.hue,
    saturation: c.saturation,
    lightness: c.lightness
  };
};
Color.convertHSLAtoRGBA = (...values) => {
  const entry = _Color._parseEntryType_ColorHSLA(values);
  let h = entry.hue;
  let s = entry.saturation;
  let l = entry.lightness;
  let alpha = entry.alpha;
  if (h > 0)
    while (h >= 360)
      h -= 360;
  else if (h < 0)
    while (h < 0)
      h += 360;
  s = Numbers.limit(s, 0, 100);
  l = Numbers.limit(l, 0, 100);
  alpha = Numbers.limit(alpha, 0, 1);
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;
  return {red: r, green: g, blue: b, alpha};
};
Color.convertHSLtoRGB = (...values) => {
  const entry = _Color._parseEntryType_ColorHSL(values);
  const c = _Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, 1);
  return {
    red: c.red,
    green: c.green,
    blue: c.blue
  };
};
Color.convertRGBAtoHex = (...values) => {
  const entry = _Color._parseEntryType_ColorRGBA(values);
  const red = Math.round(entry.red).toString(16);
  const green = Math.round(entry.green).toString(16);
  const blue = Math.round(entry.blue).toString(16);
  const alpha = Math.round(entry.alpha * 255).toString(16);
  const builder = [
    "#",
    red.length == 2 ? red : "0" + red,
    green.length == 2 ? green : "0" + green,
    blue.length == 2 ? blue : "0" + blue
  ];
  if (entry.alpha < 1) {
    builder.push(alpha.length == 2 ? alpha : "0" + alpha);
  }
  return builder.join("");
};
Color.convertRGBtoHex = (...values) => {
  const entry = _Color._parseEntryType_ColorRGB(values);
  return _Color.convertRGBAtoHex(entry.red, entry.green, entry.blue, 1);
};
Color.convertHSLAtoHex = (...values) => {
  const entry = _Color._parseEntryType_ColorHSLA(values);
  const data = _Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);
  return _Color.convertRGBAtoHex(data.red, data.green, data.blue, data.alpha);
};
Color.convertHSLtoHex = (...values) => {
  const entry = _Color._parseEntryType_ColorHSL(values);
  const data = _Color.convertHSLtoRGB(entry.hue, entry.saturation, entry.lightness);
  return _Color.convertRGBtoHex(data.red, data.green, data.blue);
};
Color.convertRGBAtoStyle = (...values) => {
  const entry = _Color._parseEntryType_ColorRGBA(values);
  return `rgba(${entry.red.toFixed(3)}, ${entry.green.toFixed(3)}, ${entry.blue.toFixed(3)}, ${entry.alpha.toFixed(3)})`;
};

class Style {
  constructor(style) {
    this._style = Style._parseEntryType_Style(style);
  }
  computeStyle(renderingLayer, boundingBox) {
    const v = this._style.computeStyle(renderingLayer, boundingBox);
    return v;
  }
  setStyle(style) {
    this._style = Style._parseEntryType_Style(style);
  }
  getStyle() {
    return this._style;
  }
  clone() {
    const thisStyle = this._style;
    const style = thisStyle.hasOwnProperty("clone") ? thisStyle.clone() : {...this._style};
    return new Style(style);
  }
  static _parseEntryType_Style(raw) {
    const style = raw;
    if (typeof style === "object" && typeof style.computeStyle === "function") {
      return style;
    } else {
      return {
        computeStyle: (renderingLayer, boundingBox) => {
          return style;
        }
      };
    }
  }
}

class Fill extends Style {
  constructor(style = Color.Grey) {
    super(style);
  }
  apply(renderingLayer, boundingBox) {
    const ctx = renderingLayer.getRenderingContext();
    ctx.fillStyle = this.computeStyle(renderingLayer, boundingBox);
  }
  clone() {
    const style = super.clone();
    return new Fill(style);
  }
  static clear(renderingLayer) {
    const ctx = renderingLayer.getRenderingContext();
    ctx.fillStyle = "transparent";
  }
}

class Gizmo {
  static origin(renderingLayer, position, color = "#000") {
    const ctx = renderingLayer.getRenderingContext();
    const pxs = renderingLayer.pixelScale;
    const scale = renderingLayer.gizmoScale;
    const fillStyle = ctx.fillStyle;
    const crossLineWidth = 16 * scale;
    const crossLineHeight = 2 * scale;
    const dotSize = 4 * scale;
    ctx.beginPath();
    ctx.rect(-(crossLineWidth / 2 + 1) * pxs, -(crossLineHeight / 2 + 1) * pxs, (crossLineWidth + 2) * pxs, (crossLineHeight + 2) * pxs);
    ctx.rect(-(crossLineHeight / 2 + 1) * pxs, -(crossLineWidth / 2 + 1) * pxs, (crossLineHeight + 2) * pxs, (crossLineWidth + 2) * pxs);
    ctx.rect(-(dotSize / 2 + crossLineHeight + 1) * pxs, -(dotSize / 2 + crossLineHeight + 1) * pxs, (dotSize + crossLineHeight * 2 + 2) * pxs, (dotSize + crossLineHeight * 2 + 2) * pxs);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 255, 255, .6)";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(-crossLineWidth / 2 * pxs, -crossLineHeight / 2 * pxs, crossLineWidth * pxs, crossLineHeight * pxs);
    ctx.rect(-crossLineHeight / 2 * pxs, -crossLineWidth / 2 * pxs, crossLineHeight * pxs, crossLineWidth * pxs);
    ctx.rect(-(dotSize / 2 + crossLineHeight) * pxs, -(dotSize / 2 + crossLineHeight) * pxs, (dotSize + crossLineHeight * 2) * pxs, (dotSize + crossLineHeight * 2) * pxs);
    ctx.closePath();
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.fillStyle = color;
    ctx.fillRect(-dotSize / 2 * pxs, -dotSize / 2 * pxs, dotSize * pxs, dotSize * pxs);
    ctx.fillStyle = fillStyle;
  }
}
Gizmo.nullColor = "white";
Gizmo.shapeColor = "cyan";
Gizmo.mediaColor = "magenta";
Gizmo.textColor = "yellow";

class Shadow {
  constructor(color, offset, blur) {
    this.color = Color.Black;
    this.offset = Vector.Zero;
    this.blur = 0;
    this.color = color;
    this.offset = offset;
    this.blur = blur;
  }
  apply(renderingLayer, boundingBox) {
    const ctx = renderingLayer.getRenderingContext();
    const pxs = renderingLayer.pixelScale;
    ctx.shadowColor = Color.convertRGBAtoStyle(this.color);
    ctx.shadowBlur = this.blur * pxs;
    ctx.shadowOffsetX = this.offset.x * pxs;
    ctx.shadowOffsetY = this.offset.y * pxs;
  }
  clone() {
    const thisColor = this.color;
    const color = thisColor.hasOwnProperty("clone") ? thisColor.clone() : {...this.color};
    return new Shadow(color, this.offset.clone(), this.blur);
  }
  static clear(renderingLayer) {
    const ctx = renderingLayer.getRenderingContext();
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
}

class Stroke extends Style {
  constructor(style = Color.Black, lineWidth = 1, lineJoin = "miter", lineCap = "square", lineDashOffset = 0, miterLimit = 10) {
    super(style);
    this.lineWidth = lineWidth;
    this.lineJoin = lineJoin;
    this.lineCap = lineCap;
    this.lineDashOffset = lineDashOffset;
    this.miterLimit = miterLimit;
  }
  apply(renderingLayer, boundingBox) {
    const ctx = renderingLayer.getRenderingContext();
    const pxs = renderingLayer.pixelScale;
    ctx.lineWidth = this.lineWidth * pxs;
    ctx.lineDashOffset = this.lineDashOffset * pxs;
    ctx.lineJoin = this.lineJoin;
    ctx.lineCap = this.lineCap;
    ctx.miterLimit = this.miterLimit * pxs;
    ctx.strokeStyle = this.computeStyle(renderingLayer, boundingBox);
  }
  clone() {
    const style = super.clone();
    return new Stroke(style, this.lineWidth, this.lineJoin, this.lineCap, this.lineDashOffset, this.miterLimit);
  }
  static clear(renderingLayer) {
    const ctx = renderingLayer.getRenderingContext();
    ctx.lineWidth = 0;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineDashOffset = 0;
    ctx.miterLimit = 10;
    ctx.strokeStyle = "transparent";
  }
}

class Shape {
  constructor(geometry, getBoundingBox) {
    this.transform = new Transform();
    this.fill = null;
    this.stroke = null;
    this.shadow = null;
    this.opacity = 1;
    this.geometry = geometry;
    this._getBoundingBox = getBoundingBox;
  }
  render(renderingLayer) {
    Shape.renderObject(renderingLayer, this.geometry, this, this);
  }
  renderGizmo(renderingLayer) {
    Shape.renderGizmo(renderingLayer, this.geometry);
  }
  getBoundingBox(renderingLayer) {
    return this._getBoundingBox(renderingLayer);
  }
  static applyStyles(renderingLayer, shape) {
    const ctx = renderingLayer.getRenderingContext();
    ctx.globalAlpha = Numbers.limit(shape.opacity, 0, 1);
    if (shape.shadow) {
      shape.shadow.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
    } else {
      Shadow.clear(renderingLayer);
    }
    if (shape.fill) {
      shape.fill.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
      ctx.fill();
    } else {
      Fill.clear(renderingLayer);
    }
    if (shape.stroke) {
      shape.stroke.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
      ctx.stroke();
    } else {
      Stroke.clear(renderingLayer);
    }
    ctx.globalAlpha = 1;
  }
  static renderObject(renderingLayer, geometry, renderable, shape) {
    const ctx = renderingLayer.getRenderingContext();
    ctx.beginPath();
    geometry.contructMatrix(renderingLayer);
    geometry.drawWithoutMatrixManipulation(renderingLayer);
    Shape.applyStyles(renderingLayer, shape);
    geometry.destructMatrix(renderingLayer);
    ctx.closePath();
    if (renderingLayer.gizmoVisibility && renderable.renderGizmo)
      renderable.renderGizmo(renderingLayer);
  }
  static renderGizmo(renderingLayer, geometry) {
    renderingLayer.setMatrixToTransform(geometry.transform);
    Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.shapeColor);
    renderingLayer.resetMatrix();
  }
}

class Loop extends EventTarget {
  constructor() {
    super(...arguments);
    this._time = 0;
    this._startTimestamp = 0;
    this._previousTimestamp = 0;
    this._isRunningToggle = false;
    this._updateCallbacks = [];
  }
  get time() {
    return this._time;
  }
  addUpdateCallback(callback) {
    this._updateCallbacks.push(callback);
  }
  removeUpdateCallback(callback) {
    const i = this._updateCallbacks.indexOf(callback);
    if (i == -1) {
      throw new Error("Callback not found.");
    }
    this._updateCallbacks.splice(i, 1);
  }
  isRunning() {
    return this._isRunningToggle;
  }
  start() {
    this._isRunningToggle = true;
    this._startTimestamp = Date.now();
    this._previousTimestamp = Date.now();
    window.requestAnimationFrame((t) => this._frame(t));
    this.dispatchEvent(new StartLoopEvent());
  }
  stop() {
    this._isRunningToggle = false;
    this.dispatchEvent(new StartLoopEvent());
  }
  update(time, delta) {
    this._updateCallbacks.forEach((callback) => callback(time, delta));
  }
  _frame(time) {
    if (!this._isRunningToggle)
      return;
    const delta = ((n) => n > 1 ? n : 1)(time - this._previousTimestamp);
    this.update(this._time, delta);
    this._previousTimestamp = time;
    this._time += delta;
    window.requestAnimationFrame((t) => {
      this._frame(t);
    });
  }
}
class StartLoopEvent extends CustomEvent {
  constructor() {
    super(StartLoopEvent.arg);
  }
}

const _RenderingLayer = class {
  constructor(canvas, width, height, pixelScale = 1, updateStyleSizeCallback = _RenderingLayer.DEFAULT_UPDATESIZE_CALLBACK) {
    this._pixelScale = 1;
    this._updateStyleSizeCallback = null;
    this._width = 0;
    this._height = 0;
    this.gizmoVisibility = false;
    this.gizmoScale = 1;
    this._canvas = canvas;
    this.updateSize(width, height, pixelScale, updateStyleSizeCallback);
  }
  static get PIXELSCALE() {
    return window.devicePixelRatio;
  }
  get pixelScale() {
    return this._pixelScale;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  updateSize(width, height, pixelScale, updateStyleSizeCallback) {
    if (pixelScale !== void 0)
      this._pixelScale = Math.max(pixelScale, 0);
    this._width = Math.max(width, 0);
    this._height = Math.max(height, 0);
    this._canvas.width = this._width * this._pixelScale;
    this._canvas.height = this._height * this._pixelScale;
    if (updateStyleSizeCallback !== void 0) {
      this._updateStyleSizeCallback = updateStyleSizeCallback;
    }
    if (this._updateStyleSizeCallback !== null) {
      this._updateStyleSizeCallback(this._canvas, this._width, this._height, this._pixelScale);
    }
    this._renderingContext = this._canvas.getContext("2d", {
      willReadFrequently: true
    });
  }
  clear() {
    const pxs = this.pixelScale;
    this.resetMatrix();
    this._renderingContext.clearRect(0, 0, this.width * pxs, this.height * pxs);
  }
  getRenderingContext() {
    return this._renderingContext;
  }
  resetRenderingContext() {
    this._renderingContext = this._canvas.getContext("2d");
  }
  setImageSmoothing(toggle) {
    const ctx = this.getRenderingContext();
    ctx.msImageSmoothingEnabled = toggle;
    ctx.mozImageSmoothingEnabled = toggle;
    ctx.webkitImageSmoothingEnabled = toggle;
    ctx.imageSmoothingEnabled = toggle;
  }
  getCanvas() {
    return this._canvas;
  }
  setMatrixToTransform(transform) {
    this.resetMatrix();
    const pxs = this.pixelScale;
    const path = [];
    let t = transform;
    path.unshift(t);
    while (t.hasParent()) {
      t = t.getParent();
      path.unshift(t);
    }
    path.forEach((t2) => {
      this._renderingContext.translate(t2.position.x * pxs, t2.position.y * pxs);
      this._renderingContext.rotate(t2.rotation.radians);
      this._renderingContext.scale(t2.scale.x, t2.scale.y);
    });
  }
  resetMatrix() {
    this._renderingContext.resetTransform();
  }
};
let RenderingLayer = _RenderingLayer;
RenderingLayer.DEFAULT_UPDATESIZE_CALLBACK = (canvas, width, height, pixelScale) => {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
};

class Engine extends RenderingLayer {
  constructor(canvas, width, height, pixelScale, updateStyleSizeCallback) {
    super(canvas, width, height, pixelScale, updateStyleSizeCallback);
    this.loop = new Loop();
  }
}

var FontFeatures;
(function(FontFeatures2) {
  FontFeatures2["StandardLigatures"] = "liga";
  FontFeatures2["ContextualAlternates"] = "calt";
  FontFeatures2["DiscretionaryLigatures"] = "dlig";
  FontFeatures2["SmallSaps"] = "smcp";
  FontFeatures2["CapitalsToSmallCaps"] = "c2sc";
  FontFeatures2["Swashes"] = "swsh";
  FontFeatures2["StylisticAlternates"] = "salt";
  FontFeatures2["LiningFigures"] = "lnum";
  FontFeatures2["OldstyleFigures"] = "onum";
  FontFeatures2["ProportionalFigures"] = "pnum";
  FontFeatures2["TabularFigures"] = "tnum";
  FontFeatures2["Fractions"] = "frac";
  FontFeatures2["Ordinals"] = "ordn";
  FontFeatures2["ProportionalWidths"] = "pwid";
  FontFeatures2["ProportionalAlternateWidths"] = "palt";
  FontFeatures2["ProportionalKana"] = "pkna";
  FontFeatures2["FullWidths"] = "fwid";
  FontFeatures2["HalfWidths"] = "hwid";
  FontFeatures2["AlternateHalfWidths"] = "halt";
  FontFeatures2["ThirdWidths"] = "twid";
  FontFeatures2["QuarterWidths"] = "qwid";
  FontFeatures2["JIS78Forms"] = "jp78";
  FontFeatures2["JIS83Forms"] = "jp83";
  FontFeatures2["JIS90Forms"] = "jp90";
  FontFeatures2["JIS2004Forms"] = "jp04";
  FontFeatures2["TraditionalForms"] = "trad";
  FontFeatures2["RubyNotationForms"] = "ruby";
  FontFeatures2["HorizontalKanaAlternates"] = "hkna";
  FontFeatures2["NLCKanjiForms"] = "nlck";
  FontFeatures2["AlternateAnnotationForms"] = "nalt";
  FontFeatures2["Italics"] = "ital";
  FontFeatures2["VerticalKerning"] = "vkrn";
  FontFeatures2["VerticalAlternates"] = "vert";
  FontFeatures2["ProportionalAlternateVerticalMetrics"] = "vpal";
  FontFeatures2["AlternateVerticalHalfMetrics"] = "vhal";
  FontFeatures2["VerticalKanaAlternates"] = "vkna";
  FontFeatures2["Kerning"] = "kern";
  FontFeatures2["GlyphComposition"] = "ccmp";
  FontFeatures2["LocalizedForms"] = "locl";
  FontFeatures2["Superscript"] = "sups";
  FontFeatures2["Subscript"] = "subs";
})(FontFeatures || (FontFeatures = {}));

var CompositeOperation;
(function(CompositeOperation2) {
  CompositeOperation2["Color"] = "color";
  CompositeOperation2["ColorBurn"] = "color-burn";
  CompositeOperation2["ColorDodge"] = "color-dodge";
  CompositeOperation2["Copy"] = "copy";
  CompositeOperation2["Darken"] = "darken";
  CompositeOperation2["DestinationAtop"] = "destination-atop";
  CompositeOperation2["DestinationIn"] = "destination-in";
  CompositeOperation2["DestinationOut"] = "destination-out";
  CompositeOperation2["DestinationOver"] = "destination-over";
  CompositeOperation2["Difference"] = "difference";
  CompositeOperation2["Exclusion"] = "exclusion";
  CompositeOperation2["HardLight"] = "hard-light";
  CompositeOperation2["Hue"] = "hue";
  CompositeOperation2["Lighten"] = "lighten";
  CompositeOperation2["Lighter"] = "lighter";
  CompositeOperation2["Luminosity"] = "luminosity";
  CompositeOperation2["Multiply"] = "multiply";
  CompositeOperation2["Overlay"] = "overlay";
  CompositeOperation2["Saturation"] = "saturation";
  CompositeOperation2["Screen"] = "screen";
  CompositeOperation2["SoftLight"] = "soft-light";
  CompositeOperation2["SourceAtop"] = "source-atop";
  CompositeOperation2["SourceIn"] = "source-in";
  CompositeOperation2["SourceOut"] = "source-out";
  CompositeOperation2["SourceOver"] = "source-over";
  CompositeOperation2["XOR"] = "xor";
})(CompositeOperation || (CompositeOperation = {}));

class RectangleGeometry extends Geometry {
  constructor(width, height) {
    const d = (ctx, pxs, t) => {
      const width2 = this.width > 0 ? this.width : 0;
      const height2 = this.height > 0 ? this.height : 0;
      ctx.beginPath();
      ctx.rect(-t.origin.x * pxs, -t.origin.y * pxs, width2 * pxs, height2 * pxs);
      ctx.closePath();
    };
    const b = (t) => {
      return {
        origin: t.origin.clone(),
        size: new Vector(this.width, this.height)
      };
    };
    super(d, b);
    this.width = width;
    this.height = height;
  }
  clone() {
    return new RectangleGeometry(this.width, this.height);
  }
}

class RectangleShape extends RectangleGeometry {
  constructor(width, height) {
    super(width, height);
    this.fill = null;
    this.stroke = null;
    this.shadow = null;
    this.opacity = 1;
  }
  render(renderingLayer) {
    Shape.renderObject(renderingLayer, this, this, this);
  }
  renderGizmo(renderingLayer) {
    Shape.renderGizmo(renderingLayer, this);
  }
  clone() {
    const rectangle = new RectangleShape(this.width, this.height);
    rectangle.fill = this.fill?.clone() ?? null;
    rectangle.stroke = this.stroke?.clone() ?? null;
    rectangle.shadow = this.shadow?.clone() ?? null;
    rectangle.opacity = this.opacity;
    return rectangle;
  }
}

export { Color, Engine, Fill, RectangleShape };
