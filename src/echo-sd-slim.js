const appRoot = `${__dirname}/..`

const _ = require('lodash')
const XRegExp = require('xregexp');
const stringWidth = require('string-width');
const yokoTate = require(`${appRoot}/data/yoko-tate`);

let cutString = (str,width) => {
  return stringWidth(str) > width ?
    cutString(str.slice(0,-1),width) : str
}

module.exports = {

  tate(text){
    let list = text.replace(/./g,s=>yokoTate[s]||s).split('\n')
    let maxWidth = _.max(list.map(s=>s.length))
    let normalizeList = list.map(s=>`${s}${'　'.repeat(maxWidth)}`.slice(0,maxWidth))

    let tateList = _.zip(...[...normalizeList]
      .reverse()
      .map(v=>v.split(''))
    )

    let result = tateList.map(s=>s.join('')).join('\n')
    return result.replace(/./g,(s)=>stringWidth(s)<=1 ? (s + ' ') : s)
  },
  print(text){
    // 2の倍数にする
    let maxWidth = (_.max(text.split('\n').map(v=>stringWidth(v))) + 1) & 0xfffffe

    let textList = text.split('\n')
      .map(v=>cutString(v + ' '.repeat(maxWidth),maxWidth))
      .map(v=>v.replace(/.*/,' $& '))

    let result =
      `＿人${'人'.repeat(maxWidth/2)}＿\n` +
      textList.map(s=>`＞${s}＜`).join('\n') + '\n' +
      `￣Y^${'Y^'.repeat(maxWidth/2)}￣\n` ;

    return result
  },
  tatePrint(text){
    return this.print(this.tate(text))
  }
}
