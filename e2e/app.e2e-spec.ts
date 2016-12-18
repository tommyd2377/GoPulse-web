import { GoPulsePage } from './app.po';

describe('go-pulse App', function() {
  let page: GoPulsePage;

  beforeEach(() => {
    page = new GoPulsePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
