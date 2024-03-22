import {
  createAppleSplashScreens,
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: {
    ...minimal2023Preset,
    appleSplashScreens: createAppleSplashScreens(
      {
        padding: 0.3,
        resizeOptions: { background: "white", fit: "contain" },
        darkResizeOptions: { background: "black", fit: "contain" },
        linkMediaOptions: {
          // will log the links you need to add to your html pages
          log: true,
          addMediaScreen: true,
          basePath: "/",
          xhtml: false,
        },
        png: {
          compressionLevel: 9,
          quality: 60,
        },
        name: (landscape, size, dark) => {
          return `apple-splash-${landscape ? "landscape" : "portrait"}-${
            typeof dark === "boolean" ? (dark ? "dark-" : "light-") : ""
          }${size.width}x${size.height}.png`;
        },
      },
      [
        'iPad Pro 12.9"',
        'iPad Pro 11"',
        'iPad Pro 9.7"',
        'iPad Air 10.5"',
        'iPad Air 9.7"',
        'iPad 10.2"',
        "iPhone 14 Pro Max",
        "iPhone 14 Pro",
        "iPhone 12 Pro Max",
        "iPhone 12",
        "iPhone 12 mini",
        "iPhone 11 Pro Max",
        "iPhone 11",
        "iPhone XS Max",
        "iPhone XS",
        "iPhone 8 Plus",
        "iPhone 8",
        'iPhone SE 4"',
        "iPod touch 5th generation and later",
      ]
    ),
  },
  images: ["public/logo.svg"],
});
