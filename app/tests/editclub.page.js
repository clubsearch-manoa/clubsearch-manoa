import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class EditClubPage {
  constructor() {
    this.pageId = `#${PageIDs.editClubPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then edits an existing club */
  async editClub(testController) {
    const name = 'Martial Acolytes';
    const image = 'https://t4.ftcdn.net/jpg/00/63/92/39/360_F_63923978_s2mPCruPpYawQfHHr1B4nB2sIAFackIK.jpg';
    const description = 'Growing awesome computer scientists, one graduate at a time.';
    const meetingTimes = 'Tuesdays: 2 PM - 3:30 PM';
    const contact = 'kumit3Luvr@gmail.com';

    await this.isDisplayed(testController);
    await testController.typeText(`#${ComponentIDs.editClubFormName}`, name);
    await testController.typeText(`#${ComponentIDs.editClubFormImage}`, image);
    await testController.typeText(`#${ComponentIDs.editClubFormDescription}`, description);
    await testController.typeText(`#${ComponentIDs.editClubFormMeetingTimes}`, meetingTimes);
    await testController.typeText(`#${ComponentIDs.editClubFormContact}`, contact);

    // Select tags
    const tagsSelector = Selector('input[type="checkbox"]');
    // Should uncheck Martial Arts tag
    await testController.click(tagsSelector.withText('Martial Arts'));
    // Should check Religion tag
    await testController.click(tagsSelector.withText('Religion'));
    await testController.click(`#${ComponentIDs.editClubFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editClubPage = new EditClubPage();
