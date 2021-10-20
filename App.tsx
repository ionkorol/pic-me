import { NativeBaseProvider } from "native-base";
import React from "react";

import { Provider } from "react-redux";
import store from "store/store";
import { theme } from "style/theme";
import "utils/firebase";

import Main from "./src/Main";

interface Props {}

const App: React.FC<Props> = (props) => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Main />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
