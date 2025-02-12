# Uni Drive – Deine Mitfahrplattform für die Uni Bayreuth

Willkommen zu **Uni Drive**, einem interaktiven Web-Projekt für Fahrgemeinschaften rund um die Universität Bayreuth.  
Ziel ist es, die **Bildung von Fahrgemeinschaften** zu vereinfachen – sei es für das tägliche Pendeln oder für gemeinsame Fahrten innerhalb der Region.

---

## Inhaltsverzeichnis

1. [Projektüberblick](#projektüberblick)  
2. [Key Features & USP](#key-features--usp)  
3. [Installation & Setup](#installation--setup)  
4. [Benutzung](#benutzung)  
5. [Projektstruktur](#projektstruktur)  
6. [Externe Services & API-Keys](#externe-services--api-keys)  
7. [Lizenz](#lizenz)  
8. [Projektteam](#projektteam)  
9. [Verweise & Weiterführende Infos](#verweise--weiterführende-infos)

---

## Projektüberblick

**Warum Uni Drive?**  
- Die Universität Bayreuth möchte Mitarbeitenden und Studierenden eine nachhaltige Alternative zum Individualverkehr bieten.  
- **Pendelverkehr** zwischen Campus Bayreuth und Kulmbach sowie Fahrten in der Region verursachen oft **unnötige CO₂-Emissionen** und hohe Verkehrsdichte.  
- **Uni Drive** hilft, **Mitfahrgelegenheiten** effizient zu koordinieren, dadurch wird sowohl Zeit als auch CO₂ gespart.

---

## Key Features & USP

1. **Mitfahrer- und Fahrersuche**  
   - User stellen eine Fahrt ein und wählen, ob sie noch **Fahrer** oder **Mitfahrer** suchen.  
   - Jede Fahrt landet direkt in einer Datenbank, sodass alle anderen User diese sehen können.

2. **Gruppenchat**  
   - Tritt man einer Fahrt bei, wird automatisch ein **Chatraum** (Gruppenchat) erstellt.  
   - Teilnehmer klären dort Details wie Abfahrtszeit, Zustiegspunkte oder Kosten.

3. **Forum**  
   - Zusätzlich zum Chat kann man sich im **allgemeinen Forum** austauschen, Fahrten bewerben oder Feedback geben.

4. **Kartenintegration**  
   - Die Route wird als **Linie auf einer Leaflet-Karte** dargestellt (basierend auf GeoJSON-Daten). ([Leaflet](https://leafletjs.com/)-Bibliothek)  
   - So sehen User sofort, welche Orte auf dem Weg liegen und ob ein Zwischeneinstieg möglich ist.

5. **Nachhaltiger Gedanke**  
   - Jede Mitfahrgelegenheit reduziert CO₂-Ausstoß und entlastet den Verkehr.  
   - Das Projekt unterstützt die Universität Bayreuth bei ihrem Ziel, eine **umweltfreundlichere Mobilität** zu fördern.

---

## Installation & Setup

1. **Voraussetzungen**  
   - [Node.js](https://nodejs.org/) (empfohlene Version siehe `package.json`)  
   - Ein beliebiger Paketmanager wie `npm` oder `yarn`.

2. **Repository klonen**  
   ```bash
   git clone https://github.com/<euer_repo>/swps_starter_group1.git
   cd swps_starter_group1

3. **Abhängigkeiten installieren**

```bash
npm install
```
oder
```bash
yarn install
```

4. **Development Server starten**
```bash
npm run serve
```

Danach kann das Projekt unter http://localhost:3000 im Browser aufgerufen werden.

Hinweis: Ein zusätzliches Setup in Supabase ist nicht nötig, da wir bereits eine fertige Supabase-Datenbank verwenden. Solange supabaseUrl und supabaseKey im Code hinterlegt sind, läuft das Backend automatisch.


---

## Benutzung

1. **Registrierung & Login**  
   - Nach dem Start gelangt man auf die Startseite.  
   - Hier kann man sich **registrieren** oder **einloggen**.
   - Zur Regestrierung muss eine bestehende valide E-Mail Adresse genommen werden, diese wird nämlich von Supabase verifiziert indem man einen Verifizierungs-Link zugeschickt bekommt, welche selbst besätigt werden muss.

2. **Fahrt erstellen**  
   - Mit `+ Neue Fahrt inserieren` kann eine Fahrt angelegt werden.  
   - Die Adresse wird per Geoapify-API in **GeoJSON** umgewandelt, um sie auf der Karte darzustellen.
   - Wichtig! Es müssen alle Felder eingegben werden und die Adressen müssen richtig geschrieben werden und existiern. Falls der Benutzer fehler bei der Eingabe macht wird im Formular darauf hingewiesen und er muss ggf. die Fahrt nocheinmal mit den korrekten Daten inserieren. 

3. **Alle Fahrten ansehen & filtern**  
   - Die "Wer Fährt demnächts" Seite zeigt **alle anstehenden Fahrten** in einer Tabelle an.  
   - Man kann nach Datum, Abfahrtsort, Zielort, Status usw. filtern.

4. **Einer Fahrt beitreten**  
   - Durch Klicken auf `Beitreten` tritt man einer Fahrt bei, was einen Gruppenchat für die Fahrt eröffnet.  

5. **Forum**  
   - Ein **Forum** ermöglicht den offenen Austausch zwischen allen Nutzern.  
   - Hier können Fahrten beworben und Diskussionen geführt werden.

---

## Projektstruktur

```bash
swps_starter_group1/
├── public/                # Öffentlich zugängliche statische Ressourcen
│   ├── images/            # genutzte Bilder und Grafiken in unserem Projekt       
│   ├── index.html         # Haupt-HTML-Datei für den Vue.js-Einstiegspunkt
├── src/                   # Hauptverzeichnis des Vue.js-Projekts
│   ├── assets/            # Statische Ressourcen (CSS, Bilder, JSON-Dateien)
│   │   ├── css/           # Stile für verschiedene Komponenten
│   │   │   ├── base.css   # Basis-Stile für die gesamte Anwendung
│   │   │   ├── layout.css # Globale Layout-Stile
│   │   │   └── ...        # Weitere CSS-Dateien für Seiten und Komponenten
│   │   └── images/        # Bilder und Icons
│   │       └── ...        # Spezifische Bilddateien
│   ├── components/        # Wiederverwendbare Vue-Komponenten
│   │   ├── CalendarComponent.vue       # Kalender-Komponente mit FullCalendar
│   │   ├── ErstelleTermin.vue          # Komponente zum Erstellen neuer Termine
│   │   ├── FooterComponent.vue         # Footer der Anwendung
│   │   ├── HeaderComponent.vue         # Header mit Navigation und Benutzerinfo
│   │   ├── MapComponent.vue            # Karte mit Leaflet zur Anzeige von Routen
│   │   ├── SearchComponent.vue         # Suchleiste für Fahrten
│   │   └── TripsInserierenFormular.vue # Formular zum Hinzufügen neuer Fahrten
│   ├── pages/             # Seiten der Anwendung
│   │   ├── CalendarPage.vue            # Kalender-Seite
│   │   ├── ChatPage.vue                # Chat-Seite für Benutzer
│   │   ├── CookiesPage.vue             # Datenschutz- und Cookie-Info-Seite
│   │   ├── ForumPage.vue               # Forum für Diskussionen
│   │   ├── HomePage.vue                # Startseite der Anwendung
│   │   ├── ImpressumPage.vue           # Impressums-Seite
│   │   ├── LoginPage.vue               # Login-Seite für Benutzer
│   │   ├── MapsPage.vue                # Karte zur Anzeige von Fahrten
│   │   ├── ProfilePage.vue             # Benutzerprofil-Seite
│   │   ├── RegisterPage.vue            # Registrierung neuer Benutzer
│   │   ├── RidesPage.vue               # Übersicht aller verfügbaren Fahrten
│   │   ├── TestprojektHinweise.vue     # Hinweise zum Projekt
│   │   ├── TransparenzPage.vue         # Transparenz- und Datenschutzseite
│   │   └── ViewAllTripsPage.vue        # Detaillierte Übersicht über alle Fahrten
│   ├── plugins/           # Vue.js-Plugins und Konfigurationen
│   │   ├── vuetify.js                  # Konfiguration für Vuetify (UI-Framework)
│   │   └── webfontloader.js            # Lädt Schriftarten asynchron
│   ├── router/            # Routing für die Anwendung
│   │   └── index.js                   # Definition aller Routen für die Seiten
│   ├── services/          # Hilfsfunktionen und API-Services
│   │   ├── geoUtils.js                # Konvertiert Adressen in GeoJSON (GeoAPI)
│   │   ├── kmDistanceComputation.js   # Berechnet Entfernungen zwischen Punkten
│   │   ├── sortTable.js               # Hilfsfunktionen für Tabellensortierungen
│   │   └── supabase.js                # Initialisiert Supabase (Datenbankverbindung)
│   ├── App.vue             # Haupteinstiegspunkt für die Vue.js-Anwendung
│   ├── main.js             # Initialisiert Vue.js und mountet die App
│   └── ...                 # Weitere Konfigurationsdateien
├── .gitignore              # Definiert Dateien/Ordner, die von Git ignoriert werden
├── babel.config.js         # Konfigurationsdatei für Babel (JS-Compiler)
├── jsconfig.json           # VSCode-Konfiguration für JavaScript
├── package-lock.json       # Sperrt Paketversionen für die Anwendung
├── package.json            # Projekt-Metadaten und Abhängigkeiten
├── README.md               # Projektbeschreibung und Dokumentation
└── vue.config.js           # Vue.js-spezifische Konfiguration
```

**Wichtige Ordner & Dateien kurz erklärt:**

- **public/**  
  Enthält statische Ressourcen (HTML, Bilder, JSON-Dateien).  
- **src/assets/**  
  CSS-Dateien (`home.css`, `layout.css` …) und weitere Bilddateien.  
- **src/components/**  
  Wiederverwendbare Vue-Komponenten (z. B. `MapComponent`, `HeaderComponent`, etc.).  
- **src/pages/**  
  „Seitenkomponenten“, die per Router angesteuert werden (z. B. `HomePage`, `LoginPage`, `RidesPage`).  
- **src/services/**  
  - `geoUtils.js`: Nutzt die Geoapify-API zur Adressumwandlung in GeoJSON.  
  - `supabase.js`: Initialisiert den Supabase-Client.  
- **plugins/**  
  - `vuetify.js`: Bindet das Vuetify-UI-Framework ein.  
  - `webfontloader.js`: Lädt Schriften asynchron.  
- **router/index.js**  
  Definiert alle Routen zu den jeweiligen Seitenkomponenten.  
- **package.json**  
  Enthält Projektmetadaten, Abhängigkeiten und Skripte.  
- **README.md**  
  Diese Dokumentation.

**Components**

- **`CalendarComponent.vue`**  
  Ermöglicht die Anzeige und Verwaltung eines Kalenders mithilfe von FullCalendar. Benutzer können Termine visualisieren.

- **`ErstelleTermin.vue`**  
  Ein Formular, um neue Termine zu erstellen und in die Datenbank einzufügen. Unterstützt die Eingabe von Zeit, Datum, Adresse und einem Wiederholungsmuster.

- **`FooterComponent.vue`**  
  Der Footer der Anwendung. Beinhaltet allgemeine Informationen, Links (z. B. Impressum, Datenschutz) und rechtliche Hinweise.

- **`HeaderComponent.vue`**  
  Der Header der Anwendung. Zeigt Navigationselemente (z. B. Links zu Seiten) und Benutzerinformationen (z. B. Login/Logout) an.

- **`MapComponent.vue`**  
  Bindet die Leaflet-Bibliothek ein, um Karten anzuzeigen. Visualisiert Routen und Standorte basierend auf GeoJSON-Daten.

- **`SearchComponent.vue`**  
  Eine Suchleiste mit Filtern (z. B. Datum, Startort, Zielort) zur Anzeige relevanter Fahrten. Unterstützt erweiterte Filteroptionen.

- **`TripsInserierenFormular.vue`**  
  Ein Formular, um neue Fahrten zu erstellen. Konvertiert eingegebene Adressen in GeoJSON, erstellt Routen und speichert sie in der Datenbank.

---

**Pages**

- **`CalendarPage.vue`**  
  Zeigt eine Seite mit einem interaktiven Kalender, der geplante Fahrten und Termine visualisiert.

- **`ChatPage.vue`**  
  Seite für Gruppenchats zwischen Benutzern, die an einer Fahrt teilnehmen. Unterstützt die Abstimmung von Details.

- **`CookiesPage.vue`**  
  Informationsseite über die Verwendung von Cookies und Datenschutzrichtlinien.

- **`ForumPage.vue`**  
  Ein offenes Forum, in dem Benutzer Fahrten bewerben, Feedback geben oder allgemeine Diskussionen führen können.

- **`HomePage.vue`**  
  Die Startseite der Anwendung. Bietet eine Übersicht über Funktionen und eine Navigation zu den Hauptfeatures.

- **`ImpressumPage.vue`**  
  Rechtliche Angaben wie Impressum und Kontaktdaten.

- **`LoginPage.vue`**  
  Ermöglicht Benutzern das Einloggen in ihre Konten. Verbindet sich mit der Supabase-Authentifizierung.

- **`MapsPage.vue`**  
  Zeigt eine Karte an, auf der einzelne registrierten Fahrten visualisiert werden können.

- **`ProfilePage.vue`**  
  Eine Profilseite, die Benutzerdaten anzeigt. Bietet Optionen zur Einsicht persönlicher Informationen und einer Übersicht vergangener Fahrten.

- **`RegisterPage.vue`**  
  Ermöglicht Benutzern, ein Konto zu erstellen. Verbindet sich mit der Supabase-Authentifizierung und fügt neue Benutzer zur Datenbank hinzu.

- **`RidesPage.vue`**  
  Die Seite zum inserieren von Fahrten.

- **`TestprojektHinweise.vue`**  
  Eine Seite mit Hinweisen, die infos zu unserem Projekt liefern.

- **`TransparenzPage.vue`**  
  Informationen über die Transparenzrichtlinien, Datenschutz und Datennutzung.

- **`ViewAllTripsPage.vue`**  
  Zeigt alle Fahrten in einer detaillierten Ansicht an. Unterstützt erweiterte Filteroptionen und die Möglichkeit, einer Fahrt beizutreten.

---

## Externe Services & API-Keys

- **Supabase**  
  - Bereitstellung einer Datenbank, Authentifizierung und Backend-Funktionen.  
  - `supabaseUrl` und `supabaseKey` werden in `src/services/supabase.js` hinterlegt.

- **Geoapify API**  
  - Konvertiert Adressen in Koordinaten/GeoJSON für die Kartenanzeige.  
  - API-Key in `src/services/geoUtils.js`.

---

## Lizenz

Dieses Projekt wird **Open Source** entwickelt.  

---

## Projektteam

- **Jakob Wölfel**  
- **Viktor Person**  
- **Nikita Singh**  
- **Christina Castedello**

*Product Owner (Scrum):* Anna  
*Betreuer & Bewertender:* Sebastian Duda

---

## Verweise & Weiterführende Infos

- **White-Paper**: Enthält detaillierte Informationen zu Scrum, Entwicklungsphasen und technischen Hintergründen.  
- **Kontakt**: Bei Fragen könnt ihr uns über GitHub Issues oder per E-Mail erreichen.  

---
