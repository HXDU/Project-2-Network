function Gauge(t, e) {
    this.placeholderName = t;
    var n = this;
    this.configure = function(t) {
        this.config = t, this.config.size = .9 * this.config.size, this.config.raduis = .97 * this.config.size / 2, this.config.cx = this.config.size / 2, this.config.cy = this.config.size / 2, this.config.min = void 0 != t.min ? t.min : 0, this.config.max = void 0 != t.max ? t.max : 100, this.config.range = this.config.max - this.config.min, this.config.majorTicks = t.majorTicks || 5, this.config.minorTicks = t.minorTicks || 2, this.config.greenColor = t.greenColor || "#109618", this.config.yellowColor = t.yellowColor || "#FF9900", this.config.redColor = t.redColor || "#DC3912", this.config.transitionDuration = t.transitionDuration || 500
    }, this.render = function() {
        this.body = d3.select("#" + this.placeholderName).append("svg:svg").attr("class", "gauge").attr("width", this.config.size).attr("height", this.config.size), this.body.append("svg:circle").attr("cx", this.config.cx).attr("cy", this.config.cy).attr("r", this.config.raduis).style("fill", "#ccc").style("stroke", "#000").style("stroke-width", "0.5px"), this.body.append("svg:circle").attr("cx", this.config.cx).attr("cy", this.config.cy).attr("r", .9 * this.config.raduis).style("fill", "#fff").style("stroke", "#e0e0e0").style("stroke-width", "2px");
        for (var t in this.config.greenZones) this.drawBand(this.config.greenZones[t].from, this.config.greenZones[t].to, n.config.greenColor);
        for (var t in this.config.yellowZones) this.drawBand(this.config.yellowZones[t].from, this.config.yellowZones[t].to, n.config.yellowColor);
        for (var t in this.config.redZones) this.drawBand(this.config.redZones[t].from, this.config.redZones[t].to, n.config.redColor);
        if (void 0 != this.config.label) {
            e = Math.round(this.config.size / 9);
            this.body.append("svg:text").attr("x", this.config.cx).attr("y", this.config.cy / 2 + e / 2).attr("dy", e / 2).attr("text-anchor", "middle").text(this.config.label).style("font-size", e + "px").style("fill", "#333").style("stroke-width", "0px")
        }
        for (var e = Math.round(this.config.size / 16), r = this.config.range / (this.config.majorTicks - 1), a = this.config.min; a <= this.config.max; a += r) {
            for (var i = r / this.config.minorTicks, o = a + i; o < Math.min(a + r, this.config.max); o += i) {
                var c = this.valueToPoint(o, .75),
                    s = this.valueToPoint(o, .85);
                this.body.append("svg:line").attr("x1", c.x).attr("y1", c.y).attr("x2", s.x).attr("y2", s.y).style("stroke", "#666").style("stroke-width", "1px")
            }
            var c = this.valueToPoint(a, .7),
                s = this.valueToPoint(a, .85);
            if (this.body.append("svg:line").attr("x1", c.x).attr("y1", c.y).attr("x2", s.x).attr("y2", s.y).style("stroke", "#333").style("stroke-width", "2px"), a == this.config.min || a == this.config.max) {
                var l = this.valueToPoint(a, .63);
                this.body.append("svg:text").attr("x", l.x).attr("y", l.y).attr("dy", e / 3).attr("text-anchor", a == this.config.min ? "start" : "end").text(a).style("font-size", e + "px").style("fill", "#333").style("stroke-width", "0px")
            }
        }
        var u = this.body.append("svg:g").attr("class", "pointerContainer"),
            d = (this.config.min + this.config.max) / 2,
            f = this.buildPointerPath(d),
            h = d3.svg.line().x(function(t) {
                return t.x
            }).y(function(t) {
                return t.y
            }).interpolate("basis");
        u.selectAll("path").data([f]).enter().append("svg:path").attr("d", h).style("fill", "#dc3912").style("stroke", "#c63310").style("fill-opacity", .7), u.append("svg:circle").attr("cx", this.config.cx).attr("cy", this.config.cy).attr("r", .12 * this.config.raduis).style("fill", "#4684EE").style("stroke", "#666").style("opacity", 1);
        e = Math.round(this.config.size / 10);
        u.selectAll("text").data([d]).enter().append("svg:text").attr("x", this.config.cx).attr("y", this.config.size - this.config.cy / 4 - e).attr("dy", e / 2).attr("text-anchor", "middle").style("font-size", e + "px").style("fill", "#000").style("stroke-width", "0px"), this.redraw(this.config.min, 0)
    }, this.buildPointerPath = function(t) {
        function e(t, e) {
            var r = n.valueToPoint(t, e);
            return r.x -= n.config.cx, r.y -= n.config.cy, r
        }
        var r = this.config.range / 13,
            a = e(t, .85),
            i = e(t - r, .12),
            o = e(t + r, .12),
            c = t - this.config.range * (1 / .75) / 2,
            s = e(c, .28),
            l = e(c - r, .12);
        return [a, i, e(c + r, .12), s, l, o, a]
    }, this.drawBand = function(t, e, r) {
        0 >= e - t || this.body.append("svg:path").style("fill", r).attr("d", d3.svg.arc().startAngle(this.valueToRadians(t)).endAngle(this.valueToRadians(e)).innerRadius(.65 * this.config.raduis).outerRadius(.85 * this.config.raduis)).attr("transform", function() {
            return "translate(" + n.config.cx + ", " + n.config.cy + ") rotate(270)"
        })
    }, this.redraw = function(t, e) {
        var r = this.body.select(".pointerContainer");
        r.selectAll("text").text(Math.round(t)), r.selectAll("path").transition().duration(void 0 != e ? e : this.config.transitionDuration).attrTween("transform", function() {
            var e = t;
            t > n.config.max ? e = n.config.max + .02 * n.config.range : t < n.config.min && (e = n.config.min - .02 * n.config.range);
            var r = n.valueToDegrees(e) - 90,
                a = n._currentRotation || r;
            return n._currentRotation = r,
                function(t) {
                    var e = a + (r - a) * t;
                    return "translate(" + n.config.cx + ", " + n.config.cy + ") rotate(" + e + ")"
                }
        })
    }, this.valueToDegrees = function(t) {
        return t / this.config.range * 270 - (this.config.min / this.config.range * 270 + 45)
    }, this.valueToRadians = function(t) {
        return this.valueToDegrees(t) * Math.PI / 180
    }, this.valueToPoint = function(t, e) {
        return {
            x: this.config.cx - this.config.raduis * e * Math.cos(this.valueToRadians(t)),
            y: this.config.cy - this.config.raduis * e * Math.sin(this.valueToRadians(t))
        }
    }, this.configure(e)
}

function HivePlot_link() {
    function t(t, a) {
        var i, o = e(n, this, t, a),
            c = e(r, this, t, a);
        c.a < o.a && (i = c, c = o, o = i), c.a - o.a > Math.PI && (o.a += 2 * Math.PI);
        var s = o.a + (c.a - o.a) / 3,
            l = c.a - (c.a - o.a) / 3;
        return o.r0 - o.r1 || c.r0 - c.r1 ? "M" + Math.cos(o.a) * o.r0 + "," + Math.sin(o.a) * o.r0 + "L" + Math.cos(o.a) * o.r1 + "," + Math.sin(o.a) * o.r1 + "C" + Math.cos(s) * o.r1 + "," + Math.sin(s) * o.r1 + " " + Math.cos(l) * c.r1 + "," + Math.sin(l) * c.r1 + " " + Math.cos(c.a) * c.r1 + "," + Math.sin(c.a) * c.r1 + "L" + Math.cos(c.a) * c.r0 + "," + Math.sin(c.a) * c.r0 + "C" + Math.cos(l) * c.r0 + "," + Math.sin(l) * c.r0 + " " + Math.cos(s) * o.r0 + "," + Math.sin(s) * o.r0 + " " + Math.cos(o.a) * o.r0 + "," + Math.sin(o.a) * o.r0 : "M" + Math.cos(o.a) * o.r0 + "," + Math.sin(o.a) * o.r0 + "C" + Math.cos(s) * o.r1 + "," + Math.sin(s) * o.r1 + " " + Math.cos(l) * c.r1 + "," + Math.sin(l) * c.r1 + " " + Math.cos(c.a) * c.r1 + "," + Math.sin(c.a) * c.r1
    }

    function e(t, e, n, r) {
        var s = t.call(e, n, r),
            l = +("function" == typeof a ? a.call(e, s, r) : a) + c,
            u = +("function" == typeof i ? i.call(e, s, r) : i);
        return {
            r0: u,
            r1: i === o ? u : +("function" == typeof o ? o.call(e, s, r) : o),
            a: l
        }
    }
    var n = function(t) {
            return t.source
        },
        r = function(t) {
            return t.target
        },
        a = function(t) {
            return t.angle
        },
        i = function(t) {
            return t.radius
        },
        o = i,
        c = -Math.PI / 2;
    return t.source = function(e) {
        return arguments.length ? (n = e, t) : n
    }, t.target = function(e) {
        return arguments.length ? (r = e, t) : r
    }, t.angle = function(e) {
        return arguments.length ? (a = e, t) : a
    }, t.radius = function(e) {
        return arguments.length ? (i = o = e, t) : i
    }, t.startRadius = function(e) {
        return arguments.length ? (i = e, t) : i
    }, t.endRadius = function(e) {
        return arguments.length ? (o = e, t) : o
    }, t
}

function HivePlot_degrees(t) {
    return t / Math.PI * 180 - 90
}
var biPartitePlot = function(t) {
    var e = new biPartite,
        n = {
            b: 0,
            t: 40,
            l: 170,
            r: 50
        },
        r = d3.select("#" + t).append("svg").attr("width", 1100).attr("height", 610 + n.b + n.t).append("g").attr("transform", "translate(" + n.l + "," + n.t + ")");
    this.bP = e.bP, this.biPartite = e, this.svg = r
};
biPartitePlot.prototype.draw = function(t) {
    this.bP.draw(t, this.svg)
}, biPartitePlot.prototype.partData = function(t, e) {
    return this.bP.partData(t, e)
};
var biPartite = function() {
        function t(t) {
            function e(t, e, n, r, a) {
                var i = d3.sum(t),
                    o = 0,
                    c = 0,
                    s = n - e - 2 * r * t.length,
                    l = [];
                t.forEach(function(o) {
                    var u = {};
                    u.percent = 0 == i ? 0 : o / i, u.value = o, u.height = Math.max(u.percent * (n - e - 2 * r * t.length), a), u.height == a ? s -= a : c += u.height, l.push(u)
                });
                var u = s / Math.max(c, 1),
                    o = 0;
                return l.forEach(function(c) {
                    c.percent = u * c.percent, c.height = c.height == a ? a : c.height * u, c.middle = o + r + c.height / 2, c.y = e + c.middle - c.percent * (n - e - 2 * r * t.length) / 2, c.h = c.percent * (n - e - 2 * r * t.length), c.percent = 0 == i ? 0 : c.value / i, o += 2 * r + c.height
                }), l
            }
            var n = {};
            return n.mainBars = [e(t.data[0].map(function(t) {
                return d3.sum(t)
            }), 0, f, h, p), e(t.data[1].map(function(t) {
                return d3.sum(t)
            }), 0, f, h, p)], n.subBars = [
                [],
                []
            ], n.mainBars.forEach(function(r, a) {
                r.forEach(function(r, i) {
                    e(t.data[a][i], r.y, r.y + r.h, 0, 0).forEach(function(t, e) {
                        t.key1 = 0 == a ? i : e, t.key2 = 0 == a ? e : i, n.subBars[a].push(t)
                    })
                })
            }), n.subBars.forEach(function(t) {
                t.sort(function(t, e) {
                    return t.key1 < e.key1 ? -1 : t.key1 > e.key1 ? 1 : t.key2 < e.key2 ? -1 : t.key2 > e.key2 ? 1 : 0
                })
            }), n.edges = n.subBars[0].map(function(t, e) {
                return {
                    key1: t.key1,
                    key2: t.key2,
                    y1: t.y,
                    y2: n.subBars[1][e].y,
                    h1: t.h,
                    h2: n.subBars[1][e].h
                }
            }), n.keys = t.keys, n
        }

        function e(t) {
            var e = d3.interpolate(this._current, t);
            return this._current = e(0),
                function(t) {
                    return i(e(t))
                }
        }

        function n(t, e, n) {
            d3.select("#" + e).append("g").attr("class", "part" + n).attr("transform", "translate(" + n * (d + u) + ",0)"), d3.select("#" + e).select(".part" + n).append("g").attr("class", "subbars"), d3.select("#" + e).select(".part" + n).append("g").attr("class", "mainbars");
            var r = d3.select("#" + e).select(".part" + n).select(".mainbars").selectAll(".mainbar").data(t.mainBars[n]).enter().append("g").attr("class", "mainbar");
            r.append("rect").attr("class", "mainrect").attr("x", 0).attr("y", function(t) {
                return t.middle - t.height / 2
            }).attr("width", u).attr("height", function(t) {
                return t.height
            }).style("shape-rendering", "auto").style("fill-opacity", 0).style("stroke-width", "0.5").style("stroke", "black").style("stroke-opacity", 0), r.append("text").attr("class", "barlabel").attr("x", g[n]).attr("y", function(t) {
                return t.middle + 5
            }).text(function(e, r) {
                return t.keys[n][r]
            }).attr("text-anchor", "start"), r.append("text").attr("class", "barvalue").attr("x", y[n]).attr("y", function(t) {
                return t.middle + 5
            }).text(function(t, e) {
                return t.value
            }).attr("text-anchor", "end"), r.append("text").attr("class", "barpercent").attr("x", m[n]).attr("y", function(t) {
                return t.middle + 5
            }).text(function(t, e) {
                return "( " + Math.round(100 * t.percent) + "%)"
            }).attr("text-anchor", "end").style("fill", "grey"), d3.select("#" + e).select(".part" + n).select(".subbars").selectAll(".subbar").data(t.subBars[n]).enter().append("rect").attr("class", "subbar").attr("x", 0).attr("y", function(t) {
                return t.y
            }).attr("width", u).attr("height", function(t) {
                return t.h
            }).style("fill", function(t) {
                return x[t.key1]
            })
        }

        function r(t, e) {
            d3.select("#" + e).append("g").attr("class", "edges").attr("transform", "translate(" + u + ",0)"), d3.select("#" + e).select(".edges").selectAll(".edge").data(t.edges).enter().append("polygon").attr("class", "edge").attr("points", i).style("fill", function(t) {
                return x[t.key1]
            }).style("opacity", .5).each(function(t) {
                this._current = t
            })
        }

        function a(t, e) {
            d3.select("#" + e).append("g").attr("class", "header").append("text").text(t[2]).style("font-size", "20").attr("x", 108).attr("y", -20).style("text-anchor", "middle").style("font-weight", "bold"), [0, 1].forEach(function(n) {
                var r = d3.select("#" + e).select(".part" + n).append("g").attr("class", "header");
                r.append("text").text(t[n]).attr("x", g[n] - 5).attr("y", -5).style("fill", "grey"), r.append("text").text("Count").attr("x", y[n] - 10).attr("y", -5).style("fill", "grey"), r.append("line").attr("x1", g[n] - 10).attr("y1", -2).attr("x2", m[n] + 10).attr("y2", -2).style("stroke", "black").style("stroke-width", "1").style("shape-rendering", "crispEdges")
            })
        }

        function i(t) {
            return [0, t.y1, d, t.y2, d, t.y2 + t.h2, 0, t.y1 + t.h1].join(" ")
        }

        function o(t, e, n) {
            var r = d3.select("#" + e).select(".part" + n).select(".mainbars").selectAll(".mainbar").data(t.mainBars[n]);
            r.select(".mainrect").transition().duration(500).attr("y", function(t) {
                return t.middle - t.height / 2
            }).attr("height", function(t) {
                return t.height
            }), r.select(".barlabel").transition().duration(500).attr("y", function(t) {
                return t.middle + 5
            }), r.select(".barvalue").transition().duration(500).attr("y", function(t) {
                return t.middle + 5
            }).text(function(t, e) {
                return t.value
            }), r.select(".barpercent").transition().duration(500).attr("y", function(t) {
                return t.middle + 5
            }).text(function(t, e) {
                return "( " + Math.round(100 * t.percent) + "%)"
            }), d3.select("#" + e).select(".part" + n).select(".subbars").selectAll(".subbar").data(t.subBars[n]).transition().duration(500).attr("y", function(t) {
                return t.y
            }).attr("height", function(t) {
                return t.h
            })
        }

        function c(t, n) {
            d3.select("#" + n).append("g").attr("class", "edges").attr("transform", "translate(" + u + ",0)"), d3.select("#" + n).select(".edges").selectAll(".edge").data(t.edges).transition().duration(500).attrTween("points", e).style("opacity", function(t) {
                return 0 == t.h1 || 0 == t.h2 ? 0 : .5
            })
        }

        function s(t, e) {
            o(t, e, 0), o(t, e, 1), c(t, e)
        }
        var l = {},
            u = 30,
            d = 150,
            f = 600,
            h = 1,
            p = 14,
            g = [-130, 40],
            y = [-50, 100],
            m = [-10, 140],
            x = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6"];
        l.partData = function(t, e) {
            var n = {};
            return n.keys = [d3.set(t.map(function(t) {
                return t[0]
            })).values().sort(function(t, e) {
                return t < e ? -1 : t > e ? 1 : 0
            }), d3.set(t.map(function(t) {
                return t[1]
            })).values().sort(function(t, e) {
                return t < e ? -1 : t > e ? 1 : 0
            })], n.data = [n.keys[0].map(function(t) {
                return n.keys[1].map(function(t) {
                    return 0
                })
            }), n.keys[1].map(function(t) {
                return n.keys[0].map(function(t) {
                    return 0
                })
            })], t.forEach(function(t) {
                n.data[0][n.keys[0].indexOf(t[0])][n.keys[1].indexOf(t[1])] = t[e], n.data[1][n.keys[1].indexOf(t[1])][n.keys[0].indexOf(t[0])] = t[e]
            }), n
        }, l.draw = function(e, i) {
            e.forEach(function(o, c) {
                i.append("g").attr("id", o.id).attr("transform", "translate(" + 550 * c + ",0)");
                var s = t(o.data);
                n(s, o.id, 0), n(s, o.id, 1), r(s, o.id), a(o.header, o.id), [0, 1].forEach(function(t) {
                    d3.select("#" + o.id).select(".part" + t).select(".mainbars").selectAll(".mainbar").on("mouseover", function(n, r) {
                        return l.selectSegment(e, t, r)
                    }).on("mouseout", function(n, r) {
                        return l.deSelectSegment(e, t, r)
                    })
                })
            })
        }, l.selectSegment = function(e, n, r) {
            e.forEach(function(e) {
                var a = {
                    keys: [],
                    data: []
                };
                a.keys = e.data.keys.map(function(t) {
                    return t
                }), a.data[n] = e.data.data[n].map(function(t) {
                    return t
                }), a.data[1 - n] = e.data.data[1 - n].map(function(t) {
                    return t.map(function(t, e) {
                        return r == e ? t : 0
                    })
                }), s(t(a), e.id);
                var i = d3.select("#" + e.id).select(".part" + n).select(".mainbars").selectAll(".mainbar").filter(function(t, e) {
                    return e == r
                });
                i.select(".mainrect").style("stroke-opacity", 1), i.select(".barlabel").style("font-weight", "bold"), i.select(".barvalue").style("font-weight", "bold"), i.select(".barpercent").style("font-weight", "bold")
            })
        }, l.deSelectSegment = function(e, n, r) {
            e.forEach(function(e) {
                s(t(e.data), e.id);
                var a = d3.select("#" + e.id).select(".part" + n).select(".mainbars").selectAll(".mainbar").filter(function(t, e) {
                    return e == r
                });
                a.select(".mainrect").style("stroke-opacity", 0), a.select(".barlabel").style("font-weight", "normal"), a.select(".barvalue").style("font-weight", "normal"), a.select(".barpercent").style("font-weight", "normal")
            })
        }, this.bP = l
    },
    CollapsibleTree = function(t, e) {
        function n(t) {
            t.children && (t.children.forEach(n), a(t))
        }

        function r(t) {
            var e = d3.event && d3.event.altKey ? 5e3 : 500,
                n = u.nodes(i).reverse();
            n.forEach(function(t) {
                t.y = 180 * t.depth
            });
            var o = f.selectAll("g.node").data(n, function(t) {
                    return t.id || (t.id = ++l)
                }),
                c = o.enter().append("svg:g").attr("class", "node").attr("transform", function(e) {
                    return "translate(" + t.y0 + "," + t.x0 + ")"
                }).on("click", function(t) {
                    a(t), r(t)
                });
            c.append("svg:circle").attr("r", 1e-6).style("fill", function(t) {
                return t._children ? "lightsteelblue" : "#fff"
            }), c.append("svg:text").attr("x", function(t) {
                return t.children || t._children ? -10 : 10
            }).attr("dy", ".35em").attr("text-anchor", function(t) {
                return t.children || t._children ? "end" : "start"
            }).text(function(t) {
                return t.name
            }).style("fill-opacity", 1e-6);
            var s = o.transition().duration(e).attr("transform", function(t) {
                return "translate(" + t.y + "," + t.x + ")"
            });
            s.select("circle").attr("r", 4.5).style("fill", function(t) {
                return t._children ? "lightsteelblue" : "#fff"
            }), s.select("text").style("fill-opacity", 1);
            var h = o.exit().transition().duration(e).attr("transform", function(e) {
                return "translate(" + t.y + "," + t.x + ")"
            }).remove();
            h.select("circle").attr("r", 1e-6), h.select("text").style("fill-opacity", 1e-6);
            var p = f.selectAll("path.link").data(u.links(n), function(t) {
                return t.target.id
            });
            p.enter().insert("svg:path", "g").attr("class", "link").attr("d", function(e) {
                var n = {
                    x: t.x0,
                    y: t.y0
                };
                return d({
                    source: n,
                    target: n
                })
            }).transition().duration(e).attr("d", d), p.transition().duration(e).attr("d", d), p.exit().transition().duration(e).attr("d", function(e) {
                var n = {
                    x: t.x,
                    y: t.y
                };
                return d({
                    source: n,
                    target: n
                })
            }).remove(), n.forEach(function(t) {
                t.x0 = t.x, t.y0 = t.y
            })
        }

        function a(t) {
            t.children ? (t._children = t.children, t.children = null) : (t.children = t._children, t._children = null)
        }
        var i, o = [20, 120, 20, 120],
            c = 1280 - o[1] - o[3],
            s = 800 - o[0] - o[2],
            l = 0,
            u = d3.layout.tree().size([s, c]),
            d = d3.svg.diagonal().projection(function(t) {
                return [t.y, t.x]
            }),
            f = d3.select("#" + t).append("svg:svg").attr("width", c + o[1] + o[3]).attr("height", s + o[0] + o[2]).append("svg:g").attr("transform", "translate(" + o[3] + "," + o[0] + ")");
        (i = e).x0 = s / 2, i.y0 = 0, i.children.forEach(n), a(i.children[1]), a(i.children[1].children[2]), a(i.children[9]), a(i.children[9].children[0]), r(i)
    },
    ConceptMap = function(t, e, n) {
        function r() {
            if (null !== H.node) {
                H = {
                    node: null,
                    map: {}
                }, A = Math.floor(K / x.get("ditems").length), P = Math.floor(x.get("ditems").length * A / 2), x.get("ditems").forEach(function(t, e) {
                    t.x = T / -2, t.y = e * A - P
                });
                var t = 180 + I,
                    e = 360 - I,
                    n = (e - t) / (x.get("LeftSide").length - 1);
                x.get("LeftSide").forEach(function(t, r) {
                    t.x = e - r * n, t.y = z / 2 - O, t.xOffset = -B, t.depth = 1
                }), n = ((e = 180 - I) - (t = I)) / (x.get("RightSide").length - 1), x.get("RightSide").forEach(function(e, r) {
                    e.x = r * n + t, e.y = z / 2 - O, e.xOffset = B, e.depth = 1
                }), E = [];
                var r, a, i, o = z / 2 - O;
                x.get("ditems").forEach(function(t) {
                    t.links.forEach(function(e) {
                        (r = k[g(e)]) && "reference" !== r.type && (a = (r.x - 90) * Math.PI / 180, i = t.key + "-to-" + r.key, E.push({
                            source: t,
                            target: r,
                            key: i,
                            canonicalKey: i,
                            x1: t.x + ("theme" === r.type ? 0 : T),
                            y1: t.y + C / 2,
                            x2: Math.cos(a) * o + r.xOffset,
                            y2: Math.sin(a) * o
                        }))
                    })
                }), M = [], w.forEach(function(t, e) {
                    var n = (e[0].x - 90) * Math.PI / 180;
                    a2 = (e[1].x - 90) * Math.PI / 180, bulge = 20, M.push({
                        x1: Math.cos(n) * o + e[0].xOffset,
                        y1: Math.sin(n) * o,
                        xx: Math.cos((n + a2) / 2) * (o + bulge) + e[0].xOffset,
                        yy: Math.sin((n + a2) / 2) * (o + bulge),
                        x2: Math.cos(a2) * o + e[1].xOffset,
                        y2: Math.sin(a2) * o
                    })
                }), window.location.hash = "", c()
            }
        }

        function a(t, e) {
            if (H.node === t && !0 !== e) return "ditem" === t.type ? void(window.open(t.slug, '_blank') ) : (H.node.children.forEach(function(t) {
                t.children = t._group
            }), void s());
            if (t.isGroup) return H.node.children.forEach(function(t) {
                t.children = t._group
            }), t.parent.children = t.parent._children, void s();
            t = k[t.canonicalKey], v.forEach(function(t) {
                t.parent = null, t.children = [], t._children = [], t._group = [], t.canonicalKey = t.key, t.xOffset = 0
            }), H.node = t, H.node.children = b.get(t.canonicalKey), H.map = {};
            var n = 0;
            H.node.children.forEach(function(e) {
                H.map[e.key] = !0, e._children = b.get(e.key).filter(function(e) {
                    return e.canonicalKey !== t.canonicalKey
                }), e._children = JSON.parse(JSON.stringify(e._children)), e._children.forEach(function(t) {
                    t.canonicalKey = t.key, t.key = e.key + "-" + t.key, H.map[t.key] = !0
                });
                var r = e.key + "-group",
                    a = e._children.length;
                e._group = [{
                    isGroup: !0,
                    key: r + "-group-key",
                    canonicalKey: r,
                    name: a,
                    count: a,
                    xOffset: 0
                }], H.map[r] = !0, n += a
            }), H.node.children.forEach(function(t) {
                t.children = n > 50 ? t._group : t._children
            }), window.location.hash = H.node.key, s()
        }

        function i() {
            Z = {
                node: null,
                map: {}
            }, p()
        }

        function o(t) {
            Z.node !== t && (Z.node = t, Z.map = {}, Z.map[t.key] = !0, t.key !== t.canonicalKey ? (Z.map[t.parent.canonicalKey] = !0, Z.map[t.parent.canonicalKey + "-to-" + t.canonicalKey] = !0, Z.map[t.canonicalKey + "-to-" + t.parent.canonicalKey] = !0) : (b.get(t.canonicalKey).forEach(function(e) {
                Z.map[e.canonicalKey] = !0, Z.map[t.canonicalKey + "-" + e.canonicalKey] = !0
            }), E.forEach(function(t) {
                Z.map[t.source.canonicalKey] && Z.map[t.target.canonicalKey] && (Z.map[t.canonicalKey] = !0)
            })), p())
        }

        function c() {
            u(), q.selectAll("path").attr("d", function(t) {
                return F([
                    [t.x1, t.y1],
                    [t.x1, t.y1],
                    [t.x1, t.y1]
                ])
            }).transition().duration(R).ease(S).attr("d", function(t) {
                return F([
                    [t.x1, t.y1],
                    [t.target.xOffset * L, 0],
                    [t.x2, t.y2]
                ])
            }), f(x.get("ditems")), l(d3.merge([x.get("LeftSide"), x.get("RightSide")])), d([]), h(M), U.html('<a href="/the-concept-map/">What\'s this?</a>'), i(), p()
        }

        function getLink(url) {
            var a = '<a target="_blank" href="https:google.com">'
            a = a + "TWEET LINK" //Text that is clickable
            return a + "</a>"   
        }
        
        function s() {
            var t = j.nodes(H.node);
            t.forEach(function(t) {
                1 === t.depth && (t.y -= 20)
            }), (E = j.links(t)).forEach(function(t) {
                "ditem" === t.source.type ? t.key = t.source.canonicalKey + "-to-" + t.target.canonicalKey : t.key = t.target.canonicalKey + "-to-" + t.source.canonicalKey, t.canonicalKey = t.key
            }), u(), q.selectAll("path").transition().duration(R).ease(S).attr("d", W), f([]), l(t), d([H.node]), h([]);
            var e = "";
            H.node.description && (e = H.node.description + getLink("google.com")), U.html(e), i(), p()
        }

        function l(t) {
            var e = (t = Q.selectAll(".node").data(t, y)).enter().append("g").attr("transform", function(t) {
                var e = t.parent ? t.parent : {
                    xOffset: 0,
                    x: 0,
                    y: 0
                };
                return "translate(" + e.xOffset + ",0)rotate(" + (e.x - 90) + ")translate(" + e.y + ")"
            }).attr("class", "node").on("mouseover", o).on("mouseout", i).on("click", a);
            e.append("circle").attr("r", 0), e.append("text").attr("stroke", "#fff").attr("stroke-width", 4).attr("class", "label-stroke"), e.append("text").attr("font-size", 0).attr("class", "label"), t.transition().duration(R).ease(S).attr("transform", function(t) {
                if (t === H.node) return null;
                var e = t.isGroup ? t.y + (7 + t.count) : t.y;
                return "translate(" + t.xOffset + ",0)rotate(" + (t.x - 90) + ")translate(" + e + ")"
            }), t.selectAll("circle").transition().duration(R).ease(S).attr("r", function(t) {
                return t == H.node ? 100 : t.isGroup ? 7 + t.count : 4.5
            }), t.selectAll("text").transition().duration(R).ease(S).attr("dy", ".3em").attr("font-size", function(t) {
                return 0 === t.depth ? 20 : 15
            }).text(function(t) {
                return t.name
            }).attr("text-anchor", function(t) {
                return t === H.node || t.isGroup ? "middle" : t.x < 180 ? "start" : "end"
            }).attr("transform", function(t) {
                return t === H.node ? null : t.isGroup ? t.x > 180 ? "rotate(180)" : null : t.x < 180 ? "translate(" + N + ")" : "rotate(180)translate(-" + N + ")"
            }), t.selectAll("text.label-stroke").attr("display", function(t) {
                return 1 === t.depth ? "block" : "none"
            }), t.exit().remove()
        }

        function u() {
            var t = q.selectAll("path").data(E, y);
            t.enter().append("path").attr("d", function(t) {
                var e = t.source ? {
                    x: t.source.x,
                    y: t.source.y
                } : {
                    x: 0,
                    y: 0
                };
                return W({
                    source: e,
                    target: e
                })
            }).attr("class", "link"), t.exit().remove()
        }

        function d(t) {
            var e = J.selectAll(".detail").data(t, y),
                n = e.enter().append("g").attr("class", "detail"),
                i = t[0];
            if (i && "ditem" === i.type) n.append("a").attr("xlink:href", function(t) {
                return + t.slug
            }).append("text").attr("fill", "#FFF").attr("text-anchor", "middle").attr("y", -1 * (D + N)).text(function(t) {
                return "ITEM " + t.ditem
            });
            else if (i && "theme" === i.type) n.append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", -1 * (D + N)).text("THEME");
            else if (i && "perspective" === i.type) {
                var o = e.selectAll(".pair").data(w.get(i.group).filter(function(t) {
                    return t !== i
                }), y);
                o.enter().append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", function(t, e) {
                    return 2 * (D + N) + e * (D + N)
                }).text(function(t) {
                    return "(vs. " + t.name + ")"
                }).attr("class", "pair").on("click", a), n.append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", -1 * (D + N)).text("PERSPECTIVE"), o.exit().remove()
            }
            e.exit().remove();
            var c = J.selectAll(".all-ditems").data(t);
            c.enter().append("text").attr("text-anchor", "start").attr("x", _ / -2 + N).attr("y", K / 2 - N).text("Click Here to Go Back").attr("class", "all-ditems").on("click", r), c.exit().remove()
        }

        function f(t) {
            var e = (t = V.selectAll(".ditem").data(t, y)).enter().append("g").attr("class", "ditem").on("mouseover", o).on("mouseout", i).on("click", a);
            e.append("rect").attr("x", T / -2).attr("y", C / -2).attr("width", T).attr("height", C).transition().duration(R).ease(S).attr("x", function(t) {
                return t.x
            }).attr("y", function(t) {
                return t.y
            }), e.append("text").attr("x", function(t) {
                return T / -2 + N
            }).attr("y", function(t) {
                return C / -2 + D
            }).attr("fill", "#fff").text(function(t) {
                return t.name
            }).transition().duration(R).ease(S).attr("x", function(t) {
                return t.x + N
            }).attr("y", function(t) {
                return t.y + D
            }), t.exit().selectAll("rect").transition().duration(R).ease(S).attr("x", function(t) {
                return T / -2
            }).attr("y", function(t) {
                return C / -2
            }), t.exit().selectAll("text").transition().duration(R).ease(S).attr("x", function(t) {
                return T / -2 + N
            }).attr("y", function(t) {
                return C / -2 + D
            }), t.exit().transition().duration(R).remove()
        }

        function h(t) {
            //THIS GOT RID OF CURVE PATH PATHS
            return;
            var e = V.selectAll("path").data(t);
            e.enter().append("path").attr("d", function(t) {
                return F([
                    [t.x1, t.y1],
                    [t.x1, t.y1],
                    [t.x1, t.y1]
                ])
            }).attr("stroke", "#fff").attr("stroke-width", 1.5).transition().duration(R).ease(S).attr("d", function(t) {
                //ERASED CURVE PATH HERE
                //FIX
                return F([
                    [t.x1, t.y1],
                    [t.xx, t.yy],
                    [t.x2, t.y2]
                ])
            }), e.exit().remove()
        }

//        Work on 
        function p() {
            V.selectAll("rect").attr("fill", function(t) {
                return m(t, "#000", G, "#000")
            }), q.selectAll("path").attr("stroke", function(t) {
                if (Number(t["x1"]) < 0) {
                    //LEFT
                    return m(t, "#aaa", RepColor, "#aaa")
                } else {
                    //RIGHT
                    return m(t, "#aaa", DemColor, "#aaa")
                }
                //alert(JSON.stringify(t))
                return m(t, "#aaa", G, "#aaa")
            }).attr("stroke-width", function(t) {
                return m(t, "1.5px", "2.5px", "1px")
            }).attr("opacity", function(t) {
                return m(t, .4, .75, .3)
            }).sort(function(t, e) {
                return Z.node ? (Z.map[t.canonicalKey] ? 1 : 0) - (Z.map[e.canonicalKey] ? 1 : 0) : 0
            }), Q.selectAll("circle").attr("fill", function(t) {
                return t === H.node ? "#000" : "theme" === t.type 
                    ? m(t, RepColor, G, "#000") : "perspective" === t.type ? DemColor : m(t, "#000", G, "#999")
            }).attr("stroke", function(t) {
                return t === H.node ? m(t, null, G, null) : "theme" === t.type 
                    ? "#000" : "perspective" === t.type ? m(t, "#000", G, "#000") : null
            }).attr("stroke-width", function(t) {
                return t === H.node ? m(t, null, 2.5, null) : "theme" === t.type || "perspective" === t.type ? 1.5 : null
            }), Q.selectAll("text.label").attr("fill", function(t) {
                return t === H.node || t.isGroup ? "#fff" : m(t, "#000", G, "#999")
            })
        }

        function g(t) {
            return t.toLowerCase().replace(/[ .,()]/g, "-")
        }

        function y(t) {
            return t.key
        }

        function m(t, e, n, r) {
            return null === Z.node ? e : Z.map[t.key] ? n : e
        }
        var x, v, k, b, E, w, M, A, P, _ = 800,
            K = 800,
            z = K,
            T = 200,
            C = 22,
            B = 20,
            L = 8,
            O = 110,
            I = 30,
            D = 15,
            N = 10,
            R = 1e3,
            S = "elastic",
            G = "#4B0082",
            RepColor="#cc0000",
            DemColor="#0066ee",
            PurColor = "#4B0082"
            H = {},
            Z = {},
            j = d3.layout.tree().size([360, z / 2 - O]).separation(function(t, e) {
                return (t.parent == e.parent ? 1 : 2) / t.depth
            }),
            W = d3.svg.diagonal.radial().projection(function(t) {
                return [t.y, t.x / 180 * Math.PI]
            }),
            F = d3.svg.line().x(function(t) {
                return t[0]
            }).y(function(t) {
                return t[1]
            }).interpolate("bundle").tension(.5),
            J = d3.select("#" + t).append("svg").attr("width", _).attr("height", K).append("g").attr("transform", "translate(" + _ / 2 + "," + K / 2 + ")"),
            q = (J.append("rect").attr("class", "bg").attr({
                x: _ / -2,
                y: K / -2,
                width: _,
                height: K,
                fill: "transparent"
            }).on("click", r), J.append("g").attr("class", "links")),
            V = J.append("g").attr("class", "ditems"),
            Q = J.append("g").attr("class", "nodes"),
            U = d3.select("#" + e);
        x = d3.map(n), v = d3.merge(x.values()), k = {}, w = d3.map(), v.forEach(function(t) {
            t.key = g(t.name), t.canonicalKey = t.key, k[t.key] = t, t.group && (w.has(t.group) || w.set(t.group, []), w.get(t.group).push(t))
        }), b = d3.map(), x.get("ditems").forEach(function(t) {
            t.links = t.links.filter(function(t) {
                return void 0 !== k[g(t)] && 0 !== t.indexOf("r-")
            }), b.set(t.key, t.links.map(function(e) {
                var n = g(e);
                return void 0 === b.get(n) && b.set(n, []), b.get(n).push(t), k[n]
            }))
        });
        var X = window.location.hash.substring(1);
        X && k[X] ? a(k[X]) : (r(), c()), window.onhashchange = function() {
            var t = window.location.hash.substring(1);
            t && k[t] && a(k[t], !0)
        }
    },
    HeroGraphPlot = function(t, e, n) {
        function r(t, e) {
            return "translate(" + t + "," + e + ")"
        }

        function a(t, e) {
            return {
                x: .5 * (e.x + t.x),
                y: .5 * (e.y + t.y)
            }
        }

        function i(t) {
            var e = t.split(" ");
            return 3 === e.length ? e[2] + " " + e[0] + " " + e[1] : e[1] + " " + e[0]
        }

        function o(t) {
            return t = _.map(t, function(t) {
                return i(t) + " (" + l[t].value + "pts)"
            }), console.log(t), 1 === t.length ? t : t.slice(0, -1).join(", ") + " & " + t[t.length - 1]
        }

        function c(t) {
            var n = i(t.name) + " (" + t.value + "pts)";
            void 0 !== t.defeated && (n += " defeated ", n += o(t.defeated), void 0 !== t.defeatedBy && (n += " and ")), void 0 !== t.defeatedBy && (n += " was defeated by ", n += o(t.defeatedBy)), d3.select("#" + e).text(n)
        }
        d3.scale.category20();
        var s = d3.layout.force().charge(-160).linkDistance(70).size([650, 650]),
            l = {},
            u = d3.select("#" + t),
            d = d3.scale.log().domain([200, 13e3]).range([1, 30]);
        l = function(t, e) {
            return _.object(_.pluck(t, e), t)
        }(n.nodes, "name"), s.nodes(n.nodes).links(n.links).start();
        var f = u.selectAll(".link").data(n.links).enter().append("path").attr("class", "link").style("stroke-width", function(t) {
                return Math.sqrt(t.value)
            }).attr("marker-mid", "url(#Triangle)"),
            h = u.selectAll(".node").data(n.nodes).enter().append("g").attr("class", "node").on("mouseover", c);
        h.append("circle").attr("r", function(t) {
            return d(t.value)
        }), u.selectAll(".node").append("text").text(function(t) {
            return i(t.name)
        }).attr("transform", function(t) {
            return r(0, -(d(t.value) + 2))
        }), s.on("tick", function() {
            f.attr("d", function(t) {
                var e = a(t.source, t.target);
                return "M" + t.source.x + " " + t.source.y + " L" + e.x + " " + e.y + " L" + t.target.x + " " + t.target.y
            }), h.attr("transform", function(t) {
                return r(t.x, t.y)
            })
        })
    },
    HierarchicalEdgeBundling = function(t, e, n) {
        function r(t) {
            u.each(function(t) {
                t.target = t.source = !1
            }), l.classed("link--target", function(e) {
                if (e.target === t) return e.source.source = !0
            }).classed("link--source", function(e) {
                if (e.source === t) return e.target.target = !0
            }).filter(function(e) {
                return e.target === t || e.source === t
            }).each(function() {
                this.parentNode.appendChild(this)
            }), u.classed("node--target", function(t) {
                return t.target
            }).classed("node--source", function(t) {
                return t.source
            })
        }

        function a(t) {
            l.classed("link--target", !1).classed("link--source", !1), u.classed("node--target", !1).classed("node--source", !1)
        }
        var i = d3.layout.cluster().size([360, 360]).sort(null).value(function(t) {
                return t.size
            }),
            o = d3.layout.bundle(),
            c = d3.svg.line.radial().interpolate("bundle").tension(.85).radius(function(t) {
                return t.y
            }).angle(function(t) {
                return t.x / 180 * Math.PI
            }),
            s = d3.select("#" + t).append("svg").attr("width", 960).attr("height", 960).append("g").attr("transform", "translate(480,480)"),
            l = s.append("g").selectAll(".link"),
            u = s.append("g").selectAll(".node"),
            d = i.nodes(function(t) {
                function e(t, r) {
                    var a, i = n[t];
                    return i || (i = n[t] = r || {
                        name: t,
                        children: []
                    }, t.length && (i.parent = e(t.substring(0, a = t.lastIndexOf("."))), i.parent.children.push(i), i.key = t.substring(a + 1))), i
                }
                var n = {};
                return t.forEach(function(t) {
                    e(t.name, t)
                }), n[""]
            }(n)),
            f = function(t) {
                var e = {},
                    n = [];
                return t.forEach(function(t) {
                    e[t.name] = t
                }), t.forEach(function(t) {
                    t.imports && t.imports.forEach(function(r) {
                        n.push({
                            source: e[t.name],
                            target: e[r]
                        })
                    })
                }), n
            }(d);
        l = l.data(o(f)).enter().append("path").each(function(t) {
            t.source = t[0], t.target = t[t.length - 1]
        }).attr("class", "link").attr("d", c), u = u.data(d.filter(function(t) {
            return !t.children
        })).enter().append("text").attr("class", "node").attr("dy", ".31em").attr("transform", function(t) {
            return "rotate(" + (t.x - 90) + ")translate(" + (t.y + 8) + ",0)" + (t.x < 180 ? "" : "rotate(180)")
        }).style("text-anchor", function(t) {
            return t.x < 180 ? "start" : "end"
        }).text(function(t) {
            return t.key
        }).on("mouseover", r).on("mouseout", a), d3.select(self.frameElement).style("height", "960px")
    },
    HivePlot = function(t, e, n) {
        function r(t) {
            f.selectAll(".link").classed("active", function(e) {
                return e === t
            }), f.selectAll(".node circle").classed("active", function(e) {
                return e === t.source || e === t.target
            }), y.text(t.source.node.name + " �� " + t.target.node.name)
        }

        function a(t) {
            f.selectAll(".link").classed("active", function(e) {
                return e.source === t || e.target === t
            }), d3.select(this).classed("active", !0), y.text(t.node.name)
        }

        function i() {
            f.selectAll(".active").classed("active", !1), y.text(o)
        }
        var o, c = 2 * Math.PI / 3,
            s = 1 * Math.PI / 12,
            l = d3.scale.ordinal().domain(["source", "source-target", "target-source", "target"]).range([0, c - s, c + s, 2 * c]),
            u = d3.scale.linear().range([40, 640]),
            d = d3.scale.category10(),
            f = d3.select("#" + t).append("svg").attr("width", 960).attr("height", 850).append("g").attr("transform", "translate(128," + 640 * .57 + ")"),
            h = {},
            p = [],
            g = d3.format(",d");
        n.forEach(function(t) {
            t.connectors = [], t.packageName = t.name.split(".")[1], h[t.name] = t
        }), n.forEach(function(t) {
            t.imports.forEach(function(e) {
                var n = h[e];
                t.source || t.connectors.push(t.source = {
                    node: t,
                    degree: 0
                }), n.target || n.connectors.push(n.target = {
                    node: n,
                    degree: 0
                }), p.push({
                    source: t.source,
                    target: n.target
                })
            })
        }), n.forEach(function(t) {
            t.source && t.target ? (t.type = t.source.type = "target-source", t.target.type = "source-target") : t.source ? t.type = t.source.type = "source" : t.target ? t.type = t.target.type = "target" : (t.connectors = [{
                node: t
            }], t.type = "source")
        });
        var y = d3.select("#" + e).text(o = "Showing " + g(p.length) + " dependencies among " + g(n.length) + " classes."),
            m = d3.nest().key(function(t) {
                return t.type
            }).sortKeys(d3.ascending).entries(n);
        m.push({
            key: "source-target",
            values: m[2].values
        }), m.forEach(function(t) {
            var e = t.values[0].packageName,
                n = 0;
            t.values.forEach(function(t, r) {
                t.packageName != e && (e = t.packageName, n += 2), t.index = n++
            }), t.count = n - 1
        }), u.domain(d3.extent(n, function(t) {
            return t.index
        })), f.selectAll(".axis").data(m).enter().append("line").attr("class", "axis").attr("transform", function(t) {
            return "rotate(" + HivePlot_degrees(l(t.key)) + ")"
        }).attr("x1", u(-2)).attr("x2", function(t) {
            return u(t.count + 2)
        }), f.append("g").attr("class", "links").selectAll(".link").data(p).enter().append("path").attr("class", "link").attr("d", HivePlot_link().angle(function(t) {
            return l(t.type)
        }).radius(function(t) {
            return u(t.node.index)
        })).on("mouseover", r).on("mouseout", i), f.append("g").attr("class", "nodes").selectAll(".node").data(n).enter().append("g").attr("class", "node").style("fill", function(t) {
            return d(t.packageName)
        }).selectAll("circle").data(function(t) {
            return t.connectors
        }).enter().append("circle").attr("transform", function(t) {
            return "rotate(" + HivePlot_degrees(l(t.type)) + ")"
        }).attr("cx", function(t) {
            return u(t.node.index)
        }).attr("r", 4).on("mouseover", a).on("mouseout", i)
    },
    MatrixPlot = function(t, e, n) {
        function r(t) {
            d3.select(this).selectAll(".cell").data(t.filter(function(t) {
                return t.z
            })).enter().append("rect").attr("class", "cell").attr("x", function(t) {
                return s(t.x)
            }).attr("width", s.rangeBand()).attr("height", s.rangeBand()).style("fill-opacity", function(t) {
                return l(t.z)
            }).style("fill", function(t) {
                return h[t.x].group == h[t.y].group ? u(h[t.x].group) : null
            }).on("mouseover", a).on("mouseout", i)
        }

        function a(t) {
            d3.selectAll(".row text").classed("active", function(e, n) {
                return n == t.y
            }), d3.selectAll(".column text").classed("active", function(e, n) {
                return n == t.x
            })
        }

        function i() {
            d3.selectAll("text").classed("active", !1)
        }

        function o(t) {
            s.domain(g[t]);
            var e = d.transition().duration(2500);
            e.selectAll(".row").delay(function(t, e) {
                return 4 * s(e)
            }).attr("transform", function(t, e) {
                return "translate(0," + s(e) + ")"
            }).selectAll(".cell").delay(function(t) {
                return 4 * s(t.x)
            }).attr("x", function(t) {
                return s(t.x)
            }), e.selectAll(".column").delay(function(t, e) {
                return 4 * s(e)
            }).attr("transform", function(t, e) {
                return "translate(" + s(e) + ")rotate(-90)"
            })
        }
        var c = {
                top: 80,
                right: 0,
                bottom: 10,
                left: 80
            },
            s = d3.scale.ordinal().rangeBands([0, 720]),
            l = d3.scale.linear().domain([0, 4]).clamp(!0),
            u = d3.scale.category10().domain(d3.range(10)),
            d = d3.select("#" + t).append("svg").attr("width", 720 + c.left + c.right).attr("height", 720 + c.top + c.bottom).style("margin-left", -c.left + "px").append("g").attr("transform", "translate(" + c.left + "," + c.top + ")"),
            f = [],
            h = n.nodes,
            p = h.length;
        h.forEach(function(t, e) {
            t.index = e, t.count = 0, f[e] = d3.range(p).map(function(t) {
                return {
                    x: t,
                    y: e,
                    z: 0
                }
            })
        }), n.links.forEach(function(t) {
            f[t.source][t.target].z += t.value, f[t.target][t.source].z += t.value, f[t.source][t.source].z += t.value, f[t.target][t.target].z += t.value, h[t.source].count += t.value, h[t.target].count += t.value
        });
        var g = {
            name: d3.range(p).sort(function(t, e) {
                return d3.ascending(h[t].name, h[e].name)
            }),
            count: d3.range(p).sort(function(t, e) {
                return h[e].count - h[t].count
            }),
            group: d3.range(p).sort(function(t, e) {
                return h[e].group - h[t].group
            })
        };
        s.domain(g.name), d.append("rect").attr("class", "background").attr("width", 720).attr("height", 720), (r = d.selectAll(".row").data(f).enter().append("g").attr("class", "row").attr("transform", function(t, e) {
            return "translate(0," + s(e) + ")"
        }).each(r)).append("line").attr("x2", 720), r.append("text").attr("x", -6).attr("y", s.rangeBand() / 2).attr("dy", ".32em").attr("text-anchor", "end").text(function(t, e) {
            return h[e].name
        });
        var y = d.selectAll(".column").data(f).enter().append("g").attr("class", "column").attr("transform", function(t, e) {
            return "translate(" + s(e) + ")rotate(-90)"
        });
        y.append("line").attr("x1", -720), y.append("text").attr("x", 6).attr("y", s.rangeBand() / 2).attr("dy", ".32em").attr("text-anchor", "start").text(function(t, e) {
            return h[e].name
        }), d3.select("#order").on("change", function() {
            clearTimeout(m), o(this.value)
        });
        var m = setTimeout(function() {
            o("group"), d3.select("#" + e).property("selectedIndex", 2).node().focus()
        }, 5e3)
    };
! function() {
    packages = {
        root: function(t) {
            function e(t, r) {
                var a, i = n[t];
                return i || (i = n[t] = r || {
                    name: t,
                    children: []
                }, t.length && (i.parent = e(t.substring(0, a = t.lastIndexOf("."))), i.parent.children.push(i), i.key = t.substring(a + 1))), i
            }
            var n = {};
            return t.forEach(function(t) {
                e(t.name, t)
            }), n[""]
        },
        imports: function(t) {
            var e = {},
                n = [];
            return t.forEach(function(t) {
                e[t.name] = t
            }), t.forEach(function(t) {
                t.imports && t.imports.forEach(function(r) {
                    n.push({
                        source: e[t.name],
                        target: e[r]
                    })
                })
            }), n
        }
    }
}();
var SankeyPlot = function(t, e) {
    function n(t) {
        d3.select(this).attr("transform", "translate(" + t.x + "," + (t.y = Math.max(0, Math.min(i - t.dy, d3.event.y))) + ")"), u.relayout(), f.attr("d", d)
    }
    var r = {
            top: 1,
            right: 1,
            bottom: 6,
            left: 1
        },
        a = 960 - r.left - r.right,
        i = 500 - r.top - r.bottom,
        o = d3.format(",.0f"),
        c = function(t) {
            return o(t) + " TWh"
        },
        s = d3.scale.category20(),
        l = d3.select("#" + t).append("svg").attr("width", a + r.left + r.right).attr("height", i + r.top + r.bottom).append("g").attr("transform", "translate(" + r.left + "," + r.top + ")"),
        u = d3.sankey().nodeWidth(15).nodePadding(10).size([a, i]),
        d = u.link();
    u.nodes(e.nodes).links(e.links).layout(32);
    var f = l.append("g").selectAll(".link").data(e.links).enter().append("path").attr("class", "link").attr("d", d).style("stroke-width", function(t) {
        return Math.max(1, t.dy)
    }).sort(function(t, e) {
        return e.dy - t.dy
    });
    f.append("title").text(function(t) {
        return t.source.name + " �� " + t.target.name + "\n" + c(t.value)
    });
    var h = l.append("g").selectAll(".node").data(e.nodes).enter().append("g").attr("class", "node").attr("transform", function(t) {
        return "translate(" + t.x + "," + t.y + ")"
    }).call(d3.behavior.drag().origin(function(t) {
        return t
    }).on("dragstart", function() {
        this.parentNode.appendChild(this)
    }).on("drag", n));
    h.append("rect").attr("height", function(t) {
        return t.dy
    }).attr("width", u.nodeWidth()).style("fill", function(t) {
        return t.color = s(t.name.replace(/ .*/, ""))
    }).style("stroke", function(t) {
        return d3.rgb(t.color).darker(2)
    }).append("title").text(function(t) {
        return t.name + "\n" + c(t.value)
    }), h.append("text").attr("x", -6).attr("y", function(t) {
        return t.dy / 2
    }).attr("dy", ".35em").attr("text-anchor", "end").attr("transform", null).text(function(t) {
        return t.name
    }).filter(function(t) {
        return t.x < a / 2
    }).attr("x", 6 + u.nodeWidth()).attr("text-anchor", "start")
};
d3.sankey = function() {
    function t() {
        h.forEach(function(t) {
            t.sourceLinks = [], t.targetLinks = []
        }), p.forEach(function(t) {
            var e = t.source,
                n = t.target;
            "number" == typeof e && (e = t.source = h[t.source]), "number" == typeof n && (n = t.target = h[t.target]), e.sourceLinks.push(t), n.targetLinks.push(t)
        })
    }

    function e() {
        h.forEach(function(t) {
            t.value = Math.max(d3.sum(t.sourceLinks, s), d3.sum(t.targetLinks, s))
        })
    }

    function n() {
        for (var t, e = h, n = 0; e.length;) t = [], e.forEach(function(e) {
            e.x = n, e.dx = u, e.sourceLinks.forEach(function(e) {
                t.push(e.target)
            })
        }), e = t, ++n;
        var i = f[0];
        r(n), a((i - u) / (n - 1))
    }

    function r(t) {
        h.forEach(function(e) {
            e.sourceLinks.length || (e.x = t - 1)
        })
    }

    function a(t) {
        h.forEach(function(e) {
            e.x *= t
        })
    }

    function i(t) {
        function e() {
            r.forEach(function(t) {
                var e, r, a, i = 0,
                    o = t.length;
                for (t.sort(n), a = 0; a < o; ++a)(r = i - (e = t[a]).y) > 0 && (e.y += r), i = e.y + e.dy + d;
                if ((r = i - d - f[1]) > 0)
                    for (i = e.y -= r, a = o - 2; a >= 0; --a)(r = (e = t[a]).y + e.dy + d - i) > 0 && (e.y -= r), i = e.y
            })
        }

        function n(t, e) {
            return t.y - e.y
        }
        var r = d3.nest().key(function(t) {
            return t.x
        }).sortKeys(d3.ascending).entries(h).map(function(t) {
            return t.values
        });
        ! function() {
            var t = d3.min(r, function(t) {
                return (f[1] - (t.length - 1) * d) / d3.sum(t, s)
            });
            r.forEach(function(e) {
                e.forEach(function(e, n) {
                    e.y = n, e.dy = e.value * t
                })
            }), p.forEach(function(e) {
                e.dy = e.value * t
            })
        }(), e();
        for (var a = 1; t > 0; --t) ! function(t) {
                function e(t) {
                    return c(t.target) * t.value
                }
                r.slice().reverse().forEach(function(n) {
                    n.forEach(function(n) {
                        if (n.sourceLinks.length) {
                            var r = d3.sum(n.sourceLinks, e) / d3.sum(n.sourceLinks, s);
                            n.y += (r - c(n)) * t
                        }
                    })
                })
            }(a *= .99), e(),
            function(t) {
                function e(t) {
                    return c(t.source) * t.value
                }
                r.forEach(function(n, r) {
                    n.forEach(function(n) {
                        if (n.targetLinks.length) {
                            var r = d3.sum(n.targetLinks, e) / d3.sum(n.targetLinks, s);
                            n.y += (r - c(n)) * t
                        }
                    })
                })
            }(a), e()
    }

    function o() {
        function t(t, e) {
            return t.source.y - e.source.y
        }

        function e(t, e) {
            return t.target.y - e.target.y
        }
        h.forEach(function(n) {
            n.sourceLinks.sort(e), n.targetLinks.sort(t)
        }), h.forEach(function(t) {
            var e = 0,
                n = 0;
            t.sourceLinks.forEach(function(t) {
                t.sy = e, e += t.dy
            }), t.targetLinks.forEach(function(t) {
                t.ty = n, n += t.dy
            })
        })
    }

    function c(t) {
        return t.y + t.dy / 2
    }

    function s(t) {
        return t.value
    }
    var l = {},
        u = 24,
        d = 8,
        f = [1, 1],
        h = [],
        p = [];
    return l.nodeWidth = function(t) {
        return arguments.length ? (u = +t, l) : u
    }, l.nodePadding = function(t) {
        return arguments.length ? (d = +t, l) : d
    }, l.nodes = function(t) {
        return arguments.length ? (h = t, l) : h
    }, l.links = function(t) {
        return arguments.length ? (p = t, l) : p
    }, l.size = function(t) {
        return arguments.length ? (f = t, l) : f
    }, l.layout = function(r) {
        return t(), e(), n(), i(r), o(), l
    }, l.relayout = function() {
        return o(), l
    }, l.link = function() {
        function t(t) {
            var n = t.source.x + t.source.dx,
                r = t.target.x,
                a = d3.interpolateNumber(n, r),
                i = a(e),
                o = a(1 - e),
                c = t.source.y + t.sy + t.dy / 2,
                s = t.target.y + t.ty + t.dy / 2;
            return "M" + n + "," + c + "C" + i + "," + c + " " + o + "," + s + " " + r + "," + s
        }
        var e = .5;
        return t.curvature = function(n) {
            return arguments.length ? (e = +n, t) : e
        }, t
    }, l
};