import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

import { structure } from "./deskStructure"

export default defineConfig({
  name: 'default',
  title: 'ketanrajpal',

  projectId: 'lyxsg6t2',
  dataset: 'production',

  plugins: [deskTool({
    structure: structure,
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
