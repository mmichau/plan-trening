# Siła pod wspinanie — plan treningowy (PWA)

Osobista aplikacja treningowa (PWA): siłownia 3× w tygodniu pod wspinanie, z ochroną kolana (mikropęknięcia, cienka chrząstka). Działa offline, bez konta i bez serwera — dane zostają na telefonie.

🔗 **Aplikacja:** https://mmichau.github.io/plan-trening/

## Funkcje

- **Dziś** — trening na dany dzień z checkboxami, zapisem ciężarów i ostatnim wynikiem; przeglądanie dat wstecz i zamiana treningu (Dzień A/B, ścianka, odpoczynek)
- **Dzień A / Dzień B** — plan siłowy z rozgrzewką, rozciąganiem i linkami „Jak to zrobić”
- **Kolano** — codzienna ocena kolana (0 = ok, 1 = ból, 2 = obrzęk), zasady bezpieczeństwa, pytania do fizjo
- **Ścianka** — dziennik sesji (bouldering / wędka / panel), wycena, czas, notatka
- **Postęp** — seria dni, kalendarz 4 tygodni, eksport tygodnia, kopia zapasowa danych
- **Info** — harmonogram i zasady progresji

## Harmonogram tygodnia

| Dzień | Trening |
|---|---|
| Poniedziałek | Dzień A — pełne nogi |
| Wtorek | Odpoczynek |
| Środa | Dzień B — lekkie nogi |
| Czwartek | Ścianka |
| Piątek | Dzień A — pełne nogi |
| Sobota | Odpoczynek |
| Niedziela | Odpoczynek albo ścianka |

## Instalacja na telefonie

1. Otwórz adres aplikacji w Safari (iPhone) lub Chrome (Android).
2. Udostępnij → **Dodaj do ekranu początkowego** (Android: menu ⋮ → Zainstaluj aplikację).

## Aktualizacja

Zmień plan w `app.js` (sekcja `DATA`), podbij `CACHE_NAME` w `sw.js` i wypchnij zmiany. Zainstalowana aplikacja pobierze nową wersję przy najbliższym otwarciu z internetem. Wpisy zostają.

## Pliki

| Plik | Rola |
|---|---|
| `index.html` | układ i style aplikacji |
| `app.js` | plan treningowy (dane) i logika |
| `manifest.json` | manifest PWA |
| `sw.js` | service worker — tryb offline |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | ikony |
