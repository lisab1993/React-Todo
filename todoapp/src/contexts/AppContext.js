import React, { createContext } from "react";

export const AppContext = createContext();

class AppContextProvider extends React.Component {
  state = {
    placeholder: "placeholder",
  };


  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;