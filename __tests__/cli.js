const appRoot = `${__dirname}/..`

const fs   = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('muscular',()=>{
  test('pose',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/muscular.js pose -p フロントリラックス`)
    expect(stdout)
      .toBe(fs.readFileSync(`${appRoot}/__tests__/pose-result.txt`).toString())
  })
  test('shout',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/muscular.js shout -p フロントリラックス ナイスバルク`)
    expect(stdout.replace(/　/g,' '))
      .toBe(fs.readFileSync(`${appRoot}/__tests__/shout-result.txt`).toString())
  })
})
describe('muscular データの確認',()=>{
  test('pose すべてのポーズが表示できるかの確認',async ()=>{
    await expect(exec(`muscular pose -l | xargs -L1 muscular pose -p`)).resolves.toBeTruthy()
  })
  test('shout すべてのポーズが表示できるかの確認',async ()=>{
    await expect(exec(`muscular shout --pose-list | xargs -L1 muscular shout -p`)).resolves.toBeTruthy()
  })
})
describe('muscular helpコマンドの確認',()=>{

  test('help pose',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/muscular.js help pose`)
    expect(stdout).toMatch(/^Usage: muscular pose/)
  })

  test('help shout',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/muscular.js help shout`)
    expect(stdout).toMatch(/^Usage: muscular shout \[text\]/)
  })

})
