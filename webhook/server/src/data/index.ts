export default class Data {
  ROOMs = ['A101', 'A201', 'A303', 'A504', 'A609']
  ROOM_INFO = {
    A101: {
      floor: 1,
      price: 5,
      direction: 'Đông'
    },
    A201: {
      floor: 2,
      price: 3,
      direction: 'Đông Nam'
    },
    A303: {
      floor: 3,
      price: 4,
      direction: 'Tây Bắc'
    },
    A504: {
      floor: 5,
      price: 9,
      direction: 'Nam'
    },
    A609: {
      floor: 6,
      price: 7,
      direction: 'Tây'
    }
  }

  PRICE_RANGE = [
    {
      text: '3tr-5tr',
      from: 3,
      to: 5
    },
    {
      text: '6tr-7tr',
      from: 6,
      to: 7
    },
    {
      text: '>7tr',
      from: 7,
      to: -1
    }
  ]

  public filterInfo = {
    floor: -1,
    price: -1,
    direction: null
  }

  getResult() {
    return this.ROOMs.filter(room => {
      if (this.filterInfo.floor != -1 && this.filterInfo.floor != this.ROOM_INFO[room].floor) return false
      if (this.filterInfo.price != -1 && this.filterInfo.price != this.ROOM_INFO[room].price) return false
      if (this.filterInfo.direction != null && this.filterInfo.direction != this.ROOM_INFO[room].direction) return false
      return true
    })
  }

  getPriceRange() {
    let res = []
    for (var p of this.PRICE_RANGE) {
      res.push(p.text)
    }
    return res
  }

  getFloors() {
    let res = []
    for(var r in this.ROOM_INFO) {
      res.push(r["floor"])
    }
  }

  getDirections() {
    let res = []
    for(var r in this.ROOM_INFO) {
      res.push(r["direction"])
    }
  }

}
