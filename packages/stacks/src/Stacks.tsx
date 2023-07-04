import { GetProps, Stack, styled } from '@tamagui/core'

import { getElevation } from './getElevation'

export type YStackProps = GetProps<typeof YStack>
export type XStackProps = YStackProps
export type ZStackProps = YStackProps

export const fullscreenStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const

const variants = {
  fullscreen: {
    true: fullscreenStyle,
  },
  elevation: {
    '...size': getElevation,
  },
} as const

export const FrameXStack = styled(Stack, {})
const HigherOrderXStack = FrameXStack.styleable((props, ref) => {
  if (props.debug && props.debug === 'borders') {
    return (
      <FrameXStack
        ref={ref}
        borderColor="red"
        borderWidth={0.5}
        borderStyle="solid"
        {...props}
      />
    )
  }
  return <FrameXStack />
})

export const XStack = styled(HigherOrderXStack, {
  flexDirection: 'row',
  variants,
})

export const YStack = styled(HigherOrderXStack, {
  flexDirection: 'column',
  variants,
})

export const ZStack = styled(
  YStack,
  {
    position: 'relative',
  },
  {
    neverFlatten: true,
    isZStack: true,
  }
)
