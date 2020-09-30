var http = require('http');
var fs = require('fs');
var path = require('path')

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.setHead( 'Access-Control-Allow-Origin', '*');
    response.end('Hello World\n');
}).listen(8888);

// const basePath = '/Users/ranwenqi/Documents/tencent/xmail/src/style/scss/admin/component/base/test'
const basePath = '/Users/ranwenqi/Documents/tencent/xmail/src'
function mapDir(dir, callback, finish) {
  fs.readdir(dir, function(err, files) {
    if (err) {
      console.error(err)
      return
    }
    files.forEach((filename, index) => {
      if (filename == '3rd') {
        return
      }
      let pathname = path.join(dir, filename)
      fs.stat(pathname, (err, stats) => { // 读取文件信息
        if (err) {
          console.log('获取文件stats失败')
          return
        }
        if (stats.isDirectory()) {
          mapDir(pathname, callback, finish)
        } else if (stats.isFile()) {
          if (['.json', '.less'].includes(path.extname(pathname))) {  // 排除 目录下的 json less 文件
            return
          }
          fs.readFile(pathname, (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            callback && callback(pathname, data)
          })
        }
      })
      if (index === files.length - 1) {
        finish && finish()
      }
    })
  })
}

// mapDir(
//   basePath,
//   function(pathname, file) {
//     // 读取文件后的处理
//     let content = file.toString()
//     let rightColorsArr = `45BD5E,328FFA,4A90E2,6E67D1,4A90E2,1A9649,,EDF0F2,EDF0F2,E8EAEC,,,F2C314,2E3033,271F99,1145AD,,271F99,1A9649,,1A9649,,328FFA,45BD5E,,1A9649,1A9096,1A9096,1A9649,328FFA,1145AD,328FFA,1145AD,328FFA,2E3033,1145AD,1145AD,1145AD,2865C7,2E3033,2E3033,2E3033,1145AD,328FFA,328FFA,328FFA,2E3033,1145AD,2E3033,328FFA,2E3033,2E3033,2E3033,2E3033,2E3033,271F99,328FFA,4A90E2,4A90E2,4A90E2,328FFA,45BD5E,,2E3033,4A90E2,4A90E2,,2E3033,2E3033,2E3033,328FFA,4C43DC,328FFA,45BD5E,45BD5E,2E3033,2E3033,2E3033,2E3033,328FFA,328FFA,4A90E2,2E3033,,2E3033,328FFA,45BD5E,328FFA,2E3033,328FFA,45BD5E,4A90E2,4A90E2,328FFA,,5C6166,,,5C6166,45BD5E,328FFA,328FFA,4A90E2,328FFA,328FFA,5C6166,5C6166,5C6166,328FFA,4C43DC,5C6166,328FFA,5C6166,5C6166,5C6166,,959DA6,4A90E2,,5C6166,5C6166,5C6166,,,,,5C6166,,,997800,959DA6,4A90E2,959DA6,959DA6,959DA6,959DA6,959DA6,997800,959DA6,959DA6,,6E67D1,959DA6,959DA6,D85959,,959DA6,959DA6,959DA6,,,,,,959DA6,959DA6,959DA6,959DA6,959DA6,959DA6,,D85959,,,,C8CACC,C8CACC,EDF0F2,E6E8EB,,F29D13,F5F6F7,F29D13,EDF0F2,F5F6F7,F5F6F7,D85959,,F5F6F7,F5F6F7,F5F6F7,,F2C314,,,,,,,F2C314,F2C314,,F2C314,,,959DA6,959DA6,,,C8CACC,959DA6,C8CACC,,C8CACC,C8CACC,959DA6,959DA6,CAC8CC,,,CAC8CC,CAC8CC,CAC8CC,CAC8CC,,,,F29D13,,F29D13,F29D13,F29D13,F29D13,,D89595,F29D13,F29D13,F29D13,D4D7D9,,,D85959,E6E8EB,,,E6E8EB,,E6E8EB,F29D13,E8EAEC,,E6E8EB,E6E8EB,,E6E8EB,E6E8EB,E6E8EB,E6E8EB,E6E8EB,EDF0F2,EDF0F2,EDF0F2,EDF0F2,,D85959,E6E8EB,E6E8EB,F5F6F7,F5F6F7,F5F6F7,F5F6F7,F5F6F7,F5F6F7,F5F6F7,F5F6F7,F5F6F7,,F5F6F7,,,,,,,,,,F29D13,,,,,,`.split(',')
//     let preColorsArr = test()
//     preColorsArr.forEach((item, key) => {
//       if (content.indexOf(item)!=-1&&rightColorsArr[key]) {
//         content = content.replace(item, `#${rightColorsArr[key]}`)
//         setfile(pathname, content)
//       }
//     })
//   },
//   function() {
//     // console.log('xxx文件目录遍历完了')
//   }
// )

function test () {
  let preColorsArr = `#e6e6e6,#e9e9ec,#c3c3c3,#f2f5f7,#a0a0a0,#eee,#dd4b39,#a1aab3,#f3f4f5,#8A9199,#AFB1B3,#969799,#459AFA,#60ABFC,#2C84E8,#4D9FF7,#197BEA,#2E89EC,
    #7FB9F8,#9EC9F8,#FF3B30,#337ACC,#cee1ff,#48360b,#fce4af,#737980,#ff4949,#F0F2F5,#69affc,#4a4a4a,#5DAAFB,#87C4FC,#FBD15E,#FFD500,#3d994c,#fffae2,#E1DBC3,#EBEBEB,#000000,
    #E1E5E8,#2C4A77,#275fab,#333333,#518bcb,#467ec3,#313131,#696969,#749dd5,#C0E0FF,#e7f1fb,#404040,#91B3D0,#24619e,#e1ecfe,#cfdef1,#efefef,#266298,#8a9199,#fadc80,#743e04,
    #E6E6E6,#50BB64,#D7D9DB,#EAA000,#E9E9EC,#CCE0FF,#F9E6E6,#F5D5D5,#F7F9FA,#33312e,#f0f0f0,#e69a17,#2c83e5,#E69A17,#B3B3B3,#888,#292C33,#2B2F33,#393B3F,#42454A,#4AB336,
    #24ABF7,#3385FF,#3D55CC,#F25B3D,#CC3C29,#6935BC,#0BB5B5,#FFBB00,#9E36BC,#3674B3,#529FFF,#f5f5f5,#656566,#aaa,#f7f9fa,#fff4dc,#f6ead1,#4a9ce9,#292c33,#979797,#b0b2b4,#DCE0E1,#F5F5F5,#F0F0F0,
    #E1E3E6,#fff9e1,#2e3032,#337acc,#f2f3f4,#e9eaeb,#459afa,#393939,#7b7c7c,#bababa,#808080,#666,#494949,#f2f2f2,#d6d6d6,#d8d8d8,#eaeaea,#ababab,#6d6d6d,#444,#d1d1d1,#c2c2c2,#acc74f,#cddf67,
    #91b33a,#7fa117,#ececec,#575757,#528BCB,#6a6a6a,#bbb,#555,#ABABAB,#e7e7e7,#44454a,#393c41,#333,#353535,#303030,#8D8D8D,#357ca8,#1e3848,#e5e5e5,#8d8d8d,#474747,#A0A0A0,#1E5494,#beb49c,#fefbe4,
    #1caf4c,#7b7b7b,#8c8c8c,#adadad,#d4d4d4,#66afe9,#999,#337ab7,#23527c,#777,#00a53c,#fafafa,#dddddd,#5a82be,#d9d9d9,#f1f1f1,#cccccc,#ebebeb,#999999,#1a8be8,#e9e9e9,#39f,#60abfc,#e7e8eb,#308dfa,
    #cfe2fe,#2f5785,#b9c0c7,#bdd2ea,#8e8e93,#f4f6f7,#edf3ff,#dadde0,#e1e5e8,#eaebed,#e6f0ff,#59a7fc,#666564,#f1f3f4,#aab2b8,#3a93fa,#c7c7cc,#edeeef,
    #ffd500,#3b9342,#D8D8D8,#747c83,#A2A2A7,#8E8E93,#edf1f5,#d1d3d4,#177EE6,#F8F8F8,#fe2b23,#ff9900,#ffd900,#0d8024,#37d9f0,#aa17d0,#fcdbd6,
    #fde9d0,#fff0cf,#d4e9d6,#def3f3,#cee0ef,#dfdbec,#d0d0d0,#ee837d,#f8c387,#ffda5c,#9abd9d,#83ccd2,#89b0ce,#9389b1,#999896,#d51228,#cf770b,#8d634a,#557b5c,#01a3b0,
    #3776a6,#765c83,#a91913,#884702,#563725,#00552e,#00767a,#194e77,#530e6f,#993300,#333300,#003300,#003366,#000080,#333399,#800000,#FF6600,#808000,#008000,#008080,#0000FF,
    #666699,#FF0000,#FF9900,#99CC00,#339966,#33CCCC,#3366FF,#800080,#FF00FF,#FFCC00,#FFFF00,#00FF00,#00FFFF,#00CCFF,#993366,#C0C0C0,#FF99CC,#FFCC99,#FFFF99,#CCFFCC,#CCFFFF,#99CCFF,
    #CC99FF,#feb9b0,#daf0b2,#dbe7fa,#E0E0E0,#59B368,#498FE2`.split(',').sort()
    preColorsArr.map((item, key) => {
      if (item.indexOf('\n') !== -1) {
        preColorsArr[key] = item.replace(/[\n\s]/g, '')
      } 
      if (item.length !== 7) {
        console.log('item', item)
        if (item === '#39f') {
          
        } else {
          preColorsArr[key] = preColorsArr[key] + preColorsArr[key].substring(1, 4)
        }
      }
    })
    return preColorsArr
}
test()
// test().map(i => {
//   if (i.length === 3) {
//     console.log(i)
//   }
// })

function setfile(path, content) {
  fs.writeFileSync(path, content, function(err){
    if(err) console.log('err')
    else console.log('写文件操作成功')
})
}

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/')
