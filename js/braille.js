/*
 	https://evoluteur.github.io/
 	(c) 2024 Olivier Giulieri
 */

const e = (id) => document.getElementById(id);

const braille = (message) => {
  var h = "";
  var myChar, prevCharNum, inQuote;
  const BrChar = (bPix, bAlt) =>
    `<div class="br br-${bPix}"><span>${bAlt}</span></div>`;

  for (var i = 0; i < message.length; i++) {
    myChar = message.charAt(i);
    if (myChar >= "a" && myChar <= "z") {
      // a to z
      h += BrChar(myChar, myChar);
      prevCharNum = false;
    } else if (myChar >= "A" && myChar <= "Z") {
      // A to Z
      h += BrChar("cap", "Caps") + BrChar(myChar.toLowerCase(), myChar); // Caps
      prevCharNum = false;
    } else if (myChar > "0" && myChar <= "9") {
      if (!prevCharNum) {
        h += BrChar("num", "Number");
      }
      h += BrChar(String.fromCharCode(myChar.charCodeAt(0) + 48), myChar);
      prevCharNum = true;
    } else {
      switch (myChar) {
        case " ":
          h += BrChar("sp", ""); //Space
          prevCharNum = false;
          break;
        case "0":
          if (!prevCharNum) {
            h += BrChar("num", "Number");
          }
          h += BrChar("j", "0");
          prevCharNum = true;
          break;
        case "\n":
          h += "<br><br>";
          nbCharsInLine = -1;
          prevCharNum = false;
          break;
        case ".":
          if (prevCharNum) {
            h += BrChar("dec", ".");
          } else {
            h += BrChar("period", ".");
          }
          break;
        case "$":
          h += BrChar("period", "$");
          prevCharNum = false;
          break;
        case "%":
          h += BrChar("col", "%") + BrChar("p", "");
          prevCharNum = false;
          break;
        case "'":
          h += BrChar("qs", "'");
          prevCharNum = false;
          break;
        case ",":
          h += BrChar("comma", ",");
          prevCharNum = false;
          break;
        case "?":
          h += BrChar("qu", "?");
          prevCharNum = false;
          break;
        case "(":
        case ")":
          h += BrChar("par", "parenthesis");
          prevCharNum = false;
          break;
        case "*":
          h += BrChar("ast", "*") + BrChar("ast", "*");
          prevCharNum = false;
          break;
        case "//":
          h += BrChar("sla", "//");
          prevCharNum = false;
          break;
        case "!":
          h += BrChar("ex", "!");
          prevCharNum = false;
          break;
        case "'":
          if (inQuote) h += BrChar("qc", "Close Quote");
          else h += BrChar("qo", "Open Quote");
          inQuote = !inQuote;
          prevCharNum = false;
          break;
        case ":":
          h += BrChar("col", ":");
          prevCharNum = false;
          break;
        case ";":
          h += BrChar("sc", ";");
          prevCharNum = false;
          break;
        case "[":
          h += BrChar("cap", "[") + BrChar("par", "");
          break;
        case "]":
          h += BrChar("par", "]") + BrChar("qs", "");
          break;
      }
    }
  }
  return h;
};
