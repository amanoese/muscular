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
  getPoseNmae(){
    return _.shuffle(this.list())[0]
  },
  getAA(name){
    let key = this.poseJaNameToEn(name) || name
    return fs.readFileSync(`${appRoot}/data_aa/${this.poseHash[key]}`)
      .toString()
  }
}
