/*! @name @brightcove/videojs-quality-menu @version 1.4.0 @license UNLICENSED */ ! function (e, t)
{
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("video.js"), require("global/document")) : "function" == typeof define && define.amd ? define(["video.js", "global/document"], t) : (e = e || self).videojsQualityMenu = t(e.videojs, e.document)
}(this, (function (e, t)
{
  "use strict";

  function l(e)
  {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
  }
  e = e && e.hasOwnProperty("default") ? e.default : e, t = t && t.hasOwnProperty("default") ? t.default : t;
  var i = function l(i)
    {
      var n = this;
      if (e.browser.IS_IE8)
        for (var s in n = t.createElement("custom"), l.prototype) "constructor" !== s && (n[s] = l.prototype[s]);
      return n.id = i.id, n.label = n.id, n.width = i.width, n.height = i.height, n.bitrate = i.bandwidth, n.enabled_ = i.enabled, Object.defineProperty(n, "enabled",
        {
          get: function ()
          {
            return n.enabled_()
          },
          set: function (e)
          {
            n.enabled_(e)
          }
        }), n
    },
    n = function (n)
    {
      /*! @name videojs-contrib-quality-levels @version 2.0.9 @license Apache-2.0 */
      var s, a;

      function o()
      {
        var i, s = l(l(i = n.call(this) || this));
        if (e.browser.IS_IE8)
          for (var a in s = t.createElement("custom"), o.prototype) "constructor" !== a && (s[a] = o.prototype[a]);
        return s.levels_ = [], s.selectedIndex_ = -1, Object.defineProperty(s, "selectedIndex",
          {
            get: function ()
            {
              return s.selectedIndex_
            }
          }), Object.defineProperty(s, "length",
          {
            get: function ()
            {
              return s.levels_.length
            }
          }), s || l(i)
      }
      a = n, (s = o).prototype = Object.create(a.prototype), s.prototype.constructor = s, s.__proto__ = a;
      var u = o.prototype;
      return u.addQualityLevel = function (e)
      {
        var t = this.getQualityLevelById(e.id);
        if (t) return t;
        var l = this.levels_.length;
        return t = new i(e), "" + l in this || Object.defineProperty(this, l,
          {
            get: function ()
            {
              return this.levels_[l]
            }
          }), this.levels_.push(t), this.trigger(
          {
            qualityLevel: t,
            type: "addqualitylevel"
          }), t
      }, u.removeQualityLevel = function (e)
      {
        for (var t = null, l = 0, i = this.length; l < i; l++)
          if (this[l] === e)
          {
            t = this.levels_.splice(l, 1)[0], this.selectedIndex_ === l ? this.selectedIndex_ = -1 : this.selectedIndex_ > l && this.selectedIndex_--;
            break
          } return t && this.trigger(
        {
          qualityLevel: e,
          type: "removequalitylevel"
        }), t
      }, u.getQualityLevelById = function (e)
      {
        for (var t = 0, l = this.length; t < l; t++)
        {
          var i = this[t];
          if (i.id === e) return i
        }
        return null
      }, u.dispose = function ()
      {
        this.selectedIndex_ = -1, this.levels_.length = 0
      }, o
    }(e.EventTarget);
  for (var s in n.prototype.allowedEvents_ = {
    change: "change",
    addqualitylevel: "addqualitylevel",
    removequalitylevel: "removequalitylevel"
  }, n.prototype.allowedEvents_) n.prototype["on" + s] = null;
  var a = e.registerPlugin || e.plugin,
    o = function (t)
    {
      return l = this, e.mergeOptions(
        {}, t), i = l.qualityLevels, s = new n, l.on("dispose", (function e()
      {
        s.dispose(), l.qualityLevels = i, l.off("dispose", e)
      })), l.qualityLevels = function ()
      {
        return s
      }, l.qualityLevels.VERSION = "2.0.9", s;
      var l, i, s
    };
  a("qualityLevels", o), o.VERSION = "2.0.9";
  var u = function (e)
  {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
  };
  var r = function (e, t)
    {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    },
    h = e.getComponent("MenuItem"),
    d = e.dom || e,
    v = function (e)
    {
      function t(t, l)
      {
        var i;
        void 0 === l && (l = {});
        var n = l.selected;
        l.selected = l.active, i = e.call(this, t, l) || this;
        var s = t.qualityLevels();
        return i.levels_ = l.levels, i.selected_ = n, i.handleQualityChange = i.handleQualityChange.bind(u(i)), i.controlText(l.controlText), i.on(s, "change", i.handleQualityChange), i.on("dispose", (function ()
        {
          i.off(s, "change", i.handleQualityChange)
        })), i
      }
      r(t, e);
      var l = t.prototype;
      return l.createEl = function (t, l, i)
      {
        var n = e.prototype.createEl.call(this, t, l, i),
          s = d.createEl("span",
            {
              className: "vjs-quality-menu-item-sub-label",
              innerHTML: this.localize(this.options_.subLabel || "")
            });
        return this.subLabel_ = s, n && n.appendChild(s), n
      }, l.handleClick = function ()
      {
        this.updateSiblings_();
        for (var e = this.player().qualityLevels(), t = e.selectedIndex, l = 0, i = e.length; l < i; l++) l !== t && (e[l].enabled = !1);
        for (var n = 0, s = this.levels_.length; n < s; n++) e[this.levels_[n]].enabled = !0; - 1 !== t && -1 === this.levels_.indexOf(t) && (e[t].enabled = !1)
      }, l.handleQualityChange = function ()
      {
        var e = this.player().qualityLevels(),
          t = this.levels_.indexOf(e.selectedIndex) > -1;
        this.selected(t)
      }, l.selected = function (e)
      {
        if (this.selectable)
          if (this.selected_)
          {
            this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(this.localize("{1}, selected", this.localize(this.options_.controlText)));
            var t = this.player().controlBar.getChild("QualityMenuButton");
            e ? t.removeClass("vjs-quality-menu-button-waiting") : t.addClass("vjs-quality-menu-button-waiting")
          }
          else this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(this.options_.controlText)
      }, l.updateSiblings_ = function ()
      {
        for (var e = this.player().qualityLevels(), t = this.player().controlBar.getChild("QualityMenuButton").items, l = 0, i = t.length; l < i; l++)
        {
          var n = t[l],
            s = n.levels_.indexOf(e.selectedIndex) > -1;
          n.selected_ = n === this, n.selected(s)
        }
      }, t
    }(h),
    c = e.getComponent("MenuButton"),
    y = function (e)
    {
      for (var t = 0, l = e.length; t < l; t++)
        if (!e[t].height) return !1;
      return !0
    },
    f = function (e)
    {
      return e >= 2160 ? "4K" : e >= 720 ? "HD" : ""
    },
    p = function (e)
    {
      function t(t, l)
      {
        var i;
        return void 0 === l && (l = {}), (i = e.call(this, t, l) || this).el_.setAttribute("aria-label", i.localize("Quality Levels")), i.controlText("Quality Levels"), i.qualityLevels_ = t.qualityLevels(), i.update = i.update.bind(u(i)), i.handleQualityChange_ = i.handleQualityChange_.bind(u(i)), i.changeHandler_ = function ()
        {
          for (var e = i.options_.defaultResolution, t = 0; t < i.items.length; t++) - 1 !== i.items[t].options_.label.indexOf(e) && i.items[t].handleClick()
        }, i.on(i.qualityLevels_, "addqualitylevel", i.update), i.on(i.qualityLevels_, "removequalitylevel", i.update), i.on(i.qualityLevels_, "change", i.handleQualityChange_), i.one(i.qualityLevels_, "change", i.changeHandler_), i.update(), i.on("dispose", (function ()
        {
          i.off(i.qualityLevels_, "addqualitylevel", i.update), i.off(i.qualityLevels_, "removequalitylevel", i.update), i.off(i.qualityLevels_, "change", i.handleQualityChange_), i.off(i.qualityLevels_, "change", i.changeHandler_)
        })), i
      }
      r(t, e);
      var l = t.prototype;
      return l.buildWrapperCSSClass = function ()
      {
        return "vjs-quality-menu-wrapper " + e.prototype.buildWrapperCSSClass.call(this)
      }, l.buildCSSClass = function ()
      {
        return "vjs-quality-menu-button " + e.prototype.buildCSSClass.call(this)
      }, l.createItems = function ()
      {
        var e, t = this,
          l = [];
        if (!this.qualityLevels_ || !this.qualityLevels_.length) return l;
        if (this.options_.useResolutionLabels && y(this.qualityLevels_) ? (e = this.groupByResolution_(), this.addClass("vjs-quality-menu-button-use-resolution")) : (e = this.groupByBitrate_(), this.removeClass("vjs-quality-menu-button-use-resolution")), e.length <= 1) return [];
        e.forEach((function (e)
        {
          e.levels.length && (e.selectable = !0, l.push(new v(t.player(), e)))
        }));
        var i = new v(this.player(),
          {
            levels: Array.prototype.map.call(this.qualityLevels_, (function (e, t)
            {
              return t
            })),
            label: "Auto",
            controlText: "Auto",
            active: !0,
            selected: !0,
            selectable: !0
          });
        return this.autoMenuItem_ = i, l.push(i), l
      }, l.groupByResolution_ = function ()
      {
        for (var e = {}, t = [], l = 0, i = this.qualityLevels_.length; l < i; l++)
        {
          var n = this.qualityLevels_[l],
            s = this.qualityLevels_.selectedIndex === l,
            a = n.height,
            o = void 0;
          if (this.options_.resolutionLabelBitrates) o = a + "p @ " + Math.round(n.bitrate / 1e3) + " kbps";
          else o = a + "p";
          if (!e[o])
          {
            var u = f(a);
            e[o] = {
              levels: [],
              label: o,
              controlText: o,
              subLabel: u
            }, t.push(
              {
                label: o,
                lines: a
              })
          }
          s && (e[o].active = !0), e[o].levels.push(l)
        }
        t.sort((function (e, t)
        {
          return t.lines - e.lines
        }));
        var r = [];
        return t.forEach((function (t)
        {
          r.push(e[t.label])
        })), r
      }, l.groupByBitrate_ = function ()
      {
        for (var e = [
          {
            levels: [],
            label: "HD",
            controlText: "High Definition"
          },
          {
            levels: [],
            label: "SD",
            controlText: "Standard Definition"
          }], t = 0, l = this.qualityLevels_.length; t < l; t++)
        {
          var i = this.qualityLevels_[t],
            n = this.qualityLevels_.selectedIndex === t,
            s = void 0;
          s = i.bitrate < this.options_.sdBitrateLimit ? e[1] : e[0], n && (s.active = !0), s.levels.push(t)
        }
        return e[0].levels.length && e[1].levels.length ? e : []
      }, l.handleQualityChange_ = function ()
      {
        var e = this.qualityLevels_[this.qualityLevels_.selectedIndex],
          t = this.options_.useResolutionLabels && y(this.qualityLevels_),
          l = "";
        e && (t ? l = f(e.height) : e.bitrate >= this.options_.sdBitrateLimit && (l = "HD")), "HD" === l ? (this.addClass("vjs-quality-menu-button-HD-flag"), this.removeClass("vjs-quality-menu-button-4K-flag")) : "4K" === l ? (this.removeClass("vjs-quality-menu-button-HD-flag"), this.addClass("vjs-quality-menu-button-4K-flag")) : (this.removeClass("vjs-quality-menu-button-HD-flag"), this.removeClass("vjs-quality-menu-button-4K-flag")), this.autoMenuItem_ && (this.autoMenuItem_.manuallySelected_ && e ? this.autoMenuItem_.subLabel_.innerHTML = this.localize(l) : this.autoMenuItem_.subLabel_.innerHTML = "")
      }, t
    }(c);
  e.registerComponent("QualityMenuButton", p);
  var _ = e.registerPlugin || e.plugin,
    g = {
      sdBitrateLimit: 2e6,
      useResolutionLabels: !0,
      resolutionLabelBitrates: !1,
      defaultResolution: "none"
    },
    b = function (e, t)
    {
      e.addClass("vjs-quality-menu");
      var l = e.getChild("controlBar"),
        i = l.addChild("QualityMenuButton", t, l.children_.length - 2);
      return function ()
      {
        e.removeClass("vjs-quality-menu"), l.removeChild(i), i.dispose()
      }
    },
    q = function (t)
    {
      ! function (e, t)
      {
        if (void 0 !== e.qualityLevels)
        {
          e.qualityLevels();
          var l = function () {};
          e.ready((function ()
          {
            console.log('quality-v2 ready', e, t)
            l = b(e, t), e.on("loadstart", (function ()
            {
              l(), l = b(e, t)
            }))
          })), e.qualityMenu = function () {}, e.qualityMenu.VERSION = "1.4.0"
        }
      }(this, e.mergeOptions(g, t))
    };
  return _("qualityMenu", q), q.VERSION = "1.4.0", q
}));