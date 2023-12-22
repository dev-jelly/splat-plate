import { useEffect, useRef, useState } from "react";
import { TextTab } from "./splashtag-editor/TextTab.tsx";
import * as lang from "../lang.json";
import { BannerTab } from "./splashtag-editor/BannerTab.tsx";
import { BadgeTab } from "./splashtag-editor/BadgeTab.tsx";
import { useTagStore } from "../lib/store/use-tag-store.ts";
import { renderSplashtag } from "../lib/render-splashtag.ts";
import { clsx } from "clsx";
import { downloadTag } from "../lib/download-tag.ts";

const language = "KRko";

export function SplashTagEditor() {
  const [tab, setTab] = useState(0);
  const tag = useTagStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    renderSplashtag(canvasRef.current, tag).then(() => {
      console.log("rendered");
    });
  }, [tag]);

  return (
    <div className="p-2 sm:p-8">
      <div className={"flex items-center justify-center"}>
        <canvas
          className={"max-w-full"}
          style={{ aspectRatio: "auto 700 / 200" }}
          ref={canvasRef}
          id="splashtag"
          width="700"
          height="200"
        />
      </div>
      <div
        className={
          "mx-auto mt-4 min-h-[420px] w-full overflow-clip rounded-md bg-gray-600 sm:mt-8 md:max-w-3xl"
        }
      >
        <div className="flex h-[420px]">
          <div
            className={
              "flex h-full min-w-fit flex-col items-start justify-start"
            }
          >
            <div className="h-full">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex h-full grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-2 pb-4 sm:pl-2">
                <nav className="flex h-full flex-1 flex-col">
                  <ul role="list" className="space-y-1 py-3">
                    <button
                      onClick={() => setTab(0)}
                      className={clsx(
                        tab === 0
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white",
                        "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )}
                      name="tabText"
                    >
                      {lang[language].ui.tabText}
                    </button>
                    <button
                      onClick={() => setTab(1)}
                      className={clsx(
                        tab === 1
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white",
                        "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )}
                      type="button"
                      name="tabBanners"
                    >
                      {lang[language].ui.tabBanners}
                    </button>
                    <button
                      onClick={() => setTab(2)}
                      className={clsx(
                        tab === 2
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white",
                        "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )}
                      type="button"
                      name="tabBadges"
                    >
                      {lang[language].ui.tabBadges}
                    </button>
                    <button
                      disabled={true}
                      onClick={() => setTab(3)}
                      className={clsx(
                        tab === 3
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white",
                        "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                      type="button"
                      name="tabBadges"
                    >
                      위치 및 크기
                    </button>
                    <button
                      disabled={!canvasRef.current}
                      onClick={() => {
                        if (!canvasRef.current) return;
                        downloadTag(canvasRef.current);
                      }}
                      className={clsx(
                        tab === 3
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white",
                        "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )}
                      type="button"
                      name="tabBadges"
                    >
                      다운로드
                    </button>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="h-full px-2 text-white">
            {/*Text --- Name, Tag, Titles*/}
            {tab === 0 && <TextTab />}
            {tab === 1 && <BannerTab />}
            {tab === 2 && <BadgeTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
