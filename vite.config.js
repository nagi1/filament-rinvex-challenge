import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

const formComponents = [
    "color-picker",
    "date-time-picker",
    "file-upload",
    "key-value",
    "markdown-editor",
    "rich-editor",
    "select",
    "tags-input",
    "textarea",
];

const jsBuildMap = {
    // Js files
    "js/filament/notifications/notifications":
        "./filament-v4/packages/notifications/resources/js/index",
    "js/filament/support/support":
        "./filament-v4/packages/support/resources/js/index",
    "js/filament/schemas/schemas":
        "./filament-v4/packages/schemas/resources/js/index",
    "js/filament/filament/echo":
        "./filament-v4/packages/panels/resources/js/echo",
    "js/filament/filament/app":
        "./filament-v4/packages/panels/resources/js/index",
    "js/filament/tables/tables":
        "./filament-v4/packages/tables/resources/js/index",

    // form components
    ...formComponents.reduce((acc, component) => {
        acc[`js/filament/forms/components/${component}`] =
            `./filament-v4/packages/forms/resources/js/components/${component}`;
        return acc;
    }, {}),
};

const cssBuildMap = {
    "css/filament/forms/forms.css":
        "./filament-v4/packages/forms/resources/css/index.css",
    "css/filament/support/support.css":
        "./filament-v4/packages/support/resources/css/index.css",
    "css/filament/filament/app.css":
        "./filament-v4/packages/panels/resources/css/index.css",

    // Inter Fonts
    "fonts/inter": "./filament-v4/packages/panels/resources/js/fonts/inter",

    // form components
    "css/filament/forms/components/date-time-picker.css":
        "./filament-v4/packages/forms/resources/css/components/date-time-picker.css",
    "css/filament/forms/components/file-upload.css":
        "./filament-v4/packages/forms/resources/css/components/file-upload.css",
    "css/filament/forms/components/markdown-editor.css":
        "./filament-v4/packages/forms/resources/css/components/markdown-editor.css",
    "css/filament/forms/components/rich-editor.css":
        "./filament-v4/packages/forms/resources/css/components/rich-editor.css",
    "css/filament/forms/components/select.css":
        "./filament-v4/packages/forms/resources/css/components/select.css",
    "css/filament/forms/components/tags-input.css":
        "./filament-v4/packages/forms/resources/css/components/tags-input.css",

    // support components
    ...[
        'infolists/entries/color',
        'infolists/entries/icon',
        'infolists/entries/image',
        'infolists/entries/key-value',
        'infolists/entries/repeatable',
        'infolists/entries/text',
        'infolists/entry',
        'input/checkbox',
        'input/index',
        'input/one-time-code',
        'input/radio',
        'input/select',
        'input/wrapper',
        'link',
        'loading-indicator',
        'loading-section',
        'modal',
        'notifications/database-notifications',
        'notifications/notification',
        'notifications/notifications',
        'pagination',
        'schemas/components/actions',
        'schemas/components/form',
        'schemas/components/icon',
        'schemas/components/image',
        'schemas/components/section',
        'schemas/components/split',
        'schemas/components/tabs',
        'schemas/components/text',
        'schemas/components/unordered-list',
        'schemas/components/wizard',
        'schemas/schema',
        'section',
        'tables/actions',
        'tables/cell',
        'tables/columns/checkbox',
        'tables/columns/color',
        'tables/columns/icon',
        'tables/columns/image',
        'tables/columns/layout/grid',
        'tables/columns/layout/panel',
        'tables/columns/layout/split',
        'tables/columns/layout/stack',
        'tables/columns/select',
        'tables/columns/summaries/icon-count',
        'tables/columns/summaries/range',
        'tables/columns/summaries/text',
        'tables/columns/summaries/values',
        'tables/columns/text-input',
        'tables/columns/text',
        'tables/columns/toggle',
        'tables/container',
        'tables/content',
        'tables/empty-state',
        'tables/header-cell',
        'tables/row',
        'tables/table',
        'tabs',
        'toggle',
        'widgets/chart-widget',
        'widgets/index',
        'widgets/stats-overview-widget',
        'actions',
        'avatar',
        'badge',
        'breadcrumbs',
        'button',
        'dropdown/header',
        'dropdown/index',
        'dropdown/list/index',
        'dropdown/list/item',
        'fieldset',
        'grid',
        'icon-button',
        'icon',
    ].reduce((acc, component) => {
        acc[`css/filament/support/components/${component}.css`] = `./filament-v4/packages/support/resources/css/components/${component}.css`;
        return acc;
    }, {}),
};


export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        tailwindcss,
    ],
    build: {
        emptyOutDir: false,
        rollupOptions: {
            input: {
                ...jsBuildMap,
                ...cssBuildMap,
            },
            output: {
                manualChunks: undefined,
                entryFileNames: "[name].js",
                assetFileNames: (assetInfo) => {
                    if (
                        assetInfo.names[0]?.includes("inter") &&
                        assetInfo.names[0]?.endsWith(".css")
                    ) {
                        return "fonts/filament/filament/inter/index.css";
                    }

                    if (assetInfo.names[0]?.includes("inter")) {
                        return "fonts/filament/filament/inter/[name].[ext]";
                    }

                    return "[name].[ext]"; // Default for other assets
                },

                dir: "./public",
            },
        },
    },
    css: {
        devSourcemap: true, // Enable sourcemaps for debugging
    },
});
