import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class DeleteClubPage {
  constructor() {
    this.pageId = `#${PageIDs.deleteClubPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async deleteClub(testController) {
    const name = 'Culinary Warriors';
    await this.isDisplayed(testController);
    await testController.typeText(`#${ComponentIDs.deleteClubName}`, name);
    // Delete the selected club from the database
    await testController.click(`#${ComponentIDs.deleteClubFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const deleteClubPage = new DeleteClubPage();
