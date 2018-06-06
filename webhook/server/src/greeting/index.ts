import Data from '../data/'

export default class Greeting {
  initConversation() {
    return new Promise((resolve, reject) => {
      let db: Data = new Data()
      let nextResponse = [
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
      let nextId = nextResponse[Math.floor(Math.random() * nextResponse.length)]
      let card = {
        title: nextResponse[nextId.id].text,
        subtitle: '',
        imageUri: '',
        buttons: []
      }
      switch (nextId.id) {
        case 0:
          for (var p of db.getPriceRange()) {
            card.buttons.push({
              text: p,
              postback: ''
            })
          }
          break
        case 1:
          for (var p of db.getDirections()) {
            card.buttons.push({
              text: p,
              postback: ''
            })
          }
          break
        case 2:
          for (var p of db.getFloors()) {
            card.buttons.push({
              text: p,
              postback: ''
            })
          }
          break
      }
      let fulfillmentMessages = [
        {
          text: {
            text: ['Mình là Iris, chuyên viên tư vấn dịch vụ cho thuê căn hộ Celadon city.']
          }
        },
        {
          card: card
        }
      ]
      resolve({ fulfillmentMessages })
    })
  }
}
