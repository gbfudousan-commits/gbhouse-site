# GB商事合同会社 官網 — 部署說明（第四版）

這是一個純靜態網站（沒有資料庫、沒有後端），電腦上直接雙擊 `index.html` 就能離線瀏覽。
目前已經上線，正式網址：`https://gbhouse.co/`（原本的 GitHub Pages 網址 `gbfudousan-commits.github.io/gbhouse-site/` 也還能連到同一個網站，但對外請一律使用 `gbhouse.co`）

---

## Google Analytics 4（查看訪客數據）

✅ **已完成**：九個頁面都已埋好追蹤程式碼，評估ID `G-TK370BB6TW` 已經填入，
上傳這次的檔案之後就會開始收集數據，登入 https://analytics.google.com 即可查看
今天/本月訪客數、訪客所在國家/城市等統計。剛裝好通常要等 24-48 小時才會開始有完整數據。

---

## 表單設定（上線前必做，如果還沒設定的話）

聯絡我們頁面的表單會「直接送出」，不會跳出您的信箱軟體。這是透過一個
免費、不需要架伺服器的服務 **Web3Forms** 做到的，但需要您花 1 分鐘拿到一組
專屬的「Access Key」，步驟如下：

1. 開啟 https://web3forms.com
2. 在首頁輸入您要收信的信箱：`gbfudousan@gmail.com`，按下「Create Access Key」
3. Web3Forms 會寄一封信到這個信箱，裡面有一組像 `a1b2c3d4-....` 的 Access Key
4. 打開 `contact.html`，找到這一行（大約在表單最上面）：
   ```html
   <input type="hidden" name="access_key" value="PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE">
   ```
   把 `PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE` 換成您拿到的 Access Key，存檔並重新上傳到 GitHub
5. 完成！之後客人在網站表單按「送出諮詢」，內容就會直接寄到您的信箱，客人不需要開啟任何郵件軟體

> 在您替換 Access Key 之前，表單會顯示提示訊息，不會誤發空白信件，所以不用擔心忘記設定會出錯。

---

## 網址已經是自訂網域了

✅ **已完成**：`https://gbhouse.co/` 已經是正式上線的網址，跟 GitHub Pages 綁定完成。
之後所有對外的連結、名片、廣告都請用 `gbhouse.co`，不要再用 `gbfudousan-commits.github.io/gbhouse-site/`
那個舊網址（雖然它還能連到同一個網站，但正式對外只用一個網址，SEO效果比較集中）。

（下面留著當初申請自訂網域的步驟紀錄，供之後參考）

<details>
<summary>點此展開：當初申請自訂網域的步驟</summary>

這是 GitHub Pages 的規則：**帳號名稱.github.io/儲存庫名稱/**，若不使用自訂網域，
帳號名稱跟斜線後面那段沒辦法拿掉。申請自訂網域的方式：
1. 到網域註冊商（例如 Namecheap、GoDaddy，或台灣的 GANDI、name.com）購買網域，
   一年費用大約台幣400–1000元不等
2. 到該網域的 DNS 設定，新增一筆 CNAME 紀錄，指向 `gbfudousan-commits.github.io`
3. 回到 GitHub repository 的 **Settings → Pages → Custom domain**，填入您買的網域，儲存
4. 等待DNS生效（通常10分鐘到幾小時），之後網址就會變成您自己的網域

</details>

---

## 更新網站內容的方法

之後要改文字或換照片，登入 GitHub → 進入 `gbhouse-site` 這個 repository →
找到對應的檔案 → 點右上角鉛筆圖示編輯 → 改完按「Commit changes」，
網站會在幾分鐘內自動更新，不需要重新設定 Pages。

---

## 加裝 Chatbase AI 客服機器人

✅ **已完成**：機器人已經設定好、嵌入程式碼也已經換成真正的版本（六個頁面都已更新），
上傳這次的 zip 之後，網站右下角就會出現對話氣泡，不需要再做任何設定。

如果之後想調整機器人怎麼回答，直接登入 https://www.chatbase.co，找到「Instructions」修改文字、
按「Save changes」就好，**不需要**再回來改網站程式碼。

（下面留著原本的申請流程紀錄，供之後參考／複製到別的機器人使用）

**申請與設定步驟：**

1. 到 https://www.chatbase.co 註冊一個免費帳號
2. 進入後點「New Agent」（或類似的新增機器人按鈕）
3. 到「資料來源 / Data Sources」，選擇貼上網址（Website / Link），把您的網站網址填入
   （例如 `https://gbhouse.co/`），讓它自動讀取全站內容；
   也可以額外把常見問題頁面的內容貼進去，訓練得更準確
4. 到「Instructions / Persona」設定機器人的說話方式，建議寫類似：
   > 你是GB商事合同会社的中文客服助理，親切、專業，主要協助大阪不動產買賣、租賃、
   > 移住諮詢相關問題。全程使用繁體中文回覆。遇到你不確定或涉及具體合約、價格的問題，
   > 請引導客人透過LINE（@381wtasq）或聯絡表單與真人聯繫，不要自行承諾價格或交易細節。
5. 到「外觀 / Appearance」可以上傳 `assets/logo.png` 當機器人頭像，顏色可以設定成
   `#0894C7`（跟網站主色一致）
6. 設定完成後，點「Embed on site」→「Make Public」，會出現一段程式碼，裡面有一組
   `chatbotId`（一長串英數字）
7. 打開這個資料夾裡的任一個 html 檔（`index.html`、`about.html`…），找到最下面這一段：
   ```html
   <script>
     window.embeddedChatbotConfig = {
       chatbotId: "PASTE_YOUR_CHATBASE_ID_HERE",
       domain: "www.chatbase.co"
     }
   </script>
   <script
     src="https://www.chatbase.co/embed.min.js"
     chatbotId="PASTE_YOUR_CHATBASE_ID_HERE"
     domain="www.chatbase.co"
     defer>
   </script>
   ```
   把兩處 `PASTE_YOUR_CHATBASE_ID_HERE` 都換成您拿到的 chatbotId
8. **這六個頁面都要各自改一次**（`index.html`、`about.html`、`properties.html`、
   `immigration.html`、`faq.html`、`contact.html`），這樣不管訪客從哪一頁進來都會看到機器人
9. 存檔後重新上傳到 GitHub，等1-2分鐘生效，右下角應該就會出現一個對話氣泡圖示

> 提醒：Chatbase 免費方案有訊息則數上限，用量大的話需要升級付費方案，實際額度與價格
> 請以您登入後看到的當下方案為準（這類服務更新蠻頻繁的）。如果某天想拿掉機器人，
> 把這段程式碼刪掉、或把 chatbotId 留空就不會顯示。

---

## 這一版更新了什麼

0. **修正三個問題**：
   - 重新接上 Google Analytics 4 追蹤程式碼（先前不知為何整個消失了），這次用您提供的評估ID `G-TK370BB6TW` 直接接好
   - `robots.txt`、`sitemap.xml` 的網址從舊的 GitHub Pages 網址改成正式網域 `gbhouse.co`，並在九個頁面都加上「canonical標籤」（技術上用來告訴搜尋引擎「這個網址才是正式版本」，避免新舊兩個網址被當成重複內容分散SEO效果）
   - 修正 `properties.html` 裡殘留的「SUUMO」文字（先前已經全站換成at home，這裡漏掉一處）
   - 首頁、公司介紹頁的結構化資料（JSON-LD）裡的網址也一併從舊網址改成 `gbhouse.co`

0. **SEO／GEO（AI搜尋優化）第一階段**：以「大阪台灣人房仲、日本買房中文服務」為核心，補齊技術地基與內容：
   - 新增 `robots.txt`、`sitemap.xml`，讓 Google 與 ChatGPT／Perplexity 等AI的爬蟲可以正常讀取全站頁面
   - 首頁、公司介紹頁加入「結構化資料」（JSON-LD，RealEstateAgent），讓AI更容易理解「GB商事＝大阪的台灣人中文房仲」這個身分
   - FAQ頁新增「台灣人在日本買房」分類（6題）＋1題品牌差異化問答，並加入FAQPage結構化資料，提高被AI引用回答的機會
   - 首頁、公司介紹、物件情報、日本移民、聯絡我們等頁的標題與描述都重寫，加入「大阪買房」「台灣人」「中文服務」等實際會被搜尋的詞
   - 首頁大標題加入「台灣人來日本的入口」標語
   - **後續您可以自己慢慢做的加分項**：把 Google Business Profile（Google商家檔案）開起來，並且在Facebook粉專「關於」欄位用一致的文字描述公司（大阪、台灣人、中文服務、不動產仲介），這些「網站以外的提及」對AI是否推薦您也有幫助，這部分無法透過改網站程式碼完成，需要您自己到各平台設定。



0. **Chatbase AI 客服機器人（佔位程式碼）**：六個頁面都已埋好接入程式碼，申請完帳號後只要貼上 ID，詳見上方「加裝 Chatbase AI 客服機器人」。



1. **favicon 徹底重做**：換成獨立的 PNG 圖示（`favicon-32.png`、`favicon-16.png`）加上新檔名的 `.ico`，並在網址後面加了 `?v=2` 版本號，強迫瀏覽器抓取新的檔案，不會再抓到舊的快取版本。
   - **重要提醒**：您圖示本身是「開放式」的房屋圖案（中間鏤空），所以放在瀏覽器分頁那種白底環境時，圖案周圍本來就會透出分頁的白色背景——這是所有非滿版圖示的正常現象（例如空心的房子、勾勾、愛心圖示都會這樣），不是背景沒去乾淨。真正的白色「方塊」背景才是需要修的問題，這次已經確認整張圖是透明的。
   - 如果上傳後看到的還是舊的白底圖示，八成是瀏覽器快取問題：試試看用「無痕視窗」開網站，或按 `Ctrl+Shift+R`（強制重新整理，會清除該頁的快取）確認。
2. **預算選單新增「1000萬日圓以下」**：原本最低區間是「2000萬日圓以下」，現在拆成「1000萬日圓以下」與「1000〜2000萬日圓」兩個選項，方便鎖定低總價物件的客人選擇。
3. **表單下拉選單**：修正「自住／自住」這種重複顯示的問題，客人只會看到中文選項，下拉選單本身可以正常點擊選擇（原本的顯示方式看起來像壞掉，其實是文字重複讓人誤會而已）。

### 前一版更新內容（保留紀錄）

4. **LOGO**：換成正式LOGO，去除白色背景，讓圖案能融入網站底色；公司名稱下方拿掉英文小字。
5. **配色**：改為明亮水藍色系（呼應LOGO顏色），搭配珊瑚橘作為按鈕與重點色。
6. **SUUMO／HOME'S 連結**：點擊後自動開啟 Google 翻譯的中文版頁面（標註「中文翻譯版」）。
7. **聯絡表單**：改為直接送出，新增「需求類型（自住／投資／未定）」與「預算」欄位。
8. **LINE**：換成官方帳號 `@381wtasq`，聯絡頁新增可掃描的 QR Code。
9. **粉絲團連結**：「負責人粉絲團」改名為「巨鼻爸爸粉絲團」；含YouTube頻道與買賣／租賃粉絲團連結。
10. **專業說明簡化**：改為「具備宅建士資格的人員以中文說明合約內容」。
11. **地址更新**：〒544-0034 大阪市生野区桃谷1-13-17桃谷駅前ビル302号室。
12. **主要業務擴充**：新增留學代辦、包車旅遊、不動產裝修、網路電信、保險辦理協助等服務卡片。
13. **辦公室與代表人照片**：公司介紹頁新增洽談室與代表人照片。

## 檔案結構

```
gbhouse-site/
├── index.html          首頁
├── about.html           公司介紹
├── properties.html      物件情報（找房平台連結，含中文翻譯版）
├── immigration.html     日本移民
├── faq.html              常見問題
├── contact.html          聯絡我們（含表單、LINE QR code、地圖）
├── css/style.css         網站樣式
├── js/main.js            語言切換 / 選單 / 表單送出功能
└── assets/
    ├── logo.png           公司LOGO（已去背）
    ├── logo-lg.png         LOGO大圖版本
    ├── favicon-16.png      瀏覽器分頁小圖示（16px）
    ├── favicon-32.png      瀏覽器分頁小圖示（32px）
    ├── favicon-48.png      瀏覽器分頁小圖示（48px，備用）
    ├── favicon-v2.ico      瀏覽器分頁小圖示（舊版瀏覽器相容用）
    ├── apple-touch-icon.png  iPhone／iPad加到主畫面用的圖示
    ├── line-qr.png         LINE官方帳號 QR Code
    ├── office.jpg          辦公室洽談室照片
    └── representative.jpg  代表人照片
```

## 雙語切換

網站右上角有「中文／日本語」切換鈕，所有頁面文字都準備了中日雙語版本，
切換後會記住您的選擇（下次開啟其他頁面也會維持同一語言）。
