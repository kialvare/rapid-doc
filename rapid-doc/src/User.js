import dev from './images/dev-gh.png'
import kim from './images/kim-gh.png'

export const users = [
  {
    image: kim,
    username: 'kialvare',
  },
  {
    image: dev,
    username: 'dabbott',
  },
]

export const currentUser = users[1];

export const userByName = users.reduce((acc, user) => {
  acc[user.username] = user;
  return acc
}, {})