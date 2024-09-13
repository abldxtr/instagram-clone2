import Link from "next/link";
import { Icons } from "../Icons";
import PostActions from "../post/post-actions";

export default function Main() {
  return (
    <main className="z-[9] flex grow flex-col md:ml-[72px] lg:ml-[244px]">
      <div className="">
        {/* <!-- 1 --> */}
        {/* friends */}

        {/* <!-- 2 and main --> */}
        <div>
          <div className="mx-auto max-w-[470px]">
            <div className="flex min-w-[390px] flex-col space-y-[20px]">
              {/* <!-- 1 --> */}
              <article className=" mb-20 ">
                <div className="pb-[16px] text-white">
                  {/* <!-- header --> */}
                  <div className="pb-[12px]">
                    <div className="flex items-center">
                      {/* <!-- profile pic --> */}
                      <div className="mr-[12px] cursor-pointer flex ">
                        <Link
                          href="/das"
                          className="relative size-[42px] shrink-0 rounded-full border border-white"
                        >
                          <img
                            src="https://lh3.googleusercontent.com/a/ACg8ocKSPfkrn2FFG2J-mEF3K9Wp9_3GGDfsYuu_IqmgKTpc=s96-c"
                            alt="profile img"
                            className="absolute inset-0 rounded-full"
                          />
                        </Link>
                      </div>

                      {/* <!-- profile name --> */}
                      <div className="flex grow items-center">
                        <div>
                          <div className="cursor-pointer text-[14px] font-semibold text-[rgb(245,245,245)]">
                            badane_amir{" "}
                            <span className="text-[14px] font-normal text-[rgb(168,168,168)]">
                              4d
                            </span>
                          </div>
                          <div className="cursor-pointer text-[12px] text-[rgb(245,245,245)]">
                            Origianl audio
                          </div>
                        </div>
                      </div>

                      {/* <!-- option icone --> */}
                      <div className="cursor-pointer">
                        <div>
                          <Icons.options />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- body --> */}
                  <div className="rounded-[4px] border border-[rgb(38,38,38)]">
                    <div>
                      <div className="h-[585px] w-[calc(min(470px,100vw)-2px)]"></div>
                    </div>
                  </div>
                  {/* <!-- footer --> */}
                  <div>
                    <div>
                      {/* like bookmark comment icone  */}

                      {/* {posts.map((post, index) => {
                        <div key={index}>
                          <PostActions
                            post={post}
                            // userIsd={userId}
                            className="px-3 sm:px-0"
                          />
                        </div>;
                      })} */}

                      {/* <!-- number of like --> */}
                      <section>
                        <div className=" text-[14px] font-bold text-[rgb(245,245,245)] ">
                          <span>
                            <span>39,644</span>
                            likes
                          </span>
                        </div>

                        <div className=" mt-[8px] ">
                          <div>badane_amir</div>
                        </div>
                      </section>

                      {/* <!-- comment input --> */}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
