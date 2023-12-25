import { setTagSize, useTagSize } from "../../../lib/store/use-position.ts";

export const PlateSize = () => {
  const tagSize = useTagSize();
  return (
    <div className={"flex flex-col items-start  gap-2"}>
      <h2 className={"text-lg"}>플레이트 사이즈</h2>
      <div className={"flex gap-2"}>
        <div className={"flex flex-col gap-2 sm:flex-row"}>
          <label
            htmlFor="tag-width"
            className="block text-sm font-medium leading-6"
          >
            가로
          </label>
          <input
            type="number"
            name="tag-width"
            id="tag-width"
            className={"w-20 pl-2 text-black"}
            min={600}
            max={800}
            onChange={(e) => {
              const w = Number(e.target.value);
              setTagSize({
                w,
                h: tagSize.h,
              });
            }}
            value={tagSize.w}
          />
        </div>
        <div className={"flex flex-col gap-2 sm:flex-row"}>
          <label
            htmlFor="tag-height"
            className="block text-sm font-medium leading-6"
          >
            세로
          </label>
          <input
            type="number"
            name="tag-height"
            id="tag-height"
            className={"w-20 pl-2 text-black"}
            onBlur={(e) => {
              setTagSize({
                w: tagSize.w,
                h: Number(e.target.value),
              });
            }}
            value={tagSize.h}
          />
        </div>
      </div>
    </div>
  );
};
