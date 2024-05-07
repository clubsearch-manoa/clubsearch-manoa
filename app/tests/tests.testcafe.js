import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { signOutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { homePage } from './home.page';
import { addClubPage } from './addclub.page';
import { deleteClubPage } from './deleteclub.page';
import { editClubPage } from './editclub.page';
import { browseClubsPage } from './browseclubs.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johndoe@foo.com', password: 'changeme' };

const clubAdminCredentials = { username: 'clubadmin@foo.com', password: 'changeme' };

const superAdminCredentials = { username: 'superadmin@foo.com', password: 'changeme' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signOutPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signOutPage.isDisplayed(testController);
});

test('Test that home page display and profile modification works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await homePage.isDisplayed(testController);
  await homePage.updateProfile(testController, credentials.firstName);
  await navBar.ensureLogout(testController);
});

test('Test that addClub page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, superAdminCredentials.username, superAdminCredentials.password);
  await navBar.gotoAddClubPage(testController);
  await addClubPage.isDisplayed(testController);
  await addClubPage.addClub(testController);
});

test('Test that deleteClub page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, superAdminCredentials.username, superAdminCredentials.password);
  await navBar.gotoDeleteClubPage(testController);
  await deleteClubPage.isDisplayed(testController);
  await deleteClubPage.deleteClub(testController);
});

test('Test that editClub page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, clubAdminCredentials.username, clubAdminCredentials.password);
  await navBar.gotoEditClubPage(testController);
  await editClubPage.isDisplayed(testController);
  await editClubPage.editClub(testController);
});

test('Test that browse clubs page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBrowseClubsPage(testController);
  await browseClubsPage.isDisplayed(testController);
});
