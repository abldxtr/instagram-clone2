import { Icons } from "../Icons";

function ProfileMenue() {
  return (
    <section className="border-t border-[rgb(38,38,38)]">
      <div className="flex items-center justify-center space-x-[60px]">
        <a href="/profileId/tag" className="h-[52px] border-t">
          <div className="flex h-full items-center">
            <Icons.post />
            <span className="pl-[6px] text-[12px] text-[#F5F5F5]">POSTS</span>
          </div>
        </a>
        <a href="/profileId/tag" className="h-[52px]">
          <div className="flex h-full items-center">
            <Icons.bookmark />
            <span className="pl-[6px] text-[12px] text-[#F5F5F5]">
              Bookmarks
            </span>
          </div>
        </a>
        <a href="/profileId/tag" className="h-[52px]">
          <div className="flex h-full items-center">
            <Icons.tag />
            <span className="pl-[6px] text-[12px] text-[#F5F5F5]">Tags</span>
          </div>
        </a>
      </div>
    </section>
  );
}

export default ProfileMenue;
