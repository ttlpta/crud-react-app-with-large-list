import React, { Suspense, lazy, Fragment, useGlobal } from 'reactn'
import { ThemeProvider } from 'styled-components'

import initStore from './store'

import Normalize from './Normalize'
import { NotificationPopup } from './components'
import ListPage from './scenes/List/List'

import themeLight from './themes/defaultTheme'

initStore()

export default function App () {
  return (
    <Fragment>
      <Normalize />
      <NotificationPopup />
      <ThemeProvider theme={themeLight}>
        <ListPage />
      </ThemeProvider>
    </Fragment>
  )
}
