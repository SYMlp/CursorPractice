<script lang="ts">
import type { FunctionalComponent, SVGAttributes, StyleValue } from 'vue'
import { h } from 'vue'

// --- Props Interface for all icons ---
// Functional components receive props as the first argument
interface IconProps extends SVGAttributes {
  size?: number | string
  // className is handled by class attribute in Vue
  // color is handled by CSS or fill/stroke attributes
}

// Helper function to generate SVG attributes object
const getSvgAttrs = (
  props: IconProps,
): Record<string, string | number | StyleValue | undefined> => ({
  width: props.size ?? 24,
  height: props.size ?? 24,
  fill: 'none',
  stroke: props.color || 'currentColor',
  'stroke-width': props['stroke-width'] ?? 2,
  'stroke-linecap': props['stroke-linecap'] ?? 'round',
  'stroke-linejoin': props['stroke-linejoin'] ?? 'round',
  class: props.class, // Pass through class
  style: props.style, // style can be StyleValue
})

// --- Icon Components (Exported as constants) ---

export const SearchIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [
      h('circle', { cx: '11', cy: '11', r: '8' }),
      h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }),
    ],
  )

export const SecurityIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })],
  )

export const ChartIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [
      h('line', { x1: '18', y1: '20', x2: '18', y2: '10' }),
      h('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
      h('line', { x1: '6', y1: '20', x2: '6', y2: '14' }),
    ],
  )

export const DataIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [
      h('ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }),
      h('path', { d: 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3' }),
      h('path', { d: 'M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5' }),
    ],
  )

export const AlertIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [
      h('path', {
        d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
      }),
      h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
      h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' }),
    ],
  )

export const FilterIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [h('polygon', { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' })],
  )

export const LoadingIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [
      h('line', { x1: '12', y1: '2', x2: '12', y2: '6' }),
      h('line', { x1: '12', y1: '18', x2: '12', y2: '22' }),
      h('line', { x1: '4.93', y1: '4.93', x2: '7.76', y2: '7.76' }),
      h('line', { x1: '16.24', y1: '16.24', x2: '19.07', y2: '19.07' }),
      h('line', { x1: '2', y1: '12', x2: '6', y2: '12' }),
      h('line', { x1: '18', y1: '12', x2: '22', y2: '12' }),
      h('line', { x1: '4.93', y1: '19.07', x2: '7.76', y2: '16.24' }),
      h('line', { x1: '16.24', y1: '7.76', x2: '19.07', y2: '4.93' }),
    ],
  )

export const UserIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [
      h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '12', cy: '7', r: '4' }),
    ],
  )

export const ApplicationIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      ...getSvgAttrs(props),
    },
    [
      h('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2', ry: '2' }),
      h('line', { x1: '8', y1: '21', x2: '16', y2: '21' }),
      h('line', { x1: '12', y1: '17', x2: '12', y2: '21' }),
    ],
  )
</script>

<template>
  <!-- This file exports icon components from the script block. -->
  <!-- It does not render anything itself. -->
  <div v-if="false"></div>
</template>
