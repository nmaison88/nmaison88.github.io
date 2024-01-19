export default class ScoreboardView {
  constructor(
    root,
    playerOneName,
    playerTwoName,
    onControlButtonClick,
    resetFunction,
    musicplayer
  ) {
    this.onControlButtonClick = onControlButtonClick;
    this.root = root;
    this.server = '';
    this.menuOpen = false;
    this.root.innerHTML = `
    <div id="closebtn" class="closebtn menuIconContainer">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
    <div id="mySidebar" class="sidebar">
      
      <ul>
       <li><input type="checkbox" id="taunt" name="taunt" checked>
       <label for="taunt"> Enable Taunts</label><br>
       </li>
       <li><input type="checkbox" id="bgMusic" name="bgMusic" class="bgMusic">
       <label for="bgMusic"> Background Music</label><br>
       </li>
       <li><div>Narrator player 1:</div><select class="narrator" style="text-align:center" name="Narrator" id="narrator1">
        <option>Select Narrator</option>
        <option selected value="macho">Butch</option>
        <option value="tike">Tike</option>
        <option value="irish">Scotty</option>
        <option value="none">None</option>
        </select></li>
        <li><div>Narrator player 2:</div><select class="narrator" style="text-align:center" name="Narrator" id="narrator2">
        <option>Select Narrator</option>
        <option value="macho">Butch</option>
        <option value="tike">Tike</option>
        <option selected value="irish">Scotty</option>
        <option value="none">None</option>
      </select></li>

    </ul>
  </div>
    <div class="container" id="container">
      <div id="bg-start" class="bg-start"><div class="starter-text">To start Game, Enter point for which player is serving first</div></div>
      <div id="bg-left" class="bg-left" hidden>
          <div class="svgContainer"><svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="300.000000pt" height="243.000000pt" viewBox="0 0 300.000000 243.000000"
    preserveAspectRatio="xMidYMid meet">
    <metadata>
    Created by potrace 1.10, written by Peter Selinger 2001-2011
    </metadata>
    <g transform="translate(0.000000,243.000000) scale(0.100000,-0.100000)"
    fill="#000000" stroke="none">
    <path d="M890 2050 c-8 -5 -39 -15 -69 -21 -61 -12 -102 -47 -159 -133 -27
    -42 -32 -58 -32 -110 1 -91 25 -211 56 -274 l27 -56 14 64 c19 95 13 90 98 90
    54 0 74 3 69 11 -5 9 9 10 49 5 31 -4 67 -4 79 0 l23 7 -25 10 -25 9 30 14
    c17 7 39 13 51 14 22 0 54 -28 54 -49 0 -8 5 -9 19 -1 29 15 117 -57 130 -107
    43 -163 38 -223 -28 -348 -51 -98 -78 -124 -142 -135 -51 -9 -61 -5 -144 58
    -82 62 -134 112 -151 145 -20 38 -34 25 -35 -31 -1 -26 -4 -37 -6 -24 -2 12
    -8 22 -13 22 -8 0 -64 -62 -93 -104 -10 -14 -23 -26 -29 -26 -6 0 -1 11 12 25
    26 28 16 33 -18 9 -30 -21 -28 -31 11 -54 31 -20 31 -20 6 -20 -14 0 -30 5
    -37 12 -14 14 -8 20 -70 -72 -28 -41 -47 -77 -41 -79 6 -2 2 -12 -8 -23 -25
    -28 -23 -116 6 -203 30 -89 33 -93 42 -67 11 30 53 54 128 74 53 14 59 17 31
    17 -31 0 -64 -9 -122 -34 -14 -5 -18 -2 -18 13 0 32 78 57 170 55 60 -1 70 1
    50 9 -26 10 -172 5 -202 -7 -13 -5 -18 -2 -18 12 0 10 -7 28 -15 40 -20 29 -8
    35 73 35 43 0 88 -7 125 -20 31 -12 57 -19 57 -16 0 3 -26 17 -57 32 -48 21
    -73 26 -140 27 -46 0 -83 3 -83 7 0 17 59 73 95 89 70 32 93 28 248 -49 4 -2
    7 1 7 7 0 5 -19 22 -42 36 -31 19 -36 25 -18 21 72 -17 77 -17 45 -2 -16 8
    -65 23 -107 32 -43 10 -80 24 -82 31 -3 7 -1 13 4 13 6 0 10 6 10 13 0 26 63
    98 98 112 32 14 37 14 56 -2 12 -10 23 -21 26 -24 3 -3 43 -34 88 -67 76 -56
    88 -62 133 -62 68 0 109 20 151 71 61 75 98 161 110 257 7 48 17 90 22 94 6 4
    49 8 96 8 65 0 92 -4 115 -18 50 -31 95 -84 112 -133 9 -25 32 -63 50 -85 l34
    -39 -7 30 c-18 80 -66 174 -113 218 -72 67 -83 71 -196 69 -55 -1 -112 -5
    -127 -8 -23 -5 -28 -2 -28 13 0 11 4 23 9 29 5 5 12 55 15 112 5 80 4 102 -6
    104 -7 0 -19 2 -26 2 -7 1 -26 39 -41 84 -16 46 -42 102 -58 124 -15 23 -32
    48 -38 57 -15 24 -38 40 -57 41 -9 0 -18 5 -20 11 -4 13 -168 21 -188 9z m20
    -30 l-21 -29 47 16 c69 23 140 5 189 -48 33 -37 74 -113 90 -169 4 -14 20 -49
    36 -77 27 -48 38 -93 23 -93 -3 0 -49 23 -101 51 -101 54 -120 57 -172 19 -25
    -17 -49 -22 -186 -36 -35 -4 -70 -14 -84 -25 -13 -11 -27 -19 -31 -19 -12 0
    -19 37 -26 126 -8 95 4 128 69 198 31 32 55 48 89 56 30 8 53 21 63 36 8 13
    20 24 26 24 6 0 1 -13 -11 -30z m-260 -1030 c0 -5 -6 -10 -14 -10 -7 0 -37
    -19 -65 -41 -29 -23 -55 -39 -58 -35 -11 10 40 58 82 77 46 21 55 23 55 9z"/>
    <path d="M2653 1400 c-85 -30 -211 -101 -280 -158 -62 -52 -153 -162 -153
    -187 0 -6 -9 -20 -20 -30 -18 -16 -18 -20 -4 -47 17 -33 10 -88 -11 -88 -7 0
    -12 6 -12 13 0 6 -3 30 -7 52 -8 40 -8 41 -83 62 -42 12 -80 20 -85 17 -14 -9
    -60 5 -53 16 14 22 -20 8 -58 -25 -51 -44 -61 -44 -50 -2 10 41 8 114 -6 147
    -8 20 -10 11 -11 -50 0 -45 -6 -85 -15 -100 -8 -14 -14 -35 -15 -47 0 -12 -12
    -30 -26 -40 -14 -10 -38 -28 -52 -40 -19 -14 -33 -18 -43 -13 -8 5 -22 8 -30
    6 -15 -3 -62 -15 -92 -23 -9 -2 -29 -15 -45 -27 -15 -13 -110 -62 -212 -110
    -139 -65 -195 -86 -226 -86 -23 0 -61 -7 -84 -15 -23 -8 -49 -15 -57 -15 -22
    0 -28 31 -9 45 24 18 3 29 -49 26 -59 -3 -65 -16 -22 -52 20 -17 37 -34 37
    -38 0 -5 -22 -11 -49 -13 -65 -6 -95 -27 -129 -88 -15 -27 -30 -50 -33 -50
    -11 0 -59 105 -59 128 0 13 5 32 10 43 13 23 -4 26 -44 8 -30 -14 -51 -82 -43
    -141 8 -61 118 -279 168 -333 47 -51 71 -60 38 -14 -18 26 -20 35 -10 55 8 18
    17 24 29 20 15 -5 17 1 14 53 -5 88 11 133 65 180 25 23 40 41 33 41 -17 0
    -95 -45 -144 -83 -36 -29 -37 -31 -17 -38 18 -7 21 -16 21 -62 0 -54 -17 -86
    -39 -73 -13 8 -109 207 -111 231 -1 11 -2 26 -1 33 1 15 68 -63 77 -91 4 -9 9
    -17 13 -17 3 0 32 27 64 59 34 35 86 74 125 94 67 34 230 93 237 85 3 -2 -27
    -26 -65 -54 -38 -27 -70 -53 -70 -57 0 -5 3 -6 8 -4 4 2 54 33 112 68 58 34
    176 96 263 136 87 40 174 86 193 103 39 34 49 37 40 13 -6 -15 -5 -15 11 -2
    15 12 67 39 76 39 2 0 3 -18 2 -40 0 -39 -1 -40 -29 -34 -28 6 -76 -11 -76
    -28 0 -4 11 -8 24 -8 13 0 29 -6 35 -14 9 -11 1 -21 -41 -52 -29 -22 -150
    -119 -268 -217 -306 -254 -324 -267 -372 -267 -31 0 -49 -7 -75 -30 -18 -16
    -45 -30 -58 -30 -28 0 -33 -21 -10 -40 20 -16 68 -7 175 35 113 43 226 100
    274 138 21 17 88 85 148 151 60 67 135 140 166 164 79 61 174 112 205 112 29
    0 33 -12 17 -54 -5 -15 -6 -26 -1 -26 5 0 40 -20 77 -45 104 -70 174 -108 174
    -94 0 6 -32 42 -70 79 l-70 67 40 37 c40 36 41 36 75 22 56 -24 279 -160 267
    -164 -6 -2 -36 4 -68 12 -60 16 -84 14 -43 -3 13 -6 69 -28 123 -51 108 -44
    136 -63 136 -93 0 -15 -5 -18 -25 -13 -14 3 -37 9 -51 12 -18 5 -25 3 -20 -4
    3 -5 25 -13 49 -17 23 -4 58 -17 77 -31 48 -32 103 -50 183 -58 46 -5 67 -4
    67 3 0 6 -12 11 -27 12 -16 0 -37 4 -48 9 -15 6 -6 9 33 9 30 1 52 -3 52 -10
    0 -5 5 -7 10 -4 6 3 10 14 10 25 0 16 -8 18 -65 16 -43 -1 -66 2 -69 10 -6 15
    120 24 135 9 6 -6 12 -2 15 13 4 12 11 22 18 22 6 0 4 5 -4 10 -21 13 -60 12
    -90 -3 -21 -11 -27 -11 -37 2 -11 14 -15 14 -43 -1 -23 -13 -30 -14 -30 -4 0
    24 24 33 101 40 64 6 78 4 82 -9 8 -20 37 -19 37 2 0 9 11 29 25 43 36 37 43
    91 16 108 -12 7 -21 8 -21 3 0 -6 5 -13 10 -16 16 -10 11 -41 -10 -60 -11 -10
    -17 -22 -14 -26 3 -5 -2 -9 -10 -9 -18 0 -22 25 -6 35 15 9 12 45 -4 45 -8 0
    -21 3 -29 6 -10 4 -16 -5 -21 -30 -7 -37 -26 -50 -26 -18 -1 14 -4 13 -22 -8
    l-20 -25 7 44 c5 31 4 42 -4 37 -6 -4 -11 -13 -11 -20 0 -13 -31 -46 -43 -46
    -13 0 -7 39 8 54 8 8 15 25 15 38 1 13 7 34 15 48 18 32 19 64 1 79 -11 9 -15
    6 -21 -16 -7 -26 -8 -26 -15 -8 -8 20 -9 20 -9 -1 -1 -28 -48 -88 -94 -119
    l-39 -26 -45 27 c-24 14 -79 54 -121 88 -42 34 -101 79 -130 99 -29 20 -54 39
    -55 42 -1 4 16 13 37 20 22 8 58 33 80 56 23 23 33 39 24 36 -22 -8 -23 2 -3
    30 12 17 27 21 88 24 62 4 87 11 167 50 59 28 114 64 145 94 48 46 40 45 -19
    -3 -28 -22 -119 -72 -132 -72 -3 0 28 23 69 50 111 74 230 211 244 281 12 59
    -53 76 -154 39z m103 -35 c21 -54 -248 -321 -356 -353 -50 -15 -160 -22 -160
    -11 0 21 41 87 85 137 84 94 206 175 336 222 65 23 88 25 95 5z m-752 -430
    c36 -47 66 -87 66 -90 0 -3 -9 -5 -20 -5 -13 0 -20 -7 -20 -19 0 -11 -5 -23
    -12 -27 -8 -5 -9 1 -5 22 4 23 -2 41 -32 84 -21 30 -46 57 -56 59 -16 3 -15
    -2 7 -40 13 -24 31 -54 39 -67 12 -21 12 -25 -3 -36 -24 -17 -23 -34 2 -38 29
    -4 11 -26 -25 -30 -23 -2 -29 1 -26 12 14 46 -5 121 -36 144 l-26 19 7 -27 c4
    -18 3 -25 -3 -21 -6 3 -23 -3 -39 -15 -38 -28 -102 -39 -102 -17 0 22 39 47
    72 47 23 0 28 4 28 26 0 17 6 28 20 31 23 6 26 19 8 26 -7 3 4 6 26 6 32 1 36
    3 27 15 -9 11 -9 15 1 19 29 12 39 4 102 -78z m55 51 c15 -8 33 -22 40 -30 7
    -9 17 -13 22 -10 18 11 21 -27 4 -40 -10 -7 -15 -17 -12 -23 4 -6 0 -19 -9
    -29 -14 -18 -15 -16 -11 21 3 37 0 43 -42 82 -47 43 -43 55 8 29z m-171 -208
    c-1 -14 5 -35 14 -45 16 -17 15 -21 -10 -58 -35 -51 -54 -51 -70 1 -17 54 -48
    71 -101 56 -69 -21 -75 -15 -38 42 17 27 27 33 42 29 31 -10 62 -5 103 16 35
    18 38 19 50 3 7 -9 12 -29 10 -44z m187 2 c10 -17 203 -169 274 -217 85 -57
    103 -61 158 -34 54 26 53 26 53 -5 0 -14 5 -35 11 -47 9 -16 9 -22 0 -25 -25
    -8 -32 -40 -14 -76 19 -42 14 -51 -23 -42 -30 8 -69 46 -99 97 -12 20 -38 42
    -66 55 -25 12 -53 34 -62 48 -10 14 -37 38 -60 53 -23 15 -44 30 -47 34 -6 7
    -112 67 -162 92 -34 17 -37 21 -26 40 18 35 50 49 63 27z m-800 -421 c-48 -48
    -131 -106 -140 -97 -4 3 56 57 100 90 6 4 24 19 40 32 52 43 51 28 0 -25z"/>
    <path d="M1765 1255 c8 -25 25 -159 21 -163 -2 -1 -15 16 -29 40 -27 46 -67
    88 -67 70 0 -18 22 -65 47 -98 13 -17 26 -45 29 -62 6 -28 23 -45 24 -24 1 4
    5 27 10 52 9 51 -4 141 -27 180 -9 16 -12 18 -8 5z"/>
    <path d="M740 1011 c-12 -9 -10 -11 11 -11 56 0 154 -39 185 -72 52 -57 99
    -153 88 -183 -10 -26 -21 -17 -34 30 -7 25 -28 60 -47 80 -38 39 -61 47 -39
    12 19 -28 48 -108 42 -115 -3 -2 -14 14 -25 36 -24 47 -73 88 -116 97 -29 6
    -29 5 6 -14 35 -20 109 -96 109 -113 0 -4 -16 9 -36 30 -33 34 -32 32 11 -30
    26 -38 43 -68 38 -68 -4 0 -14 9 -20 20 -7 10 -23 24 -35 31 -17 9 -15 3 11
    -25 39 -40 61 -46 61 -17 0 28 18 36 40 16 18 -16 20 -16 44 9 32 31 32 45 3
    117 -31 75 -72 126 -121 151 -45 23 -153 35 -176 19z"/>
    </g>
    </svg></div>
      </div>
      <div id="bg-right" class="bg-right" hidden>
          <div class="svgContainer"><svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="300.000000pt" height="243.000000pt" viewBox="0 0 300.000000 243.000000"
    preserveAspectRatio="xMidYMid meet">
    <metadata>
    Created by potrace 1.10, written by Peter Selinger 2001-2011
    </metadata>
    <g color="red" transform="translate(0.000000,243.000000) scale(0.100000,-0.100000)"
    fill="currentcolor" stroke="currentcolor">
    <path d="M890 2050 c-8 -5 -39 -15 -69 -21 -61 -12 -102 -47 -159 -133 -27
    -42 -32 -58 -32 -110 1 -91 25 -211 56 -274 l27 -56 14 64 c19 95 13 90 98 90
    54 0 74 3 69 11 -5 9 9 10 49 5 31 -4 67 -4 79 0 l23 7 -25 10 -25 9 30 14
    c17 7 39 13 51 14 22 0 54 -28 54 -49 0 -8 5 -9 19 -1 29 15 117 -57 130 -107
    43 -163 38 -223 -28 -348 -51 -98 -78 -124 -142 -135 -51 -9 -61 -5 -144 58
    -82 62 -134 112 -151 145 -20 38 -34 25 -35 -31 -1 -26 -4 -37 -6 -24 -2 12
    -8 22 -13 22 -8 0 -64 -62 -93 -104 -10 -14 -23 -26 -29 -26 -6 0 -1 11 12 25
    26 28 16 33 -18 9 -30 -21 -28 -31 11 -54 31 -20 31 -20 6 -20 -14 0 -30 5
    -37 12 -14 14 -8 20 -70 -72 -28 -41 -47 -77 -41 -79 6 -2 2 -12 -8 -23 -25
    -28 -23 -116 6 -203 30 -89 33 -93 42 -67 11 30 53 54 128 74 53 14 59 17 31
    17 -31 0 -64 -9 -122 -34 -14 -5 -18 -2 -18 13 0 32 78 57 170 55 60 -1 70 1
    50 9 -26 10 -172 5 -202 -7 -13 -5 -18 -2 -18 12 0 10 -7 28 -15 40 -20 29 -8
    35 73 35 43 0 88 -7 125 -20 31 -12 57 -19 57 -16 0 3 -26 17 -57 32 -48 21
    -73 26 -140 27 -46 0 -83 3 -83 7 0 17 59 73 95 89 70 32 93 28 248 -49 4 -2
    7 1 7 7 0 5 -19 22 -42 36 -31 19 -36 25 -18 21 72 -17 77 -17 45 -2 -16 8
    -65 23 -107 32 -43 10 -80 24 -82 31 -3 7 -1 13 4 13 6 0 10 6 10 13 0 26 63
    98 98 112 32 14 37 14 56 -2 12 -10 23 -21 26 -24 3 -3 43 -34 88 -67 76 -56
    88 -62 133 -62 68 0 109 20 151 71 61 75 98 161 110 257 7 48 17 90 22 94 6 4
    49 8 96 8 65 0 92 -4 115 -18 50 -31 95 -84 112 -133 9 -25 32 -63 50 -85 l34
    -39 -7 30 c-18 80 -66 174 -113 218 -72 67 -83 71 -196 69 -55 -1 -112 -5
    -127 -8 -23 -5 -28 -2 -28 13 0 11 4 23 9 29 5 5 12 55 15 112 5 80 4 102 -6
    104 -7 0 -19 2 -26 2 -7 1 -26 39 -41 84 -16 46 -42 102 -58 124 -15 23 -32
    48 -38 57 -15 24 -38 40 -57 41 -9 0 -18 5 -20 11 -4 13 -168 21 -188 9z m20
    -30 l-21 -29 47 16 c69 23 140 5 189 -48 33 -37 74 -113 90 -169 4 -14 20 -49
    36 -77 27 -48 38 -93 23 -93 -3 0 -49 23 -101 51 -101 54 -120 57 -172 19 -25
    -17 -49 -22 -186 -36 -35 -4 -70 -14 -84 -25 -13 -11 -27 -19 -31 -19 -12 0
    -19 37 -26 126 -8 95 4 128 69 198 31 32 55 48 89 56 30 8 53 21 63 36 8 13
    20 24 26 24 6 0 1 -13 -11 -30z m-260 -1030 c0 -5 -6 -10 -14 -10 -7 0 -37
    -19 -65 -41 -29 -23 -55 -39 -58 -35 -11 10 40 58 82 77 46 21 55 23 55 9z"/>
    <path d="M2653 1400 c-85 -30 -211 -101 -280 -158 -62 -52 -153 -162 -153
    -187 0 -6 -9 -20 -20 -30 -18 -16 -18 -20 -4 -47 17 -33 10 -88 -11 -88 -7 0
    -12 6 -12 13 0 6 -3 30 -7 52 -8 40 -8 41 -83 62 -42 12 -80 20 -85 17 -14 -9
    -60 5 -53 16 14 22 -20 8 -58 -25 -51 -44 -61 -44 -50 -2 10 41 8 114 -6 147
    -8 20 -10 11 -11 -50 0 -45 -6 -85 -15 -100 -8 -14 -14 -35 -15 -47 0 -12 -12
    -30 -26 -40 -14 -10 -38 -28 -52 -40 -19 -14 -33 -18 -43 -13 -8 5 -22 8 -30
    6 -15 -3 -62 -15 -92 -23 -9 -2 -29 -15 -45 -27 -15 -13 -110 -62 -212 -110
    -139 -65 -195 -86 -226 -86 -23 0 -61 -7 -84 -15 -23 -8 -49 -15 -57 -15 -22
    0 -28 31 -9 45 24 18 3 29 -49 26 -59 -3 -65 -16 -22 -52 20 -17 37 -34 37
    -38 0 -5 -22 -11 -49 -13 -65 -6 -95 -27 -129 -88 -15 -27 -30 -50 -33 -50
    -11 0 -59 105 -59 128 0 13 5 32 10 43 13 23 -4 26 -44 8 -30 -14 -51 -82 -43
    -141 8 -61 118 -279 168 -333 47 -51 71 -60 38 -14 -18 26 -20 35 -10 55 8 18
    17 24 29 20 15 -5 17 1 14 53 -5 88 11 133 65 180 25 23 40 41 33 41 -17 0
    -95 -45 -144 -83 -36 -29 -37 -31 -17 -38 18 -7 21 -16 21 -62 0 -54 -17 -86
    -39 -73 -13 8 -109 207 -111 231 -1 11 -2 26 -1 33 1 15 68 -63 77 -91 4 -9 9
    -17 13 -17 3 0 32 27 64 59 34 35 86 74 125 94 67 34 230 93 237 85 3 -2 -27
    -26 -65 -54 -38 -27 -70 -53 -70 -57 0 -5 3 -6 8 -4 4 2 54 33 112 68 58 34
    176 96 263 136 87 40 174 86 193 103 39 34 49 37 40 13 -6 -15 -5 -15 11 -2
    15 12 67 39 76 39 2 0 3 -18 2 -40 0 -39 -1 -40 -29 -34 -28 6 -76 -11 -76
    -28 0 -4 11 -8 24 -8 13 0 29 -6 35 -14 9 -11 1 -21 -41 -52 -29 -22 -150
    -119 -268 -217 -306 -254 -324 -267 -372 -267 -31 0 -49 -7 -75 -30 -18 -16
    -45 -30 -58 -30 -28 0 -33 -21 -10 -40 20 -16 68 -7 175 35 113 43 226 100
    274 138 21 17 88 85 148 151 60 67 135 140 166 164 79 61 174 112 205 112 29
    0 33 -12 17 -54 -5 -15 -6 -26 -1 -26 5 0 40 -20 77 -45 104 -70 174 -108 174
    -94 0 6 -32 42 -70 79 l-70 67 40 37 c40 36 41 36 75 22 56 -24 279 -160 267
    -164 -6 -2 -36 4 -68 12 -60 16 -84 14 -43 -3 13 -6 69 -28 123 -51 108 -44
    136 -63 136 -93 0 -15 -5 -18 -25 -13 -14 3 -37 9 -51 12 -18 5 -25 3 -20 -4
    3 -5 25 -13 49 -17 23 -4 58 -17 77 -31 48 -32 103 -50 183 -58 46 -5 67 -4
    67 3 0 6 -12 11 -27 12 -16 0 -37 4 -48 9 -15 6 -6 9 33 9 30 1 52 -3 52 -10
    0 -5 5 -7 10 -4 6 3 10 14 10 25 0 16 -8 18 -65 16 -43 -1 -66 2 -69 10 -6 15
    120 24 135 9 6 -6 12 -2 15 13 4 12 11 22 18 22 6 0 4 5 -4 10 -21 13 -60 12
    -90 -3 -21 -11 -27 -11 -37 2 -11 14 -15 14 -43 -1 -23 -13 -30 -14 -30 -4 0
    24 24 33 101 40 64 6 78 4 82 -9 8 -20 37 -19 37 2 0 9 11 29 25 43 36 37 43
    91 16 108 -12 7 -21 8 -21 3 0 -6 5 -13 10 -16 16 -10 11 -41 -10 -60 -11 -10
    -17 -22 -14 -26 3 -5 -2 -9 -10 -9 -18 0 -22 25 -6 35 15 9 12 45 -4 45 -8 0
    -21 3 -29 6 -10 4 -16 -5 -21 -30 -7 -37 -26 -50 -26 -18 -1 14 -4 13 -22 -8
    l-20 -25 7 44 c5 31 4 42 -4 37 -6 -4 -11 -13 -11 -20 0 -13 -31 -46 -43 -46
    -13 0 -7 39 8 54 8 8 15 25 15 38 1 13 7 34 15 48 18 32 19 64 1 79 -11 9 -15
    6 -21 -16 -7 -26 -8 -26 -15 -8 -8 20 -9 20 -9 -1 -1 -28 -48 -88 -94 -119
    l-39 -26 -45 27 c-24 14 -79 54 -121 88 -42 34 -101 79 -130 99 -29 20 -54 39
    -55 42 -1 4 16 13 37 20 22 8 58 33 80 56 23 23 33 39 24 36 -22 -8 -23 2 -3
    30 12 17 27 21 88 24 62 4 87 11 167 50 59 28 114 64 145 94 48 46 40 45 -19
    -3 -28 -22 -119 -72 -132 -72 -3 0 28 23 69 50 111 74 230 211 244 281 12 59
    -53 76 -154 39z m103 -35 c21 -54 -248 -321 -356 -353 -50 -15 -160 -22 -160
    -11 0 21 41 87 85 137 84 94 206 175 336 222 65 23 88 25 95 5z m-752 -430
    c36 -47 66 -87 66 -90 0 -3 -9 -5 -20 -5 -13 0 -20 -7 -20 -19 0 -11 -5 -23
    -12 -27 -8 -5 -9 1 -5 22 4 23 -2 41 -32 84 -21 30 -46 57 -56 59 -16 3 -15
    -2 7 -40 13 -24 31 -54 39 -67 12 -21 12 -25 -3 -36 -24 -17 -23 -34 2 -38 29
    -4 11 -26 -25 -30 -23 -2 -29 1 -26 12 14 46 -5 121 -36 144 l-26 19 7 -27 c4
    -18 3 -25 -3 -21 -6 3 -23 -3 -39 -15 -38 -28 -102 -39 -102 -17 0 22 39 47
    72 47 23 0 28 4 28 26 0 17 6 28 20 31 23 6 26 19 8 26 -7 3 4 6 26 6 32 1 36
    3 27 15 -9 11 -9 15 1 19 29 12 39 4 102 -78z m55 51 c15 -8 33 -22 40 -30 7
    -9 17 -13 22 -10 18 11 21 -27 4 -40 -10 -7 -15 -17 -12 -23 4 -6 0 -19 -9
    -29 -14 -18 -15 -16 -11 21 3 37 0 43 -42 82 -47 43 -43 55 8 29z m-171 -208
    c-1 -14 5 -35 14 -45 16 -17 15 -21 -10 -58 -35 -51 -54 -51 -70 1 -17 54 -48
    71 -101 56 -69 -21 -75 -15 -38 42 17 27 27 33 42 29 31 -10 62 -5 103 16 35
    18 38 19 50 3 7 -9 12 -29 10 -44z m187 2 c10 -17 203 -169 274 -217 85 -57
    103 -61 158 -34 54 26 53 26 53 -5 0 -14 5 -35 11 -47 9 -16 9 -22 0 -25 -25
    -8 -32 -40 -14 -76 19 -42 14 -51 -23 -42 -30 8 -69 46 -99 97 -12 20 -38 42
    -66 55 -25 12 -53 34 -62 48 -10 14 -37 38 -60 53 -23 15 -44 30 -47 34 -6 7
    -112 67 -162 92 -34 17 -37 21 -26 40 18 35 50 49 63 27z m-800 -421 c-48 -48
    -131 -106 -140 -97 -4 3 56 57 100 90 6 4 24 19 40 32 52 43 51 28 0 -25z"/>
    <path d="M1765 1255 c8 -25 25 -159 21 -163 -2 -1 -15 16 -29 40 -27 46 -67
    88 -67 70 0 -18 22 -65 47 -98 13 -17 26 -45 29 -62 6 -28 23 -45 24 -24 1 4
    5 27 10 52 9 51 -4 141 -27 180 -9 16 -12 18 -8 5z"/>
    <path d="M740 1011 c-12 -9 -10 -11 11 -11 56 0 154 -39 185 -72 52 -57 99
    -153 88 -183 -10 -26 -21 -17 -34 30 -7 25 -28 60 -47 80 -38 39 -61 47 -39
    12 19 -28 48 -108 42 -115 -3 -2 -14 14 -25 36 -24 47 -73 88 -116 97 -29 6
    -29 5 6 -14 35 -20 109 -96 109 -113 0 -4 -16 9 -36 30 -33 34 -32 32 11 -30
    26 -38 43 -68 38 -68 -4 0 -14 9 -20 20 -7 10 -23 24 -35 31 -17 9 -15 3 11
    -25 39 -40 61 -46 61 -17 0 28 18 36 40 16 18 -16 20 -16 44 9 32 31 32 45 3
    117 -31 75 -72 126 -121 151 -45 23 -153 35 -176 19z"/>
    </g>
    </svg></div></div>    
      <section class="topWrapper">
        <div class="top">Ping Pang</div>
        <div class="bottom" aria-hidden="true">Ping Pang</div>
      </section>
      <div class="scoreboard" id="scoreboard">
        <div class="scoreboard__name scoreboard__name--one">${playerOneName}
        <!--  <select class = "narrator" name="Narrator" id="narrator1">
        <option>Select Narrator</option>
        <option selected value="macho">Macho</option>
        <option value="tike">Tike</option>
        <option value="basic">Basic</option>
        <option value="none">None</option>
      </select>-->
      <!-- <button class="openbtn">Settings</button> -->

      </div>
        <div class="scoreboard__name scoreboard__name--two">${playerTwoName}     
        <!-- <select class = "narrator" name="Narrator" id="narrator2">
        <option>Select Narrator</option>
        <option selected value="macho">Macho</option>
        <option value="tike">Tike</option>
        <option value="basic">Basic</option>
        <option value="none">None</option>
      </select> -->
      </div>
        
 
        <div class="scoreboard__score" data-for-player="one">0</div>
        <div class="scoreboard__score" data-for-player="two">0</div>
        <div class="scoreboard__controls" data-for-player="one">
          <button class="scoreboard__control-button">-</button>
          <button class="scoreboard__control-button">+</button>
        </div>
        <div class="scoreboard__controls" data-for-player="two">
          <button class="scoreboard__control-button">-</button>
          <button class="scoreboard__control-button">+</button>
        </div>
        <div>
          <div class="serve"></div>
          <div class="scoreboard__controls">
          <button class="reset button" hidden>Reset</button>
          </div>
        </div>
        <h3 class="word" hidden></h3>

      </div>
      <section class="bottomWrapper">
        <div class="top">deathmatch</div>
        <div class="bottom" aria-hidden="true">deathmatch</div>
      </section>
      <audio src="http://radio-stream" id="radio" class="hidden" preload="none"></audio>

    </div>
		`;

    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach((controlButton) => {
        controlButton.addEventListener('click', () => {
          const direction =
            controlButton.textContent === '-' ? 'minus' : 'plus';
          const player = controlButton.closest('.scoreboard__controls').dataset
            .forPlayer;

          onControlButtonClick(player, direction);
        });
      });

    const resetButton = this.root.querySelector('.reset');
    const closeNavButton = this.root.querySelector('.closebtn');
    const narratorSelect = this.root.querySelectorAll('.narrator');
    const musicPlayerCheck = this.root.querySelector('.bgMusic');

    for (let i = 0; i < narratorSelect.length; i++) {
      narratorSelect[i].addEventListener('change', (event) => {
        this.narratorSelectSoundOff(event.target.value);
      });
    }
    resetButton.addEventListener('click', (event) => {
      resetFunction();
      this.resetServe();
    });

    closeNavButton.addEventListener('click', (event) => {
      // menu is already visible, now we hide it
      if (this.menuOpen) {
        this.closeNav();
        this.menuOpen = false;
        document.getElementById('closebtn').classList.toggle('change');
      } else {
        this.menuOpen = true;
        document.getElementById('closebtn').classList.toggle('change');
        this.openNav();
      }
    });
    musicPlayerCheck.addEventListener('click', (event) => {
      musicplayer();
    });
  }
  keypressCatch(player, direction) {
    console.log('keypressCatch hit', player, direction);
    this.onControlButtonClick(player, direction);
  }
  update(playerOneScore, playerTwoScore) {
    this.root.querySelector(
      ".scoreboard__score[data-for-player='one']"
    ).textContent = playerOneScore;
    this.root.querySelector(
      ".scoreboard__score[data-for-player='two']"
    ).textContent = playerTwoScore;
  }
  resetServe() {
    document.getElementById('bg-left').hidden = true;
    document.getElementById('bg-right').hidden = true;
  }
  wordflick(player) {
    let winningPlayer = player == 1 ? 'Player One' : 'Player Two';
    let LosingPlayer = player == 2 ? 'Player One' : 'Player Two';
    let words = [
        `${winningPlayer} Wins`,
        `${LosingPlayer} Loses`,
        'Press any button to restart',
      ],
      part,
      i = 0,
      offset = 0,
      len = words.length,
      forwards = true,
      skip_count = 0,
      skip_delay = 15,
      speed = 70;
    const wordInterval = setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset == 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
      this.updateWord(part);
      if (!this.checkIfWinnerStillBoasting()) {
        clearInterval(wordInterval);
      }
    }, speed);
  }
  updateWord(part) {
    this.root.querySelector('.word').textContent = part;
  }
  showWinner() {
    this.root.querySelector('.word').hidden = false;
  }
  resetWinner() {
    this.root.querySelector('.word').hidden = true;
    this.resetCOunters();
  }
  disableCounters() {
    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach((button) => {
        button.disabled = true;
        button.hidden = true;
      });
    this.root.querySelector('.reset').hidden = false;
  }
  resetCOunters() {
    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach((button) => {
        button.disabled = false;
        button.hidden = false;
      });
    this.root.querySelector('.reset').hidden = true;
  }
  updateServer(serve, servingPlayer) {
    if (serve && servingPlayer) {
      document.getElementById('bg-start').hidden = true;
      this.root.querySelector(
        '.serve'
      ).textContent = ` Player ${servingPlayer} ${serve} Serve`;
      if (servingPlayer === 'one') {
        document.getElementById('bg-left').hidden = false;
        document.getElementById('bg-right').hidden = true;
      } else if (servingPlayer === 'two') {
        document.getElementById('bg-left').hidden = true;
        document.getElementById('bg-right').hidden = false;
      }
      return;
    }
    document.getElementById('bg-start').hidden = false;
    this.root.querySelector('.serve').textContent = ``;
  }
  checkIfWinnerStillBoasting() {
    const visible = this.root.querySelector('.word').hidden === false;
    return visible;
  }
  openNav() {
    document.getElementById('mySidebar').style.width = 'auto';
  }

  closeNav() {
    document.getElementById('mySidebar').style.width = '0';
  }
  narratorSelectSoundOff(narrator) {
    console.log('narrator', narrator);
    switch (narrator) {
      case 'irish':
        new Audio('sounds/irish/irish ping pang deathmatch.wav').play();
        break;
      case 'macho':
        new Audio('sounds/macho/macho ping pang deathmatch.wav').play();
        break;
      case 'tike':
        new Audio('sounds/tike/tike ping pang deathmatch.wav').play();
        break;
      default:
        break;
    }
  }
}
