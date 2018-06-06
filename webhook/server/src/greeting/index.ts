import Data from '../data/'

export default class Greeting {
  initConversation(db: Data) {
    return new Promise((resolve, reject) => {
      let card = db.getRandomNext(-1)
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
