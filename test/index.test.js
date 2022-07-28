const getData = require('../client/assets/scripts/index')

describe('Frontend JavaScript test', () => {

    const mockJSON = {
  "1": {
    "body": "First post",
    "replies": [
      "first comment"
    ],
    "like": {
      "is-there": true,
      "number": 1
    },
    "funny": {
      "is-there": true,
      "number": 2
    },
    "angry": {
      "is-there": true,
      "number": 1
    }
  },
  "3": {
    "body": "https://media0.giphy.com/media/kiXjan2oqplIpuYEIX/giphy.gif?cid=90dd941fd1fvsnz5xkwzwam0axb2rclci5k85qt1dfulaf81&rid=giphy.gif&ct=g",
    "replies": [
      "Hahahah"
    ],
    "like": {
      "is-there": false,
      "number": 0
    },
    "funny": {
      "is-there": true,
      "number": 1
    },
    "angry": {
      "is-there": false,
      "number": 0
    }
  }
}



    it('1. Test loadInitialPage() function ', () => {
        expect(loadInitialPage(mockJSON))
        }
    )

})
