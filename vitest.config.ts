/// <reference types='vitest'/>
/// <reference types='Vite/client'/>

import { defineConfig } from 'vite';

export default defineConfig({
  test:{
    environment: "happy-dom",
    globals: true
  }
})
