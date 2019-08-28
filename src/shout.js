const _ = require('lodash')

const posejs     = require('./pose');
const echoSdSlim = require('./echo-sd-slim');

module.exports = {
  action: (inputText,options) => {
    let aa_text = posejs.action(options)
    let aa_list = aa_text.split('\n')
    let aa_height  = aa_list.length

    let textCut = inputText.replace(new RegExp(`.{${(aa_height -1 ) - 2}}`,'g'),'$&\n')
    let echo_sd_text = echoSdSlim.tatePrint(textCut)

    //console.log({inputText,textCut,echo_sd_text})
    let echo_sd_list = echo_sd_text.split('\n')

    let echo_sd_list_centering = [
      ..._.range(_.floor((aa_height - echo_sd_list.length) /2)).map(_=>''),
      ...echo_sd_list
    ]

    let output = aa_list
      .map((v,i)=>v + ' ' + (echo_sd_list_centering[i]||''))
      .join('\n')

    return output
  }
}
