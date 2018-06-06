export default class Data {
  ROOMs = ['A101', 'A102', 'A201', 'A303', 'A504', 'A609']
  ROOM_INFO: any = {
    A101: {
      floor: 1,
      price: 5,
      direction: 'Đông',
      img: 'https://drive.google.com/uc?id=1LBIb8wdsQF-Ojx3VrIBHCqJ_NhUejHKV'
    },
    A102: {
      floor: 1,
      price: 6,
      direction: 'Đông',
      img: 'https://drive.google.com/uc?id=15Gt_QZFVfVyaGgr6izuRw9o9zcX-jfJ4'
    },
    A201: {
      floor: 2,
      price: 3,
      direction: 'Tây',
      img: 'https://drive.google.com/uc?id=1kV8mRXpMkzhpVHaKEm_jS35CVtrU0xTg'
    },
    A303: {
      floor: 3,
      price: 4,
      direction: 'Nam',
      img: 'https://drive.google.com/uc?id=1ERRll2P38UYxQUwpsPypsT40u1pT1Fn_'
    },
    A504: {
      floor: 5,
      price: 9,
      direction: 'Đông',
      img: 'https://drive.google.com/uc?id=1hfU-mVvau2pbjhZnPXH6pZhgcRVFZufX'
    },
    A609: {
      floor: 6,
      price: 7,
      direction: 'Tây',
      img: 'https://drive.google.com/uc?id=1xMY_MLx9ioL9VB_iviymgU4Qt4Cqa-tv'
    }
  }

  PRICE_RANGE = [
    {
      text: '3tr-5tr',
      from: 3,
      to: 5
    },
    {
      text: '5tr-7tr',
      from: 5,
      to: 7
    },
    {
      text: 'trên 7tr',
      from: 7,
      to: 1000
    }
  ]
  getRoomInfo(roomId: string) {
    return this.ROOM_INFO.hasOwnProperty(roomId)
      ? {
          ...this.ROOM_INFO[roomId],
          id: roomId
        }
      : null
  }
  getPriceIndex(text: string) {
    for (var i in this.PRICE_RANGE) {
      if (this.PRICE_RANGE[i].text == text) {
        return i
      }
    }
    return -1
  }
  checkFilterAndGetResult(filterInfo: any, response: any, emptyBefore: boolean = false) {
    let listTemp = this.getResult(filterInfo)
    let card = this.getRandomNext(filterInfo)
    if (card == null || listTemp.length == 1) {
      let list = this.getResult(filterInfo)
      if (list.length == 0) {
        let suggestCard = this.getRandomNext(filterInfo, true)
        response.json({
          fulfillmentMessages: [
            {
              text: {
                text: [
                  'Iris rất tiếc là không có căn hộ nào phù hợp với nhu cầu bạn đưa ra ạ. :(',
                  'Bạn có thể thay đổi thông tin tí xíu để có nhiều thông tin hơn.'
                ]
              }
            },
            {
              card: suggestCard
            }
          ]
        })
      } else {
        let card: any = {
          title: 'Iris tìm được những căn này phù hợp nè. :)',
          buttons: []
        }
        for (var l of list) {
          card.buttons.push({
            text: 'Căn ' + l,
            postback: ''
          })
        }
        card.buttons.push({
          text: 'Chọn lại'
        })

        response.json({
          fulfillmentMessages: [
            {
              card
            }
          ]
        })
      }
    } else {
      let fulfillmentMessages = []
      if (emptyBefore) {
        fulfillmentMessages.push({
          text: {
            text: ['Iris không tìm thấy căn bạn đưa ra ạ. Bạn chọn lại nhé.']
          }
        })
      }
      fulfillmentMessages.push({
        card: card
      })

      response.json({ fulfillmentMessages })
    }
  }

  getUniqueList(list: any) {
    let seen: any = {}
    return list.filter(function(item: any, pos: any) {
      return seen.hasOwnProperty(item.text) ? false : (seen[item.text] = true)
    })
  }

  getResult(filterInfo: any) {
    return this.ROOMs.filter(room => {
      if (
        filterInfo.hasOwnProperty('floor') &&
        filterInfo.floor != -1 &&
        filterInfo.floor != this.ROOM_INFO[room].floor
      )
        return false
      if (
        filterInfo.hasOwnProperty('price') &&
        filterInfo.price != -1 &&
        (this.ROOM_INFO[room].price < this.PRICE_RANGE[filterInfo.price].from ||
          this.ROOM_INFO[room].price >= this.PRICE_RANGE[filterInfo.price].to)
      )
        return false
      if (
        filterInfo.hasOwnProperty('direction') &&
        filterInfo.direction != null &&
        filterInfo.direction != this.ROOM_INFO[room].direction
      )
        return false
      return true
    })
  }

  getRandomNext(currentFilterInfo: any, force: boolean = false) {
    if (currentFilterInfo == -1) currentFilterInfo = {}
    let decision = [
      {
        id: 0,
        text: 'Bạn chọn gói tài chính để mình tư vấn dễ hơn ạ.'
      },
      {
        id: 1,
        text: 'Hiện bên Iris còn những căn hướng này nè.'
      },
      {
        id: 2,
        text: 'Bạn thích tầng nào ạ?'
      }
    ]
    /**
     filterInfo = {
       floor, price, direction
     }
     */
    if (!force) {
      if (currentFilterInfo.price > -1) {
        for (let i in decision) {
          if (decision[i].id == 0) {
            decision.splice(i, 1)
          }
        }
      }
      if (currentFilterInfo.direction) {
        for (let i in decision) {
          if (decision[i].id == 1) {
            decision.splice(i, 1)
          }
        }
      }
      if (currentFilterInfo.floor > -1) {
        for (let i in decision) {
          if (decision[i].id == 2) {
            decision.splice(i, 1)
          }
        }
      }
    }
    if (decision.length > 1) {
      let next: any = decision[Math.floor(Math.random() * decision.length)]
      let card: any = {
        title: next.text,
        subtitle: '',
        imageUri: '',
        buttons: []
      }

      let list = this.getResult(!force ? currentFilterInfo : {})
      switch (next.id) {
        case 0:
          let priceRange = []
          for (let p of this.PRICE_RANGE) {
            let c = false
            for (let r of list) {
              if (this.ROOM_INFO[r].price >= p.from && this.ROOM_INFO[r].price < p.to) {
                c = true
                break
              }
            }
            if (c) priceRange.push(p.text)
          }

          let res = []
          for (let p of priceRange) {
            res.push({
              text: 'Gói ' + p
            })
          }
          card.buttons = this.getUniqueList(res)
          break
        case 1:
          res = []
          for (let r of list) {
            res.push({
              text: 'Hướng ' + this.ROOM_INFO[r].direction
            })
          }
          card.buttons = this.getUniqueList(res)
          break
        case 2:
          res = []
          for (let r of list) {
            res.push({
              text: 'Tầng ' + this.ROOM_INFO[r].floor
            })
          }
          card.buttons = this.getUniqueList(res)
          break
      }
      return card
    }
    return null
  }
}
