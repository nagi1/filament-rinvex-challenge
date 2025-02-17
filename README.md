# Rinvex Challange

This my attempt to build Filamentphp using vite.

## Installation

```bash
composer install
npm install
npm run build
```


## My thoughts

- I had to remove tailwindcss postcss plugin because it wasnt playing nice with vite.
- Used a `@tailwind/vite` plugin to inject tailwindcss into the build process.
- I took inspiration from filaments's build script (esbuild) located in `filament-v4/bin/build.js` to build my own vite build script.
- CSS files are built separately using tailwindcss binary from npx that called from `package.json` scripts.
- Filament has a lot of dependencies, and very complex build process. the css files are built separately then bundled with the js files, then distributed using a php command that totally changes the paths of the files.
- In `filament-v4/packages/forms/resources/css/index.css` already built css files are imported as tailwind components that I have tried to manually import in my in the file like so

```css
@layer components {
    @import '../components/checkbox.css';
    @import '../components/input.css';
    @import '../components/radio.css';
    // ....
}
```

But this didnt make any difference in the final build!

- Samething with `filament-v4/packages/support/resources/css/index.css` file, I have tried to import the css files manually but it didnt make any difference in the final build.

- I successfully built the js and css files along with the font files as well but didnt manage to get it to work on the browser.


## Conclusion

This took me so many hours and I really enjoyed it!
