import React from 'react'
import { Tweet } from '../typings'

// TODO: time ago addition 

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  return (
    <div>
      <div>
        <img src={tweet.profileImg} alt="" />
        <div>
          <div>
            <p>{tweet.username}</p>
            <p>@{tweet.username.replace(/\s+/g, '').toLowerCase()}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Tweet
