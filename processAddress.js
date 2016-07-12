module.exports = function (fields) {
  return function processAddress (field) {
    var rest = field
    var alternate
    var floors
    var roomNumber
    var res

    if ((res = /（(.*)）$/ig.exec(rest))) {
      alternate = res[1].replace(/）（/g, ',')
      rest = rest.substr(0, res.index)
      if ((res = /^([０-９]+)(階|Ｆ)(～([０-９]+)(階|Ｆ))?([０-９]+)?$/ig.exec(alternate))) {
        floors = [res[1], res[4]]
        roomNumber = res[6]
        alternate = undefined
      }
    }

    if ((res = /((南|東|西|北|右|左){1,2})?([０-９]+)線((南|東|西|北|右|左){1,2})?/g.exec(rest))) {
      areaName = res[0]
      rest = rest.substr(0, res.index) + rest.substr(res.index + areaName.length)
    }

    var info
    if ((res = /([０-９]+)階([^０-９－目丁番地街区条（]+)$/.exec(rest))) {
      info = res[2]
      floors = [res[1]]
      rest = rest.substr(0, res.index)
    }
    if ((res = /([０-９]+)Ｆ＆([０-９]+)Ｆ$/.exec(rest))) {
      floors = [res[1], res[2]]
      rest = rest.substr(0, res.index)
    }
    if ((res = /(([０-９]+)・)?([０-９]+)・([０-９]+)[Ｆ階]$/ig.exec(rest))) {
      floors = [res[2], res[3], res[4]]
      rest = rest.substr(0, res.index)
    }
    if ((res = /－?(([０-９]+)、)?([０-９]+)(階|Ｆ)?～([０-９]+)(階|Ｆ)([０-９]+)?$/ig.exec(rest))) {
      if (res[2]) {
        floors = [res[2], [res[3], res[5]]]
      } else {
        floors = [[res[3], res[5]]]
      }
      roomNumber = res[7]
      rest = rest.substr(0, res.index)
    } else if ((res = /－?([０-９]+)(階|Ｆ)([０-９]+)?/ig.exec(rest))) {
      floors = [res[1]]
      roomNumber = res[3]
      rest = rest.substr(0, res.index)
    }
    if ((res = /([０-９]+)(([^０-９番地号]*[一二三四五六七八九十]+[^０-９]*)+)/.exec(rest))) {
      buildingName = res[2]
      rest = rest.substr(0, res.index + res[1].length)
    }

    var tower
    if ((res = /－?([Ａ-Ｚ])館$/ig.exec(rest))) {
      tower = res[1]
      rest = rest.substr(0, res.index)
    }
    if ((res = /－?([０-９]+)(条|号)館$/ig.exec(rest))) {
      tower = res[1]
      rest = rest.substr(0, res.index)
    }

    var buildingName
    var buildingNumber

    if ((res = /([^０-９号]+)ビル（([^）]*)）([０-９]+)$/ig.exec(rest))) {
      buildingName = res[1]
      alternate = res[2]
      buildingNumber = res[3]
      rest = rest.substr(0, res.index)
    }

    if ((res = /^([０-９]+)((丁目|の)([０-９]+))?(の([０-９]+))?$/.exec(rest))) {
      area = res[1]
      district = res[4]
      buildingNumber = res[6]
      rest = ''
    }
    if ((res = /^第([０-９]+)地割([０-９]+)$/.exec(rest))) {
      area = res[1]
      district = res[2]
      rest = ''
    }
    if ((res = /^([０-９]+)丁目([０-９]+)番([０-９]+)号(.*)$/.exec(rest))) {
      area = res[1]
      district = res[2]
      buildingNumber = res[3]
      buildingName = res[4]
      rest = ''
    }
    if ((res = /^([０-９]+)番地?([ーの]?([０-９]+)号?(.*))?$/.exec(rest))) {
      area = res[1]
      district = res[3]
      buildingName = res[4]
      rest = ''
    }
    if ((res = /^([^０-９]+)([０-９]+)番([０-９]+)－([０-９]+)$/.exec(rest))) {
      areaName = res[1]
      area = res[2]
      district = res[3]
      buildingNumber = res[4]
      rest = ''
    }
    if ((res = /^([^０-９]+)([０-９]+)街区([０-９]+)$/.exec(rest))) {
      areaName = res[1]
      area = res[2]
      district = res[3]
      rest = ''
    }
    if ((res = /^(.*)([０-９]+)街区([０-９]+)画地$/.exec(rest))) {
      areaName = res[1]
      area = res[2]
      district = res[3]
      rest = ''
    }
    if ((res = /^([０-９一二三四五六七八九十]+)丁目([０-９一二三四五六七八九十]+)番地の([０-９一二三四五六七八九十]+)$/ig.exec(rest))) {
      area = res[1]
      district = res[2]
      buildingNumber = res[3]
      rest = ''
    }
    if ((res = /([０-９]+)号$/ig.exec(rest))) {
      buildingNumber = res[1]
      rest = rest.substr(0, res.index)
    } else if ((res = /([^０-９－目丁番地街区条号の]+)([０-９]+)$/ig.exec(rest))) {
      if (res.index !== 0) {
        buildingName = res[1]
        if (/第$/.test(buildingName)) {
          buildingName += res[2]
        } else {
          buildingNumber = res[2]
        }
        rest = rest.substr(0, res.index)
      }
    } else if ((res = /([^０-９－目丁番地街区条号]+([０-９・]+(丁目)?)ビル(ディング)?)$/ig.exec(rest))) {
      buildingName = res[1]
      rest = rest.substr(0, res.index)
    } else if ((res = /(([^０-９－目丁番地街区条号]+)(([０-９一一二三四五六七八九十]+)(条|番)([^０-９－目丁番地街区条号]*)ビル(ディング)?))$/ig.exec(rest))) {
      buildingName = res[1]
      rest = rest.substr(0, res.index)
    } else if ((res = /([^０-９－目丁番地街区条号]+)(([０-９一二三四五六七八九十]+)条ビル(ディング)?)$/ig.exec(rest))) {
      buildingName = res[1]
      buildingNumber = res[2]
      rest = rest.substr(0, res.index)
    }

    if ((res = /((第[０-９]+)?([^０-９－目丁番地街区号]+)ビル(ディング)?)$/ig.exec(rest))) {
      buildingName = res[1]
      rest = rest.substr(0, res.index)
    } else if ((res = /([０-９]+)条$/ig.exec(rest))) {
      buildingNumber = res[1]
      rest = rest.substr(0, res.index)
    }

    if (((res = /第([０-９]+)$/.exec(rest)) && buildingName)) {
      buildingName = res[1] + buildingName
      rest = rest.substr(0, res.index)
    }

    if ((res = /－?([０-９]+)号([^－目丁番街区条号]+)?$/.exec(rest))) {
      buildingNumber = res[1]
      if (res[2]) {
        buildingName = res[2]
      }
      rest = rest.substr(0, res.index)
    }

    var district
    if ((res = /([０-９]+)番地?(－?([０-９]+)番?)?－?([^０-９－目丁番地街区条号]+)?$/ig.exec(rest))) {
      if (res[3]) {
        if (buildingNumber) {
          area = res[1]
          district = res[3]
        } else {
          district = res[1]
          buildingNumber = res[3]
        }
      } else {
        district = res[1]
      }
      if (res[4]) {
        buildingName = res[4]
      }
      rest = rest.substr(0, res.index)
    }

    var area
    var direction
    if ((res = /第?([０-９一二三四五六七八九十]+)((丁目?地?|地割|番地|区)([南東西北右左]{1,2})?)?([－の]?([０-９]+)([－の]([０-９]+))?([－の]([０-９]+))?)?([^０-９番街区条]+(第[０-９]+[^０-９番街区条]+)?)?$/ig.exec(rest))) {
      if (res[6]) {
        if (district) {
          console.log('WARNING: district found twice: ' + field)
        }
        district = res[6]
      }
      if (res[8]) {
        if (buildingNumber) {
          console.log('WARNING: buildingNumber found twice: ' + field)
        }
        buildingNumber = res[8]
      }
      area = res[1]
      direction = res[4]
      if (res[10]) {
        roomNumber = res[10]
      }
      if (res[11]) {
        if (buildingName) {
          buildingName = res[11] + buildingName
        } else {
          buildingName = res[11]
        }
      }
      rest = rest.substr(0, res.index)
    }

    if ((res = /([０-９]+)(－([０-９]+))?([^０-９－目丁番地街区条号]+)?$/.exec(rest))) {
      district = res[1]
      if (res[2]) {
        area = res[2]
      }
      rest = rest.substr(0, res.index)
    }

    var areaName
    if ((res = /^([^０-９]+)$/.exec(rest))) {
      areaName = res[1]
      rest = ''
    }

    if (!area && district) {
      area = district
      district = undefined 
    }

    if (!area && buildingNumber) {
      area = buildingNumber
      buildingNumber = undefined
    }

    if (!district && buildingNumber) {
      district = buildingNumber
      buildingNumber = undefined
    }

    if (rest === '') {
      return {
        _raw: field,
        line: '',
        areaName: areaName,
        area: area,
        info: info,
        alternate: alternate,
        direction: direction,
        district: district,
        buildingName: buildingName ? buildingName.trim() : undefined,
        buildingNr: buildingNumber,
        tower: tower,
        floors: floors,
        roomNumber: roomNumber
      }
    }
    /*
    if (/^[０-９]{1,2}丁目([^０-９].*)?$/.test(field)) {
      return true
    }
    //fields.total = (fields.total || 0) + 1
    if (/^([^０-９]*)([０-９一二三四五六七八九十]+丁目?)([０-９一二三四五六七八九十]+)?(－[０-９一二三四五六七八九十]+)$/.test(field)) {
      fields.simple = (fields.simple || 0) + 1
      return
    }
    if (/^([^０-９]*)[０-９一二三四五六七八九十]+(((－)|(ー)|(丁目)|(番)|(番地)|(の))([０-９]+)?(－[０-９]+)?((－|－?[^０-９]+)([０-９]+条館)?[０-９]+(Ｆ|階|号))?)?$/.test(field)) {
      fields.regular = (fields.regular || 0) + 1
      return true
    }
    if (res = /^[０-９一二三四五六七八九十]{1,2}((丁(目)?)|番)([０-９]{1,4})(号|番地|の)?(ー|の)?([０-９]?)?([^０-９].*([^０-９]{1,3}階)?)?$/.exec(field)) {
      fields.extended = (fields.extended || 0) + 1
      return true
    }
    //
    // [area] section [- section [- section]] (郵便局私)
    if (res = /^([^０-９]*)[０-９無]{1,4}(－|(番地?の?)|(字表中道)|丁目|の)?([０-９]{1,4})?(((－[０-９]{1,2}))|([^０-９]+))?(（[^０-９]+郵便局私書箱第[０-９]{1,2}号）)?（[^０-９]+郵便局私書箱第[０-９]{1,4}号）$/.exec(field)) {
      fields.post = (fields.post || 0) + 1
      return true
    }
    if (false && /([０-９一二三四五六七八九十]{1,4}(番|号)((耕?地)|町)(の?))?/.test(field)) {
      field.area = (field.area || 0) + 1
      return true
    }
    var res
    if (res = /^((([０-９]+)?字[^０-９]*)|([^０-９]+地内)?|((西|東|南)?[０-９]+線(北|西)?)|([０-９]{1,3}号字向北谷)|外平|尾坂田|本郷|南番場|甚造|上平|宮西|([^０-９]+町)|東長先|井ノ上|細出|五十間南|上郷中|中川並|東屋敷|下里|仲田|御城下|南十五夜|戌亥|土橋|高笹|長谷野|東向山|北大木|大谷|酉部|桔梗丘|北乾地|(メ)|(リ)|(ル)|窪田|工業団地|千古|は|(ヲ)|(ヌ)|(ヘ)|イ|(ホ)|い|道地|杜せきのした|(甲)|(坂)|神田|野口前|下ノ市場|西高根|宮の前|荒田|新|ハ|カ|ソ|戊部|ア部|ハ部|大開地|上丁|丑|メム|北|西|東野|ほ|ロ|字船澗|上湧別屯田市街地|下前田|南町|森山|諏訪Ｃ|関下|西町|下林|江橋|割塚|大字千音寺字|東ノ口|久保田|東久保|市野|ヒノ谷|北的場|小字西通|加賀須野|平石若松|大字十文字原)?(第?[０-９]{1,3}(地割|号|の))?([０-９一二三四五六七八九十]{1,2}(条|丁目|割|歩)上?)?([０-９一二三四五六七八九十]{1,4}(番|号)((耕?地)|町)(の?))?([０-９]{1,4}((番(－|の)?)|－|の))?([０-９]{1,4}(号|－|の|ノ|部|字|甲))?([０-９][^０-９]+キャンパス)?([０-９]{1,3}街?区)?([０-９]((番)|(組))((－)|(ー)))?([０-９]{1,3}－)?([０-９]{1,4})?(（.*）)?([^０-９]+((([０-９]・)?[０-９]階)|[０-９]号館)?)?$/.exec(field)) {
      if (true || res[24] && res[25] && res[37]) {
        var combi = ''
        for (var i = 0; i< res.length; i++) {
          if (res[i] !== undefined) {
            combi += i + ',';
            fields[i] = (fields[i] || 0) + 1
          }
        }
        //fields[combi] = (fields[combi] || 0) + 1
      }
      if (res[21] && res[23]) {
        fields['21 + 23'] = (fields['21 + 23'] || 0) + 1
        console.log(field)
        console.log(res[21], res[23])
      }
      fields.excessive = (fields.excessive || 0) + 1
      //fields[key] = (fields[key] || 0) + 1
      return true
    }
    fields._other = (fields._other || 0) + 1
    if (/^[０-９]+番地(([^第]+第)|(.*ビル)|(.*スクエア))|[０-９]{1}合同庁舎$/.test(field)) {
      fields.square = (fields.square || 0) + 1
      return true
    }
    //if (/^((字[^０-９]+)|([^０-９]+町)|白根|杭出作|レ|ア|タ|ナ－|ロ－|ル－|キ|ト|シ|ウ|ぬ|そ|ム字|舟橋|畠田|上組|富士山|大川ケ原|西宮前|流通団地|戊|江渡|中島|鷲野沢|山口|大山|上千|西出|子持松|十二社|田楽ケ窪|権現|五俵入|北出|岡ノ越|南舘|三ケ峯|清水|下色|七曲|外平|ルノ割|大山田中|佃|沼|大門東|一ノ割|三笠山|目子待井|毛賀知|長根|下藤沢|南郷辻前|見渡|舎利田|荒屋|中千田|高畑|松本道|町|天池|日影|中|跡部|八幡|下坊入|船戸|伊保原|波岩|門|兎足|本野原|辺通|八反田|東新割|京次|富士平|北方町北方|外原|東若宮|山下|釜ケ根|菖蒲ヶ池|高松|松山|引沢|割畑)?[０-９]{1,5}(－|ー)[０-９]{1,4}(－[０-９])?([^０-９].*)?$/.test(field)) {
    if (res = /^([^０-９]+)?([０-９]{1,5})(－)([０-９]{1,4})(－[０-９])?([^０-９].*)?$/.exec(field)) {
      for (var i = 0; i< res.length; i++) {
        if (res[i] !== undefined) {
          combi += i + ',';
          //fields[i] = (fields[i] || 0) + 1
        }
      }
      fields.x = (fields.x || 0) + 1
      return true
    }
    if (res = /^((七観音町)|(童侍者町)|(高辻通堀川富永町))?[０-９]{1,3}.*(ビル|センター|クエアー|タワー|庁舎|プラザ|コート)((([０-９]+・)?[０-９]+(Ｆ|階))|([０-９]+／?[０-９]+号))(（.*）[^０-９]*)?$/.exec(field)) {
      var combi = ''
      for (var i = 0; i< res.length; i++) {
        if (res[i] !== undefined) {
          combi += i + ',';
          //fields[i] = (fields[i] || 0) + 1
        }
      }
      if (res[11]) {
        //console.log(field)
      }
      //fields[combi] = (fields[combi] || 0) + 1
      fields.build = (fields.build || 0) + 1
      return true
    }
    if (/^[０-９]{1,2}丁[０-９]{1}([０-９]番地)?(－[０-９]{1,2})?([^０-９]+)?/.test(field)) {
      console.log(field)
      fields.chou = (fields.chou || 0) + 1
      return true
    }
    if (/^[０-９]+$/.test(field)) {
      fields.justNr = (fields.justNr || 0) + 1
      return true
    }
    if (/^([^０-９]+)?[０-９]+(（.*）)?$/.test(field)) {
      fields.justNrComment = (fields.justNr || 0) + 1
      return true
    }
    if (/^[^０-９]+(（.*）)?$/.test(field)) {
      console.log(field)
      fields.easyComment = (fields.easyComment || 0) + 1
      return true
    }
    if (/^([^０-９]+)?[０-９]+[^０-９]+([０-９]{1,3}階)?$/.test(field)) {
      console.log(field)
      fields.y = (fields.y || 0) + 1
      return true
    }
    if (
      '甲５３５番地の内第２（伯方郵便局私書箱第１号）' === field ||
      '９７及び９５－７' === field ||
      '桶川都市計画事業下日出谷東特定土地区画整理事業地内４２街区１画地' === field ||
      '東ノ口１６番地・１７番地' === field ||
      '地内中川運河中幹線Ａ地区第２７号地' === field ||
      '馬追台（長沼郵便局私書箱第３号）' === field ||
      '１１６番地３７カフーナ旭橋Ｃ街区オフィスコート４Ｆ（株）エプコ内' === field ||
      '七観音町６３４からすまプラザ２１' === field
    ) {
      // fields.exceptions = (fields.exception || 0) + 1
      return true
    }
    */
    return {
      _raw: field,
      rest: rest,
      area: area,
      line: '',
      areaName: areaName,
      info: info,
      alternate: alternate,
      direction: direction,
      buildingName: buildingName,
      buildingNr: buildingNumber,
      tower: tower,
      floors: floors,
      roomNumber: roomNumber
    }
  }
}
