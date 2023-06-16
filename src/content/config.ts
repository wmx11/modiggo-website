import { defineCollection, z } from "astro:content";

const additionalServicesConfig = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    price: z.string().optional().or(z.null()),
    image: image(),
    imageAlt: z.string()
  })
});

export const collections = {
  'additional-services': additionalServicesConfig
}