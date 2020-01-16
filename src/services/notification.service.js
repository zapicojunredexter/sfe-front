export default class NotifcationService {
    static sendNotification = (body) => {
        /*
            {
                "to": "eDVkRJDXEoA:APA91bFDVCoew1_3tK8LfVEr3P5ZUFmW2ZHyrVi0x7gqSp741ZEx-WIWiNWxHptXHw5J5iJWhIPqwCmpGjHNm5hrCFn4QSAkn9WVKhIb-E7SYxQtU8TxyQH4PNmO0ZbKtK_7xjIWYfp1",
                "notification": {
                    "title": "Balance Update",
                    "body": "hehehe working23"
                }
            }
        */
        return fetch(`https://fcm.googleapis.com/fcm/send`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyBscbh2C2t-qN95GXx3Q7bjAGMeV17KeI0'
            },
        })
    }
}