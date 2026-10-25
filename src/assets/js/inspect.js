// Formats values the way console.log shows them. Shared by the in-browser
// runner (copied into a Web Worker via toString) and by
// scripts/verify-examples.mjs, so it must stay one self-contained function.
(function (root) {
  function inspect(value, nested) {
    var seen = [];
    function fmt(v, depth, inner) {
      if (typeof v === 'string') return inner ? "'" + v.replace(/'/g, "\\'") + "'" : v;
      if (v === null) return 'null';
      if (v === undefined) return 'undefined';
      if (typeof v === 'number' || typeof v === 'boolean') return Object.is(v, -0) ? '-0' : String(v);
      if (typeof v === 'bigint') return v + 'n';
      if (typeof v === 'symbol') return v.toString();
      if (typeof v === 'function') return '[Function: ' + (v.name || '(anonymous)') + ']';
      if (v instanceof Error) return v.name + ': ' + v.message;
      if (seen.indexOf(v) !== -1) return '[Circular]';
      if (depth > 3) return Array.isArray(v) ? '[Array]' : '[Object]';
      seen.push(v);
      var out;
      if (Array.isArray(v)) {
        out = v.length ? '[ ' + v.map(function (x) { return fmt(x, depth + 1, true); }).join(', ') + ' ]' : '[]';
      } else if (v instanceof Map) {
        var parts = [];
        v.forEach(function (val, key) { parts.push(fmt(key, depth + 1, true) + ' => ' + fmt(val, depth + 1, true)); });
        out = 'Map(' + v.size + ') {' + (parts.length ? ' ' + parts.join(', ') + ' ' : '') + '}';
      } else if (v instanceof Set) {
        var items = [];
        v.forEach(function (val) { items.push(fmt(val, depth + 1, true)); });
        out = 'Set(' + v.size + ') {' + (items.length ? ' ' + items.join(', ') + ' ' : '') + '}';
      } else if (v instanceof Date) {
        out = v.toISOString();
      } else {
        var keys = Object.keys(v);
        var name = v.constructor && v.constructor !== Object && v.constructor.name ? v.constructor.name + ' ' : '';
        out = keys.length
          ? name + '{ ' + keys.map(function (k) {
              var key = /^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'";
              return key + ': ' + fmt(v[k], depth + 1, true);
            }).join(', ') + ' }'
          : name + '{}';
      }
      seen.pop();
      return out;
    }
    return fmt(value, 0, !!nested);
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = inspect;
  else root.CSInspect = inspect;
})(this);
