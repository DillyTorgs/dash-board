import { html, fixture, expect } from '@open-wc/testing';
import "../hax-use-case-app.js";

describe("DashBoard test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <dash-board
        title="title"
      ></dash-board>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
