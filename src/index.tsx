import * as React from "react";
import * as ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./App.css";
// import registerServiceWorker from "./registerServiceWorker"
import LayoutTemplate from "./layoutTemplate";
import { StaticService } from "./model/static/static";

interface InterFaceLiferayToReactData {
  portletID: string;
  token: string;
  roles: [];
  userID: string;
  hostname: string;
  render(
    portletID: string,
    token: string,
    roles: [],
    userID: string,
    hostname: string
  ): void;
}

export default class CeddGEO implements InterFaceLiferayToReactData {
  portletID: string;
  token: string;
  roles: any;
  userID: string;
  hostname: string;
  // ============== 以前使用的雜湊路由 ==============//
  render(
    id: string,
    token: string,
    roles: any,
    userID: string,
    hostname: string
  ) {
    const service = new StaticService();
    service.setToken(token);
    service.setRoleList(roles);
    service.setUserID(userID);
    service.setHostname(hostname);
    const isCustomHostname =
      process.env.REACT_APP_CUSTOM_HOSTNAME === "true" ? true : false;
    const getHostname = isCustomHostname
      ? hostname
      : "http://192.168.214.103:8080";
    const fontStyle = document.createElement("style");
    fontStyle.innerHTML = `
    @font-face {
      font-family: 'Muli';
      font-weight: 300;
      src: url('${getHostname}/o/cedd-frontend-resource/fonts/Muli-Light.woff') format('truetype');
    }
    @font-face {
      font-family: 'Muli';
      font-weight: 400;
      src: url('${getHostname}/o/cedd-frontend-resource/fonts/Muli-Regular.woff') format('truetype');
    }
    @font-face {
      font-family: 'Muli';
      font-weight: 700;
      src: url('${getHostname}/o/cedd-frontend-resource/fonts/Muli-Bold.woff') format('truetype');
    }`;
    document.querySelector("head").appendChild(fontStyle);
    return ReactDOM.render(<LayoutTemplate />, document.getElementById(
      id
    ) as HTMLElement);
  }
  // ============== 以前使用的雜湊路由 ==============//
  // render (id: string, token: string) {
  //   const service = new StaticService()
  //   service.setSearchOption(token)
  //   return ReactDOM.render(
  //     <HashRouter>
  //       <Switch>
  //         <Route  path='/' component={site} />
  //       </Switch>
  //     </HashRouter>,
  //     document.getElementById('' + id) as HTMLElement
  //   )
  // }
  // ============== 不會改變url的路由,但是不能上一頁下一頁  ==============//
  // render(id: string){
  //   return ReactDOM.render(
  //     <MemoryRouter
  //       initialEntries={['/one', '/two', { pathname: '/three' }]}
  //       initialIndex={1}
  //     >
  //       <Home />
  //     </MemoryRouter>,
  //     document.getElementById(''+id) as HTMLElement
  //   )
  // }
}
// ============== 本機端開發要打開 部署關閉==============//
// new CeddHomepage().render("root", "20139", [
//   "Administrator",
//   "Power User",
//   "User"
// ]);
// ============== 本機端開發要打開 部署關閉==============//

// ============== 部署要打開 本機端關閉==============//
window.CeddGeo = new CeddGEO();
// ============== 部署要打開 本機端關閉==============//
// registerServiceWorker()
