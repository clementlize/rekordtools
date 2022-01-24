import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'

export function App() {

  window.Main.on("response", (data: string) => {

    console.log(data);
})

  return (
    <>
      <GlobalStyle />
      <Greetings />
    </>
  )
}