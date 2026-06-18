// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'AIOS',
      customCss: ['./src/tailwind.css', './src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/donihadimas/ai-native-development-os' }],
      sidebar: [
        {
          label: 'Setup',
          items: [
            { label: 'Getting Started', link: '/getting-started' },
            { label: 'Building Blocks', link: '/guides/building-blocks' },
            { label: 'Recommended Workflow', link: '/guides/workflow' },
            { label: 'Using with AI Agents', link: '/guides/ai-agents' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Concept & How It Works', link: '/guides/how-it-works' },
            { label: 'Command Guide', link: '/guides/command-guide' },
            { label: 'Skills', link: '/guides/skills' },
            { label: 'Templates', link: '/guides/templates' },
            { label: 'Integrations', link: '/guides/integrations' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'CLI Commands', link: '/reference/cli' },
            { label: 'Project Structure', link: '/reference/structure' },
          ],
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
