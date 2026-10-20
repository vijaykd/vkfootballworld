# VK Football World

A recreation of [VK Football World](https://vk-football-world.vijaykd890657.chatgpt.site/) in clean, modern HTML, JS, and CSS.

---

## 🌟 What's Included

1. **Header & Navigation**:
   - Sticky topbar with branding mark `VK FOOTBALL`
   - Jump navigation links (`Home`, `Matches`, `Watch`, `Videos`, `Stories`, `Teams`, `Play`, `Contact VK`)
   - Quick action `▶ Watch matches` pill

2. **Hero & 2026 World Cup Result**:
   - Sharp stadium line graphics and hero headlines
   - 2026 World Cup Final card: **Spain 1–0 Argentina (AET)** at New York/New Jersey

3. **Favorite Team Selector**:
   - Interactive selection for **8 top clubs & nations**: Liverpool, Real Madrid, Argentina, Scotland, Rangers, Celtic, Partick Thistle, Queen's Park
   - Team badges, color coding, and persistent local storage selection

4. **Match Centre**:
   - Live match status banner with automatic polling
   - **Scotland Men**: 6 confirmed UEFA Nations League fixtures (Slovenia, Switzerland, North Macedonia)
   - **Other Major Matches**: Real Madrid vs Real Sociedad, Partick Thistle vs Queen's Park, Queen's Park vs Greenock Morton, Partick Thistle vs Ayr United
   - "Watch Options" modal triggers for each fixture

5. **Official Viewing Desk**:
   - Interactive fixture selector updating the live viewing screen
   - Broadcast channels & UK TV Guide integration links

6. **Football Video Arena**:
   - Embedded video theater playing classic FIFA World Cup full matches & goal reels
   - Filter pills: `ALL`, `FULL MATCHES`, `GOALS`, `CLASSICS`, `CLUBS`
   - Live video search bar
   - Grid cards for curated FIFA and club archival matches

7. **The Feed (Stories)**:
   - Curated news cards with direct links to Liverpool FC, Real Madrid, and FIFA World Cup official reports

8. **Form Lab (Real Form)**:
   - Head-to-head comparison tool covering **43 clubs and national teams** across England, Spain, Europe, Scotland, and International
   - Interactive `VS` swap button
   - Dynamic comparison bars for **Wins**, **Draws**, **Goals For**, and **Goals Against**

9. **VK Games Arena (13 Interactive Games)**:
   - **13. World Final**: Flagship 4-v-4 match with AI teammates and opponents
   - **01. Penalty Shootout**: 5-shot challenge beating the keeper
   - **02. Football Quiz**: 12-team trivia challenge covering clubs and countries
   - **03. Match Picker**: Tactical choice challenge
   - **04. VK Lightning Match**: Fast-paced arcade match with keyboard and touch controls
   - **05. Crossbar King**: Precision timing challenge to hit the bar
   - **06. Keeper Reflex**: Read shot directions and dive to make saves
   - **07. Football Maths**: Solve football statistics, percentages, and problem solving
   - **08. Keepy-Uppy**: Physics-based touch and juggle challenge
   - **09. Pass Master**: Vision and reactions passing through defender lanes
   - **10. Curl Shot Lab**: Free kick laboratory with wall aiming and ball curve
   - **11. Dribble Dash**: Lane switching, obstacle dodging, and surviving the press
   - **12. Top Bins Rush**: Speed and accuracy shooting at glowing targets

10. **App Rating Desk**:
    - Interactive 1 to 10 rating scale with instant rating calculation and local persistence

11. **Private Chat with VK (Contact Desk)**:
    - 1-to-1 private conversation system
    - Category picker (`🆘 I NEED HELP`, `🐞 REPORT A GAME PROBLEM`, `💡 IDEA FOR THE SITE`, etc.)
    - Stored privately in browser local storage
    - Mock response simulator providing automated acknowledgement and reply capability

---

## 🚀 How to Run Locally

Because the application uses ES modules for hydration and game execution, it should be served via any local HTTP server (browsers restrict ES module loading over `file://` protocol for security):

### Option 1: Python (Built-in)
Run the following in the project root:
```bash
python3 -m http.server 8080
```
Then open: [http://localhost:8080](http://localhost:8080)

### Option 2: Node / npx
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and choose **"Open with Live Server"**.

---

## 📁 Project Structure

```
vkfootballworld/
├── index.html                     # Primary HTML entrypoint
├── favicon.svg                    # Brand vector icon
├── og.png                         # Social sharing preview card
├── football-people-background.png # High-resolution hero background
├── assets/
│   ├── index-4PPbBUC8.css         # Complete stylesheet
│   ├── FootballWorld-Ck0IjCNG.js  # Main app bundle & 13 interactive games
│   ├── framework-CXnKph_e.js      # React runtime bundle
│   ├── index-mw69hv5a.js          # App hydration engine
│   ├── mock-api.js                # Standalone offline mock API provider
│   ├── OwnerInbox-RSXw5p5q.js     # Owner inbox portal client
│   ├── router-gfRXIW5F.js         # Router utilities
│   ├── query-BbOc3VB2.js          # Query utilities
│   ├── rolldown-runtime-S-ySWqyJ.js # Module runtime
│   └── layout-segment-context-CXIf3M8c.js
└── README.md
```
