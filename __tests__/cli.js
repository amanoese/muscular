const appRoot = `${__dirname}/..`
const muscular_cmd = `${appRoot}/src/muscular.js`

const fs   = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

jest.setTimeout(10000);

describe('muscular',()=>{
  test('pose',async ()=>{
    let { stdout } =await exec(`${muscular_cmd} pose -p フロントリラックス`)
    expect(stdout)
      .toBe(fs.readFileSync(`${appRoot}/__tests__/pose-result.txt`).toString())
  })
  test('shout',async ()=>{
    let { stdout } =await exec(`${muscular_cmd} shout -p フロントリラックス ナイスバルク`)
    expect(stdout.replace(/　/g,' '))
      .toBe(fs.readFileSync(`${appRoot}/__tests__/shout-result.txt`).toString())
  })
})
describe('muscular データの確認',()=>{
  test('pose すべてのポーズが表示できるかの確認',async ()=>{
    await expect(exec(`${muscular_cmd} pose -l | xargs -L1 -P4 ${muscular_cmd} pose -p`)).resolves.toBeTruthy()
  })
  test('shout すべてのポーズが表示できるかの確認',async ()=>{
    await expect(exec(`${muscular_cmd} shout --pose-list | xargs -L1 -P4 ${muscular_cmd} shout -p`)).resolves.toBeTruthy()
  })
})
describe('muscular helpコマンドの確認',()=>{

  test('help pose',async ()=>{
    let { stdout } =await exec(`${muscular_cmd} help pose`)
    expect(stdout).toMatch(/^Usage: muscular pose/)
  })

  test('help shout',async ()=>{
    let { stdout } =await exec(`${muscular_cmd} help shout`)
    expect(stdout).toMatch(/^Usage: muscular shout \[text\]/)
  })

})
