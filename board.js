/* Ilustración vectorial local del prototipo. */
window.BoardView = (function () {
  function render(repaired=false, disconnected=false, compact=false) {
    const alarm = !repaired && disconnected;
    const color = repaired?'#c8f396':'#c5df9d';
    return `<svg viewBox="0 0 600 425" role="img" aria-label="Placa electrónica con sensor, entrada, microcontrolador y alarma${repaired?', recuperada':''}">
    <defs><linearGradient id="board-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#315e47"/><stop offset="1" stop-color="#224b39"/></linearGradient><linearGradient id="chip-fill"><stop stop-color="#344f3c"/><stop offset="1" stop-color="#142a22"/></linearGradient><filter id="shadow" x="-30%" y="-40%" width="160%" height="190%"><feDropShadow dx="0" dy="20" stdDeviation="13" flood-color="#1c3a28" flood-opacity=".2"/></filter><pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r=".9" fill="#79a064" opacity=".25"/></pattern></defs>
    <ellipse cx="301" cy="350" rx="228" ry="39" fill="#2b4c2d" opacity=".07"/>
    <g filter="url(#shadow)"><path d="M62 142 379 64 551 193 550 278 225 360 62 233Z" fill="#18392b"/><path d="m62 142 317-78 172 129-326 83Z" fill="url(#board-fill)"/><path d="m62 142 163 134 325-83v68l-325 84L62 215Z" fill="#224b36"/><path d="m62 142 163 134v69L62 215Z" fill="#1b3d2c"/><path d="m225 276 325-83v68l-325 84Z" fill="#173d2b"/><path d="m62 142 317-78 172 129-326 83Z" fill="url(#dot-grid)"/>
    <g fill="none" stroke="#77a85b" stroke-width="2" opacity=".65"><path d="m99 149 76-18 51 38 91-22 40 31 112-28"/><path d="m113 168 64-15 52 39 83-21 40 31 135-33"/><path d="m150 204 58-15 46 34 72-18 43 30 102-25"/><path d="m197 111 30 22 63-15 54 40 120-30"/><path d="m291 90 33 24 62-15 63 49"/><path d="m257 244 62-15 38 28 147-36"/></g>
    <g fill="#c0cc8b" stroke="#233f28" stroke-width="2"><ellipse cx="88" cy="149" rx="7" ry="4"/><ellipse cx="377" cy="81" rx="7" ry="4"/><ellipse cx="520" cy="194" rx="7" ry="4"/><ellipse cx="225" cy="257" rx="7" ry="4"/></g>
    <g stroke="#9eae7b" stroke-width="4"><path d="m225 137 14 11m-2-14 14 11m-2-14 14 11m-2-14 14 11m-2-14 14 11m-2-14 14 11m11 4 13-3m-7 9 13-3m-7 9 13-3m-7 9 13-3m-7 9 13-3m-7 9 13-3m-107 9-13 3m7-9-13 3m7-9-13 3m7-9-13 3m7-9-13 3"/></g>
    <path d="m233 151 65-16 54 40-66 17-53-40v18l53 40 66-17v-18" fill="#10291e"/>
    <path d="m233 151 65-16 54 40-66 17Z" fill="url(#chip-fill)" stroke="#789265"/>
    <text x="271" y="166" fill="#d5e8bb" font-family="Consolas,monospace" font-size="15" transform="rotate(-14 271 166)">FW</text><text x="268" y="182" fill="#91a67b" font-family="Consolas,monospace" font-size="7" transform="rotate(-14 268 182)">CORE / 4.2</text>
    <g><path d="m115 135 34-8 24 18v25l-34 8-24-18Z" fill="#889a78"/><path d="m115 135 34-8 24 18-34 9Z" fill="#b9c9a1"/><path d="m123 137 23-5 17 12-24 6Z" fill="${disconnected?'#d5a671':'#2c513a'}"/><text x="115" y="195" fill="#b2c894" font-size="9" font-family="Consolas,monospace" transform="rotate(37 115 195)">SENSOR</text></g>
    <g><path d="m187 187 19-5 13 10v18l-18 5-14-10Z" fill="#142e21"/><path d="m187 187 19-5 13 10-18 5Z" fill="#a4b583"/><circle cx="203" cy="191" r="3" fill="#d8e6b6"/></g>
    <g><path d="m415 155 28-7 19 14v30l-28 7-19-14Z" fill="#233927"/><ellipse cx="438" cy="158" rx="19" ry="11" fill="${alarm?'#dc9570':color}"/><path d="M419 157v-11c0-20 36-20 36 0v11" fill="${alarm?'#e09a71':color}" opacity=".7"/><ellipse class="chip-pulse" cx="437" cy="144" rx="11" ry="7" fill="${alarm?'#ffe4c4':'#ecffc7'}"/><path d="m455 177 23-6 18 13v15l-24 6-17-13Z" fill="#162e22"/><ellipse cx="474" cy="182" rx="11" ry="6" fill="#47613d"/><ellipse cx="474" cy="181" rx="5" ry="3" fill="#183221"/></g>
    <g fill="#91b075"><path d="m312 107 18-5 13 10-19 4Z"/><path d="m351 120 18-5 13 10-19 4Z"/><path d="m359 219 18-5 13 10-19 4Z"/></g>
    <g stroke="#b6c493" stroke-width="3"><path d="m267 283 0 20m12-23v20m12-23v20m12-23v20m12-23v20m12-23v20m12-23v20m12-23v20m12-23v20m12-23v20m12-23v20"/></g><text x="349" y="249" font-size="8" font-family="Consolas,monospace" fill="#86ad72" transform="rotate(-14 349 249)">PROTOCOLO 4.2 / REV. 01</text></g>
    ${!compact?`<g font-family="Consolas,monospace" font-size="9" fill="#687e5f"><path d="m132 111-26-27H44m249 39 5-79h75m95 85 43-37h44" stroke="#9aaa8c" fill="none"/><circle cx="132" cy="111" r="3" fill="#97b276"/><circle cx="293" cy="123" r="3" fill="#97b276"/><circle cx="468" cy="129" r="3" fill="#97b276"/><text x="44" y="75">01 / SENSOR</text><text x="311" y="35">02 / FIRMWARE</text><text x="511" y="83">03 / AVISO</text></g>`:''}
    </svg>`;
  }
  return Object.freeze({render});
})();
