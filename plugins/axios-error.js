// plugins/axios-error.js
// Prevents Nuxt SSR crash (504 Gateway Timeout) caused by circular references
// in Axios error objects during server-side rendering.
// See: deploy/SSR_504_ERROR_FIX.md for root cause analysis.
export default function ({ $axios }) {
  $axios.onError((error) => {
    // Delete the raw Node.js HTTP socket from the error object.
    // Sockets have circular references that crash @nuxt/devalue when it
    // tries to serialize window.__NUXT__ state on the server.
    if (error && error.request) {
      delete error.request
    }
    if (error && error.response && error.response.request) {
      delete error.response.request
    }
  })
}
