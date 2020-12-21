import CryptoJS from "crypto-js";

function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x0001 && c <= 0x007f) {
      out += str.charAt(i);
    } else if (c > 0x07ff) {
      out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
    } else {
      out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
    }
  }
  return out;
}

var base64EncodeChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xf) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3f);
  }
  return out;
}

var safe64 = function(base64) {
  base64 = base64.replace(/\+/g, "-");
  base64 = base64.replace(/\//g, "_");
  return base64;
};

var genToken = function(accessKey, secretKey, putPolicy) {
  let put_policy = JSON.stringify(putPolicy);
  var encoded = base64encode(utf16to8(put_policy));
  var hash = CryptoJS.HmacSHA1(encoded, secretKey);
  var encoded_signed = hash.toString(CryptoJS.enc.Base64);
  var upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
  return upload_token;
};

var getToken = function() {
  // AK 和 SK 仅供本项目使用，复用代码时请自行注册七牛云账号
  var AK = "slnMazKaSrCowN_nA5Y4i0QwFo62AaZKZQ8h2xOj";
  var SK = "wh8pr5uMd8_SNCxdGZvEh8-Hzy11swN6UaXwhlCF";
  // AK 和 SK 仅供本项目使用，复用代码时请自行注册七牛云账号
  let policy = {};
  policy.scope = "buaa21sehomework";
  policy.deadline = 1611072000; // 2021-01-20 00:00:00
  var token = genToken(AK, SK, policy);

  return token;
};

export { getToken };
