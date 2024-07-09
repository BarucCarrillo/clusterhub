import * as React from "react";
import { Header, } from "@rneui/base";

export default () => {
  return (
    <Header
      backgroundColor="#95D7CA"
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: "Iniciar Sesión",
        style: { color: "#317B9B",fontSize: 38, fontWeight: 'bold', display: 'flex', alignSelf: 'center' }
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: "100%", height: 200 }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="left"
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  );
}

