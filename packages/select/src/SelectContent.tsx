import { FloatingOverlay, FloatingPortal } from '@floating-ui/react'
import { Theme, useIsTouchDevice, useThemeName } from '@tamagui/core'
import { FocusScope, FocusScopeProps } from '@tamagui/focus-scope'

import { useSelectContext } from './context'
import { SelectContentProps } from './types'
import { useShowSelectSheet } from './useSelectBreakpointActive'

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'SelectContent'

export const SelectContent = ({
  children,
  __scopeSelect,
  zIndex = 1000,
  ...focusScopeProps
}: SelectContentProps & FocusScopeProps) => {
  const context = useSelectContext(CONTENT_NAME, __scopeSelect)
  const themeName = useThemeName()
  const showSheet = useShowSelectSheet(context)

  const contents = (
    <Theme forceClassName name={themeName}>
      {children}
    </Theme>
  )

  const touch = useIsTouchDevice()

  if (context.shouldRenderWebNative) {
    return <>{children}</>
  }

  if (showSheet) {
    if (!context.open) {
      return null
    }
    return <>{contents}</>
  }

  return (
    <FloatingPortal>
      <FloatingOverlay
        style={{ zIndex, pointerEvents: context.open ? 'auto' : 'none' }}
        lockScroll={!!context.open && !touch}
      >
        <FocusScope loop trapped={!!context.open} {...focusScopeProps}>
          {contents}
        </FocusScope>
      </FloatingOverlay>
    </FloatingPortal>
  )
}
