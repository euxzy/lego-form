import { index, layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  index('routes/home/index.tsx'),
  layout('routes/_layouts/default.tsx', [
    route('basic-form', 'routes/basic-form/index.tsx'),
    route('grid-form', 'routes/grid-form/index.tsx'),
    route('validation-form', 'routes/validation-form/index.tsx'),
    route('conditional-form', 'routes/conditional-form/index.tsx'),
    route('dynamic-form', 'routes/dynamic-form/index.tsx'),
    route('multi-step-form', 'routes/multi-step-form/index.tsx'),
  ]),
] satisfies RouteConfig
