import { test, expect } from '@playwright/test';
import data from './testData.json'; // Charger les données utilisateur

// Boucle sur chaque utilisateur dans le fichier JSON
data.forEach((data) => {
  test(`Inscription utilisateur : ${data.email}`, async ({ page }) => {
    // Étape 1 : Accéder à la page d'inscription
    await page.goto('https://www.campusfrance.org/fr/user/register');
    await page.waitForLoadState('networkidle');

    // Étape 2 : Remplir l'adresse email et le mot de passe
    await page.fill('input[placeholder="monadresse@domaine.com"]', data.email);
    await page.fill('#edit-pass-pass1', data.motDePasse);
    await page.fill('#edit-pass-pass2', data.motDePasse);

    // Étape 3 : Sélectionner la civilité en fonction du genre
    if (data.genre === "Mme") {
      await page.click('label[for="edit-field-civilite-mme"]');
    } else if (data.genre === "Mr") {
      await page.click('label[for="edit-field-civilite-mr"]');
    } else {
      throw new Error(`Genre non reconnu (Mr, Mme) : ${data.genre}`);
    }

    // Étape 4 : Renseigner le nom et le prénom
    await page.fill('#edit-field-nom-0-value', data.nom);
    await page.fill('#edit-field-prenom-0-value', data.prenom);

    // Étape 5 : Sélectionner le pays de naissance
    await page.click('.selectize-input'); // Cliquez sur le champ de sélection
    await page.click(`//div[@class='option' and text()='-${data.paysNaissance}']`); // Sélection du pays

    // Étape 6 : Saisir la nationalité, code postal, ville et téléphone
    await page.fill('#edit-field-nationalite-0-target-id', data.nationalite);
    await page.fill('#edit-field-code-postal-0-value', data.c_postal);
    await page.fill('#edit-field-ville-0-value', data.ville);
    await page.fill('#edit-field-telephone-0-value', data.numerTel);

    // Étape 7 : Sélection de la profession
    if (data.statut === "Étudiants" || data.statut === "Chercheurs") {
      // Sélectionner le domaine d'études
      await page.click('//*[@id="edit-field-publics-cibles"]/div[1]/label');
      await page.click('//*[@id="edit-field-domaine-etudes-wrapper"]/div/div/div[1]/div');
      await page.click(`//*[@id='edit-field-domaine-etudes-wrapper']//div[normalize-space(text())='${data.domaine}']`);

      // Sélectionner le niveau d'étude
      await page.click('//*[@id="edit-field-niveaux-etude-wrapper"]/div/div/div[1]/div');
      await page.click(`//*[@id='edit-field-niveaux-etude-wrapper']//div[normalize-space(text())='${data.niveau}']`);
    }

    // Étape 8 : Cocher la checkbox pour accepter les communications
    const checkBox = await page.$('#edit-field-accepte-communications-value');
    await page.evaluate((element) => element.click(), checkBox);
  });
});
