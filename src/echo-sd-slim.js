const _ = require('lodash')
const XRegExp = require('xregexp');
const stringWidth = require('string-width');

let cutString = (str,width) => {
  return stringWidth(str) > width ?
    cutString(str.slice(0,-1),width) : str
}

module.exports = {

  tate(text){
    let list = text.split('\n')
    let maxWidth = _.max(list.map(s=>s.length))
    let normalizeList = list.map(s=>`${s}${'　'.repeat(maxWidth)}`.slice(0,maxWidth))

    let tateList = _.zip(...[...normalizeList]
      .reverse()
      .map(v=>v.split(''))
    )

    let regexp = XRegExp('[ -~\\p{InHalfwidth_And_Fullwidth_Forms}]','g');
    let result = tateList.map(s=>s.join('')).join('\n')
    return result.replace(regexp,'$& ')
  },
  print(text){
    // 2の倍数にする
    let maxWidth = (_.max(text.split('\n').map(stringWidth)) + 1) & 0xfffffe

    let textList = text.split('\n')
      .map(v=>cutString(v + ' '.repeat(maxWidth),maxWidth))

    let result =
      `＿${'人'.repeat(maxWidth/2)}＿\n` +
      textList.map(s=>`＞${s}＜\n`)      +
      `￣${'Y^'.repeat(maxWidth/2)}￣\n` ;

    return result
  }
}
