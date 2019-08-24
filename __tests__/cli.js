const appRoot = require('app-root-path');

const util  = require('util');
const exec  = util.promisify(require('child_process').exec);

describe('muscular',()=>{
  test('pose',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/index-cli.js pose -p フロントリラックス`)
    expect(stdout.replace('　',' ')).toBe(
`        .-~-.         
        /   \\         
        |   /         
     ,_-/ ,.*\`--.,    
   .r ;       \`\`  \\   
  .\`,\`   ,:  ,.\`A\`,\\  
 /,\`/\\\`''  ''  ? \\\` \\ 
/  /  \\ ; , ; /   )  }
| /    \\:':': |   | 7 
| |    ) ':'  |  ,\` / 
( \\    \`-,_,-~}  | l  
 \`~   / \`,  /' \\ '"'  
     ,7   \\/   |.     
     {  ; |, ,  )     
     |,\`: |\`,\`: |     
     \\\` , /\\\`.; /     
      |\`;/  \\ , |     
      \\\`\`\\   |\` (     
      \\ . )  {  /     
       \\ \`/  (  }     
        \\ |  | /      
        ) \\  | |      
     c~^_~d  V _\`,    
                      
`)
  })
  test('shout',async ()=>{
    let { stdout } =await exec(`${appRoot}/src/index-cli.js shout -p フロントリラックス ナイスバルク`)
    expect(stdout.replace('　',' ')).toBe(
`        .-~-.          
        /   \\          
        |   /          
     ,_-/ ,.*\`--.,     
   .r ;       \`\`  \\    
  .\`,\`   ,:  ,.\`A\`,\\   
 /,\`/\\\`''  ''  ? \\\` \\  
/  /  \\ ; , ; /   )  } ＿人人＿
| /    \\:':': |   | 7  ＞ ナ ＜
| |    ) ':'  |  ,\` /  ＞ イ ＜
( \\    \`-,_,-~}  | l   ＞ ス ＜
 \`~   / \`,  /' \\ '"'   ＞ バ ＜
     ,7   \\/   |.      ＞ ル ＜
     {  ; |, ,  )      ＞ ク ＜
     |,\`: |\`,\`: |      ￣Y^Y^￣
     \\\` , /\\\`.; /      
      |\`;/  \\ , |      
      \\\`\`\\   |\` (      
      \\ . )  {  /      
       \\ \`/  (  }      
        \\ |  | /       
        ) \\  | |       
     c~^_~d  V _\`,     
                       
`)
  })
})
