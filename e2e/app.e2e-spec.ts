import { LeftletMapDemoPage } from './app.po';

describe('leftlet-map-demo App', function() {
  let page: LeftletMapDemoPage;

  beforeEach(() => {
    page = new LeftletMapDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
