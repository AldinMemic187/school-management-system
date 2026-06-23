const pptxgen = require('pptxgenjs');
const path = require('path');
let pptx = new pptxgen();

// Set layout to Widescreen (16:9)
// Default pptxgenjs dimensions for LAYOUT_16x9 are 10 x 5.625 inches
pptx.layout = 'LAYOUT_16x9';

// Theme Colors
const COLOR_BG_DARK = '0F172A';     // Slate 900
const COLOR_BG_LIGHT = 'F8FAFC';    // Slate 50
const COLOR_CARD_LIGHT = 'FFFFFF';  // Pure White Card
const COLOR_CARD_DARK = '1E293B';   // Slate 800 Card
const COLOR_TEXT_DARK = '1E293B';   // Slate 800
const COLOR_TEXT_MUTED = '64748B';  // Slate 500
const COLOR_TEXT_LIGHT = 'F8FAFC';  // Slate 50
const COLOR_BLUE = '3B82F6';        // Royal Blue
const COLOR_DEEP_BLUE = '1E3A8A';   // Dark Navy Blue
const COLOR_GREEN = '10B981';       // Emerald Green

// Helper function to draw slides title and header structure (Light slides)
function addSlideHeader(slide, titleText) {
  // Title text
  slide.addText(titleText, {
    x: 0.8,
    y: 0.4,
    w: 8.4,
    h: 0.4,
    fontSize: 20,
    color: COLOR_TEXT_DARK,
    bold: true,
    fontFace: 'Segoe UI'
  });

  // Elegant divider line below title
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8,
    y: 0.9,
    w: 8.4,
    h: 0.02,
    fill: { color: COLOR_BLUE }
  });
}

// ==========================================
// SLIDE 1: Title Slide (Dark Theme)
// ==========================================
let slide1 = pptx.addSlide();
slide1.background = { fill: COLOR_BG_DARK };

slide1.addText('School Management System', {
  x: 0.5,
  y: 1.6,
  w: 9.0,
  h: 0.8,
  fontSize: 32,
  color: COLOR_TEXT_LIGHT,
  bold: true,
  fontFace: 'Segoe UI',
  align: 'center'
});

// Subtle separator line
slide1.addShape(pptx.shapes.RECTANGLE, {
  x: 3.5,
  y: 2.5,
  w: 3.0,
  h: 0.04,
  fill: { color: COLOR_GREEN }
});

slide1.addText('Projektarbeit – Testdokumentation & Setup', {
  x: 0.5,
  y: 2.8,
  w: 9.0,
  h: 0.5,
  fontSize: 16,
  color: COLOR_BLUE,
  bold: false,
  fontFace: 'Segoe UI',
  align: 'center'
});

slide1.addText('Vorgelegt von:\nAldin Memic & Ljundrim Ganiji', {
  x: 0.5,
  y: 4.2,
  w: 9.0,
  h: 0.6,
  fontSize: 12,
  color: COLOR_TEXT_MUTED,
  fontFace: 'Segoe UI',
  align: 'center',
  lineSpacing: 16
});


// ==========================================
// SLIDE 2: System-Architektur (Light Theme)
// ==========================================
let slide2 = pptx.addSlide();
slide2.background = { fill: COLOR_BG_LIGHT };
addSlideHeader(slide2, 'System-Architektur & Tech-Stack');

// Left Card - Frontend
slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 1.2,
  w: 4.0,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide2.addText('Frontend-Architektur', {
  x: 1.0,
  y: 1.4,
  w: 3.6,
  h: 0.3,
  fontSize: 14,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide2.addText([
  { text: '• Angular 17 SPA (sakai-ng Dashboard-Template)\n', options: { paraSpaceAfter: 8 } },
  { text: '• PrimeNG 17 & PrimeFlex UI-Komponenten\n', options: { paraSpaceAfter: 8 } },
  { text: '• RxJS für reaktive Datenströme & HTTP-Requests\n', options: { paraSpaceAfter: 8 } },
  { text: '• Jest für performante Unit- & Integrationstests\n', options: { paraSpaceAfter: 8 } },
  { text: '• Playwright für automatisierte E2E-Browsertests', options: {} }
], {
  x: 1.0,
  y: 1.8,
  w: 3.6,
  h: 3.0,
  fontSize: 10.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 15
});

// Right Card - Backend
slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 5.2,
  y: 1.2,
  w: 4.0,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide2.addText('Backend & Datenbank', {
  x: 5.4,
  y: 1.4,
  w: 3.6,
  h: 0.3,
  fontSize: 14,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide2.addText([
  { text: '• ASP.NET Core 8.0 Web-API (REST-Schnittstellen)\n', options: { paraSpaceAfter: 8 } },
  { text: '• Entity Framework Core 6.0 mit SQL Server\n', options: { paraSpaceAfter: 8 } },
  { text: '• SignalR für Echtzeit-Kommunikation & Notifikationen\n', options: { paraSpaceAfter: 8 } },
  { text: '• AutoMapper für sauberes DTO-Objektmapping\n', options: { paraSpaceAfter: 8 } },
  { text: '• Repository-Muster (Unit of Work) zur Kapselung', options: {} }
], {
  x: 5.4,
  y: 1.8,
  w: 3.6,
  h: 3.0,
  fontSize: 10.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 15
});


// ==========================================
// SLIDE 3: Testpyramide & Verteilung (Light Theme)
// ==========================================
let slide3 = pptx.addSlide();
slide3.background = { fill: COLOR_BG_LIGHT };
addSlideHeader(slide3, 'Testpyramide & Aufgabenverteilung');

// Row 1 - Left: Unit Tests
slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 1.2,
  w: 4.0,
  h: 1.4,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide3.addText('Unit Tests (10 Gesamt / 5 pro Person)', {
  x: 0.95,
  y: 1.3,
  w: 3.7,
  h: 0.25,
  fontSize: 11.5,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide3.addText('• Isolation & Test der Angular Services mit Jest-Mocks\n• Mocken aller HTTP-Verbindungen per MockProvider', {
  x: 0.95,
  y: 1.6,
  w: 3.7,
  h: 0.9,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Row 1 - Right: Integration Tests
slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 5.2,
  y: 1.2,
  w: 4.0,
  h: 1.4,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide3.addText('Integration Tests (6 Gesamt / 3 pro Person)', {
  x: 5.35,
  y: 1.3,
  w: 3.7,
  h: 0.25,
  fontSize: 11.5,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide3.addText('• Testen der UI-Komponenten (DOM-Interaktionen) in Jest\n• Verwendung isolierter Mock-Services anstelle echter APIs', {
  x: 5.35,
  y: 1.6,
  w: 3.7,
  h: 0.9,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Row 2 - Left: E2E Tests
slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 2.8,
  w: 4.0,
  h: 1.4,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide3.addText('System / E2E Tests (4 Gesamt / 2 pro Person)', {
  x: 0.95,
  y: 2.9,
  w: 3.7,
  h: 0.25,
  fontSize: 11.5,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide3.addText('• Playwright-Benutzerszenarien in echten Webbrowsern\n• API-Requests werden über page.route() mit Mocks simuliert', {
  x: 0.95,
  y: 3.2,
  w: 3.7,
  h: 0.9,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Row 2 - Right: Load Tests
slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 5.2,
  y: 2.8,
  w: 4.0,
  h: 1.4,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide3.addText('Lasttests (2 Gesamt / 1 pro Person)', {
  x: 5.35,
  y: 2.9,
  w: 3.7,
  h: 0.25,
  fontSize: 11.5,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide3.addText('• Lokale Performance- und Spike-Messungen mit k6\n• Validierung der Durchsatzgrenzen und API-Thresholds', {
  x: 5.35,
  y: 3.2,
  w: 3.7,
  h: 0.9,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Status Banner at bottom
slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 4.4,
  w: 8.4,
  h: 0.5,
  fill: { color: COLOR_BG_DARK }
});

slide3.addText('✓ Jeder Entwickler deckt genau 11 Tests ab (Gesamtzahl: 22 Tests)', {
  x: 0.8,
  y: 4.4,
  w: 8.4,
  h: 0.5,
  fontSize: 11,
  color: COLOR_GREEN,
  bold: true,
  fontFace: 'Segoe UI',
  align: 'center',
  valign: 'middle'
});


// ==========================================
// SLIDE 4: Modernisiertes Test-Setup (Light Theme)
// ==========================================
let slide4 = pptx.addSlide();
slide4.background = { fill: COLOR_BG_LIGHT };
addSlideHeader(slide4, 'Modernisiertes Test-Setup');

// Card 1: Jest Migration
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 1.2,
  w: 2.67,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide4.addText('1. Jest Migration', {
  x: 0.95,
  y: 1.4,
  w: 2.37,
  h: 0.3,
  fontSize: 13,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide4.addText([
  { text: '• Karma/Jasmine vollständig aus Angular entfernt.\n', options: { paraSpaceAfter: 8 } },
  { text: '• Testläufe nativ in Node.js unter Verwendung eines schnellen jsdom (virtuelles DOM).\n', options: { paraSpaceAfter: 8 } },
  { text: '• Signifikante Reduktion der lokalen CI-Ausführungszeit.', options: {} }
], {
  x: 0.95,
  y: 1.8,
  w: 2.37,
  h: 3.0,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Card 2: Playwright E2E
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 3.67,
  y: 1.2,
  w: 2.66,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide4.addText('2. Playwright E2E', {
  x: 3.82,
  y: 1.4,
  w: 2.36,
  h: 0.3,
  fontSize: 13,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide4.addText([
  { text: '• Führt E2E-Tests in echten Browsern (Chromium/Firefox/Webkit) aus.\n', options: { paraSpaceAfter: 8 } },
  { text: '• Auto-waiting verringert instabile Testläufe ("Flakiness").\n', options: { paraSpaceAfter: 8 } },
  { text: '• Vollständig isolierte Kontexte pro Browserinstanz.', options: {} }
], {
  x: 3.82,
  y: 1.8,
  w: 2.36,
  h: 3.0,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Card 3: k6 Lasttests
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 6.53,
  y: 1.2,
  w: 2.67,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide4.addText('3. k6 Lasttests', {
  x: 6.68,
  y: 1.4,
  w: 2.37,
  h: 0.3,
  fontSize: 13,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide4.addText([
  { text: '• Lastprofile in modernem ES6 JavaScript formulierbar.\n', options: { paraSpaceAfter: 8 } },
  { text: '• Minimale CPU- und RAM-Last dank effizienter Go-Engine.\n', options: { paraSpaceAfter: 8 } },
  { text: '• Schnelle Konfiguration von Metrik-Schwellwerten (Thresholds).', options: {} }
], {
  x: 6.68,
  y: 1.8,
  w: 2.37,
  h: 3.0,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});


// ==========================================
// SLIDE 5: Test-Isolation & CI/CD (Light Theme)
// ==========================================
let slide5 = pptx.addSlide();
slide5.background = { fill: COLOR_BG_LIGHT };
addSlideHeader(slide5, 'Test-Isolation & CI/CD Pipeline');

// Left Card - Isolation
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 1.2,
  w: 4.0,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide5.addText('Kapselung & Mocking', {
  x: 1.0,
  y: 1.4,
  w: 3.6,
  h: 0.3,
  fontSize: 14,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide5.addText([
  { text: '• Angular HttpClient-Mocks per HttpClientTestingModule fangen Netzwerkaufrufe ab.\n', options: { paraSpaceAfter: 8 } },
  { text: '• NO_ERRORS_SCHEMA blendet unbekannte UI-Tags aus und erlaubt fokussierte Tests.\n', options: { paraSpaceAfter: 8 } },
  { text: '• Playwright fängt API-Aufrufe mit page.route() ab und liefert statische JSON-Mocks, um unabhängig von DB-Schreibzugriffen zu bleiben.', options: {} }
], {
  x: 1.0,
  y: 1.8,
  w: 3.6,
  h: 3.0,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Right Card - Pipeline
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 5.2,
  y: 1.2,
  w: 4.0,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide5.addText('GitHub Actions CI Pipeline', {
  x: 5.4,
  y: 1.4,
  w: 3.6,
  h: 0.3,
  fontSize: 14,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide5.addText([
  { text: '• Automatische Ausführung der Unit-, Integrations- und Playwright-Tests bei Push & PR.\n', options: { paraSpaceAfter: 8 } },
  { text: '• Playwright-webServer startet den Angular-Server automatisch im Hintergrund und beendet ihn nach Testende.\n', options: { paraSpaceAfter: 8 } },
  { text: '• Fehlerhafte Tests blockieren den Merge-Vorgang und sichern eine robuste Codebasis.', options: {} }
], {
  x: 5.4,
  y: 1.8,
  w: 3.6,
  h: 3.0,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});


// ==========================================
// SLIDE 6: Lasttests & Analyse (Light Theme)
// ==========================================
let slide6 = pptx.addSlide();
slide6.background = { fill: COLOR_BG_LIGHT };
addSlideHeader(slide6, 'Last- & Spike-Tests (k6 Analysis)');

// Left Card - Courses
slide6.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 1.2,
  w: 4.0,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide6.addText('1. Courses Load Test (Aldin Memic)', {
  x: 1.0,
  y: 1.4,
  w: 3.6,
  h: 0.3,
  fontSize: 13,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide6.addText([
  { text: '• Endpoint: GET /api/course/getAll\n', options: { paraSpaceAfter: 6 } },
  { text: '• Profil: Linearer Anstieg auf 50 VUs (10s), danach 15s Haltephase unter Volllast, gefolgt von 5s Cool-down.\n', options: { paraSpaceAfter: 6 } },
  { text: '• Metrik (p95): Reaktionsgeschwindigkeit konstant bei ca. 120 ms (Threshold lag bei < 500 ms).\n', options: { paraSpaceAfter: 6 } },
  { text: '• Fehlerrate: 0,00% (Alle Anfragen bestanden).', options: {} }
], {
  x: 1.0,
  y: 1.8,
  w: 3.6,
  h: 3.0,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});

// Right Card - Exams
slide6.addShape(pptx.shapes.RECTANGLE, {
  x: 5.2,
  y: 1.2,
  w: 4.0,
  h: 3.8,
  fill: { color: COLOR_CARD_LIGHT },
  line: { color: 'E2E8F0', width: 1 }
});

slide6.addText('2. Exam Spike Test (Ljundrim Ganiji)', {
  x: 5.4,
  y: 1.4,
  w: 3.6,
  h: 0.3,
  fontSize: 13,
  color: COLOR_DEEP_BLUE,
  bold: true,
  fontFace: 'Segoe UI'
});

slide6.addText([
  { text: '• Endpoint: POST /api/exam/submitAnswers\n', options: { paraSpaceAfter: 6 } },
  { text: '• Profil: Rapider Anstieg von 20 auf 200 VUs innerhalb von 5s, gefolgt von 15s dauerhafter Lastspitze.\n', options: { paraSpaceAfter: 6 } },
  { text: '• Metrik (p95): Antwortzeit stieg kurz auf maximal 780 ms an, sank aber schnell auf ca. 150 ms.\n', options: { paraSpaceAfter: 6 } },
  { text: '• Fehlerrate: 0,00% (Kein Verbindungsabbruch).', options: {} }
], {
  x: 5.4,
  y: 1.8,
  w: 3.6,
  h: 3.0,
  fontSize: 9.5,
  color: COLOR_TEXT_DARK,
  fontFace: 'Segoe UI',
  lineSpacing: 14
});


// ==========================================
// SLIDE 7: Fazit & Ergebnis (Dark Theme)
// ==========================================
let slide7 = pptx.addSlide();
slide7.background = { fill: COLOR_BG_DARK };

slide7.addText('Fazit & Projektergebnis', {
  x: 0.5,
  y: 0.8,
  w: 9.0,
  h: 0.5,
  fontSize: 24,
  color: COLOR_TEXT_LIGHT,
  bold: true,
  fontFace: 'Segoe UI',
  align: 'center'
});

slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 3.5,
  y: 1.4,
  w: 3.0,
  h: 0.03,
  fill: { color: COLOR_GREEN }
});

// Stylized Summary Card
slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 1.5,
  y: 1.8,
  w: 7.0,
  h: 3.2,
  fill: { color: COLOR_CARD_DARK }
});

slide7.addText([
  { text: '✓ Erfolgreiche Jest-Migration (Karma komplett abgelöst)\n\n', options: {} },
  { text: '✓ Hohe Absicherung: 22 Tests insgesamt (genau 11 pro Person)\n\n', options: {} },
  { text: '✓ Stabile Playwright E2E-Tests durch API-Netzwerk-Mocking im CI\n\n', options: {} },
  { text: '✓ Performance-Nachweis: k6 Lasttests belegen Stabilität der API\n\n', options: {} },
  { text: '✓ Vollautomatische Validierung über GitHub Actions Build-Pipeline', options: {} }
], {
  x: 1.8,
  y: 2.0,
  w: 6.4,
  h: 2.8,
  fontSize: 11,
  color: COLOR_TEXT_LIGHT,
  fontFace: 'Segoe UI',
  lineSpacing: 16
});

// Resolve parent folder path to save directly into root directory
const rootPath = path.resolve(__dirname, '../PRESENTATION.pptx');

pptx.writeFile({ fileName: rootPath })
  .then(fileName => {
    console.log(`SUCCESS: PowerPoint presentation written successfully to: ${fileName}`);
  })
  .catch(err => {
    console.error('ERROR during PowerPoint generation:', err);
    process.exit(1);
  });
