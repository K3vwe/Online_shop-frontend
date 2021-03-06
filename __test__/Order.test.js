import { mount } from "enzyme";
import wait from "waait";
import Order, { SINGLE_ORDER_QUERY } from "../components/Order";
import { fakeOrder } from "../lib/testUtils";
import { MockedProvider } from "@apollo/react-testing";
import toJson from "enzyme-to-json";

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: "ord123" } },
    result: { data: { order: fakeOrder() } },
  },
];

describe("<Order/>", () => {
  it("renders the order", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="ord123" />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const order = wrapper.find("div[data-test='order']");
    expect(toJson(order)).toMatchSnapshot();
  });
});
