import { layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  layout('routes/_layouts/default.tsx', [route('basic-form', 'routes/basic-form/index.tsx')]),
] satisfies RouteConfig
