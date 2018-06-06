export default class Greeting {
  initConversation() {
    return new Promise((resolve, reject) => {
      let nextResponse = [
        {
          id: 1,
          text: 'Bạn chọn gói tài chính để mình tư vấn dễ hơn ạ.'
        },
        {
          id: 2,
          text: 'Hiện bên Iris còn những căn hướng này nè.'
        },
        {
          id: 3,
          text: 'Bạn thích tầng nào ạ?'
        }
      ]
      let nextId = nextResponse[Math.floor(Math.random() * nextResponse.length)]
      console.log(nextId)
      let fulfillmentMessages = [
        {
          text: {
            text: ['Mình là Iris, chuyên viên tư vấn dịch vụ cho thuê căn hộ Celadon city.']
          }
        },
        {
          card: {
            title: 'card title',
            subtitle: 'card text',
            imageUri: 'https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png',
            buttons: [
              {
                text: 'button text',
                postback: 'https://assistant.google.com/'
              }
            ]
          }
        }
      ]
      resolve({ fulfillmentMessages })
    })
  }
}
