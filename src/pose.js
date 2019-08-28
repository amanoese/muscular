const appRoot = `${__dirname}/..`
const _       = require('lodash')
const fs      = require('fs')

const FileHound = require('filehound');
const pose      = require(`${appRoot}/data/pose.json`);
const poseExt   = require(`${appRoot}/data/pose-ext.json`);

module.exports = {
  poseHash : {
    ..._.zipObject(pose.map(v=>v.en),  pose.map(v=>v.file)),
    ..._.zipObject(pose.map(v=>v.text),pose.map(v=>v.file))
  },
  poseExtHash : {
    ..._.zipObject(poseExt.map(v=>v.en),  poseExt.map(v=>v.file)),
    ..._.zipObject(poseExt.map(v=>v.text),poseExt.map(v=>v.file))
  },
  allPoses() {
    return [ ...[...pose,...poseExt].map(v=>v.en), ...[...pose,...poseExt].map(v=>v.text) ]
  },
  getPoseName(name){
    return this.allPoses().includes(name) ? name : 'front-relax'
  },
  randomPoseName(){
    return _.shuffle(this.allPoses())[0]
  },
  nomarizeAA( aa_text ){
    let aa_text_list = aa_text.split('\n')
    let height = aa_text_list.length
    let width  = _.max(aa_text_list.map(s=>s.length))

    let aa_list = aa_text_list
      .map(s=>`${s}${' '.repeat(width)}`.slice(0,width))

    return aa_list.join('\n')
  },
  getAA(name){
    let key = this.getPoseName(name)
    let aa_text = fs.readFileSync(`${appRoot}/data_aa/${this.poseHash[key] || this.poseExtHash[key]}`)
      .toString()
    return this.nomarizeAA(aa_text)
  },
  action(options){
    let { pose , list } = options
    // poseの一覧表示
    if (list != null) {
      return this.allPoses().join('\n')
    }

    // poseの表示
    pose = pose || this.randomPoseName()
    return this.getAA(pose)
  }
}
