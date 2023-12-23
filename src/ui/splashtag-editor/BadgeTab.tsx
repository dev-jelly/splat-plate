import { useEffect, useState } from "react";
import { getDefinedBadges } from "../../lib/define-badges.ts";
import { clsx } from "clsx";
import * as lang from "../../lang.json";
import { setBadges, useBadges } from "../../lib/store/use-tag-store.ts";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { base } from "../../lib/const.ts";

const defineName = (name: string) => {
  const hashIndex = name.indexOf("#");
  return name.substring(0, hashIndex).replace("NAME:", "") as SectionKeys;
};

type Badges = [string, string, string];

export function BadgeTab() {
  const [selectedSlot, setSelectedSlot] = useState(0);
  const currentBadges = useBadges();
  const badges = getDefinedBadges();

  const onClickBadge = (badge: string) => {
    console.log("badge", badge);
    let newBadges: Badges;
    const indexOf = currentBadges.indexOf(badge);

    if (currentBadges[selectedSlot] === badge) {
      newBadges = [
        ...currentBadges.slice(0, selectedSlot),
        "",
        ...currentBadges.slice(selectedSlot + 1),
      ] as Badges;
    } else if (indexOf !== -1) {
      newBadges = [
        ...currentBadges.slice(0, indexOf),
        "",
        ...currentBadges.slice(indexOf + 1),
      ] as Badges;
      newBadges[selectedSlot] = badge;
    } else {
      newBadges = [
        ...currentBadges.slice(0, selectedSlot),
        badge,
        ...currentBadges.slice(selectedSlot + 1),
      ] as Badges;
    }

    setBadges(newBadges);
  };

  // const [selectedCategory, setSelectedCategory] = useState<
  //   keyof typeof badges | ""
  // >("");
  //
  // useEffect(() => {
  //   // Set Scroll To Category
  // });

  useEffect(() => {
    console.log("currentBadges", currentBadges);
  }, [currentBadges]);

  return (
    <div className={"h-full overflow-y-hidden p-2 md:px-8 md:py-4"}>
      <div className={"my-2 flex gap-4"}>
        <label onClick={() => setSelectedSlot(0)}>
          <input
            className={"mr-1"}
            type="radio"
            name="badgenum"
            value="1"
            onChange={() => setSelectedSlot(0)}
            checked={selectedSlot === 0}
          />
          <span id="textSlot1">슬롯 1</span>
        </label>{" "}
        -{" "}
        <label onClick={() => setSelectedSlot(1)}>
          <input
            className={"mr-1"}
            type="radio"
            name="badgenum"
            value="2"
            onChange={() => setSelectedSlot(1)}
            checked={selectedSlot === 1}
          />
          <span id="textSlot2">슬롯 2</span>
        </label>
        -{" "}
        <label onClick={() => setSelectedSlot(2)}>
          <input
            className={"mr-1"}
            type="radio"
            name="badgenum"
            value="3"
            onChange={() => setSelectedSlot(2)}
            checked={selectedSlot === 2}
          />
          <span id="textSlot3">슬롯 3</span>
        </label>
      </div>
      <div className={"my-4 h-px w-full bg-black/20"}></div>
      <div className="h-full max-h-[calc(100vh-240px)] overflow-y-scroll pr-2 sm:pb-24">
        {Object.entries(badges).map((b) => {
          return (
            <BadgeItem
              key={b[0]}
              name={b[0]}
              items={b[1]}
              onClickBadge={onClickBadge}
            />
          );
        })}
      </div>
    </div>
  );
}

type BadgeItemProps = {
  name: string;
  items: string[];
  onClickBadge: (badge: string) => void;
};

type SectionKeys = keyof (typeof lang)["KRko"]["sections"];
const BadgeItem = (props: BadgeItemProps) => {
  const { name, items } = props;
  const [collapsed, setCollapsed] = useState(name.includes("custom"));
  const isCustom = name.includes("custom");
  const badges = useBadges();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={clsx("category", collapsed ? "mb-2" : "mb-8")}>
      <div className={"flex cursor-pointer"} onClick={onCollapse}>
        <span id="textBadges">{lang.KRko.sections[defineName(name)]}</span>
        <div className={"ml-1 h-6 w-6 pt-0.5 text-white"}>
          {collapsed ? <EyeSlashIcon /> : <EyeIcon />}
        </div>
      </div>
      <div
        className={clsx(
          "category my-2 grid grid-cols-4 gap-2 sm:grid-cols-8 md:grid-cols-12",
          {
            hidden: collapsed,
          },
        )}
      >
        {items.map((b) => {
          if (isCustom) return null;
          return (
            <div
              key={b}
              className={clsx("cursor-pointer", {
                "selected box-content rounded-md border-2 border-yellow-400":
                  badges.some((badge) => badge === b),
              })}
            >
              <img
                alt={b}
                key={b}
                onClick={() => props.onClickBadge(b)}
                src={`${base}/assets/${isCustom ? "custom/" : ""}badges/${b}`}
                draggable="false"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
