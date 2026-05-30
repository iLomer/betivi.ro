# betivi.ro — Product Vision

**Versiune:** 0.1 draft  
**Data:** Mai 2025  
**Autor:** ANBR Internal

---

## Ce este betivi.ro

betivi.ro este o platformă de comunitate pentru consumatorii de băuturi alcoolice din România, construită în jurul a trei lucruri concrete: **descoperire** (găsești locuri bune), **memorie** (ții minte ce-ai băut) și **identitate** (ești parte dintr-o comunitate cu un simț al umorului).

Tonul e de caterincă, dar utilitatea e reală. Nu e o aplicație de lifestyle cu filtre Instagram, nu e o reclamă deghizată, nu e un agregator de reduceri. E locul unde românul care știe ce bea vine să găsească, să logeze și să împărtășească.

---

## Problema pe care o rezolvă

Românul care vrea să descopere un birt bun în alt oraș nu are unde să caute serios. TripAdvisor e pentru turiști. Google Maps e ok dar nu are context. Grupurile de Facebook sunt haos. Untappd e englezesc și ignoră total contextul românesc: berile de la PET, birtul fără semn, palinca din pod, cramele mici din Oltenia.

Vinul și berea artizanală românească se dezvoltă rapid, dar nu există un loc unde comunitatea să le documenteze și să le recomande între ei.

---

## Cine folosește platforma

**Utilizatorul primar:** Românul de 25-45 de ani care bea cu cap, descoperă locuri noi, apreciază berea artizanală sau vinul local și are simțul umorului.

**Utilizatorul secundar:** Turistul sau expatriatul care vrea să găsească locuri autentice, nu turistice.

**Utilizatorul terțiar:** Producătorii mici (brewery, crame) care vor vizibilitate organică fără să plătească reclame.

---

## Principii de produs

**1. Util înainte de distractiv.**  
Umorul e stratul de sus, nu fundația. Dacă scoți toate glumele, platforma trebuie să rămână valoroasă.

**2. Conținut generat de comunitate, curat de sistem.**  
Nu angajăm redactori. Comunitatea adaugă birturi și beri. Sistemul filtrează prin rating, reviews și moderare ușoară.

**3. Fiecare feature trebuie să răspundă la o întrebare reală.**  
"Unde beau în Cluj mâine seară?" "Ce bere nouă românească merită încercată?" "Ce-am băut la nunta lui Andrei?"  
Dacă un feature nu răspunde la o întrebare pe care utilizatorul și-o pune în viața reală, nu îl construim.

**4. Mobil-first, mereu.**  
Lumea bea la birt cu telefonul în mână, nu cu laptopul.

---

## Features care au sens

### Nucleul (MVP, faza 1)

**Harta birturilor**  
Harta interactivă cu toate birturile, berăriile, cramele și terasele din România. Fiecare locație are: tip, rating, specialitate, număr reviews, adresă. User-generated: oricine poate adăuga un loc nou, oricine poate review-ui. Moderare simplă prin flagging comunitar.

*De ce are sens:* E cel mai căutat lucru. "Unde bem?" e întrebarea de bază.

**Drink tracker (bere + vin + tărie)**  
Log personal de băuturi consumate: denumire, producător, locație, rating, note. Vizualizat ca o halbă/pahar care se umple. Separat pe categorii: bere, vin, tărie.

*De ce are sens:* Untappd are 10 milioane de utilizatori. Există cerere dovedită pentru asta. Versiunea românească lipsește.

**Profilul de betiv**  
Legitimație ANBR cu număr unic, grad (Stagiar / Autorizat / Emerit / Academician), statistici (beri, vinuri, birturi vizitate), insigne câștigate. Imaginea carnetului e descărcabilă ca PNG pentru WhatsApp Status.

*De ce are sens:* E viralitatea organică a platformei. Oamenii vor share pe WhatsApp.

**Directorul producătorilor români**  
Catalog de brewery-uri și crame românești cu produsele lor. Linkabil din tracker: când loghezi o bere, poți vedea pagina producătorului.

*De ce are sens:* Completează trackerul și aduce producătorii mici pe platformă organic.

---

### Faza 2, după validarea MVP

**Circuite de birt**  
Rute curate de utilizatori: "Top 5 berării artizanale în Cluj", "Turul cramelor din Dealu Mare", "Birturile unde servesc după 12 în București". Fiecare circuit e o colecție de locații cu ordine și note.

*De ce are sens:* Răspunde la întrebarea "Unde bem când suntem în vizită?" fără să fie un simplu top. Conținut generat de comunitate, zero costuri editoriale.

**Feed social minimal**  
Nu e o rețea socială. E un feed de activitate: ce-au mai băut prietenii tăi, ce birturi noi au apărut în orașul tău, ce insigne au câștigat alții. Opțional, nu forțat.

*De ce are sens:* Creează retenție fără să transforme platforma în Facebook. Modelul Untappd funcționează exact pe asta.

**"Berea lunii" și "Vinul lunii"**  
O băutură featured pe lună, aleasă prin votul comunității dintre produsele logate în luna respectivă. Banner simplu pe homepage.

*De ce are sens:* Creează engagement recurring și un motiv să revii lunar. Zero costuri de producție, conținutul vine din date existente.

**Check-in la birt**  
"Sunt acum la [Berea lui Dorel, Cluj]" vizibil pe profilul tău și opțional în feed. Expiră după 4 ore.

*De ce are sens:* Completează tracker-ul cu dimensiunea socială în timp real. Nu e Foursquare, e mai simplu. Un buton, o acțiune.

**Pagina de birt**  
Fiecare locație de pe hartă are o pagină dedicată: poze (user-generated), meniu dacă există, reviews text, "specialitatea casei" votată de useri, lista de useri care au fost acolo.

*De ce are sens:* Transformă harta dintr-un pin într-o resursă reală. Crește SEO organic pentru fiecare locație.

---

### Features pe care NU le construim (și de ce)

**Blog / editorial**  
Costă timp și bani, nu scalează, nu e core business. Dacă comunitatea vrea să scrie, există Reddit.

**Marketplace / livrare**  
Alt business complet, altă complexitate, altă echipă. Nu.

**Evenimente / calendar**  
Sună bine în pitch dar cine îl menține? Fiecare festival de bere e diferit, datele expiră, devine gunoi rapid.

**Chat / mesagerie**  
WhatsApp există. Nu reinventăm roata și nu vrem moderare de chat.

**Stories / conținut scurt**  
Dacă vrei să postezi o bere pe stories, ești deja pe Instagram. Nu competăm acolo.

**Sistem de puncte / monedă virtuală**  
Gradele și insignele sunt suficiente. Un sistem de puncte convertibili complică UX-ul și creează așteptări pe care nu le putem gestiona.

**Reclame native / sponsored content**  
Poate mai târziu, dar nu în faza de creștere. Credibilitatea comunității e mai valoroasă decât revenue-ul timpuriu din reclame.

---

## Cum crește platforma

**Viralitate organică:** Carnetul de betiv descărcabil ca imagine. Oamenii îl vor pune pe WhatsApp Status și pe Instagram Story. Zero costuri de marketing.

**SEO local:** Fiecare birt adăugat e o pagină indexabilă. "Berărie artizanală Cluj" adusă de comunitate, nu de noi.

**Producătorii ca aliați:** Brewery-urile și cramele mici nu au vizibilitate. Le oferim o pagină gratis. Ei o promovează publicului lor. Noi câștigăm conținut și trafic.

**Loop de retenție:** Loghezi o bere, halba se umple, câștigi o insignă, dai share la carnet, prietenul tău se înscrie.

---

## Monetizare (mai târziu, nu acum)

Când platforma are tracțiune reală:

**Pagini verificate pentru producători** (brewery, crame): profil extins, logo, link la site, prioritate în search. Abonament mic lunar.

**"Betiv Premium"**: funcții extra pentru useri pasionați, fără reclame. Eventual statistici mai detaliate, export jurnal PDF, teme pentru carnet.

**Circuite sponsorizate**: un festival de bere sau o cramă poate sponsoriza un circuit tematic. Marcat clar ca sponsored, nu deghizat.

Nu facem reclame display. Nu vindem date. Nu facem freemium agresiv care blochează funcții de bază.

---

## Ce nu este betivi.ro

Nu e o aplicație de delivery. Nu e un ghid turistic. Nu e o rețea socială. Nu e o reclamă pentru alcool. Nu e pentru cei care beau iresponsabil.

E un loc pentru oamenii care știu ce beau, vor să țină minte ce-au băut și vor să găsească locuri bune. Cu umor. În română.

---

*"Bem cu rost. Știm ce bem."*
