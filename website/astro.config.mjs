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
            { label: 'First Ten Minutes', link: '/guides/first-ten-minutes' },
            { label: 'Recommended Workflow', link: '/guides/workflow' },
            { label: 'Using with AI Agents', link: '/guides/ai-agents' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Concept & How It Works', link: '/guides/how-it-works' },
            { label: 'Command Guide', link: '/guides/command-guide' },
            { label: 'CLI Simulation', link: '/guides/cli-simulation' },
            { label: 'AI Agent Simulation', link: '/guides/ai-agent-simulation' },
            { label: 'Skills', link: '/guides/skills' },
            { label: 'Templates', link: '/guides/templates' },
            { label: 'Integrations', link: '/guides/integrations' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'CLI Commands', link: '/reference/cli' },
            { label: 'Commands Folder', link: '/reference/commands-folder' },
            { label: 'Prompts Folder', link: '/reference/prompts-folder' },
            { label: 'References Folder', link: '/reference/references-folder' },
            { label: 'Integrations Folder', link: '/reference/integrations-folder' },
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
