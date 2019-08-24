const echoSdSlim = require('../src/echo-sd-slim.js')

console.log({echoSdSlim})
describe('echo-sd-slim',()=>{
  test('tate',async ()=>{
    expect(echoSdSlim.tate('こんにちは\n今日は晴れです。'))
      .toBe('今こ\n' +
            '日ん\n' +
            'はに\n' +
            '晴ち\n' +
            'れは\n' +
            'で　\n' +
            'す　\n' +
            '。　')
  })
  test('tate 半角文字入り',async ()=>{
    expect(echoSdSlim.tate('echo\nｳﾝｺです。'))
      .toBe('ｳ e \n' +
            'ﾝ c \n' +
            'ｺ h \n' +
            'でo \n' +
            'す　\n' +
            '。　')
  })
  test.only('echo-sd',async ()=>{
    expect(echoSdSlim.print('うんこ'))
    .toBe('＿人人人＿\n' +
          '＞うんこ＜\n' +
          '￣Y^Y^Y^￣\n')
  })
  test.only('echo-sd 半角',async ()=>{
    expect(echoSdSlim.print('💩@'))
    .toBe('＿人人＿\n' +
          '＞💩@ ＜\n' +
          '￣Y^Y^￣\n')
  })
})
