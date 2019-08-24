const appRoot = require('app-root-path');

const fs   = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('muscular',()=>{
  test('pose',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/index-cli.js pose -p フロントリラックス`)
    expect(stdout)
      .toBe(fs.readFileSync(`${appRoot}/__tests__/pose-result.txt`).toString())
  })
  test('shout',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/index-cli.js shout -p フロントリラックス ナイスバルク`)
    expect(stdout)
      .toBe(fs.readFileSync(`${appRoot}/__tests__/shout-result.txt`).toString())
  })
})
