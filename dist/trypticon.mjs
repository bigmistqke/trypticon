function y(t, e, ...r) {
  const n = [];
  for (const o of r) {
    if (typeof o == "number") {
      n.push(o);
      continue;
    }
    if (o.length < e) {
      if (t.strict)
        throw {
          values: r,
          message: `could not find index ${e} in array`
        };
      continue;
    }
    n.push(o[e]);
  }
  return n;
}
const d = (t, e, ...r) => {
  const n = r.find((o) => typeof o == "object");
  if (!n)
    throw { values: r, message: "could not find objay" };
  return Object.fromEntries(
    Object.keys(n).map((o) => [
      o,
      s(
        t,
        e,
        ...y(t, o, ...r)
      )
    ])
  );
}, p = (t, e, ...r) => {
  const n = r.find((o) => Array.isArray(o));
  if (!n)
    throw { values: r, message: "could not find array" };
  return n.map(
    (o, i) => s(
      t,
      e,
      ...y(t, i, ...r)
    )
  );
}, f = (t, e, ...r) => {
  let n = r.shift();
  if (!n)
    throw { values: r, message: "result[0] is undefined" };
  let o = 0;
  for (const i of r)
    n = e(n, i, o, t), o++;
  return n;
}, a = (...t) => {
  const e = t.find((r) => typeof r !== void 0);
  return Array.isArray(e) ? "array" : typeof e;
}, s = (t, e, ...r) => {
  switch (a(...r)) {
    case void 0:
      throw "Values are not valid";
    case "object":
      return d(
        t,
        e,
        ...r
      );
    case "array":
      return p(
        t,
        e,
        ...r
      );
    case "number":
      return f(t, e, ...r);
    case "string":
      return f(t, e, ...r);
    default:
      return r[0];
  }
}, b = ["strict", "string"], h = (t) => {
  if (typeof t != "object")
    return !1;
  for (const e in t)
    if (!b.includes(e))
      return !1;
  return t;
}, g = {
  strict: !0,
  string: !1
}, c = (t, e, r, n) => typeof t == "string" || typeof t == "number" && typeof e == "number" ? t + e : t;
function O(t, ...e) {
  try {
    if (e.length === 0) {
      const r = h(t);
      return r ? (n, o, ...i) => s(r, c, n, o, ...i) : void 0;
    } else
      return s(g, c, t, ...e);
  } catch (r) {
    return console.error(r), !1;
  }
}
const l = {
  strict: !0
}, m = (t) => {
  if (typeof t != "object")
    return !1;
  const e = ["strict"];
  let r;
  for (r in t)
    if (!e.includes(r))
      return !1;
  return t;
}, u = (t, e, r, n) => typeof t == "number" && typeof e == "number" ? t * e : t;
function j(t, ...e) {
  try {
    if (e.length === 0) {
      const r = m(t);
      return r ? (n, o, ...i) => s(r, u, n, o, ...i) : void 0;
    } else
      return s(l, u, t, ...e);
  } catch (r) {
    return console.error(r), !1;
  }
}
export {
  j as multiply,
  O as sum
};
