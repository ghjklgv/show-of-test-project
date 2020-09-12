import * as React from "react";
import * as renderer from "react-test-renderer";
import GeoBasicInf from "../../../GeoLib/geoDetail/geoBasicInf";
import * as Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
// import { Link } from 'react-router-dom';
import { MemoryRouter } from "react-router-dom";
configure({ adapter: new Adapter() });

it("Renders Snapshot Test", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <GeoBasicInf
          disabled={false}
          celType={"CEL"}
          // dataOnChange={this.dataOnChange}
          title={"Title"}
          consultant={""}
          contractor={""}
          author={""}
          clientDept={""}
          docOwner={""}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it("Test onChange", () => {
  const obj = {
    type: "CEL",
    title: "",
    consultant: "abc",
    contractor: "XYZ",
    author: "",
    clientDept: "",
    docOwner: "",
  };
  const dataOnChange = ( data: any ,type: any) => {
    obj[type] = data
  };
  const conponent = mount(
    <GeoBasicInf
      disabled={false}
      celType={obj.type}
      dataOnChange={dataOnChange}
      title={"Title"}
      consultant={obj.consultant}
      contractor={obj.contractor}
      author={obj.author}
      clientDept={obj.clientDept}
      docOwner={obj.docOwner}
    />
  );
  conponent.find('input[value="abc"]').simulate('change', { target: { value: 'test' } })
  expect(obj.consultant).toBe("test");
  conponent.find('input[value="XYZ"]').simulate('change', { target: { value: '123' } })
  expect(obj.contractor).toBe("123");
 
});
