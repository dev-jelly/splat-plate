import { TagState } from "./store/use-tag-store.ts";
import * as lang from "../lang.json";

const bannerSrc = (file: string, custom = false) =>
  `${base}/assets/${custom ? "custom/" : ""}banners/${file}`;

const language = "KRko";

const getXScale = (width: number, max: number) => {
  return width > max ? max / width : 1;
};

const bannerImages: { [key: string]: HTMLImageElement } = {};
const getBannerImage = async (banner: string) => {
  if (!bannerImages[banner]) {
    const image = new Image();
    image.src = bannerSrc(banner);
    bannerImages[banner] = image;

    // create image onload promise
    await new Promise((r) => {
      image.onload = r;
    });
    // resolve promise
    return image;
  }
  return bannerImages[banner];
};

const getBadgeImage = async (badge: string) => {
  const image = new Image();
  image.src = `${base}/assets/badges/${badge}`;
  await new Promise((r) => {
    image.onload = r;
  });
  return image;
};

function isFontLoaded(fontName: string, fontSize = "16px"): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Check if the font is already loaded
    if (document.fonts.check(fontSize + " " + fontName)) {
      resolve(true);
    } else {
      // Font is not loaded, so listen for the load event
      document.fonts
        .load(fontSize + " " + fontName)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    }
  });
}

const isSpaceLang = (language: string) => {
  return (
    [
      "USen",
      "EUnl",
      "USfr",
      "EUfr",
      "EUde",
      "EUit",
      "EUru",
      "USes",
      "EUes",
      "KRko",
    ].indexOf(language) !== -1
  );
};

const titleToString = (title: TagState["title"]) => {
  const chosentitles = [];
  if (title.string) chosentitles.push(title.string);
  else {
    if (title.first !== -1)
      chosentitles.push(lang[language].titles.first[title.first]);
    if (title.last !== -1)
      chosentitles.push(lang[language].titles.last[title.last]);
  }
  if (chosentitles[0])
    return chosentitles.join(
      isSpaceLang(language)
        ? !(chosentitles[0]?.endsWith("-") || chosentitles[1]?.startsWith("-"))
          ? " "
          : ""
        : "",
    );
  else return "";
};

const compositeCanvas = document.createElement("canvas");
const textCanvas = document.createElement("canvas");
const canvasLayer = document.createElement("canvas");

const loadFont = async () => {
  await document.fonts.ready;
};

const textFont = `Splat-text${
  lang[language].font ? "," + lang[language].font[0] : ""
}`;

const titleFont = `Splat-title${
  lang[language].font ? "," + lang[language].font[1] : ""
}`;

export const loadFonts = async () => {
  await loadFont();
  return (await isFontLoaded(titleFont)) && (await isFontLoaded(textFont));
};

export const renderPlate = async (
  canvas: HTMLCanvasElement,
  tagState: TagState,
) => {
  if (!((await isFontLoaded(titleFont)) && (await isFontLoaded(textFont)))) {
    return;
  }
  console.log("font loaded");

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const textCtx = textCanvas.getContext("2d") as CanvasRenderingContext2D & {
    letterSpacing: string;
  };

  textCtx.clearRect(0, 0, 700, 200);
  ctx.clearRect(0, 0, 700, 200);

  const {
    banner,
    layers,
    title,
    color,
    bgColours,
    name,
    badges,
    isCustom,
    id,
  } = tagState;

  const bannerImage = await getBannerImage(banner);
  compositeCanvas.width = 700;
  compositeCanvas.height = 200;
  const compositeCtx = compositeCanvas.getContext("2d");
  canvasLayer.width = 700;
  canvasLayer.height = 200;
  const layerCtx = canvasLayer.getContext("2d");
  ctx.save();
  if (!layers) {
    // If not one of the special "pick your own colour" banners, just draw it
    ctx.drawImage(bannerImage, 0, 0, 700, 200);
    ctx.restore();
  } else {
    // Special custom colour banners draw each layer then are added

    const imageLayers: Array<HTMLImageElement> = [];
    const imagePromises: Array<Promise<unknown>> = [];
    for (let i = 0; i < layers; i++) {
      const layer = new Image();
      const p = new Promise((r) => {
        layer.onload = r;
        layer.src = banner.replace("preview", `${i + 1}`);
      });
      imagePromises.push(p);
      imageLayers.push(layer);
    }
    await Promise.all(imagePromises);

    for (let i = 0; i < imageLayers.length; i++) {
      if (!compositeCtx || !layerCtx) {
        return;
      }
      compositeCtx.clearRect(0, 0, 700, 200);
      compositeCtx.save();
      compositeCtx.fillStyle = bgColours[!i ? i : imageLayers.length - i];
      compositeCtx.drawImage(imageLayers[i], 0, 0, 700, 200);
      compositeCtx.globalCompositeOperation = "difference";
      compositeCtx.fillRect(0, 0, 700, 200);
      compositeCtx.restore();

      layerCtx.save();
      layerCtx.drawImage(imageLayers[i], 0, 0, 700, 200);
      layerCtx.globalCompositeOperation = "source-in";
      layerCtx.drawImage(compositeCanvas, 0, 0, 700, 200);
      layerCtx.restore();
      ctx.drawImage(canvasLayer, 0, 0);
      layerCtx.clearRect(0, 0, 700, 200);
    }
  }

  /// About Text
  const textScale = 2;
  textCanvas.width = 700 * textScale;
  textCanvas.height = 200 * textScale;

  textCtx.scale(textScale, textScale);

  // Set text colour
  textCtx.fillStyle = "#" + color;

  // Write titles
  textCtx.textAlign = "left";

  console.log("textFont", textFont);

  if (title) {
    textCtx.save();
    textCtx.font = `36px ${textFont}`;
    textCtx.letterSpacing = "-0.3px";
    const textWidth = textCtx.measureText(titleToString(title)).width;

    console.log("textWidth", textWidth);
    const xScale = getXScale(textWidth, 700 - 32);
    console.log("xScale", xScale);
    // in game italic value is 0.12
    textCtx.transform(1, 0, -7.5 / 100, 1, 0, 0);
    textCtx.scale(xScale, 1);
    textCtx.fillText(titleToString(title), 18 / xScale, 42);
    textCtx.restore();
    textCtx.letterSpacing = "0px";
  }
  // Write tag text (if not empty)
  if (id.length) {
    textCtx.save();
    textCtx.font = `24px ${textFont}`;
    textCtx.letterSpacing = "0.2px";

    // tag text should adjust to the leftmost badge position.
    const leftBadge = badges.indexOf(
      badges.find((b) => b !== "") || "No Badge",
    );
    const maxX = (leftBadge === -1 ? 700 : 480 + 74 * leftBadge) - 48;
    const textWidth = textCtx.measureText(id).width;
    const xScale = getXScale(textWidth, maxX);

    textCtx.scale(xScale, 1);
    textCtx.fillText("" + id, 24 / xScale, 185);
    textCtx.restore();
  }

  // Write player name
  if (name.length) {
    textCtx.save();
    textCtx.font = `66px ${titleFont}`;
    textCtx.letterSpacing = "-0.4px";
    const textWidth = textCtx.measureText(name).width;
    const xScale = getXScale(textWidth, 700 - 32);

    textCtx.textAlign = "center";
    textCtx.scale(xScale, 1);
    textCtx.fillText(name, (700 / 2 - 1.5) / xScale, 119);

    textCtx.restore();
  }
  ctx.save();
  ctx.drawImage(textCanvas, 0, 0, 700, 200);
  textCtx.clearRect(0, 0, 700, 200);
  ctx.restore();

  // If the banner name or badge has either "custom" or "data" it is definitely a custom resource

  // Draw each badge on the banner
  for (let i = 0; i < 3; i++) {
    if (badges[i] !== "") {
      const x = 480 + 74 * i;
      const badgeImage = await getBadgeImage(badges[i]);
      // Below used to resize custom badges to retain their scale.
      if (isCustom) {
        const cw = badgeImage.naturalWidth;
        const ch = badgeImage.naturalHeight;
        const landscape = cw > ch;
        const ratio = !landscape ? cw / ch : ch / cw;
        const width = landscape ? 70 : 70 * ratio;
        const height = !landscape ? 70 : 70 * ratio;

        ctx.drawImage(
          badgeImage,
          x + (70 / 2 - width / 2),
          128 + (70 / 2 - height / 2),
          width,
          height,
        );
      } else {
        ctx.drawImage(badgeImage, x, 128, 70, 70);
      }
    }
  }

  ctx.save();
  ctx.drawImage(textCanvas, 0, 0, 700, 200);
  ctx.restore();
};
