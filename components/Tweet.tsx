import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [input, setInput] = useState<string>('')
  const [commentBoxIsVisible, setCommentBoxIsVisible] = useState<boolean>(false)

  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      tweetId: tweet._id,
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newComment = await fetchComments(tweet._id)
    setComments(newComment)

    toast('Comment Posted', {
      icon: '🚀',
    })

    return json
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postComment()
    setInput('')
    setCommentBoxIsVisible(false)
  }

  const refreshComment = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComment()
  }, [])

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10  rounded-full object-cover"
          src={tweet.profileImg}
          alt=""
        />
        <div className="">
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} .
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="">{tweet.text}</p>
          {tweet.image && (
            <img
              className="mx-h-60 m-5 ml-0 mb-1 rounded-lg object-cover shadow-sm"
              src={tweet.image}
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div
          onClick={() =>
            session && setCommentBoxIsVisible(!commentBoxIsVisible)
          }
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments?.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxIsVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-lg bg-gray-100 p-1 outline-none"
          />
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter" />
              <img
                src={comment.profileImg}
                alt=""
                className="mt-2 h-7 w-7 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-1 ">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, '').toLowerCase()} .
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet
