import { Icons } from "../Icons";

function Plus() {
  return (
    <section className="ml-4 mt-12 flex">
      <div className="mb-[44px] h-[130px] w-full">
        <div className="w-[125px]">
          <div className="border-3 w-[115px] border-[#00000047] px-[15px] py-[10px]">
            <div className="border-3 flex cursor-pointer flex-col items-center justify-center gap-3 border-[#00000047]">
              <div className="relative flex size-[77px] shrink-0 items-center justify-center rounded-full border border-gray-400/30 bg-transparent">
                <div className="flex aspect-square size-[69px] items-center justify-center rounded-full border border-[#00000047] bg-[rgb(18,18,18)] text-[rgb(115,115,115)]">
                  <Icons.Plus />
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[#F5F5F5]">New</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Plus;
