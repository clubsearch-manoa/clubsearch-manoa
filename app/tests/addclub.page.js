import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddClubPage {
  constructor() {
    this.pageId = `#${PageIDs.addClubPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addClub(testController) {
    const name = 'Martial Acolytes';
    const image = 'https://t4.ftcdn.net/jpg/00/63/92/39/360_F_63923978_s2mPCruPpYawQfHHr1B4nB2sIAFackIK.jpg';
    const description = 'Growing awesome computer scientists, one graduate at a time.';
    const meetingTimes = 'Tuesdays: 2 PM - 3:30 PM';
    const contact = 'kumit3Luvr@gmail.com';
    const adminEmail = 'superadmin@foo.com';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText(`#${ComponentIDs.addClubFormName}`, name);
    await testController.typeText(`#${ComponentIDs.addClubFormImage}`, image);
    await testController.typeText(`#${ComponentIDs.addClubFormDescription}`, description);
    await testController.typeText(`#${ComponentIDs.addClubFormMeetingTimes}`, meetingTimes);
    await testController.typeText(`#${ComponentIDs.addClubFormContact}`, contact);
    await testController.typeText(`#${ComponentIDs.addClubFormEmail}`, adminEmail);

    // Select two interests.
    const tagsSelector = Selector(`#${ComponentIDs.addClubFormTags} div.form-check input`);
    await testController.click(tagsSelector.nth(0));

    await testController.click(`#${ComponentIDs.addClubFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addClubPage = new AddClubPage();
