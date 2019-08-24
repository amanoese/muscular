const appRoot = require('app-root-path');
const _       = require('lodash')
const fs      = require('fs')

const FileHound = require('filehound');
const pose      = require(`${appRoot}/data/pose.json`);

module.exports = {
  poseHash : {
    ..._.zipObject(
      pose.map(v=>v.en),
      pose.map(v=>v.file)
    )
  },
  poseJaNameToEn(ja){
    return pose
      .filter(v=>v.text === ja)
      .map(v=>v.en)[0]
  },
  list(){
    return  [ ...pose.map(v=>v.en), ...pose.map(v=>v.text) ]
  },
  getPoseName(name){
    return this.list().includes(name) ? name : 'front-relax'
  },
  randomPoseName(){
    return _.shuffle(this.list())[0]
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
    let key = this.getPoseName(this.poseJaNameToEn(name) || name)
    let aa_text = fs.readFileSync(`${appRoot}/data_aa/${this.poseHash[key]}`)
      .toString()
    return this.nomarizeAA(aa_text)
  },
  action(options){
    let { pose , list } = options
    if (list != null) {
      return this.list().join('\n')
    }
    pose = pose || this.randomPoseName()
    return this.getAA(pose)
  }
}
