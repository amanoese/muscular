const appRoot = `./..`

const _ = require('lodash')
const stringWidth = require('string-width');
const yokoTate = require(`../data/yoko-tate`);

const split = require('graphemesplit')

let cutString = (str,width) => {
  return stringWidth(str) > width ?
    cutString(str.slice(0,-1),width) : str
}

module.exports = {

  tate(text){

    let list = split(text).map(s=>yokoTate[s]||s).join('').split('\n')

    let maxWidth = _.max(list.map(s=>s.length))
    let normalizeList = list.map(s=>`${s}${'　'.repeat(maxWidth)}`.slice(0,maxWidth))

    let tateList = _.zip(...[...normalizeList]
      .reverse()
      .map(v=>split(v))
    )
    //console.log({list,normalizeList,tateList})
    let result = tateList.map(s=>s.join('')).join('\n')
    return split(result).map(s=>stringWidth(s) <=1 && s != '\n' ? (s + ' ') : s).join('')
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
