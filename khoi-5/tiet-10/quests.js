/**
 * Ngân hàng dữ liệu đồng bộ từ quests.json
 * Hỗ trợ chạy 100% offline-first không lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = {
  "title": "Tin Há»c 5 - BÃ i 5: Báº£n quyá»n ná»™i dung sá»‘ (Tiáº¿t 2) - TÃ²a Ã¡n tá»‘i cao Startup",
  "cases": [
    {
      "id": "case_poster",
      "mockupType": "poster",
      "round": 1,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 1 & Äiá»u 2 (ChÆ°a xin phÃ©p + Tá»± Ã½ xÃ³a tÃªn tÃ¡c giáº£)",
      "rumor": "DÆ° luáº­n phÃ¡t hiá»‡n poster quáº£ng cÃ¡o má»›i cá»§a <b>{dName} ({dStartup})</b> dÃ¹ng bá»©c tranh ká»¹ thuáº­t sá»‘ do <b>{pName} ({pStartup})</b> váº½ tuáº§n trÆ°á»›c.",
      "knownFacts": "â€¢ <b>Vá» viá»‡c xin phÃ©p:</b> <b>{dName}</b> táº£i bá»©c tranh trÃªn trang cÃ¡ nhÃ¢n cá»§a <b>{pName}</b> vá» dÃ¹ng mÃ  chÆ°a tá»«ng nháº¯n tin hay há»i Ã½ kiáº¿n <b>{pName}</b>.<br>â€¢ <b>Vá» cÃ¡ch ghi nguá»“n:</b> TrÃªn bá»©c tranh gá»‘c cÃ³ chá»¯ kÃ½ cá»§a <b>{pName}</b>, nhÆ°ng <b>{dName}</b> Ä‘Ã£ cáº¯t bá» chá»¯ kÃ½ Ä‘Ã³ vÃ  ghi dÃ²ng chá»¯ dÆ°á»›i Ä‘Ã¢y:",
      "exhibitBox": "ðŸ–¼ï¸ [Váº­t chá»©ng trÃªn Poster cá»§a {dName}]: \"Minh há»a: Nguá»“n SÆ°u táº§m trÃªn máº¡ng\"",
      "cards": [
        { "id": "EXCUSE", "quote": "\"Theo Äiá»u 2 SGK, khi láº¥y tÃ i liá»‡u tham kháº£o trÃªn máº¡ng thÃ¬ Ä‘Æ°á»£c phÃ©p ghi nguá»“n lÃ  SÆ°u táº§m. Bá»©c tranh nÃ y táº£i tá»± do trÃªn máº¡ng nÃªn tá»• em ghi 'Minh há»a: Nguá»“n SÆ°u táº§m' á»Ÿ gÃ³c lÃ  hoÃ n toÃ n Ä‘Ãºng quy Ä‘á»‹nh ghi nguá»“n!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 1 vÃ  Äiá»u 2 SGK, khi tÃ¡c pháº©m Ä‘Ã£ cÃ³ chá»¯ kÃ½ tÃ¡c giáº£ rÃµ rÃ ng thÃ¬ báº¯t buá»™c pháº£i xin phÃ©p vÃ  ghi Ä‘Ãºng tÃªn tÃ¡c giáº£, khÃ´ng Ä‘Æ°á»£c tá»± Ã½ cáº¯t bá» Ä‘á»ƒ ghi SÆ°u táº§m. Tá»• em xin nháº­n trÃ¡ch nhiá»‡m vÃ  sá»­a sai ngay!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Bá»©c tranh cÃ³ tÃ¡c giáº£ rÃµ rÃ ng lÃ  <b>{pName}</b>. Viá»‡c <b>{dName}</b> tá»± Ã½ láº¥y khi <b>chÆ°a Ä‘Æ°á»£c phÃ©p</b> (sai Äiá»u 1) láº¡i xÃ³a tÃªn tÃ¡c giáº£ Ä‘á»ƒ ghi <b>\"SÆ°u táº§m\"</b> (sai Äiá»u 2) lÃ  <b>VI PHáº M Báº¢N QUYá»€N!</b>"
    },
    {
      "id": "case_cinema",
      "mockupType": "cinema",
      "round": 1,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 1 (ÄÃ£ xin phÃ©p + Ghi rÃµ tÃªn tÃ¡c giáº£)",
      "rumor": "KhÃ¡n giáº£ xÃ´n xao nghi ngá» bá»™ phim má»›i cá»§a <b>{dName} ({dStartup})</b> \"dÃ¹ng chÃ¹a\" báº£n nháº¡c ná»n piano do <b>{pName} ({pStartup})</b> sÃ¡ng tÃ¡c!",
      "knownFacts": "â€¢ <b>Sá»± tháº­t giá»¯a 2 cÃ´ng ty:</b> Tuáº§n trÆ°á»›c, <b>{dName}</b> Ä‘Ã£ gá»­i thÆ° xin phÃ©p sá»­ dá»¥ng báº£n nháº¡c vÃ  <b>{pName}</b> Ä‘Ã£ kÃ½ xÃ¡c nháº­n Ä‘á»“ng Ã½.<br>â€¢ <b>TrÃªn mÃ n hÃ¬nh káº¿t thÃºc phim (Credit):</b> <b>{dName}</b> trÃ¬nh chiáº¿u cÃ´ng khai dÃ²ng chá»¯ sau:",
      "exhibitBox": "ðŸŽ¬ [HÃ¬nh chá»¥p cuá»‘i phim cá»§a {dName}]: \"Ã‚m nháº¡c trong phim: SÃ¡ng tÃ¡c bá»Ÿi {pName} ({pStartup}) â€“ Sá»­ dá»¥ng dÆ°á»›i sá»± cho phÃ©p cá»§a tÃ¡c giáº£\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"CÃ´ng ty chÃºng em Ä‘Ã£ lÃ m Ä‘á»§ 2 váº¿ cá»§a Äiá»u 1: Vá»«a xin phÃ©p tÃ¡c giáº£ Ä‘Ã ng hoÃ ng, vá»«a ghi rÃµ tÃªn tÃ¡c giáº£ á»Ÿ cuá»‘i phim nÃªn hoÃ n toÃ n há»£p phÃ¡p!\"" },
        { "id": "CLUMSY", "quote": "\"Báº£n nháº¡c piano nÃ y quÃ¡ ná»•i tiáº¿ng trÃªn máº¡ng nÃªn tá»• em nghÄ© chá»‰ cáº§n Ä‘Æ°a vÃ o phim cho hay chá»© khÃ´ng cáº§n pháº£i Ä‘á»ƒ Ã½ cÃ¡c quy táº¯c báº£n quyá»n!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Äá»‘i chiáº¿u Äiá»u 1 (Quy táº¯c VÃ ng): <b>{dName}</b> Ä‘Ã£ thá»a mÃ£n Ä‘á»§ cáº£ 2 váº¿: <b>(1) ÄÆ°á»£c tÃ¡c giáº£ cho phÃ©p</b> vÃ  <b>(2) Ghi rÃµ tÃªn tÃ¡c giáº£</b> á»Ÿ cuá»‘i phim. Tin Ä‘á»“n Äƒn cáº¯p lÃ  sai sá»± tháº­t âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_book",
      "mockupType": "book",
      "round": 1,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 2 (Viáº¿t láº¡i truyá»‡n cá»• tÃ­ch nhÆ°ng tá»± nháº­n mÃ¬nh lÃ  TÃ¡c giáº£)",
      "rumor": "<b>{pName} ({pStartup})</b> phÃ¡t hiá»‡n cuá»‘n truyá»‡n má»›i xuáº¥t báº£n cá»§a <b>{dName} ({dStartup})</b> cÃ³ ná»™i dung chÃ­nh lÃ  truyá»‡n cá»• tÃ­ch <i>\"CÃ¢y kháº¿\"</i> nhÆ°ng láº¡i ghi tÃªn tÃ¡c giáº£ ráº¥t láº¡!",
      "knownFacts": "â€¢ <b>CÃ¡ch thá»±c hiá»‡n:</b> <b>{dName}</b> dá»±a trÃªn cá»‘t truyá»‡n cá»• tÃ­ch dÃ¢n gian <i>\"CÃ¢y kháº¿\"</i>, sau Ä‘Ã³ tá»± diá»…n Ä‘áº¡t láº¡i báº±ng lá»i vÄƒn má»›i cá»§a tá»• mÃ¬nh.<br>â€¢ <b>TrÃªn trang bÃ¬a cuá»‘n sÃ¡ch:</b> <b>{dName}</b> in dÃ²ng chá»¯ cÃ´ng bá»‘ báº£n quyá»n nhÆ° sau:",
      "exhibitBox": "ðŸ“• [Váº­t chá»©ng BÃ¬a sÃ¡ch cá»§a {dName}]: \"Truyá»‡n: Ä‚n Kháº¿ Tráº£ VÃ ng â€” TÃ¡c giáº£ sÃ¡ng tÃ¡c cá»‘t truyá»‡n: {dName} ({dStartup})\"",
      "cards": [
        { "id": "EXCUSE", "quote": "\"ToÃ n bá»™ tá»«ng cÃ¢u chá»¯ vÃ  cÃ¡ch diá»…n Ä‘áº¡t trong cuá»‘n sÃ¡ch Ä‘á»u do tá»• em tá»± biÃªn soáº¡n 100%, khÃ´ng chÃ©p nguyÃªn vÄƒn cá»§a ai, nÃªn tá»• em cÃ³ quyá»n Ä‘á»©ng tÃªn tÃ¡c giáº£ sÃ¡ng tÃ¡c cuá»‘n sÃ¡ch má»›i nÃ y!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 2 SGK trang 21, dÃ¹ diá»…n Ä‘áº¡t láº¡i báº±ng lá»i vÄƒn cá»§a mÃ¬nh nhÆ°ng dá»±a trÃªn cÃ¢u chuyá»‡n cá»• tÃ­ch cÃ³ sáºµn thÃ¬ báº¯t buá»™c pháº£i ghi lÃ  'Phá»ng theo truyá»‡n CÃ¢y kháº¿', khÃ´ng Ä‘Æ°á»£c tá»± nháº­n lÃ  tÃ¡c giáº£ cá»‘t truyá»‡n. Tá»• em xin nháº­n khuyáº¿t Ä‘iá»ƒm!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Äiá»u 2 SGK trang 21: Khi diá»…n Ä‘áº¡t láº¡i ná»™i dung báº±ng ngÃ´n ngá»¯ cá»§a mÃ¬nh dá»±a trÃªn cÃ¢u chuyá»‡n cÃ³ sáºµn, báº¯t buá»™c pháº£i ghi nguá»“n theo máº«u <b>\"Phá»ng theo truyá»‡n CÃ¢y kháº¿\"</b>, khÃ´ng Ä‘Æ°á»£c tá»± nháº­n lÃ  tÃ¡c giáº£ cá»‘t truyá»‡n âž” <b>VI PHáº M ÄIá»€U 2!</b>"
    },
    {
      "id": "case_corkboard",
      "mockupType": "corkboard",
      "round": 1,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 2 (ThÆ¡ dÃ¢n gian khuyáº¿t danh ghi nguá»“n SÆ°u táº§m)",
      "rumor": "Má»™t sá»‘ Ä‘á»™c giáº£ nghi ngá» tá» bÃ¡o tÆ°á»ng cá»§a <b>{dName} ({dStartup})</b> Ä‘áº¡o nhÃ¡i bÃ i ca dao dÃ¢n gian tá»«ng xuáº¥t hiá»‡n trong cuá»‘n sá»• tay vÄƒn há»c cá»§a <b>{pName}</b>!",
      "knownFacts": "â€¢ <b>Nguá»“n gá»‘c bÃ i thÆ¡:</b> ÄÃ¢y lÃ  bÃ i ca dao truyá»n miá»‡ng tá»« xa xÆ°a (cáº£ <b>{pName}</b> vÃ  <b>{dName}</b> Ä‘á»u biáº¿t bÃ i nÃ y khÃ´ng rÃµ tÃªn tÃ¡c giáº£ lÃ  ai).<br>â€¢ <b>TrÃªn tá» bÃ¡o tÆ°á»ng:</b> Ngay bÃªn dÆ°á»›i bÃ i ca dao, <b>{dName}</b> ghi rÃµ dÃ²ng chá»¯:",
      "exhibitBox": "ðŸ“° [Váº­t chá»©ng BÃ¡o tÆ°á»ng cá»§a {dName}]: \"CÃ´ng cha nhÆ° nÃºi ThÃ¡i SÆ¡n / NghÄ©a máº¹ nhÆ° nÆ°á»›c trong nguá»“n cháº£y ra... â€” Nguá»“n: SÆ°u táº§m\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"ÄÃ¢y lÃ  bÃ i ca dao dÃ¢n gian khÃ´ng rÃµ tÃªn tÃ¡c giáº£, nÃªn chÃºng em ghi nguá»“n lÃ  SÆ°u táº§m Ä‘Ãºng chuáº©n Máº«u sá»‘ 2 cá»§a Äiá»u 2 SGK!\"" },
        { "id": "CLUMSY", "quote": "\"BÃ i ca dao nÃ y ai cÅ©ng thuá»™c lÃ²ng tá»« nhá» nÃªn tá»• em cá»© chÃ©p lÃªn bÃ¡o tÆ°á»ng thÃ´i chá»© khÃ´ng cáº§n biáº¿t cÃ³ theo Ä‘Ãºng máº«u quy Ä‘á»‹nh cá»§a SGK hay khÃ´ng!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Äiá»u 2 SGK trang 21: Khi trÃ¬nh bÃ y má»™t bÃ i thÆ¡ hoáº·c ca dao khÃ´ng rÃµ tÃªn tÃ¡c giáº£, viá»‡c ghi nguá»“n lÃ  <b>\"SÆ°u táº§m\"</b> lÃ  Ä‘Ãºng quy Ä‘á»‹nh 100% âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_diary",
      "mockupType": "diary",
      "round": 1,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 3 (Äá»c vÃ  ká»ƒ láº¡i nháº­t kÃ½ cÃ¡ nhÃ¢n khi chÆ°a Ä‘Æ°á»£c phÃ©p)",
      "rumor": "Xáº£y ra tranh cÃ£i gay gáº¯t giá»¯a <b>{pName} ({pStartup})</b> vÃ  <b>{dName} ({dStartup})</b> vá» viá»‡c lá»™ bÃ­ máº­t trong cuá»‘n sá»• nháº­t kÃ½ cÃ¡ nhÃ¢n!",
      "knownFacts": "â€¢ <b>Diá»…n biáº¿n thá»±c táº¿:</b> ThÃ nh viÃªn <b>{pName}</b> sang bÃ n cá»§a <b>{dName}</b> tháº£o luáº­n rá»“i vÃ´ tÃ¬nh Ä‘á»ƒ quÃªn cuá»‘n sá»• nháº­t kÃ½ cÃ¡ nhÃ¢n (sá»• Ä‘ang má»Ÿ sáºµn trang viáº¿t dá»Ÿ).<br>â€¢ <b>HÃ nh Ä‘á»™ng cá»§a {dName}:</b> Tháº¥y sá»• má»Ÿ sáºµn, thÃ nh viÃªn <b>{dName}</b> Ä‘Ã£ cáº§m lÃªn Ä‘á»c to rá»“i Ä‘em ká»ƒ láº¡i ná»™i dung trong nháº­t kÃ½ cho nhiá»u báº¡n khÃ¡c nghe.",
      "exhibitBox": "ðŸ““ [XÃ¡c nháº­n táº¡i hiá»‡n trÆ°á»ng]: Cuá»‘n sá»• bÃ¬a xanh ngoÃ i bÃ¬a ghi \"Nháº­t kÃ½ riÃªng tÆ° cá»§a {pName}\" â€” CÃ¡c trang viáº¿t Ä‘ang má»Ÿ trÃªn bÃ n há»c.",
      "cards": [
        { "id": "EXCUSE", "quote": "\"Cuá»‘n sá»• Ä‘Æ°á»£c báº¡n Ä‘á»ƒ má»Ÿ sáºµn ngay trÃªn máº·t bÃ n lá»›p há»c chung, khÃ´ng cáº¥t trong cáº·p hay cÃ i khÃ³a. Nhá»¯ng dÃ²ng chá»¯ Ä‘Ã£ phÆ¡i bÃ y trÆ°á»›c máº¯t má»i ngÆ°á»i thÃ¬ viá»‡c Ä‘á»c vÃ  ká»ƒ láº¡i khÃ´ng thá»ƒ coi lÃ  vi pháº¡m bÃ­ máº­t!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 3 SGK, thÃ´ng tin cÃ¡ nhÃ¢n vÃ  nháº­t kÃ½ lÃ  quyá»n riÃªng tÆ° cá»§a má»—i ngÆ°á»i. DÃ¹ báº¡n Ä‘á»ƒ quÃªn má»Ÿ sáºµn thÃ¬ viá»‡c tá»± Ã½ Ä‘á»c to vÃ  lan truyá»n khi chÆ°a Ä‘Æ°á»£c phÃ©p lÃ  hoÃ n toÃ n sai trÃ¡i. Tá»• em xin thÃ nh tháº­t xin lá»—i báº¡n!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Chiáº¿u theo Äiá»u 3 & Hoáº¡t Ä‘á»™ng 2 SGK trang 21 (tÃ¬nh huá»‘ng cá»§a An vÃ  BÃ¬nh): ThÃ´ng tin trong cuá»‘n nháº­t kÃ½ mang tÃ­nh riÃªng tÆ°. DÃ¹ vÃ´ tÃ¬nh hay cá»‘ Ã½ truy cáº­p, Ä‘á»c vÃ  ká»ƒ láº¡i khi chÆ°a Ä‘Æ°á»£c phÃ©p Ä‘á»u lÃ  <b>VI PHáº M TÃNH RIÃŠNG TÆ¯!</b>"
    },
    {
      "id": "case_newsletter",
      "mockupType": "newsletter",
      "round": 1,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 1 (ÄÃ£ xin phÃ©p + Ghi rÃµ tÃªn tÃ¡c giáº£ bÃ i viáº¿t)",
      "rumor": "DÆ° luáº­n nghi ngá» Báº£n tin trÆ°á»ng cá»§a <b>{dName} ({dStartup})</b> Ä‘Äƒng bÃ i viáº¿t cáº£m xÃºc <i>\"NgÆ°á»i máº¹ thá»© hai\"</i> cá»§a <b>{pName} ({pStartup})</b> mÃ  khÃ´ng xin phÃ©p!",
      "knownFacts": "â€¢ <b>Sá»± tháº­t giá»¯a 2 tá»•:</b> HÃ´m qua, Ä‘áº¡i diá»‡n <b>{dName}</b> Ä‘Ã£ gáº·p trá»±c tiáº¿p xin phÃ©p mÆ°á»£n bÃ i viáº¿t vÃ  Ä‘Æ°á»£c <b>{pName}</b> Ä‘á»“ng Ã½.<br>â€¢ <b>TrÃªn báº£n tin Ä‘iá»‡n tá»­:</b> Ngay dÆ°á»›i bÃ i viáº¿t, <b>{dName}</b> in rÃµ rÃ ng thÃ´ng tin tÃ¡c giáº£ nhÆ° sau:",
      "exhibitBox": "ðŸ“„ [Báº£n tin Ä‘Ã£ xuáº¥t báº£n cá»§a {dName}]: BÃ i viáº¿t \"NgÆ°á»i máº¹ thá»© hai\" â€” ChÃº thÃ­ch: \"TÃ¡c giáº£ bÃ i viáº¿t: {pName} ({pStartup}) â€” Sá»­ dá»¥ng dÆ°á»›i sá»± Ä‘á»“ng Ã½ cá»§a tÃ¡c giáº£\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"ChÃºng em Ä‘Ã£ thá»±c hiá»‡n Ä‘Ãºng cáº£ 2 váº¿ cá»§a Äiá»u 1 SGK: Vá»«a xin phÃ©p báº¡n vÃ  vá»«a ghi rÃµ tÃªn tÃ¡c giáº£ á»Ÿ cuá»‘i bÃ i viáº¿t nÃªn hoÃ n toÃ n Ä‘Ãºng luáº­t!\"" },
        { "id": "CLUMSY", "quote": "\"BÃ i viáº¿t cá»§a báº¡n ráº¥t xÃºc Ä‘á»™ng vÃ  há»£p vá»›i chá»§ Ä‘á» báº£n tin trÆ°á»ng nÃªn tá»• em cá»© Ä‘Äƒng lÃªn Ä‘á»ƒ tÃ´n vinh thÃ´i chá»© khÃ´ng cáº§n cÄƒn cá»© vÃ o Ä‘iá»u luáº­t nÃ o!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Há»™p kiáº¿n thá»©c SGK trang 21 (Äiá»u 1): <b>{dName}</b> Ä‘Ã£ thá»a mÃ£n Ä‘á»§ cáº£ 2 váº¿: <b>(1) ÄÆ°á»£c tÃ¡c giáº£ cho phÃ©p</b> vÃ  <b>(2) Ghi rÃµ tÃªn tÃ¡c giáº£</b> á»Ÿ cuá»‘i bÃ i viáº¿t âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_podcast",
      "mockupType": "podcast",
      "round": 1,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 1 (ÄÃ£ xin phÃ©p + Giá»›i thiá»‡u rÃµ ngÆ°á»i chia sáº»)",
      "rumor": "KÃªnh Podcast há»c Ä‘Æ°á»ng cá»§a <b>{dName} ({dStartup})</b> bá»‹ nghi ngá» phÃ¡t sÃ³ng Ä‘oáº¡n ghi Ã¢m bÃ i thuyáº¿t trÃ¬nh cá»§a <b>{pName} ({pStartup})</b> mÃ  khÃ´ng xin phÃ©p!",
      "knownFacts": "â€¢ <b>Sá»± tháº­t giá»¯a 2 tá»•:</b> TrÆ°á»›c khi thu Ã¢m sá»‘ phÃ¡t sÃ³ng má»›i, <b>{dName}</b> Ä‘Ã£ gá»­i tin nháº¯n xin phÃ©p vÃ  Ä‘Æ°á»£c <b>{pName}</b> Ä‘á»“ng Ã½ cho phÃ¡t Ä‘oáº¡n ghi Ã¢m bÃ i thuyáº¿t trÃ¬nh.<br>â€¢ <b>TrÃªn báº£n tin Ã¢m thanh:</b> NgÆ°á»i dáº«n chÆ°Æ¡ng trÃ¬nh cá»§a <b>{dName}</b> Ä‘Ã£ giá»›i thiá»‡u rÃµ rÃ ng tÃªn tÃ¡c giáº£ nhÆ° sau:",
      "exhibitBox": "ðŸŽ™ï¸ [TrÃ­ch Ä‘oáº¡n Podcast cá»§a {dName}]: \"Äoáº¡n Ã¢m thanh thuyáº¿t trÃ¬nh vá»«a rá»“i Ä‘Æ°á»£c chia sáº» bá»Ÿi báº¡n {pName} ({pStartup}) dÆ°á»›i sá»± Ä‘á»“ng Ã½ cá»§a tÃ¡c giáº£.\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"ChÃºng em Ä‘Ã£ xin phÃ©p trÆ°á»›c vÃ  trong táº­p podcast Ä‘Ã£ nÃ³i rÃµ tÃªn tÃ¡c giáº£ báº¡n {pName} nÃªn hoÃ n toÃ n Ä‘Ãºng chuáº©n Äiá»u 1!\"" },
        { "id": "CLUMSY", "quote": "\"Äoáº¡n thuyáº¿t trÃ¬nh nÃ y lÃ  bÃ i há»c trÃªn lá»›p nÃªn phÃ¡t thanh há»c Ä‘Æ°á»ng cá»© phÃ¡t sÃ³ng tá»± nhiÃªn, khÃ´ng cáº§n pháº£i cÄƒn cá»© theo cÃ¡c quy táº¯c tÃ¡c quyá»n!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Äá»‘i chiáº¿u Äiá»u 1: <b>{dName}</b> Ä‘Ã£ thá»a mÃ£n Ä‘á»§ cáº£ 2 váº¿: <b>(1) ÄÆ°á»£c sá»± Ä‘á»“ng Ã½ cá»§a tÃ¡c giáº£</b> vÃ  <b>(2) Giá»›i thiá»‡u rÃµ tÃªn tÃ¡c giáº£</b> trÃªn sáº£n pháº©m âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_sticker",
      "mockupType": "sticker",
      "round": 1,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 1 & Äiá»u 2 (Tá»± Ã½ láº¥y hÃ¬nh váº½ cá»§a báº¡n, xÃ³a logo vÃ  nháº­n lÃ  ngÆ°á»i thiáº¿t káº¿)",
      "rumor": "<b>{pName} ({pStartup})</b> bá»©c xÃºc khi bá»™ Sticker hoáº¡t hÃ¬nh do mÃ¬nh dÃ y cÃ´ng váº½ trÃªn mÃ¡y tÃ­nh bá»—ng xuáº¥t hiá»‡n trong bá»™ nhÃ£n dÃ¡n cá»§a <b>{dName} ({dStartup})</b>!",
      "knownFacts": "â€¢ <b>Vá» viá»‡c xin phÃ©p:</b> <b>{dName}</b> tháº¥y bá»™ nhÃ£n dÃ¡n cá»§a báº¡n Ä‘áº¹p liá»n chá»¥p mÃ n hÃ¬nh lÆ°u láº¡i, khÃ´ng há» nháº¯n tin hay xin phÃ©p <b>{pName}</b>.<br>â€¢ <b>Vá» ghi nháº­n tÃ¡c quyá»n:</b> <b>{dName}</b> dÃ¹ng cÃ´ng cá»¥ chá»‰nh sá»­a Ä‘á»ƒ xÃ³a logo chá»¯ kÃ½ cá»§a <b>{pName}</b> á»Ÿ gÃ³c hÃ¬nh vÃ  ghi tÃªn tá»• mÃ¬nh:",
      "exhibitBox": "ðŸŽ¨ [Bá»™ nhÃ£n dÃ¡n cÃ´ng bá»‘ cá»§a {dName}]: Bá»™ Sticker 6 con váº­t â€” DÃ²ng chÃº thÃ­ch: \"Thiáº¿t káº¿ bá»Ÿi: {dName} ({dStartup})\"",
      "cards": [
        { "id": "EXCUSE", "quote": "\"HÃ¬nh váº½ chia sáº» trong nhÃ³m lá»›p lÃ  tÃ i nguyÃªn má»Ÿ cho cáº£ lá»›p cÃ¹ng dÃ¹ng. Tá»• em Ä‘Ã£ bá» nhiá»u cÃ´ng sá»©c cáº¯t viá»n, chá»‰nh sá»­a mÃ u sáº¯c vÃ  táº¡o thÃ nh bá»™ sticker hoÃ n chá»‰nh thÃ¬ tá»• em chÃ­nh lÃ  ngÆ°á»i thiáº¿t káº¿ bá»™ nhÃ£n dÃ¡n má»›i nÃ y!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 1 vÃ  Äiá»u 2 SGK, quyá»n tÃ¡c giáº£ thuá»™c vá» ngÆ°á»i váº½ ra bá»©c hÃ¬nh. Viá»‡c tá»± Ã½ cáº¯t viá»n, xÃ³a logo chá»¯ kÃ½ Ä‘á»ƒ nháº­n lÃ  cá»§a mÃ¬nh mÃ  chÆ°a xin phÃ©p lÃ  hÃ nh vi Ä‘áº¡o nhÃ¡i nghiÃªm trá»ng. Tá»• em xin nháº­n lá»—i vÃ  thu há»“i ngay!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> TÃ¡c pháº©m Ä‘á»“ há»a cÃ³ quyá»n tÃ¡c giáº£ cá»§a <b>{pName}</b>. HÃ nh vi tá»± Ã½ láº¥y chÆ°a xin phÃ©p (sai Äiá»u 1) vÃ  xÃ³a chá»¯ kÃ½ nháº­n lÃ m cá»§a mÃ¬nh (sai Äiá»u 2) lÃ  <b>VI PHáº M Báº¢N QUYá»€N!</b>"
    },
    {
      "id": "case_recitation",
      "mockupType": "recitation",
      "round": 1,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 2 (Äá»c bÃ i thÆ¡ ná»•i tiáº¿ng vÃ  ghi rÃµ tÃ¡c giáº£ sÃ¡ng tÃ¡c)",
      "rumor": "CÃ³ Ã½ kiáº¿n cho ráº±ng video ngÃ¢m thÆ¡ cá»§a <b>{dName} ({dStartup})</b> sao chÃ©p tÃ¡c pháº©m vÄƒn há»c cá»§a ngÆ°á»i khÃ¡c Ä‘á»ƒ dá»± thi phong trÃ o!",
      "knownFacts": "â€¢ <b>Ná»™i dung thá»ƒ hiá»‡n:</b> <b>{dName}</b> tá»± Ä‘á»c vÃ  thu Ã¢m bÃ i thÆ¡ ná»•i tiáº¿ng <i>\"QuÃª hÆ°Æ¡ng\"</i> Ä‘á»ƒ lÃ m video dá»± thi Tiáº¿ng hÃ¡t tuá»•i thÆ¡.<br>â€¢ <b>TrÃªn khung hÃ¬nh vÃ  pháº§n mÃ´ táº£ video:</b> <b>{dName}</b> trÃ¬nh bÃ y thÃ´ng tin tÃ¡c quyá»n nhÆ° sau:",
      "exhibitBox": "ðŸ“º [Khung hÃ¬nh video cá»§a {dName}]: \"BÃ i thÆ¡: QuÃª hÆ°Æ¡ng â€” TÃ¡c giáº£: Äá»— Trung QuÃ¢n â€” TrÃ¬nh bÃ y: {dName} ({dStartup})\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"ChÃºng em tá»± Ä‘á»c thÆ¡ vÃ  Ä‘Ã£ ghi rÃµ rÃ ng TÃªn bÃ i thÆ¡ cÃ¹ng TÃªn tÃ¡c giáº£ Äá»— Trung QuÃ¢n Ä‘Ãºng chuáº©n quy Ä‘á»‹nh tÃ´n trá»ng tÃ¡c quyá»n Äiá»u 2!\"" },
        { "id": "CLUMSY", "quote": "\"BÃ i thÆ¡ QuÃª hÆ°Æ¡ng cÃ³ sáºµn trong sÃ¡ch tiáº¿ng Viá»‡t nÃªn tá»• em cá»© thu Ã¢m giá»ng Ä‘á»c dá»± thi thÃ´i chá»© khÃ´ng cáº§n báº­n tÃ¢m Ä‘áº¿n quy Ä‘á»‹nh tÃ¡c quyá»n cá»§a tÃ¡c giáº£!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Äiá»u 2 SGK trang 21: TrÃ¬nh bÃ y bÃ i thÆ¡ cá»§a tÃ¡c giáº£ khÃ¡c vÃ  ghi rÃµ tÃªn bÃ i thÆ¡ cÃ¹ng tÃªn tÃ¡c giáº£ lÃ  hoÃ n toÃ n Ä‘Ãºng quy Ä‘á»‹nh tÃ¡c quyá»n âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_gallery",
      "mockupType": "gallery",
      "round": 1,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 3 (Tá»± Ã½ láº¥y áº£nh chá»¥p gia Ä‘Ã¬nh cá»§a báº¡n mang Ä‘i triá»ƒn lÃ£m cÃ´ng cá»™ng)",
      "rumor": "<b>{pName} ({pStartup})</b> báº¥t ngá» khi tháº¥y bá»©c áº£nh chá»¥p cáº£ gia Ä‘Ã¬nh mÃ¬nh Ä‘i nghá»‰ mÃ¡t bá»‹ <b>{dName} ({dStartup})</b> in ra dÃ¡n lÃªn Báº£ng tin triá»ƒn lÃ£m trÆ°á»ng!",
      "knownFacts": "â€¢ <b>Nguá»“n gá»‘c bá»©c áº£nh:</b> Bá»©c áº£nh chá»¥p bá»‘ máº¹ vÃ  <b>{pName}</b> Ä‘Æ°á»£c Ä‘Äƒng trong album gia Ä‘Ã¬nh riÃªng tÆ° trÃªn trang cÃ¡ nhÃ¢n cá»§a <b>{pName}</b>.<br>â€¢ <b>HÃ nh Ä‘á»™ng cá»§a {dName}:</b> Tháº¥y áº£nh Ä‘áº¹p, <b>{dName}</b> Ä‘Ã£ tá»± táº£i vá» mÃ¡y rá»“i in ra dÃ¡n vÃ o gÃ³c triá»ƒn lÃ£m áº£nh mÃ  chÆ°a tá»«ng há»i xin phÃ©p <b>{pName}</b> hay phá»¥ huynh.",
      "exhibitBox": "ðŸ–¼ï¸ [Báº£ng triá»ƒn lÃ£m trÆ°á»ng]: Bá»©c áº£nh gia Ä‘Ã¬nh cá»§a {pName} â€” DÃ¡n kÃ¨m lá»i chÃº thÃ­ch: \"Gia Ä‘Ã¬nh háº¡nh phÃºc tiÃªu biá»ƒu\"",
      "cards": [
        { "id": "EXCUSE", "quote": "\"Tá»• em mang áº£nh Ä‘i triá»ƒn lÃ£m hoÃ n toÃ n vÃ¬ má»¥c Ä‘Ã­ch tá»‘t Ä‘áº¹p nháº±m tÃ´n vinh táº¥m gÆ°Æ¡ng 'Gia Ä‘Ã¬nh háº¡nh phÃºc tiÃªu biá»ƒu' cá»§a trÆ°á»ng há»c, khÃ´ng há» vá»¥ lá»£i hay nÃ³i xáº¥u báº¡n nÃªn khÃ´ng thá»ƒ coi lÃ  vi pháº¡m quyá»n riÃªng tÆ°!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 3 SGK, hÃ¬nh áº£nh gia Ä‘Ã¬nh lÃ  dá»¯ liá»‡u riÃªng tÆ° cá»§a cÃ¡ nhÃ¢n. DÃ¹ vá»›i má»¥c Ä‘Ã­ch tá»‘t Ä‘áº¹p hay khen ngá»£i thÃ¬ tá»± Ã½ mang Ä‘i trÆ°ng bÃ y cÃ´ng cá»™ng khi chÆ°a Ä‘Æ°á»£c gia Ä‘Ã¬nh báº¡n cho phÃ©p váº«n lÃ  vi pháº¡m. Tá»• em xin gá»¡ áº£nh ngay!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Äiá»u 3 SGK: HÃ¬nh áº£nh gia Ä‘Ã¬nh vÃ  cÃ¡ nhÃ¢n lÃ  thÃ´ng tin mang tÃ­nh riÃªng tÆ°. DÃ¹ vá»›i má»¥c Ä‘Ã­ch khen ngá»£i thÃ¬ tá»± Ã½ cÃ´ng khai khi chÆ°a Ä‘Æ°á»£c phÃ©p váº«n lÃ  <b>VI PHáº M QUYá»€N RIÃŠNG TÆ¯!</b>"
    },
    {
      "id": "case_remix",
      "mockupType": "remix",
      "round": 1,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 1 (Tá»± Ã½ phá»‘i láº¡i báº£n nháº¡c cá»§a báº¡n khi chÆ°a xin phÃ©p)",
      "rumor": "<b>{pName} ({pStartup})</b> phÃ¡t hiá»‡n Ä‘oáº¡n nháº¡c bÃ i hÃ¡t tá»± sÃ¡ng tÃ¡c cá»§a mÃ¬nh bá»‹ <b>{dName} ({dStartup})</b> cáº¯t ghÃ©p mang Ä‘i phá»‘i thÃ nh nháº¡c DJ sÃ´i Ä‘á»™ng!",
      "knownFacts": "â€¢ <b>Vá» viá»‡c xin phÃ©p:</b> <b>{dName}</b> táº£i tá»‡p Ã¢m thanh bÃ i hÃ¡t gá»‘c cá»§a <b>{pName}</b> vá» mÃ¡y rá»“i Ä‘Æ°a vÃ o pháº§n má»m phá»‘i nháº¡c mÃ  chÆ°a tá»«ng há»i Ã½ kiáº¿n tÃ¡c giáº£.<br>â€¢ <b>Vá» cÃ¡ch ghi nguá»“n:</b> Trong pháº§n thÃ´ng tin báº£n nháº¡c má»›i, <b>{dName}</b> cÃ³ ghi dÃ²ng chá»¯:",
      "exhibitBox": "ðŸŽ§ [Báº£n nháº¡c remix cá»§a {dName}]: \"Nháº¡c cá»• Ä‘á»™ng thá»ƒ thao Remix (Giai Ä‘iá»‡u gá»‘c cá»§a tÃ¡c giáº£: {pName})\"",
      "cards": [
        { "id": "EXCUSE", "quote": "\"ChÃºng em Ä‘Ã£ ghi nháº­n Ä‘áº§y Ä‘á»§ tÃªn tÃ¡c giáº£ giai Ä‘iá»‡u gá»‘c ráº¥t trang trá»ng á»Ÿ pháº§n giá»›i thiá»‡u Ä‘Ãºng Äiá»u 2 SGK. CÃ²n pháº§n phá»‘i khÃ­, tiáº¿t táº¥u sÃ´i Ä‘á»™ng lÃ  do tá»• em tá»± sÃ¡ng táº¡o nÃªn khÃ´ng cáº§n pháº£i xin phÃ©p tÃ¡c giáº£!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 1 SGK trang 21, khi sá»­ dá»¥ng hoáº·c chá»‰nh sá»­a tÃ¡c pháº©m cá»§a ngÆ°á»i khÃ¡c báº¯t buá»™c pháº£i Ä‘Æ°á»£c tÃ¡c giáº£ cho phÃ©p trÆ°á»›c. CÃ³ ghi tÃªn mÃ  chÆ°a xin phÃ©p váº«n lÃ  vi pháº¡m báº£n quyá»n. Tá»• em xin nháº­n trÃ¡ch nhiá»‡m!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Äiá»u 1 (Há»™p kiáº¿n thá»©c SGK trang 21): Khi sá»­ dá»¥ng hoáº·c sá»­a Ä‘á»•i tÃ¡c pháº©m cá»§a ngÆ°á»i khÃ¡c báº¯t buá»™c pháº£i <b>ÄÆ¯á»¢C CHO PHÃ‰P</b>. CÃ³ ghi tÃªn tÃ¡c giáº£ nhÆ°ng chÆ°a xin phÃ©p váº«n lÃ  <b>VI PHáº M Báº¢N QUYá»€N!</b>"
    },
    {
      "id": "case_parody",
      "mockupType": "parody",
      "round": 1,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 2 (Ká»‹ch báº£n dá»±a trÃªn truyá»‡n cá»• tÃ­ch cÃ³ ghi rÃµ Phá»ng theo)",
      "rumor": "Má»™t sá»‘ khÃ¡n giáº£ tháº¯c máº¯c vá»Ÿ ká»‹ch há»™i diá»…n cá»§a <b>{dName} ({dStartup})</b> cÃ³ cá»‘t truyá»‡n chÃ ng dÅ©ng sÄ© diá»‡t quÃ¡i váº­t giá»‘ng truyá»‡n cá»• tÃ­ch <i>\"Tháº¡ch Sanh\"</i> trong sÃ¡ch cá»§a <b>{pName}</b>!",
      "knownFacts": "â€¢ <b>CÃ¡ch xÃ¢y dá»±ng ká»‹ch báº£n:</b> <b>{dName}</b> dá»±a trÃªn tÃ­ch truyá»‡n dÃ¢n gian Tháº¡ch Sanh, tá»± sÃ¡ng tÃ¡c láº¡i toÃ n bá»™ lá»i thoáº¡i vÃ  lá»i dáº«n chuyá»‡n má»›i cho cÃ¡c vai diá»…n.<br>â€¢ <b>TrÃªn tá» rÆ¡i phÃ¡t cho khÃ¡n giáº£:</b> <b>{dName}</b> ghi dÃ²ng chÃº thÃ­ch nguá»“n nhÆ° sau:",
      "exhibitBox": "ðŸŽ­ [Tá» rÆ¡i vá»Ÿ ká»‹ch cá»§a {dName}]: \"Vá»Ÿ ká»‹ch thiáº¿u nhi: NgÆ°á»i HÃ¹ng Rá»«ng Xanh â€” Phá»ng theo truyá»‡n cá»• tÃ­ch dÃ¢n gian Tháº¡ch Sanh\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"ChÃºng em diá»…n Ä‘áº¡t láº¡i truyá»‡n báº±ng lá»i thoáº¡i ká»‹ch báº£n má»›i cá»§a tá»• mÃ¬nh vÃ  Ä‘Ã£ ghi nguá»“n Phá»ng theo truyá»‡n Tháº¡ch Sanh chuáº©n Máº«u sá»‘ 3 Äiá»u 2 SGK!\"" },
        { "id": "CLUMSY", "quote": "\"Vá»Ÿ ká»‹ch nÃ y chá»‰ diá»…n vui trong há»™i diá»…n vÄƒn nghá»‡ cá»§a trÆ°á»ng nÃªn tá»• em cá»© dá»±ng cáº£nh theo tÃ­ch xÆ°a chá»© khÃ´ng cáº§n biáº¿t Ä‘iá»u luáº­t quy Ä‘á»‹nh ra sao!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Äiá»u 2 SGK trang 21: Khi diá»…n Ä‘áº¡t láº¡i ná»™i dung truyá»‡n cá»• tÃ­ch báº±ng ngÃ´n ngá»¯ ká»‹ch báº£n má»›i, ghi nguá»“n <b>\"Phá»ng theo truyá»‡n...\"</b> lÃ  hoÃ n toÃ n Ä‘Ãºng luáº­t âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_clapper",
      "mockupType": "clapper",
      "round": 2,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 2 (Diá»…n Ä‘áº¡t láº¡i báº±ng lá»i cá»§a mÃ¬nh vÃ  ghi Phá»ng theo)",
      "rumor": "CÃ³ tin Ä‘á»“n bá»™ phim hoáº¡t hÃ¬nh ngáº¯n má»›i chiáº¿u cá»§a <b>{dName} ({dStartup})</b> báº¯t chÆ°á»›c cá»‘t truyá»‡n ngá»¥ ngÃ´n <i>\"RÃ¹a vÃ  Thá»\"</i> trong tá»§ sÃ¡ch cá»§a <b>{pName}</b>!",
      "knownFacts": "â€¢ <b>CÃ¡ch thá»±c hiá»‡n:</b> <b>{dName}</b> dá»±a theo Ã½ nghÄ©a cÃ¢u chuyá»‡n <i>\"RÃ¹a vÃ  Thá»\"</i>, sau Ä‘Ã³ tá»± viáº¿t láº¡i toÃ n bá»™ lá»i thoáº¡i má»›i báº±ng ngÃ´n ngá»¯ cá»§a tá»• mÃ¬nh.<br>â€¢ <b>TrÃªn mÃ n hÃ¬nh má»Ÿ Ä‘áº§u phim:</b> <b>{dName}</b> hiá»ƒn thá»‹ rÃµ rÃ ng dÃ²ng chÃº thÃ­ch nguá»“n nhÆ° sau:",
      "exhibitBox": "ðŸŽžï¸ [MÃ n hÃ¬nh má»Ÿ Ä‘áº§u phim cá»§a {dName}]: \"Hoáº¡t hÃ¬nh: Cuá»™c Äua Trong Rá»«ng â€” Ná»™i dung: Phá»ng theo truyá»‡n RÃ¹a vÃ  Thá»\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"ChÃºng em khÃ´ng chÃ©p nguyÃªn vÄƒn mÃ  diá»…n Ä‘áº¡t láº¡i báº±ng ngÃ´n ngá»¯ cá»§a mÃ¬nh vÃ  Ä‘Ã£ ghi rÃµ nguá»“n lÃ  Phá»ng theo truyá»‡n RÃ¹a vÃ  Thá» Ä‘Ãºng chuáº©n vÃ­ dá»¥ SGK trang 21!\"" },
        { "id": "CLUMSY", "quote": "\"Truyá»‡n ngá»¥ ngÃ´n RÃ¹a vÃ  Thá» lÃ  cÃ¢u chuyá»‡n quen thuá»™c ai cÅ©ng biáº¿t nÃªn tá»• em cá»© váº½ tranh lÃ m phim theo trÃ­ nhá»› chá»© khÃ´ng cáº§n cÄƒn cá»© theo Ä‘iá»u luáº­t nÃ o!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> SGK trang 21 nÃªu chÃ­nh xÃ¡c vÃ­ dá»¥ nÃ y: NgÆ°á»i sá»­ dá»¥ng cÃ³ thá»ƒ diá»…n Ä‘áº¡t láº¡i ná»™i dung báº±ng ngÃ´n ngá»¯ cá»§a mÃ¬nh vÃ  ghi nguá»“n <b>\"Phá»ng theo truyá»‡n RÃ¹a vÃ  Thá»\"</b> âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP ÄÃšNG ÄIá»€U 2!</b>"
    },
    {
      "id": "case_computer",
      "mockupType": "computer",
      "round": 2,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 3 (Tá»± Ã½ sao chÃ©p tá»‡p trong mÃ¡y tÃ­nh cá»§a báº¡n khi chÆ°a xin phÃ©p)",
      "rumor": "<b>{pName} ({pStartup})</b> phÃ¡t hiá»‡n trong USB cá»§a <b>{dName} ({dStartup})</b> cÃ³ chá»©a tá»‡p bÃ i trÃ¬nh chiáº¿u dá»± thi cá»§a tá»• mÃ¬nh!",
      "knownFacts": "â€¢ <b>Diá»…n biáº¿n táº¡i phÃ²ng mÃ¡y:</b> Giá» ra chÆ¡i, mÃ¡y tÃ­nh cá»§a <b>{pName}</b> váº«n báº­t mÃ n hÃ¬nh (khÃ´ng Ä‘áº·t máº­t kháº©u khÃ³a mÃ¡y).<br>â€¢ <b>HÃ nh Ä‘á»™ng cá»§a {dName}:</b> ThÃ nh viÃªn <b>{dName}</b> Ä‘i ngang qua tháº¥y tá»‡p trÃ¬nh chiáº¿u trÃªn mÃ n hÃ¬nh Ä‘áº¹p quÃ¡ liá»n cáº¯m USB sao chÃ©p tá»‡p Ä‘Ã³ vá» mÃ¡y mÃ¬nh mÃ  chÆ°a há»i Ã½ kiáº¿n <b>{pName}</b>.",
      "exhibitBox": "ðŸ’» [BiÃªn báº£n phÃ²ng mÃ¡y]: Tá»‡p \"DuAn_SangTao.pptx\" cá»§a {pName} Ä‘Æ°á»£c sao chÃ©p sang USB cá»§a {dName} lÃºc 09:15 khi chá»§ mÃ¡y váº¯ng máº·t.",
      "cards": [
        { "id": "EXCUSE", "quote": "\"MÃ¡y tÃ­nh trong phÃ²ng thá»±c hÃ nh lÃ  thiáº¿t bá»‹ há»c táº­p chung cá»§a nhÃ  trÆ°á»ng, mÃ¡y má»Ÿ sáºµn khÃ´ng cÃ i máº­t kháº©u nghÄ©a lÃ  cÃ¡c tá»‡p Ä‘á»ƒ á»Ÿ cháº¿ Ä‘á»™ chia sáº» cÃ´ng khai cho báº¡n bÃ¨ trong lá»›p cÃ¹ng há»c há»i kinh nghiá»‡m!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo má»¥c 3 SGK trang 22, tá»‡p bÃ i lÃ m lÆ°u trÃªn mÃ¡y tÃ­nh lÃ  tÃ i liá»‡u riÃªng cá»§a há»c sinh. Tá»± Ã½ cáº¯m USB sao chÃ©p khi chÆ°a Ä‘Æ°á»£c báº¡n Ä‘á»“ng Ã½ (dÃ¹ mÃ¡y khÃ´ng khÃ³a) lÃ  hÃ nh vi vi pháº¡m Ä‘áº¡o Ä‘á»©c sá»‘. Tá»• em xin xÃ³a tá»‡p ngay!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo má»¥c 3 SGK trang 22: Sao chÃ©p tá»‡p cá»§a báº¡n khi chÆ°a cÃ³ sá»± Ä‘á»“ng Ã½ (dÃ¹ mÃ¡y báº¡n khÃ´ng khÃ³a máº­t kháº©u) lÃ  hÃ nh vi sai trÃ¡i, vi pháº¡m Ä‘áº¡o Ä‘á»©c vÃ  quyá»n riÃªng tÆ° âž” <b>VI PHáº M ÄIá»€U 3!</b>"
    },
    {
      "id": "case_agreement",
      "mockupType": "agreement",
      "round": 2,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 1 & 3 (Xin phÃ©p báº¡n trÆ°á»›c khi sao chÃ©p tá»‡p vÃ  ghi nguá»“n)",
      "rumor": "CÃ³ báº¡n bÃ¡o tin trÃ´ng tháº¥y thÃ nh viÃªn <b>{dName} ({dStartup})</b> cáº§m USB sang mÃ¡y tÃ­nh cá»§a <b>{pName} ({pStartup})</b> Ä‘á»ƒ chÃ©p tá»‡p trÃ¬nh chiáº¿u!",
      "knownFacts": "â€¢ <b>Sá»± tháº­t giá»¯a 2 tá»•:</b> Giá»‘ng tÃ¬nh huá»‘ng báº¡n Khoa vÃ  báº¡n Minh trong SGK, trÆ°á»›c khi cáº¯m USB, Ä‘áº¡i diá»‡n <b>{dName}</b> Ä‘Ã£ há»i xin phÃ©p trá»±c tiáº¿p vÃ  Ä‘Æ°á»£c trÆ°á»Ÿng nhÃ³m <b>{pName}</b> Ä‘á»“ng Ã½ cho chÃ©p tá»‡p máº«u.<br>â€¢ <b>TrÃªn slide sá»­ dá»¥ng:</b> <b>{dName}</b> cÅ©ng ghi chÃº rÃµ tÃªn tÃ¡c giáº£ tá»‡p máº«u lÃ  <b>{pName}</b>.",
      "exhibitBox": "ðŸ¤ [XÃ¡c nháº­n táº¡i lá»›p]: TrÆ°á»Ÿng nhÃ³m {pName} Ä‘Ã£ Ä‘á»“ng Ã½ cho {dName} sao chÃ©p tá»‡p + Slide cÃ³ ghi rÃµ \"Tá»‡p máº«u thiáº¿t káº¿: {pName}\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"Giá»‘ng báº¡n Khoa trong cÃ¢u há»i SGK trang 22, chÃºng em Ä‘Ã£ xin phÃ©p tá»• báº¡n trÆ°á»›c khi sao chÃ©p tá»‡p trÃ¬nh chiáº¿u vÃ  ghi rÃµ nguá»“n nÃªn hoÃ n toÃ n Ä‘Ãºng luáº­t!\"" },
        { "id": "CLUMSY", "quote": "\"Tháº¥y tá»‡p trÃ¬nh chiáº¿u cá»§a báº¡n Ä‘áº¹p quÃ¡ thÃ¬ tá»• em cá»© xin báº¡n má»™t tiáº¿ng rá»“i chÃ©p thÃ´i chá»© khÃ´ng nghÄ© lÃ  viá»‡c nÃ y láº¡i liÃªn quan Ä‘áº¿n quy Ä‘á»‹nh phÃ¡p luáº­t!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo cÃ¢u há»i ghÃ©p ná»‘i SGK trang 22 (tÃ¬nh huá»‘ng 3): Xin phÃ©p báº¡n trÆ°á»›c khi sao chÃ©p tá»‡p trÃ¬nh chiáº¿u vÃ  ghi rÃµ nguá»“n lÃ  hÃ nh vi tÃ´n trá»ng báº£n quyá»n Ä‘Ã¡ng Ä‘á»“ng tÃ¬nh âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_magazine",
      "mockupType": "magazine",
      "round": 2,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 1 (Chá»‰ ghi tÃªn tÃ¡c giáº£ nhÆ°ng chÆ°a Ä‘Æ°á»£c tÃ¡c giáº£ cho phÃ©p)",
      "rumor": "<b>{pName} ({pStartup})</b> phÃ¡t hiá»‡n bá»©c tranh váº½ phong cáº£nh trÃªn mÃ¡y tÃ­nh cá»§a mÃ¬nh bá»‹ <b>{dName} ({dStartup})</b> láº¥y in lÃªn bÃ¬a táº¡p chÃ­!",
      "knownFacts": "â€¢ <b>Vá» viá»‡c xin phÃ©p:</b> Giá»‘ng tÃ¬nh huá»‘ng cá»§a Hoa vÃ  Minh trong SGK, <b>{dName}</b> tá»± láº¥y bá»©c tranh cá»§a <b>{pName}</b> Ä‘Æ°a vÃ o táº¡p chÃ­ mÃ  chÆ°a há» há»i Ã½ kiáº¿n <b>{pName}</b>.<br>â€¢ <b>Vá» viá»‡c ghi nguá»“n:</b> DÆ°á»›i bá»©c tranh trÃªn táº¡p chÃ­, <b>{dName}</b> váº«n ghi dÃ²ng chá»¯ tÃªn tÃ¡c giáº£ ráº¥t to nhÆ° sau:",
      "exhibitBox": "ðŸŽ¨ [BÃ¬a táº¡p chÃ­ cá»§a {dName}]: CÃ³ in dÃ²ng chá»¯ \"Tranh váº½ bá»Ÿi tÃ¡c giáº£: {pName}\" dÆ°á»›i bá»©c tranh phong cáº£nh sá»‘.",
      "cards": [
        { "id": "EXCUSE", "quote": "\"DÆ°á»›i bá»©c tranh trÃªn bÃ¬a táº¡p chÃ­, tá»• em Ä‘Ã£ in dÃ²ng chá»¯ ghi rÃµ tÃªn tÃ¡c giáº£ ráº¥t trang trá»ng Ä‘Ãºng chuáº©n Äiá»u 2 SGK Ä‘á»ƒ quáº£ng bÃ¡ tÃ i nÄƒng cho báº¡n, khÃ´ng há» nháº­n vÆ¡ lÃ  cá»§a mÃ¬nh nÃªn tá»• em hoÃ n toÃ n Ä‘Ãºng quy Ä‘á»‹nh tÃ¡c quyá»n!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Hoáº¡t Ä‘á»™ng 2 SGK trang 21 vÃ  Äiá»u 1, viá»‡c sá»­ dá»¥ng tÃ¡c pháº©m báº¯t buá»™c pháº£i cÃ³ Ä‘á»§ 2 váº¿: ÄÆ°á»£c tÃ¡c giáº£ cho phÃ©p VÃ€ Ghi rÃµ nguá»“n. CÃ³ ghi tÃªn tÃ¡c giáº£ nhÆ°ng chÆ°a xin phÃ©p váº«n lÃ  vi pháº¡m báº£n quyá»n. Tá»• em xin nháº­n lá»—i!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Hoáº¡t Ä‘á»™ng 2 SGK trang 21 (tÃ¬nh huá»‘ng Minh vÃ  Hoa) & Äiá»u 1: Chá»‰ Ä‘Æ°á»£c sá»­ dá»¥ng ná»™i dung khi <b>Ä‘Æ°á»£c tÃ¡c giáº£ cho phÃ©p</b>. CÃ³ ghi tÃªn tÃ¡c giáº£ nhÆ°ng <b>chÆ°a xin phÃ©p</b> váº«n lÃ  <b>VI PHáº M ÄIá»€U 1!</b>"
    },
    {
      "id": "case_slide",
      "mockupType": "slide",
      "round": 2,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 1 & Váº­n dá»¥ng SGK (Xin phÃ©p vÃ  ghi rÃµ nguá»“n website)",
      "rumor": "Nhiá»u ngÆ°á»i tháº¯c máº¯c khi tháº¥y bÃ i trÃ¬nh chiáº¿u <i>\"NgÃ y há»™i Tráº¡ng NguyÃªn nhá» tuá»•i\"</i> cá»§a <b>{dName} ({dStartup})</b> sá»­ dá»¥ng tÆ° liá»‡u tá»« website do <b>{pName} ({pStartup})</b> quáº£n lÃ½!",
      "knownFacts": "â€¢ <b>Sá»± tháº­t giá»¯a 2 tá»•:</b> Ban biÃªn táº­p website cá»§a <b>{pName}</b> Ä‘Ã£ cáº¥p phÃ©p cho cÃ¡c tá»• sá»­ dá»¥ng tÆ° liá»‡u phá»¥c vá»¥ há»c táº­p náº¿u ghi rÃµ nguá»“n website.<br>â€¢ <b>TrÃªn trang cuá»‘i bÃ i trÃ¬nh chiáº¿u:</b> <b>{dName}</b> Ä‘Ã£ ghi Ä‘áº§y Ä‘á»§ thÃ´ng tin nguá»“n nhÆ° sau:",
      "exhibitBox": "ðŸŒ [Slide cuá»‘i bÃ i trÃ¬nh chiáº¿u cá»§a {dName}]: \"TÆ° liá»‡u vÃ  hÃ¬nh áº£nh Ä‘Æ°á»£c phÃ©p sá»­ dá»¥ng â€” Nguá»“n: Website {pStartup} (thieunien.vn)\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"Theo Ä‘Ãºng pháº§n Váº­n dá»¥ng SGK trang 23, chÃºng em Ä‘Ã£ Ä‘Æ°á»£c phÃ©p sá»­ dá»¥ng vÃ  ghi rÃµ nguá»“n thÃ´ng tin tá»« website á»Ÿ trang cuá»‘i bÃ i trÃ¬nh chiáº¿u!\"" },
        { "id": "CLUMSY", "quote": "\"TÆ° liá»‡u nÃ y cÃ³ sáºµn trÃªn website má»Ÿ cá»§a trÆ°á»ng nÃªn tá»• em cá»© táº£i vá» Ä‘Æ°a vÃ o slide thuyáº¿t trÃ¬nh chá»© khÃ´ng cáº§n tÃ¬m hiá»ƒu xem website cÃ³ quy Ä‘á»‹nh gÃ¬ khÃ´ng!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo má»¥c Váº­n dá»¥ng SGK trang 23: Khi sá»­ dá»¥ng thÃ´ng tin tá»« website cho bÃ i trÃ¬nh chiáº¿u, viá»‡c Ä‘Æ°á»£c phÃ©p vÃ  ghi rÃµ nguá»“n website lÃ  hÃ nh Ä‘á»™ng tÃ´n trá»ng báº£n quyá»n chuáº©n má»±c âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_smartphone",
      "mockupType": "smartphone",
      "round": 2,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 3 (Äá»c tin nháº¯n trÃªn Ä‘iá»‡n thoáº¡i cá»§a ngÆ°á»i khÃ¡c khi khÃ´ng Ä‘Æ°á»£c phÃ©p)",
      "rumor": "<b>{pName} ({pStartup})</b> tá»‘ cÃ¡o thÃ nh viÃªn cá»§a <b>{dName} ({dStartup})</b> xÃ¢m pháº¡m quyá»n riÃªng tÆ° trÃªn Ä‘iá»‡n thoáº¡i di Ä‘á»™ng!",
      "knownFacts": "â€¢ <b>Diá»…n biáº¿n thá»±c táº¿:</b> Äiá»‡n thoáº¡i cá»§a Ä‘áº¡i diá»‡n <b>{pName}</b> Ä‘á»ƒ trÃªn bÃ n há»c bá»—ng sÃ¡ng mÃ n hÃ¬nh bÃ¡o cÃ³ tin nháº¯n riÃªng tá»« gia Ä‘Ã¬nh gá»­i tá»›i.<br>â€¢ <b>HÃ nh Ä‘á»™ng cá»§a {dName}:</b> ThÃ nh viÃªn <b>{dName}</b> ngá»“i cáº¡nh Ä‘Ã£ tá»± Ã½ cáº§m Ä‘iá»‡n thoáº¡i lÃªn Ä‘á»c tin nháº¯n rá»“i chia sáº» chuyá»‡n Ä‘Ã³ cho cÃ¡c báº¡n xung quanh.",
      "exhibitBox": "ðŸ“± [XÃ¡c nháº­n sá»± viá»‡c]: Tin nháº¯n riÃªng tÆ° trÃªn Ä‘iá»‡n thoáº¡i cá»§a {pName} Ä‘Æ°á»£c thÃ nh viÃªn {dName} Ä‘á»c vÃ  chia sáº» láº¡i trong lá»›p.",
      "cards": [
        { "id": "EXCUSE", "quote": "\"ThÃ´ng bÃ¡o tin nháº¯n tá»± Ä‘á»™ng sÃ¡ng vÃ  hiá»‡n rÃµ ná»™i dung trÃªn mÃ n hÃ¬nh khÃ³a ngay trÆ°á»›c máº¯t, chÃºng em khÃ´ng há» nháº­p máº­t mÃ£ hay báº» khÃ³a thiáº¿t bá»‹ nÃªn viá»‡c Ä‘á»c Ä‘Æ°á»£c chá»‰ lÃ  pháº£n xáº¡ nhÃ¬n tháº¥y thÃ´ng tin tá»± nhiÃªn!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Luyá»‡n táº­p 2 SGK trang 23, Ä‘á»c tin nháº¯n trÃªn Ä‘iá»‡n thoáº¡i cá»§a ngÆ°á»i khÃ¡c vÃ  chia sáº» thÃ´ng tin riÃªng tÆ° khi chÆ°a Ä‘Æ°á»£c phÃ©p lÃ  vi pháº¡m nghiÃªm trá»ng quyá»n riÃªng tÆ°. Tá»• em xin chÃ¢n thÃ nh xin lá»—i báº¡n!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Luyá»‡n táº­p 2 (Ã½ a vÃ  c) SGK trang 23: Äá»c tin nháº¯n trÃªn Ä‘iá»‡n thoáº¡i cá»§a ngÆ°á»i khÃ¡c vÃ  chia sáº» thÃ´ng tin riÃªng tÆ° mÃ  khÃ´ng xin phÃ©p lÃ  hÃ nh vi vi pháº¡m Ä‘áº¡o Ä‘á»©c vÃ  quyá»n riÃªng tÆ° âž” <b>VI PHáº M ÄIá»€U 3!</b>"
    },
    {
      "id": "case_cloud_folder",
      "mockupType": "cloud_folder",
      "round": 2,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 3 & Äiá»u 2 (Tá»± Ã½ táº£i bÃ i lÃ m trong thÆ° má»¥c riÃªng cá»§a báº¡n ná»™p bÃ i cho tá»• mÃ¬nh)",
      "rumor": "<b>{pName} ({pStartup})</b> bá»©c xÃºc tá»‘ cÃ¡o bÃ i vÄƒn dá»± thi cá»§a mÃ¬nh lÆ°u trong thÆ° má»¥c Ä‘Ã¡m mÃ¢y lá»›p há»c bá»‹ <b>{dName} ({dStartup})</b> láº¥y ná»™p cho tá»• khÃ¡c!",
      "knownFacts": "â€¢ <b>TÃ¬nh huá»‘ng táº¡i thÆ° má»¥c chung:</b> Link lÆ°u trá»¯ Ä‘Ã¡m mÃ¢y cá»§a lá»›p Ä‘Æ°á»£c má»Ÿ Ä‘á»ƒ ná»™p bÃ i táº­p, trong Ä‘Ã³ má»—i báº¡n cÃ³ má»™t thÆ° má»¥c cÃ¡ nhÃ¢n Ä‘áº·t tÃªn riÃªng.<br>â€¢ <b>HÃ nh Ä‘á»™ng cá»§a {dName}:</b> <b>{dName}</b> Ä‘Ã£ má»Ÿ thÆ° má»¥c cÃ¡ nhÃ¢n cá»§a <b>{pName}</b>, táº£i tá»‡p <i>\"BaiVan_Diem10.docx\"</i> vá» mÃ¡y rá»“i Ä‘á»•i tÃªn tÃ¡c giáº£ thÃ nh tÃªn tá»• mÃ¬nh Ä‘em ná»™p.",
      "exhibitBox": "â˜ï¸ [Nháº­t kÃ½ thao tÃ¡c Ä‘Ã¡m mÃ¢y]: Tá»‡p \"BaiVan_Diem10.docx\" trong thÆ° má»¥c riÃªng cá»§a {pName} bá»‹ táº£i vá» lÃºc 20:10 vÃ  ná»™p láº¡i dÆ°á»›i tÃªn {dName}.",
      "cards": [
        { "id": "EXCUSE", "quote": "\"ÄÆ°á»ng link thÆ° má»¥c Ä‘Ã¡m mÃ¢y Ä‘Æ°á»£c giÃ¡o viÃªn cáº¥p quyá»n truy cáº­p má»Ÿ cho táº¥t cáº£ há»c sinh trong lá»›p Ä‘á»ƒ chia sáº» nguá»“n há»c liá»‡u, nÃªn má»i tÃ i liá»‡u trong Ä‘Ã³ Ä‘á»u lÃ  dá»¯ liá»‡u tham kháº£o chung, ai cÅ©ng cÃ³ quyá»n táº£i vá» sá»­ dá»¥ng!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 3 vÃ  Äiá»u 2 SGK, thÆ° má»¥c cÃ¡ nhÃ¢n Ä‘áº·t tÃªn riÃªng lÃ  khÃ´ng gian riÃªng tÆ°. Viá»‡c tá»± Ã½ táº£i bÃ i cá»§a báº¡n ná»™p dÆ°á»›i tÃªn tá»• mÃ¬nh lÃ  vá»«a xÃ¢m pháº¡m quyá»n riÃªng tÆ° vá»«a máº¡o danh tÃ¡c giáº£. Tá»• em xin nháº­n trÃ¡ch nhiá»‡m!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Chiáº¿u theo Äiá»u 3 & Äiá»u 2 SGK trang 22: Tá»± Ã½ truy cáº­p tÃ i liá»‡u riÃªng cá»§a báº¡n khi chÆ°a Ä‘Æ°á»£c phÃ©p lÃ  vi pháº¡m quyá»n riÃªng tÆ°, nháº­n bÃ i cá»§a ngÆ°á»i khÃ¡c lÃ  cá»§a mÃ¬nh lÃ  <b>HÃ€NH VI SAI TRÃI!</b>"
    },
    {
      "id": "case_code_game",
      "mockupType": "code_game",
      "round": 2,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 1 & 2 (DÃ¹ng khá»‘i lá»‡nh Scratch má»Ÿ vÃ  ghi nháº­n tÃ¡c giáº£ trong Notes & Credits)",
      "rumor": "Má»™t sá»‘ báº¡n nghi ngá» trÃ² chÆ¡i láº­p trÃ¬nh Scratch má»›i cá»§a <b>{dName} ({dStartup})</b> sao chÃ©p mÃ£ lá»‡nh di chuyá»ƒn nhÃ¢n váº­t tá»« dá»± Ã¡n cá»§a <b>{pName} ({pStartup})</b>!",
      "knownFacts": "â€¢ <b>Nguá»“n gá»‘c tÃ i nguyÃªn:</b> <b>{pName}</b> chia sáº» khá»‘i lá»‡nh Ä‘iá»u khiá»ƒn nhÃ¢n váº­t lÃªn cá»™ng Ä‘á»“ng Scratch vá»›i cháº¿ Ä‘á»™ má»Ÿ khuyáº¿n khÃ­ch má»i ngÆ°á»i há»c táº­p.<br>â€¢ <b>Trong pháº§n giá»›i thiá»‡u dá»± Ã¡n:</b> <b>{dName}</b> Ä‘iá»n Ä‘áº§y Ä‘á»§ thÃ´ng tin táº¡i Ã´ <i>\"Notes and Credits\"</i> nhÆ° sau:",
      "exhibitBox": "ðŸ§© [Má»¥c Notes & Credits dá»± Ã¡n Scratch cá»§a {dName}]: \"MÃ£ Ä‘iá»u khiá»ƒn nhÃ¢n váº­t bay tham kháº£o tá»« dá»± Ã¡n má»Ÿ cá»§a báº¡n {pName} ({pStartup}) â€” Xin chÃ¢n thÃ nh cáº£m Æ¡n tÃ¡c giáº£!\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"Khá»‘i lá»‡nh Ä‘Æ°á»£c tÃ¡c giáº£ chia sáº» má»Ÿ cho cá»™ng Ä‘á»“ng há»c há»i, chÃºng em Ä‘Ã£ ghi cÃ´ng tÃ¡c giáº£ á»Ÿ má»¥c Notes and Credits Ä‘Ãºng chuáº©n Ä‘áº¡o Ä‘á»©c sá»‘!\"" },
        { "id": "CLUMSY", "quote": "\"Cá»™ng Ä‘á»“ng Scratch lÃ  nÆ¡i chia sáº» mÃ£ lá»‡nh tá»± do nÃªn tá»• em tháº¥y khá»‘i lá»‡nh hay thÃ¬ cá»© kÃ©o ghÃ©p vÃ o game cá»§a mÃ¬nh thÃ´i, khÃ´ng cáº§n báº­n tÃ¢m Ä‘áº¿n quy táº¯c nÃ o!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Sá»­ dá»¥ng tÃ i nguyÃªn má»Ÿ phá»¥c vá»¥ há»c táº­p vÃ  ghi nháº­n Ä‘áº§y Ä‘á»§ tÃªn tÃ¡c giáº£ táº¡i pháº§n ghi chÃº nguá»“n lÃ  hÃ nh vi vÄƒn minh, tÃ´n trá»ng báº£n quyá»n âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_avatar_hack",
      "mockupType": "avatar_hack",
      "round": 2,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 3 (Chá»¥p trá»™m biá»ƒu cáº£m báº¡n bá»‹ ngÃ£ rá»“i Ä‘Äƒng cháº¿ áº£nh meme lÃªn máº¡ng xÃ£ há»™i)",
      "rumor": "<b>{pName} ({pStartup})</b> buá»“n bÃ£ khi tháº¥y hÃ¬nh áº£nh biá»ƒu cáº£m hÃ i hÆ°á»›c cá»§a mÃ¬nh lÃºc váº¥p ngÃ£ bá»‹ <b>{dName} ({dStartup})</b> cháº¿ áº£nh Ä‘Äƒng lÃªn nhÃ³m máº¡ng xÃ£ há»™i!",
      "knownFacts": "â€¢ <b>Diá»…n biáº¿n táº¡i sÃ¢n trÆ°á»ng:</b> Giá» ra chÆ¡i, <b>{pName}</b> vÃ´ tÃ¬nh váº¥p ngÃ£ lÃ m rÆ¡i sÃ¡ch vá»Ÿ trÃªn sÃ¢n trÆ°á»ng.<br>â€¢ <b>HÃ nh Ä‘á»™ng cá»§a {dName}:</b> <b>{dName}</b> dÃ¹ng Ä‘iá»‡n thoáº¡i chá»¥p trá»™m khuÃ´n máº·t cá»§a <b>{pName}</b> rá»“i chÃ¨n cÃ¢u chá»¯ cháº¿ nháº¡o hÃ i hÆ°á»›c Ä‘Äƒng lÃªn nhÃ³m chat cÃ´ng khai khi <b>{pName}</b> chÆ°a há» Ä‘á»“ng Ã½.",
      "exhibitBox": "ðŸ“² [BÃ i Ä‘Äƒng trÃªn máº¡ng xÃ£ há»™i cá»§a {dName}]: áº¢nh chá»¥p khuÃ´n máº·t ngÃ£ cá»§a {pName} â€” KÃ¨m cÃ¢u cháº¿ áº£nh: \"Khi báº¡n cá»‘ gáº¯ng nhÆ°ng Ä‘á»i khÃ´ng nhÆ° mÆ¡ ðŸ˜‚\"",
      "cards": [
        { "id": "EXCUSE", "quote": "\"SÃ¢n trÆ°á»ng lÃ  khÃ´ng gian sinh hoáº¡t cÃ´ng cá»™ng vÃ  bá»©c áº£nh cháº¿ hÃ i hÆ°á»›c chá»‰ chia sáº» trong nhÃ³m báº¡n bÃ¨ thÃ¢n thiáº¿t Ä‘á»ƒ giáº£i trÃ­ tuá»•i há»c trÃ², khÃ´ng há» cÃ³ má»¥c Ä‘Ã­ch xÃºc pháº¡m hay Ä‘Äƒng cÃ´ng khai ra ngoÃ i máº¡ng xÃ£ há»™i!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 3 SGK trang 22, hÃ¬nh áº£nh cÃ¡ nhÃ¢n lÃ  quyá»n riÃªng tÆ° cá»§a má»—i ngÆ°á»i. Viá»‡c chá»¥p trá»™m vÃ  lan truyá»n lÃ m áº£nh hÆ°á»Ÿng tÃ¢m lÃ½ cá»§a báº¡n lÃ  vi pháº¡m Ä‘áº¡o Ä‘á»©c sá»‘. Tá»• em xin nháº­n khuyáº¿t Ä‘iá»ƒm vÃ  xÃ³a áº£nh ngay!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Theo Äiá»u 3 SGK trang 22: HÃ¬nh áº£nh khuÃ´n máº·t cá»§a má»—i ngÆ°á»i lÃ  quyá»n riÃªng tÆ° cÃ¡ nhÃ¢n. Chá»¥p trá»™m vÃ  Ä‘Äƒng lÃªn máº¡ng cháº¿ nháº¡o khi chÆ°a Ä‘Æ°á»£c phÃ©p lÃ  <b>VI PHáº M QUYá»€N RIÃŠNG TÆ¯!</b>"
    },
    {
      "id": "case_science_report",
      "mockupType": "science_report",
      "round": 2,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 1 (ÄÃ£ gá»­i thÆ° xin phÃ©p vÃ  ghi nguá»“n chÃº thÃ­ch biá»ƒu Ä‘á»“ nghiÃªn cá»©u)",
      "rumor": "Nhiá»u tá»• tháº¯c máº¯c khi tháº¥y bÃ i bÃ¡o cÃ¡o khoa há»c STEM cá»§a <b>{dName} ({dStartup})</b> cÃ³ biá»ƒu Ä‘á»“ thÃ­ nghiá»‡m nhiá»‡t Ä‘á»™ giá»‘ng há»‡t sá»‘ liá»‡u cá»§a <b>{pName} ({pStartup})</b>!",
      "knownFacts": "â€¢ <b>Sá»± tháº­t giá»¯a 2 tá»•:</b> Tuáº§n trÆ°á»›c, Ä‘áº¡i diá»‡n <b>{dName}</b> Ä‘Ã£ gá»­i thÆ° xin phÃ©p mÆ°á»£n báº£ng sá»‘ liá»‡u biá»ƒu Ä‘á»“ vÃ  Ä‘Æ°á»£c nhÃ³m trÆ°á»Ÿng <b>{pName}</b> gá»­i vÄƒn báº£n Ä‘á»“ng Ã½.<br>â€¢ <b>DÆ°á»›i biá»ƒu Ä‘á»“ trong bÃ i bÃ¡o cÃ¡o:</b> <b>{dName}</b> in rÃµ chÃº thÃ­ch trÃ­ch dáº«n nguá»“n:",
      "exhibitBox": "ðŸ“Š [Trang bÃ¡o cÃ¡o STEM cá»§a {dName}]: Biá»ƒu Ä‘á»“ Ä‘o nhiá»‡t Ä‘á»™ nÆ°á»›c â€” DÃ²ng chÃº thÃ­ch: \"Sá»‘ liá»‡u thÃ­ nghiá»‡m Ä‘Æ°á»£c phÃ©p trÃ­ch dáº«n tá»« nhÃ³m nghiÃªn cá»©u {pName} ({pStartup})\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"ChÃºng em Ä‘Ã£ lÃ m Ä‘Ãºng Äiá»u 1 SGK: CÃ³ vÄƒn báº£n xin phÃ©p Ä‘Æ°á»£c tÃ¡c giáº£ Ä‘á»“ng Ã½ vÃ  ghi rÃµ nguá»“n nhÃ³m nghiÃªn cá»©u bÃªn dÆ°á»›i biá»ƒu Ä‘á»“!\"" },
        { "id": "CLUMSY", "quote": "\"Sá»‘ liá»‡u biá»ƒu Ä‘á»“ nÃ y lÃ  káº¿t quáº£ thÃ­ nghiá»‡m khoa há»c cá»§a lá»›p nÃªn tá»• em cá»© Ä‘Æ°a vÃ o bÃ i bÃ¡o cÃ¡o STEM cho Ä‘áº§y Ä‘á»§ chá»© khÃ´ng cáº§n cÄƒn cá»© theo Ä‘iá»u luáº­t nÃ o!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Thá»±c hiá»‡n Ä‘áº§y Ä‘á»§ 2 váº¿ cá»§a Äiá»u 1: ÄÃ£ Ä‘Æ°á»£c tÃ¡c giáº£ Ä‘á»“ng Ã½ cho phÃ©p trÃ­ch dáº«n VÃ€ ghi rÃµ nguá»“n nhÃ³m tÃ¡c giáº£ dÆ°á»›i biá»ƒu Ä‘á»“ âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    },
    {
      "id": "case_video_sub",
      "mockupType": "video_sub",
      "round": 2,
      "type": "VIOLATION",
      "lawTag": "Vi pháº¡m Äiá»u 1 & Äiá»u 2 (Táº£i video cá»§a báº¡n vá» chÃ¨n phá»¥ Ä‘á», xÃ³a tÃªn tÃ¡c giáº£ gá»‘c)",
      "rumor": "<b>{pName} ({pStartup})</b> phÃ¡t hiá»‡n video bÃ i giáº£ng Tiáº¿ng Anh khoa há»c do tá»• mÃ¬nh ká»³ cÃ´ng tá»± quay vÃ  lá»“ng tiáº¿ng bá»‹ <b>{dName} ({dStartup})</b> Ä‘Äƒng lÃªn kÃªnh khÃ¡c!",
      "knownFacts": "â€¢ <b>Vá» viá»‡c xin phÃ©p:</b> <b>{dName}</b> táº£i trá»n váº¹n tá»‡p video gá»‘c cá»§a <b>{pName}</b> tá»« trÃªn máº¡ng vá» mÃ¡y mÃ  chÆ°a tá»«ng há»i Ã½ kiáº¿n <b>{pName}</b>.<br>â€¢ <b>Vá» viá»‡c ghi nháº­n tÃ¡c giáº£:</b> <b>{dName}</b> cáº¯t bá» Ä‘oáº¡n giá»›i thiá»‡u tÃªn tá»• cá»§a <b>{pName}</b> á»Ÿ Ä‘áº§u video, sau Ä‘Ã³ chÃ¨n thÃªm dÃ²ng chá»¯ phá»¥ Ä‘á» tiáº¿ng Viá»‡t vÃ  nháº­n video lÃ  cá»§a mÃ¬nh:",
      "exhibitBox": "ðŸŽ¬ [Video Ä‘Äƒng táº£i bá»Ÿi {dName}]: Video Khoa Há»c Tá»± NhiÃªn â€” Cáº¯t bá» intro tÃªn {pName} â€” DÃ²ng ghi nháº­n: \"BiÃªn soáº¡n & Sáº£n xuáº¥t: {dName} ({dStartup})\"",
      "cards": [
        { "id": "EXCUSE", "quote": "\"Tá»• em Ä‘Ã£ bá» nhiá»u thá»i gian dá»‹ch thuáº­t vÃ  lÃ m phá»¥ Ä‘á» tiáº¿ng Viá»‡t giÃºp ngÆ°á»i xem tiáº¿p cáº­n kiáº¿n thá»©c dá»… dÃ ng hÆ¡n, nÃªn theo quy Ä‘á»‹nh sÃ¡ng táº¡o sá»‘ thÃ¬ tá»• em chÃ­nh lÃ  Ä‘Æ¡n vá»‹ Ä‘á»“ng sáº£n xuáº¥t áº¥n báº£n Viá»‡t hÃ³a nÃ y!\"" },
        { "id": "APOLOGIZE", "quote": "\"Theo Äiá»u 1 vÃ  Äiá»u 2 SGK, video thuá»™c quyá»n sá»Ÿ há»¯u cá»§a tÃ¡c giáº£ gá»‘c. Viá»‡c tá»± Ã½ táº£i vá» sá»­ dá»¥ng chÆ°a xin phÃ©p láº¡i cáº¯t intro xÃ³a tÃªn báº¡n lÃ  vi pháº¡m nghiÃªm trá»ng báº£n quyá»n. Tá»• em xin gá»¡ video vÃ  nháº­n trÃ¡ch nhiá»‡m!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Video thuá»™c quyá»n tÃ¡c giáº£ cá»§a <b>{pName}</b>. Viá»‡c chÃ¨n thÃªm phá»¥ Ä‘á» khÃ´ng biáº¿n video cá»§a ngÆ°á»i khÃ¡c thÃ nh cá»§a mÃ¬nh khi <b>chÆ°a Ä‘Æ°á»£c phÃ©p</b> vÃ  <b>xÃ³a tÃªn tÃ¡c giáº£ gá»‘c</b> âž” <b>VI PHáº M Báº¢N QUYá»€N!</b>"
    },
    {
      "id": "case_library_wiki",
      "mockupType": "library_wiki",
      "round": 2,
      "type": "TRAP",
      "lawTag": "Há»£p phÃ¡p Ä‘Ãºng Äiá»u 2 & Váº­n dá»¥ng SGK (TrÃ­ch dáº«n Ä‘á»‹nh nghÄ©a tá»« BÃ¡ch khoa toÃ n thÆ° má»Ÿ cÃ³ dáº«n nguá»“n)",
      "rumor": "CÃ³ Ã½ kiáº¿n cho ráº±ng tÃ i liá»‡u Cáº©m nang Tin há»c 5 cá»§a <b>{dName} ({dStartup})</b> sao chÃ©p nguyÃªn vÄƒn Ä‘á»‹nh nghÄ©a tá»« máº¡ng Internet mÃ  khÃ´ng tá»± viáº¿t!",
      "knownFacts": "â€¢ <b>Ná»™i dung trÃ­ch dáº«n:</b> <b>{dName}</b> trÃ­ch dáº«n Ä‘oáº¡n Ä‘á»‹nh nghÄ©a <i>\"Ná»™i dung sá»‘ lÃ  gÃ¬?\"</i> tá»« BÃ¡ch khoa toÃ n thÆ° má»Ÿ Wikipedia (tÃ i liá»‡u cáº¥p phÃ©p má»Ÿ cho há»c táº­p).<br>â€¢ <b>Ngay cuá»‘i Ä‘oáº¡n trÃ­ch dáº«n:</b> <b>{dName}</b> ghi chÃº nguá»“n thÃ´ng tin Ä‘áº§y Ä‘á»§:",
      "exhibitBox": "ðŸ“– [TÃ i liá»‡u Cáº©m nang cá»§a {dName}]: Äoáº¡n trÃ­ch \"Ná»™i dung sá»‘ lÃ  sáº£n pháº©m dá»¯ liá»‡u...\" â€” ChÃº thÃ­ch: \"TrÃ­ch dáº«n tá»« BÃ¡ch khoa toÃ n thÆ° má»Ÿ Wikipedia (Giáº¥y phÃ©p chia sáº» má»Ÿ CC)\"",
      "cards": [
        { "id": "LEGAL_DEFENSE", "quote": "\"Theo pháº§n Váº­n dá»¥ng SGK trang 23, chÃºng em sá»­ dá»¥ng tÃ i liá»‡u chia sáº» má»Ÿ phá»¥c vá»¥ há»c táº­p vÃ  Ä‘Ã£ trÃ­ch dáº«n Ä‘áº§y Ä‘á»§ tÃªn nguá»“n gá»‘c tÃ i liá»‡u!\"" },
        { "id": "CLUMSY", "quote": "\"Äá»‹nh nghÄ©a vá» ná»™i dung sá»‘ cÃ³ sáºµn trÃªn máº¡ng ai tra cá»©u cÅ©ng tháº¥y, nÃªn tá»• em cá»© chÃ©p vÃ o cáº©m nang thÃ´i chá»© khÃ´ng cáº§n biáº¿t cÃ³ theo Ä‘Ãºng quy Ä‘á»‹nh hay khÃ´ng!\"" }
      ],
      "verdictExplain": "âš–ï¸ <b>CÄ‚N Cá»¨ PHÃP LÃ:</b> Chiáº¿u theo má»¥c Váº­n dá»¥ng SGK trang 23: TrÃ­ch dáº«n Ä‘á»‹nh nghÄ©a tá»« nguá»“n tÃ i liá»‡u tham kháº£o má»Ÿ vÃ  ghi rÃµ tÃªn nguá»“n lÃ  hÃ nh vi sá»­ dá»¥ng thÃ´ng tin há»£p phÃ¡p vÃ  máº«u má»±c âž” <b>HOÃ€N TOÃ€N Há»¢P PHÃP!</b>"
    }
  ]
};
