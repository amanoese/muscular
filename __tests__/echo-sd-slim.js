const echoSdSlim = require('../src/echo-sd-slim.js')

describe('echo-sd-slim',()=>{
  test('tate 単行',async ()=>{
    expect(echoSdSlim.tate('こんにちは'))
      .toBe('こ\n' +
            'ん\n' +
            'に\n' +
            'ち\n' +
            'は')
  })
  test('tate 複数行',async ()=>{
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
    expect(echoSdSlim.tate('unko\nｳﾝｺです。'))
      .toBe('ｳ u \n' +
            'ﾝ n \n' +
            'ｺ k \n' +
            'でo \n' +
            'す　\n' +
            '。　')
  })
  test('echo-sd',async ()=>{
    expect(echoSdSlim.print('うんこ'))
    .toBe('＿人人人人＿\n' +
          '＞ うんこ ＜\n' +
          '￣Y^Y^Y^Y^￣\n')
  })
  test('echo-sd 半角',async ()=>{
    expect(echoSdSlim.print('💩@'))
    .toBe('＿人人人＿\n' +
          '＞ 💩@  ＜\n' +
          '￣Y^Y^Y^￣\n')
  })
  test('echo-sd tate',async ()=>{
    expect(echoSdSlim.tatePrint('うんこ！'))
    .toBe('＿人人＿\n' +
          '＞ う ＜\n' +
          '＞ ん ＜\n' +
          '＞ こ ＜\n' +
          '＞ ！ ＜\n' +
          '￣Y^Y^￣\n')
  })
})
