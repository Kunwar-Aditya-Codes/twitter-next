import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import SidebarRow from './SidebarRow'

const Sidebar = () => {
  const { data: session } = useSession()

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        className="m-3 h-10 w-10"
        src="https://links.papareact.com/drq"
        alt=""
      />
      <SidebarRow title="Home" Icon={HomeIcon} />
      <SidebarRow title="Explore" Icon={HashtagIcon} />
      <SidebarRow title="Notifications" Icon={BellIcon} />
      <SidebarRow title="Messages" Icon={MailIcon} />
      <SidebarRow title="Bookmarks" Icon={BookmarkIcon} />
      <SidebarRow title="List" Icon={CollectionIcon} />
      <SidebarRow
        onClick={session ? signOut : signIn}
        title={session ? 'Sign Out' : 'Sign In'}
        Icon={UserIcon}
      />
      <SidebarRow title="More" Icon={DotsCircleHorizontalIcon} />
    </div>
  )
}

export default Sidebar
