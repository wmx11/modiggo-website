import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import { defineConfig, sharpImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  site: 'https://modiggo.com',
  compressHTML: true,
  integrations: [tailwind(), mdx(), svelte(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), robotsTxt()],
  image: {
    service: sharpImageService()
  },
  build: {
    inlineStylesheets: 'auto'
  }
});