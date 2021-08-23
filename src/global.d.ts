/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*&img'

  declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
      onclick_outside?: () => void
    }
  }