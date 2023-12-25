import { PlateSize } from "./position-tab/PlateSize.tsx";
import { TitlePosition } from "./position-tab/TitlePosition.tsx";
import { IdPosition } from "./position-tab/IdPosition.tsx";
import { NamePosition } from "./position-tab/NamePosition.tsx";
import { BadgePosition } from "./position-tab/BadgePosition.tsx";
import { resetTagPosition } from "../../lib/store/use-position.ts";

export function PositionTab() {
  return (
    <div
      className={"flex h-full flex-col gap-8 overflow-y-scroll p-4 text-white"}
    >
      <div className={"flex gap-4"}>
        <button
          onClick={resetTagPosition}
          className={
            "rounded-md border border-gray-600 bg-gray-700 px-4 py-2 hover:bg-opacity-80"
          }
        >
          기본값으로 지정
        </button>
        <button
          className={
            "rounded-md border border-gray-600 bg-gray-700 px-4 py-2 hover:bg-opacity-80"
          }
        >
          인쇄용으로 지정
        </button>
      </div>
      <div className={"flex flex-col gap-8 md:flex-row md:gap-12"}>
        <PlateSize />
      </div>
      <div className={"flex flex-col gap-8 lg:flex-row lg:gap-12"}>
        <NamePosition />
      </div>
      <div className={"flex flex-col gap-8 lg:flex-row lg:gap-12"}>
        <TitlePosition />
        <IdPosition />
      </div>
      <div className={"flex flex-col gap-8 lg:flex-row lg:gap-12"}>
        <BadgePosition />
      </div>
    </div>
  );
}
