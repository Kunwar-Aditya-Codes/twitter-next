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
import SidebarRow from './SidebarRow'

const Sidebar = () => {
  return (
    <div className="flex flex-col">
      <img className="h-10 w-10" src="https://links.papareact.com/drq" alt="" />
      <SidebarRow title="Home" Icon={HomeIcon} />
      <SidebarRow title="Explore" Icon={HashtagIcon} />
      <SidebarRow title="Notifications" Icon={BellIcon} />
      <SidebarRow title="Messages" Icon={MailIcon} />
      <SidebarRow title="Bookmarks" Icon={BookmarkIcon} />
      <SidebarRow title="List" Icon={CollectionIcon} />
      <SidebarRow title="Sign In" Icon={UserIcon} />
      <SidebarRow title="More" Icon={DotsCircleHorizontalIcon} />
    </div>
  )
}

export default Sidebar
