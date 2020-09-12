import * as React from "react";
import * as renderer from "react-test-renderer";
import GeoCreAndEdite from "../../GeoLib/geoCreAndEdite";
import GeoBasicInf from "../../GeoLib/geoDetail/geoBasicInf";
import * as Adapter from "enzyme-adapter-react-16";
import { mount, configure, shallow } from "enzyme";

configure({ adapter: new Adapter() });

it("Renders Snapshot Test", () => {
  const tree = renderer
    .create(<GeoCreAndEdite match={{ params: { type: "create" } }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  const treeRejected = renderer
    .create(<GeoCreAndEdite match={{ params: { type: "Rejected" } }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(treeRejected).toMatchSnapshot();
});

it("create unit Test", () => {
  const componentCreate = mount(
    <GeoCreAndEdite match={{ params: { type: "create" } }} />
  );
  componentCreate.setState({
    Permission: { Approving: false, Assigning: false },
    dataPackage: { title: "Test123123" },
  });
  componentCreate
    .find('input[value="Test123123"]')
    .simulate("change", { target: { value: "abc" } });
  expect(componentCreate.state("dataPackage")["title"]).toBe("abc");
});

it("Rejected unit Test", () => {
  const component = mount(
    <GeoCreAndEdite match={{ params: { type: "Rejected" } }} />
  );
  component.setState({
    Permission: { Approving: false, Assigning: false },
    // dataPackage: { title: "Test123123" },
  });

  expect(
    component
      .find(".geo-detail-sent")
      .at(1)
      .props().disabled
  ).toBe(true);
});

it("Accepted unit Test", () => {
  const component = mount(
    <GeoCreAndEdite match={{ params: { type: "Accepted" } }} />
  );
  component.setState({
    disabled: false,
    topLeftEast: 1.1,
    Permission: { Approving: true, Assigning: false },
    dataPackage: { title: "Test123123" },
  });

  expect(
    component
      .find(".geo-detail-sent")
      .at(1)
      .props().disabled
  ).toBe(true);
});

it("Processing unit Test", () => {
  const component = mount(
    <GeoCreAndEdite match={{ params: { type: "Processing" } }} />
  );
  component.setState({
    disabled: false,
    topLeftEast: 1.1,
    Permission: { Approving: true, Assigning: false },
    dataPackage: { title: "Test123123" },
  });
  component.find(".back-Style").simulate("click");
  expect(window.location.pathname).toBe("/");

  component.setState({
    disabled: true,
    Permission: { Approving: true, Assigning: false },
    dataPackage: {
      title: "Test123123",
      topLeftNorth: 1.1,
      celType: "",
      clientDept: "",
      consultant: "",
      docOwner: "",
      contractor: "",
    },
  });
  const anonymous = (data: any, type: any) => {
    console.log(data);
  };
  expect(component.state("disabled")).toBe(true);
  expect(JSON.stringify(component.instance().basicComponent())).toEqual(
    JSON.stringify(
      <GeoBasicInf
        disabled={component.state("disabled")}
        celType={component.state("dataPackage")["celType"]}
        dataOnChange={anonymous}
        title={component.state("dataPackage")["title"]}
        consultant={component.state("dataPackage")["consultant"]}
        contractor={component.state("dataPackage")["contractor"]}
        author={component.state("dataPackage")["author"]}
        clientDept={component.state("dataPackage")["clientDept"]}
        docOwner={component.state("dataPackage")["docOwner"]}
      />
    )
  );

  component.instance().dataOnChange("abc", "celType");
  expect(component.state("dataPackage")["publicFlag"]).toEqual(null);
  expect(component.state("dataPackage")["celType"]).toEqual("abc");
});
