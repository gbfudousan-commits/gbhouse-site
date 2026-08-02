# GB商事合同会社 官網 — 部署說明（第三版）

這是一個純靜態網站（沒有資料庫、沒有後端），電腦上直接雙擊 `index.html` 就能離線瀏覽。
目前已經上線在 GitHub Pages：`https://gbfudousan-commits.github.io/gbhouse-site/`

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

## 網址可以變短嗎？（GitHub Pages 網址說明）

目前上線的網址是：`https://gbfudousan-commits.github.io/gbhouse-site/`

這是 GitHub Pages 的規則：**帳號名稱.github.io/儲存庫名稱/**，帳號名稱跟斜線後面
那段沒辦法拿掉，但有兩個方法可以讓網址變短、變好記：

**方法一：把儲存庫名稱改短**
目前儲存庫叫 `gbhouse-site`，如果改名成比較短的，例如 `gb`，網址就會變成
`https://gbfudousan-commits.github.io/gb/`，短一點，但還是會有那一段路徑，
無法完全消除。到 repository 的 **Settings → 最上面的 Repository name** 就能改名，
改名後幾分鐘內生效，原本的網址也會自動轉過去一段時間，不用擔心舊連結馬上失效。

**方法二：買一個自己的網域（最理想、可以完全客製）**
例如買 `gbfudousan.com` 或 `gb-house.jp`，設定完成後網址就會是
`https://gbfudousan.com`，又短又專業，是不動產同業網站常見的做法。
步驟：
1. 到網域註冊商（例如 Namecheap、GoDaddy，或台灣的 GANDI、name.com）購買網域，
   一年費用大約台幣400–1000元不等
2. 到該網域的 DNS 設定，新增一筆 CNAME 紀錄，指向 `gbfudousan-commits.github.io`
3. 回到 GitHub repository 的 **Settings → Pages → Custom domain**，填入您買的網域，儲存
4. 等待DNS生效（通常10分鐘到幾小時），之後網址就會變成您自己的網域

如果只是想要「方便分享」而不是真的改網址，也可以用免費短網址工具（例如
`https://reurl.cc` 或 `https://s.gpp.tw`）把現在的網址包裝成一個短連結，
放在名片或LINE訊息裡使用，但瀏覽器網址列還是會顯示原本的完整網址。

---

## 更新網站內容的方法

之後要改文字或換照片，登入 GitHub → 進入 `gbhouse-site` 這個 repository →
找到對應的檔案 → 點右上角鉛筆圖示編輯 → 改完按「Commit changes」，
網站會在幾分鐘內自動更新，不需要重新設定 Pages。

---

## 這一版更新了什麼

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
